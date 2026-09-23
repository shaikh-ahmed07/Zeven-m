import Image from 'next/image';
import { services } from '@/lib/data';
import { ArrowLink, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/** /services — one full section per service, addressable as /services#service-<slug>. */
export function ServiceDetails() {
  return (
    <section className="service-details section" aria-label="Our services">
      <div className="container">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={`service-${s.slug}`}
            className={`service-detail ${i % 2 ? 'service-detail--flip' : ''}`}
            aria-labelledby={`service-${s.slug}-title`}
          >
            <div className="service-detail__media reveal reveal--image">
              <Image src={s.image} alt={`${s.title} (placeholder image)`} fill sizes="(max-width: 900px) 100vw, 46vw" />
            </div>
            <div className="service-detail__copy">
              <div className="service-detail__top reveal">
                <span className="service-card__no">{s.no}</span>
                <Icon name={s.icon} className="service-detail__icon" />
              </div>
              <h2 id={`service-${s.slug}-title`} className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
                {s.title}
              </h2>
              <p className="service-detail__text reveal" style={{ '--d': '140ms' } as React.CSSProperties}>
                {s.text}
              </p>
              <h3 className="service-detail__label reveal">Scope of Work</h3>
              <ul className="scope-list reveal reveal--lines">
                {s.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="service-detail__actions reveal">
                <ButtonLink href={`/contact?interest=${encodeURIComponent(s.interest)}`} variant="dark">
                  Enquire About {s.title}
                </ButtonLink>
                <ArrowLink href="/projects">View Our Projects</ArrowLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
