'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { navLinks, site, whatsappLink } from '@/lib/data';
import { NAVIGATE_EVENT, useUI } from '@/components/providers/UIProvider';
import { Icon } from '@/components/ui/Icon';
import { onScrollFrame, useScrollLock } from '@/lib/scroll';
import { Logo } from './Logo';

const sectionIds = navLinks.map((l) => l.href.split('#')[1]);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { openEnquiry } = useUI();
  const pathname = usePathname();
  const progressRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === '/';
  // Pages without a full-bleed hero image get the solid bar from the start.
  const hasHero = isHome || pathname.startsWith('/projects/');

  useScrollLock(menuOpen);

  /* Solid state, scroll progress and the active section — one rAF loop. */
  useEffect(
    () =>
      onScrollFrame(() => {
        const html = document.documentElement;
        if (html.classList.contains('is-locked')) return;
        const y = window.scrollY;
        setScrolled(y > 40);
        const max = html.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

        if (!isHome) return setActive(pathname.startsWith('/projects/') ? 'projects' : '');
        // The tracked section whose top is closest above 40% of the viewport wins.
        const line = window.innerHeight * 0.4;
        let current = 'home';
        let best = -Infinity;
        for (const id of sectionIds) {
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          if (top !== undefined && top <= line && top > best) {
            best = top;
            current = id;
          }
        }
        if (y >= max - 4) current = 'contact';
        setActive(current);
      }),
    [isHome, pathname],
  );

  useEffect(() => setMenuOpen(false), [pathname]);

  // Lets other fixed UI (the mobile action bar) step aside while the menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener(NAVIGATE_EVENT, close);
    return () => window.removeEventListener(NAVIGATE_EVENT, close);
  }, []);

  /* Escape to close, focus trap inside the open menu, focus return on close. */
  useEffect(() => {
    if (!menuOpen) return;
    const header = headerRef.current!;
    const t = window.setTimeout(() => header.querySelector<HTMLElement>('.mobile-menu a')?.focus({ preventScroll: true }), 420);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
      if (e.key !== 'Tab') return;
      const items = Array.from(
        header.querySelectorAll<HTMLElement>('.nav__brand, .nav__toggle, .mobile-menu a, .mobile-menu button'),
      );
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && i === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const toggle = toggleRef.current;
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  const solid = (scrolled || !hasHero) && !menuOpen;
  const linkClass = (href: string) => (active && href.endsWith(`#${active}`) ? 'is-active' : undefined);

  return (
    <header ref={headerRef} className={`nav ${solid ? 'nav--solid' : ''} ${menuOpen ? 'nav--open' : ''}`}>
      <span className="nav__progress" ref={progressRef} aria-hidden="true" />
      <div className="nav__inner container">
        <Link href="/#home" className="nav__brand" aria-label="Zeven-M Projects & Realty — home">
          <Logo variant="gold" className="nav__logo nav__logo--gold" preload />
          <Logo variant="plate" className="nav__logo nav__logo--plate" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={linkClass(link.href)}
                  aria-current={linkClass(link.href) ? 'location' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <a className="nav__icon" href={site.phoneHref} aria-label={`Call ${site.phoneDisplay}`}>
            <Icon name="phone" />
          </a>
          <a className="nav__icon" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <Icon name="whatsapp" />
          </a>
          <button type="button" className="btn btn--nav" onClick={() => openEnquiry()}>
            <span>Enquire Now</span>
          </button>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="mobile-menu__bg" onClick={() => setMenuOpen(false)} />
        <Logo variant="gold" className="mobile-menu__mark" />
        <div className="mobile-menu__panel container">
          <nav aria-label="Mobile">
            <ol className="mobile-menu__list">
              {navLinks.map((link, i) => (
                <li key={link.href} style={{ '--i': i } as React.CSSProperties}>
                  <Link
                    href={link.href}
                    className={linkClass(link.href)}
                    aria-current={linkClass(link.href) ? 'location' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mobile-menu__no">0{i + 1}</span>
                    <span className="mobile-menu__label">{link.label}</span>
                    <Icon name="arrowUpRight" className="mobile-menu__arrow" />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mobile-menu__foot" style={{ '--i': navLinks.length } as React.CSSProperties}>
            <button
              type="button"
              className="btn btn--gold mobile-menu__cta"
              onClick={() => {
                setMenuOpen(false);
                openEnquiry();
              }}
            >
              <span>Enquire Now</span>
              <Icon name="arrow" />
            </button>
            <div className="mobile-menu__quick">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> WhatsApp
              </a>
              <a href={site.phoneHref}>
                <Icon name="phone" /> Call Us
              </a>
            </div>
            <a className="mobile-menu__mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
