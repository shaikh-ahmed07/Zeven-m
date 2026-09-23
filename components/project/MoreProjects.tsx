import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArrowLink } from '@/components/ui/Button';

export function MoreProjects({ current }: { current: string }) {
  const others = projects.filter((p) => p.slug !== current).slice(0, 3);
  return (
    <section className="more section" aria-labelledby="more-title">
      <div className="container">
        <div className="more__head">
          <h2 id="more-title" className="display reveal">
            More <em>Projects</em>
          </h2>
          <ArrowLink href="/projects">All Projects</ArrowLink>
        </div>
        <div className="more__grid">
          {others.map((p, i) => (
            <ProjectCard key={p.slug} project={p} compact index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
