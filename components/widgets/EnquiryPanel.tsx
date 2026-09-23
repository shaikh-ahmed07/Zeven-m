'use client';

import { useEffect, useRef } from 'react';
import { useUI } from '@/components/providers/UIProvider';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { Icon } from '@/components/ui/Icon';
import { site, whatsappLink } from '@/lib/data';
import { useScrollLock } from '@/lib/scroll';

/** Slide-in enquiry drawer available from every page ("Enquire Now"). */
export function EnquiryPanel() {
  const { enquiry, closeEnquiry } = useUI();
  const open = enquiry !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) {
      lastFocus.current?.focus();
      return;
    }
    lastFocus.current = document.activeElement as HTMLElement;
    // Focus the first field on desktop only; on phones it would pop the keyboard up immediately.
    const fine = window.matchMedia('(pointer: fine)').matches;
    const target = fine ? 'input' : '.drawer__close';
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>(target)?.focus({ preventScroll: true }), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEnquiry();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('button, a, input, select, textarea');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, closeEnquiry]);

  return (
    <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="drawer__scrim" onClick={closeEnquiry} />
      <div className="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" ref={panelRef}>
        <button type="button" className="drawer__close" onClick={closeEnquiry} aria-label="Close enquiry form">
          <Icon name="close" />
        </button>
        <p className="eyebrow">{enquiry?.project ?? 'Zeven-M Projects & Realty'}</p>
        <h2 id="drawer-title" className="drawer__title">
          {enquiry?.title ?? 'Enquire Now'}
        </h2>
        <p className="drawer__lead">Share a few details and a Zeven-M advisor will reach out to you.</p>
        {open && (
          <EnquiryForm
            key={`${enquiry?.project}-${enquiry?.interest}`}
            interest={enquiry?.interest}
            project={enquiry?.project}
            submitLabel={enquiry?.interest === 'Site Visit' ? 'Request Site Visit' : 'Request a Callback'}
            source="enquiry-panel"
          />
        )}
        <div className="drawer__alt">
          <a href={site.phoneHref}>
            <Icon name="phone" /> {site.phoneDisplay}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
