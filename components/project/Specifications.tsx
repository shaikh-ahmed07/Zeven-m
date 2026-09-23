import type { Project } from '@/lib/data';
import { DownloadButton } from '@/components/ui/Button';

/** Full construction specifications, shown for projects that provide them. */
export function Specifications({ project }: { project: Project }) {
  if (!project.specifications) return null;
  return (
    <section id="specifications" className="specifications section" aria-labelledby="specifications-title">
      <div className="container">
        <div className="specifications__head">
          <div>
            <p className="eyebrow reveal">Specifications</p>
            <h2 id="specifications-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
              Built to <em>Last</em>
            </h2>
          </div>
          {project.brochure && (
            <DownloadButton href={project.brochure.href} className="reveal">
              {project.brochure.label}
            </DownloadButton>
          )}
        </div>
        <div className="specifications__grid">
          {project.specifications.map((g, i) => (
            <div key={g.group} className="spec-group reveal" style={{ '--d': `${(i % 3) * 90}ms` } as React.CSSProperties}>
              <h3 className="spec-group__title">{g.group}</h3>
              <dl>
                {g.items.map(([label, value]) => (
                  <div key={label} className="spec-group__row">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        {project.disclaimer && <p className="specifications__disclaimer">{project.disclaimer}</p>}
      </div>
    </section>
  );
}
