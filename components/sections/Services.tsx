import Link from 'next/link';
import { services } from '@/lib/data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/** Homepage overview — each card opens its full description on /services. */
export function Services() {
  return (
    <section id="services" className="services section" aria-labelledby="services-title">
      <div className="container">
        <div className="services__head">
          <SectionHeading eyebrow="Our Expertise" title={<span id="services-title">What We Do</span>} />
          <p className="services__lead reveal">From concept to completion, every stage is driven by precision.</p>
        </div>
        <div className="services__grid">
          {services.map((s, i) => (
            <article key={s.slug} className="service-card reveal" style={{ '--d': `${i * 110}ms` } as React.CSSProperties}>
              <div className="service-card__top">
                <span className="service-card__no">{s.no}</span>
                <Icon name={s.icon} className="service-card__icon" />
              </div>
              <h3 className="service-card__title">
                {/* Stretched link: the whole card is the tap target. */}
                <Link href={`/services#service-${s.slug}`} className="service-card__btn">
                  {s.title}
                </Link>
              </h3>
              <p className="service-card__text">{s.text}</p>
              <span className="service-card__more" aria-hidden="true">
                View Details <Icon name="arrow" />
              </span>
            </article>
          ))}
        </div>
        <div className="services__foot reveal">
          <ArrowLink href="/services">Explore All Services</ArrowLink>
        </div>
      </div>
    </section>
  );
}
