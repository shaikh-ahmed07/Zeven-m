'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projectAlt, type Project } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';

const pad = (n: number) => String(n).padStart(2, '0');

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
          <div>
            <p className="eyebrow reveal">Gallery</p>
            <h2 id="gallery-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
              Inside <em>{project.name.replace('Zeven-M ', '')}</em>
            </h2>
          </div>
        </div>
        <ul className="masonry">
          {project.gallery.map(([src, label], i) => (
            <li key={`${src}-${i}`} className={`masonry__item masonry__item--${i % 3} reveal reveal--image`}>
              <button type="button" onClick={() => setActive(i)} aria-label={`Open image ${i + 1} of ${total}: ${label}`}>
                <Image src={src} alt={projectAlt(project, label)} fill sizes="(max-width: 760px) 86vw, 33vw" />
                <span className="masonry__label">
                  <span>
                    <em>{pad(i + 1)}</em> {label}
                  </span>
                  <Icon name="expand" />
                </span>
              </button>
            </li>
          ))}
        </ul>
        {project.placeholder !== false && (
          <p className="placeholder-note">Images are placeholders and do not depict the actual project.</p>
        )}
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} label="Image gallery" className="modal--lightbox">
        {active !== null && (
          <Lightbox
            key={active}
            src={project.gallery[active][0]}
            alt={projectAlt(project, project.gallery[active][1])}
            label={project.gallery[active][1]}
            counter={`${pad(active + 1)} / ${pad(total)}`}
            onStep={step}
          />
        )}
      </Modal>
    </section>
  );
}

/** Full-screen viewer: swipe to navigate, double-tap (or double-click) to zoom, drag to pan. */
function Lightbox({
  src,
  alt,
  label,
  counter,
  onStep,
}: {
  src: string;
  alt: string;
  label: string;
  counter: string;
  onStep: (d: number) => void;
}) {
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const gesture = useRef<{ x: number; y: number; panX: number; panY: number; moved: boolean } | null>(null);
  const lastTap = useRef(0);
  const frameRef = useRef<HTMLDivElement>(null);

  const toggleZoom = (clientX: number, clientY: number) => {
    if (zoom) {
      setZoom(null);
      setPan({ x: 0, y: 0 });
      return;
    }
    const r = frameRef.current!.getBoundingClientRect();
    setZoom({ x: ((clientX - r.left) / r.width) * 100, y: ((clientY - r.top) / r.height) * 100 });
  };

  const onDown = (e: React.PointerEvent) => {
    gesture.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y, moved: false };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) g.moved = true;
    if (zoom) setPan({ x: g.panX + dx, y: g.panY + dy });
  };
  const onUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    gesture.current = null;
    if (!g) return;
    const dx = e.clientX - g.x;
    if (!zoom && g.moved && Math.abs(dx) > 50) return onStep(dx < 0 ? 1 : -1);
    if (!g.moved) {
      const now = Date.now();
      if (now - lastTap.current < 320) {
        toggleZoom(e.clientX, e.clientY);
        lastTap.current = 0;
      } else lastTap.current = now;
    }
  };

  return (
    <figure className="lightbox">
      <div
        ref={frameRef}
        className={`lightbox__img ${zoom ? 'is-zoomed' : ''}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => (gesture.current = null)}
      >
        <div
          className="lightbox__zoom"
          style={
            zoom
              ? { transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(2.2)` }
              : undefined
          }
        >
          <Image src={src} alt={alt} fill sizes="100vw" draggable={false} />
        </div>
      </div>
      <figcaption>
        <span>{label}</span>
        <span className="lightbox__hint">{zoom ? 'Double-tap to reset' : 'Swipe · Double-tap to zoom'}</span>
        <span className="lightbox__count">{counter}</span>
      </figcaption>
      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => onStep(-1)} aria-label="Previous image">
        <Icon name="chevronLeft" />
      </button>
      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => onStep(1)} aria-label="Next image">
        <Icon name="chevronRight" />
      </button>
    </figure>
  );
}
