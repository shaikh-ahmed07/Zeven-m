'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Service } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { useUI } from '@/components/providers/UIProvider';

export function ServicesGrid({ services }: { services: Service[] }) {
  const [open, setOpen] = useState<Service | null>(null);
  const { goToContact } = useUI();

  return (
    <>
      <div className="services__grid">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={`service-${s.slug}`}
            className="service-card reveal"
            style={{ '--d': `${i * 110}ms` } as React.CSSProperties}
          >
            <div className="service-card__top">
              <span className="service-card__no">{s.no}</span>
              <Icon name={s.icon} className="service-card__icon" />
            </div>
            <h3 className="service-card__title">
              {/* Stretched button: the whole card is the tap target. */}
              <button type="button" className="service-card__btn" onClick={() => setOpen(s)} aria-haspopup="dialog">
                {s.title}
              </button>
            </h3>
            <p className="service-card__text">{s.text}</p>
            <span className="service-card__more" aria-hidden="true">
              View Details <Icon name="arrow" />
            </span>
          </article>
        ))}
      </div>
      <p className="services__hint" aria-hidden="true">
        Swipe to explore <Icon name="arrow" />
      </p>

      <Modal open={open !== null} onClose={() => setOpen(null)} label={`${open?.title ?? ''} details`} className="modal--sheet">
        {open && (
          <div className="service-sheet">
            <div className="service-sheet__top">
              <span className="service-card__no">{open.no}</span>
              <Icon name={open.icon} className="service-sheet__icon" />
            </div>
            <p className="eyebrow">Our Expertise</p>
            <h3 className="modal__title">{open.title}</h3>
            <p className="service-sheet__text">{open.text}</p>
            <h4 className="service-sheet__label">Scope of Work</h4>
            <ul className="service-sheet__list">
              {open.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="service-sheet__actions">
              <button
                type="button"
                className="btn btn--dark"
                onClick={() => {
                  setOpen(null);
                  goToContact(open.interest);
                }}
              >
                <span>Enquire About {open.title}</span>
                <Icon name="arrow" />
              </button>
              <Link href="/#projects" className="link-arrow" onClick={() => setOpen(null)}>
                View Our Projects <Icon name="arrow" />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
