import Image from 'next/image';
import { featured } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';
import { EnquireButton } from '@/components/ui/EnquireButton';

/* PLACEHOLDER headline figures for the featured development */
const figures = [
  { value: '3.5', unit: 'Acres', label: 'Project Area' },
  { value: '3', unit: 'Towers', label: 'Development' },
  { value: '2 & 3', unit: 'BHK', label: 'Residences' },
  { value: '300+', unit: '', label: 'Premium Homes' },
  { value: '25+', unit: '', label: 'Lifestyle Amenities' },
];

export function FeaturedProject() {
  return (
    <section id="featured" className="featured section" aria-labelledby="featured-title">
      <div className="container featured__grid">
        <div className="featured__copy">
          <p className="eyebrow reveal">Featured Development</p>
          <h2 id="featured-title" className="featured__title reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Zeven-M
            <br />
            Residences
          </h2>
          <p className="featured__config reveal" style={{ '--d': '140ms' } as React.CSSProperties}>
            Premium 2 &amp; 3 BHK Residences
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
              alt="Zeven-M Residences — contemporary apartment facade (placeholder image)"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
              data-parallax="0.06"
              className="parallax-img"
            />
          </div>
          <span className="featured__badge">{featured.status}</span>
        </div>
      </div>

      <div className="container">
        <dl className="figures reveal reveal--lines">
          {figures.map((f, i) => (
            <div key={f.label} className="figures__item reveal" style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
              <dt>{f.label}</dt>
              <dd>
                {f.value}
                {f.unit && <span> {f.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
        <p className="placeholder-note">Figures shown are indicative placeholders for this template.</p>
      </div>
    </section>
  );
}
