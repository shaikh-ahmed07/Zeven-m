import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';

export function ProjectCard({ project, compact = false, index = 0 }: { project: Project; compact?: boolean; index?: number }) {
  return (
    <article className="project-card reveal" style={{ '--d': `${(index % 2) * 120}ms` } as React.CSSProperties}>
      <Link href={`/projects/${project.slug}`} className="project-card__link">
        <div className="project-card__media">
          <Image
            src={project.image}
            alt={`${project.name} — ${project.category} (placeholder image)`}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 640px"
          />
          <span className={`badge badge--${project.status.toLowerCase()}`}>{project.status}</span>
          <span className="project-card__cta" aria-hidden="true">
            View Project <Icon name="arrowUpRight" />
          </span>
        </div>
        <div className="project-card__body">
          <p className="project-card__meta">
            <span>{project.category}</span>
            <span className="project-card__loc">
              <Icon name="pin" />
              {project.location}
            </span>
          </p>
          <h3 className="project-card__title">{project.name}</h3>
          <p className="project-card__config">{project.config}</p>
          {!compact && <p className="project-card__text">{project.summary}</p>}
          <span className="link-arrow project-card__more">
            View Project <Icon name="arrow" />
          </span>
        </div>
      </Link>
    </article>
  );
}
