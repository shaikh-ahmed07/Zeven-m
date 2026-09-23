'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { Project } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';

export function Gallery({ project }: { project: Project }) {
  const [active, setActive] = useState<number | null>(null);
  const total = project.gallery.length;
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + total) % total)), [total]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, step]);

  return (
    <section id="gallery" className="gallery section" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery__head">
          <p className="eyebrow reveal">Gallery</p>
          <h2 id="gallery-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Inside <em>{project.name.replace('Zeven-M ', '')}</em>
          </h2>
        </div>
        <ul className="masonry">
          {project.gallery.map(([src, label], i) => (
            <li key={`${src}-${i}`} className={`masonry__item masonry__item--${i % 3} reveal reveal--image`}>
              <button type="button" onClick={() => setActive(i)} aria-label={`Open image: ${label}`}>
                <Image src={src} alt={`${project.name} — ${label} (placeholder image)`} fill sizes="(max-width: 760px) 100vw, 33vw" />
                <span className="masonry__label">
                  {label} <Icon name="expand" />
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="placeholder-note">Images are placeholders and do not depict the actual project.</p>
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} label="Image gallery" className="modal--lightbox">
        {active !== null && (
          <figure className="lightbox">
            <div className="lightbox__img">
              <Image src={project.gallery[active][0]} alt={`${project.name} — ${project.gallery[active][1]} (placeholder image)`} fill sizes="90vw" />
            </div>
            <figcaption>
              <span>{project.gallery[active][1]}</span>
              <span>
                {active + 1} / {total}
              </span>
            </figcaption>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous image">
              <Icon name="chevronLeft" />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next image">
              <Icon name="chevronRight" />
            </button>
          </figure>
        )}
      </Modal>
    </section>
  );
}
