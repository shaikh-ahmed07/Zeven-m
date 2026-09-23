'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ButtonLink } from '@/components/ui/Button';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'villas', label: 'Villas' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
] as const;
type FilterKey = (typeof filters)[number]['key'];
const isFilter = (v: string | null): v is FilterKey => filters.some((f) => f.key === v);

const matches = (key: FilterKey) => (p: (typeof projects)[number]) =>
  key === 'all' || p.type === key || p.status.toLowerCase() === key;

/** Keeps the filter in sync with /projects?filter=… (links from the footer, back/forward). */
function FilterFromUrl({ onChange }: { onChange: (k: FilterKey) => void }) {
  const value = useSearchParams().get('filter');
  useEffect(() => onChange(isFilter(value) ? value : 'all'), [value, onChange]);
  return null;
}

type Props = {
  /** `preview` (homepage): first few projects + "View All Projects". `full` (/projects): filterable grid. */
  variant?: 'preview' | 'full';
  limit?: number;
};

export function Projects({ variant = 'full', limit = 4 }: Props) {
  const [active, setActive] = useState<FilterKey>('all');
  const router = useRouter();
  const pathname = usePathname();
  const full = variant === 'full';
  const list = full ? projects.filter(matches(active)) : projects.slice(0, limit);

  const choose = (key: FilterKey) => {
    setActive(key);
    router.replace(key === 'all' ? pathname : `${pathname}?filter=${key}`, { scroll: false });
  };

  return (
    <section id="projects" className="projects section" aria-labelledby="projects-title">
      {full && (
        <Suspense fallback={null}>
          <FilterFromUrl onChange={setActive} />
        </Suspense>
      )}
      <div className="container">
        <div className="projects__head">
          <div>
            <p className="eyebrow reveal">Portfolio</p>
            <h2 id="projects-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
              {full ? 'All Projects' : 'Our Projects'}
            </h2>
            <p className="lead reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
              Spaces designed to become landmarks.
            </p>
          </div>
          {full ? (
            <div className="filters reveal" role="group" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`filters__btn ${active === f.key ? 'is-active' : ''}`}
                  aria-pressed={active === f.key}
                  onClick={() => choose(f.key)}
                >
                  {f.label}
                  <sup>{projects.filter(matches(f.key)).length}</sup>
                </button>
              ))}
            </div>
          ) : (
            <ButtonLink href="/projects" variant="outline" className="reveal">
              View All Projects
            </ButtonLink>
          )}
        </div>

        <div className="projects__grid" key={active} aria-live={full ? 'polite' : undefined}>
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <p className="placeholder-note">All projects shown are demo placeholders for this template.</p>
      </div>
    </section>
  );
}
