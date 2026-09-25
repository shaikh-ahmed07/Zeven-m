import Image from 'next/image';
import Link from 'next/link';
import { hiddenSections, projectAlt, typeLabels, type Project } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { EnquireButton } from '@/components/ui/EnquireButton';
import { DownloadButton } from '@/components/ui/Button';
import { SubNav } from './SubNav';

export function ProjectHero({ project }: { project: Project }) {
  return (
    <>
      <section className="phero" aria-labelledby="project-title">
        <div className="phero__media hero__drift">
          <Image src={project.heroImage} alt={projectAlt(project, 'exterior')} fill preload sizes="100vw" className="hero__img" />
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__light" aria-hidden="true" />
        <div className="container phero__content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/projects">Projects</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.name}</span>
          </nav>
          <div className="phero__tags">
            <span className={`badge badge--${project.status.toLowerCase()} badge--static`}>{project.status}</span>
            <span className="phero__type">{typeLabels[project.type]}</span>
          </div>
          <h1 id="project-title" className="phero__title">
            {project.name}
          </h1>
          <p className="phero__category">
            {project.category} · {project.config}
          </p>
          <p className="phero__loc">
            <Icon name="pin" /> {project.location}
          </p>
          <div className="hero__actions">
            <EnquireButton variant="light" project={project.name} title="Request a Callback">
              Request a Callback
            </EnquireButton>
            <EnquireButton variant="ghost" icon="calendar" project={project.name} interest="Site Visit" title="Schedule a Site Visit">
              Schedule a Site Visit
            </EnquireButton>
            {project.brochure && (
              <DownloadButton href={project.brochure.href} variant="ghost">
                {project.brochure.label}
              </DownloadButton>
            )}
          </div>
        </div>
      </section>

      <div className="specs">
        <dl className="container specs__list">
          {project.specs.map(([k, v]) => (
            <div key={k} className="specs__item">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <SubNav name={project.name} hidden={hiddenSections(project)} />
    </>
  );
}
