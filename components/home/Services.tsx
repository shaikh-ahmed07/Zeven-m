import { services } from '@/lib/data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServicesGrid } from './ServicesGrid';

export function Services() {
  return (
    <section id="services" className="services section" aria-labelledby="services-title">
      <div className="container">
        <div className="services__head">
          <SectionHeading eyebrow="Our Expertise" title={<span id="services-title">What We Do</span>} />
          <p className="services__lead reveal">From concept to completion, every stage is driven by precision.</p>
        </div>
        <ServicesGrid services={services} />
      </div>
    </section>
  );
}
