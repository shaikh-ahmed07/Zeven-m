import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Service cards that pin and pile on top of each other while scrolling. */
export function Pillars() {
  return (
    <section className="pillars section" aria-labelledby="pillars-title">
      <div className="container">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <span id="pillars-title">
              One Partner, <em>Every Stage</em>
            </span>
          }
          lead="Four disciplines under one roof — so your project moves from idea to keys without handoffs."
        />
        <ol className="pillars__stack">
          {services.map((s, i) => (
            <li key={s.slug} className="pillar" style={{ '--i': i } as React.CSSProperties}>
              <Link href={`/services#service-${s.slug}`} className="pillar__card">
                <Image src={s.image} alt="" fill sizes="(max-width: 900px) 100vw, 1100px" className="pillar__img" />
                <span className="pillar__shade" aria-hidden="true" />
                <span className="pillar__top">
                  <span className="pillar__icon">
                    <Icon name={s.icon} />
                  </span>
                  <span className="pillar__no">
                    {s.no} <span>/ 0{services.length}</span>
                  </span>
                </span>
                <span className="pillar__body">
                  <h3 className="pillar__title">{s.title}</h3>
                  <span className="pillar__text">{s.text}</span>
                  <span className="pillar__more">
                    Explore <Icon name="arrow" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
