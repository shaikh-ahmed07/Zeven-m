'use client';

import { useEffect, useRef } from 'react';
import { onScrollFrame, prefersReducedMotion } from '@/lib/scroll';

/**
 * Paragraph whose words light up one after another as it scrolls through the viewport.
 * Wrap a phrase in *asterisks* to render it as gold italic.
 */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1');
      return;
    }
    return onScrollFrame(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the top reaches 85% of the screen, finishes when the bottom reaches 55%.
      const p = (vh * 0.85 - rect.top) / (rect.height + vh * 0.3);
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(3));
    });
  }, []);

  let i = 0;
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  const words = parts.flatMap((part) => {
    const accent = part.startsWith('*');
    return part
      .replace(/\*/g, '')
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, accent, i: i++ }));
  });

  return (
    <p ref={ref} className={`scroll-words ${className}`} style={{ '--n': words.length } as React.CSSProperties}>
      {words.map(({ w, accent, i }) => (
        <span key={i} className={accent ? 'scroll-words__w is-accent' : 'scroll-words__w'} style={{ '--i': i } as React.CSSProperties}>
          {w}{' '}
        </span>
      ))}
    </p>
  );
}
