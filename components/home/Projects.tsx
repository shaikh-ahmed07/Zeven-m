'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { FILTER_EVENT } from '@/components/providers/UIProvider';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'villas', label: 'Villas' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
] as const;
type FilterKey = (typeof filters)[number]['key'];

const matches = (key: FilterKey) => (p: (typeof projects)[number]) =>
  key === 'all' || p.type === key || p.status.toLowerCase() === key;

/** Syncs the filter with ?filter= links (e.g. from the footer). */
function FilterFromUrl({ onChange }: { onChange: (k: FilterKey) => void }) {
  const params = useSearchParams();
  const value = params.get('filter');
  useEffect(() => {
    if (value && filters.some((f) => f.key === value)) onChange(value as FilterKey);
  }, [value, onChange]);
  return null;
}

export function Projects() {
  const [active, setActive] = useState<FilterKey>('all');
  const list = projects.filter(matches(active));

  // Footer links such as "/?filter=villas#projects" switch the filter in place.
  useEffect(() => {
    const onFilter = (e: Event) => {
      const key = (e as CustomEvent<string>).detail;
      if (filters.some((f) => f.key === key)) setActive(key as FilterKey);
    };
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  return (
    <section id="projects" className="projects section" aria-labelledby="projects-title">
      <Suspense fallback={null}>
        <FilterFromUrl onChange={setActive} />
      </Suspense>
      <div className="container">
        <div className="projects__head">
          <div>
            <p className="eyebrow reveal">Portfolio</p>
            <h2 id="projects-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
              Our Projects
            </h2>
            <p className="lead reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
              Spaces designed to become landmarks.
            </p>
          </div>
          <div className="filters reveal" role="group" aria-label="Filter projects">
            {filters.map((f) => {
              const count = projects.filter(matches(f.key)).length;
              return (
                <button
                  key={f.key}
                  type="button"
                  className={`filters__btn ${active === f.key ? 'is-active' : ''}`}
                  aria-pressed={active === f.key}
                  onClick={() => setActive(f.key)}
                >
                  {f.label}
                  <sup>{count}</sup>
                </button>
              );
            })}
          </div>
        </div>

        <div className="projects__grid" key={active} aria-live="polite">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <p className="placeholder-note">All projects shown are demo placeholders for this template.</p>
      </div>
    </section>
  );
}
