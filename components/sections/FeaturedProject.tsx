import Image from 'next/image';
import { featured } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';
import { EnquireButton } from '@/components/ui/EnquireButton';

/** Homepage feature for the development set as `featured` in lib/data.ts. */
export function FeaturedProject() {
  const [brand, ...rest] = featured.name.split(' ');
  return (
    <section id="featured" className="featured section" aria-labelledby="featured-title">
      <div className="container featured__grid">
        <div className="featured__copy">
          <p className="eyebrow reveal">Featured Development</p>
          <h2 id="featured-title" className="featured__title reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            {brand}
            <br />
            {rest.join(' ')}
          </h2>
          <p className="featured__config reveal" style={{ '--d': '140ms' } as React.CSSProperties}>
            {featured.config} · {featured.location}
          </p>
          <p className="featured__text reveal" style={{ '--d': '200ms' } as React.CSSProperties}>
            {featured.summary}
          </p>
          <div className="featured__actions reveal" style={{ '--d': '260ms' } as React.CSSProperties}>
            <ButtonLink href={`/projects/${featured.slug}`} variant="dark">
              View Project
            </ButtonLink>
            <EnquireButton variant="outline" icon="calendar" project={featured.name} interest="Site Visit" title="Schedule a Site Visit">
              Site Visit
            </EnquireButton>
          </div>
        </div>

        <div className="featured__media reveal reveal--image reveal--side-r">
          <div className="featured__frame">
            <Image
              src={featured.image}
              alt={`${featured.name} — exterior render`}
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
              data-parallax="0.06"
              className="parallax-img"
            />
          </div>
          <span className="featured__badge">{featured.status}</span>
        </div>
      </div>

      {featured.highlights && (
        <div className="container">
          <dl className="figures reveal reveal--lines">
            {featured.highlights.map((f) => (
              <div key={f.label} className="figures__item">
                <dt>{f.label}</dt>
                <dd>
                  {f.value}
                  {f.unit && <span> {f.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
