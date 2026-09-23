import Image from 'next/image';
import { projectAlt, type Project } from '@/lib/data';
import { DownloadButton } from '@/components/ui/Button';

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
          {project.developer && <p className="poverview__developer reveal">{project.developer}</p>}
          {project.brochure && (
            <div className="poverview__actions reveal">
              <DownloadButton href={project.brochure.href}>{project.brochure.label}</DownloadButton>
              <span className="poverview__size">{project.brochure.size}</span>
            </div>
          )}
          {project.placeholder !== false && (
            <p className="placeholder-note">Project details are placeholder content. RERA and approval details to be added.</p>
          )}
        </div>
        <div className="poverview__media reveal reveal--image reveal--side-r">
          <Image src={project.overviewImage} alt={projectAlt(project, 'overview')} fill sizes="(max-width: 900px) 100vw, 45vw" data-parallax="0.05" className="parallax-img" />
        </div>
      </div>
    </section>
  );
}
