import type { Project } from '@/lib/data';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { EnquireButton } from '@/components/ui/EnquireButton';
import { site } from '@/lib/data';

export function ProjectEnquiry({ project }: { project: Project }) {
  return (
    <section id="enquire" className="penquiry section" aria-labelledby="enquire-title">
      <div className="container penquiry__grid">
        <div>
          <p className="eyebrow reveal">Enquire</p>
          <h2 id="enquire-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Enquire About <em>This Project</em>
          </h2>
          <p className="lead reveal" style={{ '--d': '140ms' } as React.CSSProperties}>
            Request a callback for pricing, availability and floor plans of {project.name}, or plan a visit to experience
            it in person.
          </p>
          <div className="penquiry__visit reveal" style={{ '--d': '200ms' } as React.CSSProperties}>
            <h3>Schedule a Site Visit</h3>
            <p>Our team will arrange a guided visit at a time that suits you.</p>
            <EnquireButton variant="outline" icon="calendar" project={project.name} interest="Site Visit" title="Schedule a Site Visit">
              Book a Visit
            </EnquireButton>
          </div>
          <p className="penquiry__call reveal">
            Or call us on <a href={site.phoneHref}>{site.phoneDisplay}</a>
          </p>
        </div>
        <div className="penquiry__form reveal" style={{ '--d': '120ms' } as React.CSSProperties}>
          <EnquiryForm
            configurations={project.residences.map((r) => r.type)}
            project={project.name}
            submitLabel="Request a Callback"
            compactLabels
          />
        </div>
      </div>
    </section>
  );
}
