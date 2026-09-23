'use client';

import { useEffect, useRef, useState } from 'react';
import { onScrollFrame } from '@/lib/scroll';

const allSections = [
  ['Overview', 'overview'],
  ['Residences', 'residences'],
  ['Amenities', 'amenities'],
  ['Gallery', 'gallery'],
  ['Specs', 'specifications'],
  ['Location', 'location'],
  ['Enquire', 'enquire'],
] as const;

/** Sticky in-page navigation for project details, with the current section highlighted. */
export function SubNav({ name, hasSpecs = false }: { name: string; hasSpecs?: boolean }) {
  const sections = allSections.filter(([, id]) => id !== 'specifications' || hasSpecs);
  const [active, setActive] = useState<string>('');
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(
    () =>
      onScrollFrame(() => {
        if (document.documentElement.classList.contains('is-locked')) return;
        const line = window.innerHeight * 0.35;
        let current = '';
        let best = -Infinity;
        for (const [, id] of sections) {
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          if (top !== undefined && top <= line && top > best) {
            best = top;
            current = id;
          }
        }
        setActive(current);
      }),
    [],
  );

  // Keep the active tab visible in the horizontally scrolling list (phones).
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (!list || !link) return;
    const left = link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2;
    list.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  return (
    <nav className="subnav" aria-label="Project sections">
      <div className="container subnav__inner">
        <span className="subnav__name">{name}</span>
        <ul ref={listRef}>
          {sections.map(([label, id]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'is-active' : undefined} aria-current={active === id ? 'location' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
