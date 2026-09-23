'use client';

import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const go = (d: number) => setIndex((i) => (i + d + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused, index]);

  return (
    <section
      className="testimonials section"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container testimonials__grid">
        <div className="testimonials__head">
          <p className="eyebrow reveal">Client Experience</p>
          <h2 id="testimonials-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Built Around
            <br />
            <em>Our Clients</em>
          </h2>
          <div className="testimonials__nav reveal">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">
              <Icon name="chevronLeft" />
            </button>
            <span className="testimonials__count" aria-hidden="true">
              0{index + 1} <i /> 0{testimonials.length}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial">
              <Icon name="chevronRight" />
            </button>
          </div>
        </div>

        <div
          className="testimonials__stage reveal reveal--x"
          aria-roledescription="carousel"
          aria-live="polite"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => (startX.current = null)}
        >
          <Icon name="quote" className="testimonials__mark" />
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className={`quote ${i === index ? 'is-active' : ''}`}
              aria-hidden={i !== index}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
            >
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <strong>— {t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </figure>
          ))}
          <div className="testimonials__dots" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                className={i === index ? 'is-active' : ''}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <p className="placeholder-note">Placeholder testimonials.</p>
        </div>
      </div>
    </section>
  );
}
