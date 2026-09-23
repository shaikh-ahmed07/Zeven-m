'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { EnquiryPanel } from '@/components/widgets/EnquiryPanel';
import { Chatbot } from '@/components/widgets/Chatbot';
import { FloatingActions } from '@/components/widgets/FloatingActions';
import { onScrollFrame, prefersReducedMotion, scrollToId, whenUnlocked } from '@/lib/scroll';

export type EnquiryContext = { interest?: string; project?: string; title?: string };

type UIContextValue = {
  openEnquiry: (ctx?: EnquiryContext) => void;
  closeEnquiry: () => void;
  enquiry: EnquiryContext | null;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  /** Scrolls to the homepage contact form (pre-selecting an interest), or opens the enquiry panel elsewhere. */
  goToContact: (interest?: string) => void;
  contactInterest: string | undefined;
};

const UIContext = createContext<UIContextValue | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>');
  return ctx;
}

/** Broadcast before any in-page navigation so open menus, sheets and panels close. */
export const NAVIGATE_EVENT = 'zm:navigate';
export const FILTER_EVENT = 'zm:filter';

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [enquiry, setEnquiry] = useState<EnquiryContext | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [contactInterest, setContactInterest] = useState<string>();
  const pathname = usePathname();

  const openEnquiry = useCallback((ctx: EnquiryContext = {}) => {
    setChatOpen(false);
    setEnquiry(ctx);
  }, []);
  const closeEnquiry = useCallback(() => setEnquiry(null), []);

  const goToContact = useCallback(
    (interest?: string) => {
      if (!document.getElementById('contact')) return openEnquiry({ interest });
      setContactInterest(interest);
      window.dispatchEvent(new Event(NAVIGATE_EVENT));
      setEnquiry(null);
      setChatOpen(false);
      whenUnlocked(() => scrollToId('contact'));
    },
    [openEnquiry],
  );

  useEffect(() => {
    const close = () => setEnquiry(null);
    window.addEventListener(NAVIGATE_EVENT, close);
    return () => window.removeEventListener(NAVIGATE_EVENT, close);
  }, []);

  useInPageLinks();
  useHashOnArrival(pathname);
  useScrollEffects(pathname);

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry, enquiry, chatOpen, setChatOpen, goToContact, contactInterest }),
    [openEnquiry, closeEnquiry, enquiry, chatOpen, goToContact, contactInterest],
  );

  return (
    <UIContext.Provider value={value}>
      {children}
      <FloatingActions />
      <Chatbot />
      <EnquiryPanel />
    </UIContext.Provider>
  );
}

/**
 * Every same-page anchor ("/#projects", "#gallery", footer links…) is handled
 * here: menus close first, then the page scrolls with the navbar offset applied.
 * Links to other pages are left to the Next.js router.
 */
function useInPageLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;

      e.preventDefault();
      const filter = url.searchParams.get('filter');
      if (filter) window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: filter }));
      window.dispatchEvent(new Event(NAVIGATE_EVENT));
      whenUnlocked(() => {
        scrollToId(id);
        // Keep Next.js' history state so back/forward keep working.
        window.history.replaceState(window.history.state, '', url.pathname + url.hash);
      });
    };
    // Capture phase on window runs before Next <Link> handlers.
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);
}

/** Arriving from another page at "/#projects": correct the landing position for the sticky navbar. */
function useHashOnArrival(pathname: string) {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = window.setTimeout(() => whenUnlocked(() => scrollToId(id, false)), 120);
    return () => window.clearTimeout(t);
  }, [pathname]);
}

/** Reveal-on-scroll, parallax and the self-drawing process timeline. */
function useScrollEffects(pathname: string) {
  useEffect(() => {
    const reduce = prefersReducedMotion();

    // Elements that start fully masked (clip-path) have no visible area, so the
    // observer never reports them; watch their parent instead.
    const MASKED = '.display, .featured__title, .craft__title, .cta__title, .reveal--side, .reveal--side-r';
    const watched = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (watched.get(entry.target) ?? []).forEach((el) => el.classList.add('is-visible'));
          watched.delete(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    const observe = (el: Element) => {
      const target = el.matches(MASKED) && el.parentElement ? el.parentElement : el;
      const list = watched.get(target);
      if (list) {
        if (!list.includes(el)) list.push(el);
        return;
      }
      watched.set(target, [el]);
      io.observe(target);
    };

    let layers: HTMLElement[] = [];
    let timelines: HTMLElement[] = [];
    const collect = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(observe);
      layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
      timelines = Array.from(document.querySelectorAll<HTMLElement>('[data-timeline]'));
    };
    collect();
    const mo = new MutationObserver(collect);
    mo.observe(document.body, { childList: true, subtree: true });

    const stop = onScrollFrame(() => {
      if (document.documentElement.classList.contains('is-locked')) return;
      const vh = window.innerHeight;
      const mobile = window.innerWidth < 761;

      if (!reduce) {
        const factor = mobile ? 0.55 : 1;
        for (const el of layers) {
          const rect = el.parentElement!.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > vh + 100) continue;
          const speed = (Number(el.dataset.parallax) || 0.1) * factor;
          const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
      }

      for (const tl of timelines) {
        const rect = tl.getBoundingClientRect();
        const vertical = mobile || window.innerWidth < 901;
        const p = reduce
          ? 1
          : vertical
            ? (vh * 0.72 - rect.top) / rect.height
            : (vh * 0.85 - rect.top) / (vh * 0.55);
        const progress = Math.min(1, Math.max(0, p));
        tl.style.setProperty('--p', progress.toFixed(3));
        const steps = tl.querySelectorAll<HTMLElement>('.timeline__step');
        steps.forEach((step, i) => {
          const reached = vertical
            ? step.getBoundingClientRect().top < vh * 0.72
            : progress >= (i / Math.max(1, steps.length - 1)) * 0.96;
          step.classList.toggle('is-active', reduce || reached);
        });
      }
    });

    return () => {
      io.disconnect();
      mo.disconnect();
      stop();
    };
  }, [pathname]);
}
