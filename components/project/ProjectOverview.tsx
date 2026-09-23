import Image from 'next/image';
import type { Project } from '@/lib/data';

export function ProjectOverview({ project }: { project: Project }) {
  const [first, ...rest] = project.overview;
  return (
    <section id="overview" className="poverview section" aria-labelledby="overview-title">
      <div className="container poverview__grid">
        <div className="poverview__copy">
          <p className="eyebrow reveal">Overview</p>
          <h2 id="overview-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            {project.category.split(' ').slice(0, -1).join(' ')} <em>{project.category.split(' ').slice(-1)}</em>
          </h2>
          <p className="poverview__lead reveal" style={{ '--d': '140ms' } as React.CSSProperties}>
            {first}
          </p>
          {rest.map((para) => (
            <p key={para.slice(0, 20)} className="reveal" style={{ '--d': '200ms' } as React.CSSProperties}>
              {para}
            </p>
          ))}
          <p className="placeholder-note">Project details are placeholder content. RERA and approval details to be added.</p>
        </div>
        <div className="poverview__media reveal reveal--image">
          <Image src={project.overviewImage} alt={`${project.name} interior (placeholder image)`} fill sizes="(max-width: 900px) 100vw, 45vw" data-parallax="0.05" className="parallax-img" />
        </div>
      </div>
    </section>
  );
}
