import Image from 'next/image';
import { images } from '@/lib/data';
import { ArrowLink } from '@/components/ui/Button';

export function Craftsmanship() {
  return (
    <section className="craft" aria-labelledby="craft-title">
      <div className="craft__media">
        <Image
          src={images.craft}
          alt="Architect reviewing construction drawings on site (placeholder image)"
          fill
          sizes="100vw"
          data-parallax="0.12"
          className="parallax-img"
        />
      </div>
      <div className="craft__shade" aria-hidden="true" />
      <div className="container craft__inner">
        <div className="craft__copy">
          <p className="eyebrow eyebrow--light reveal">Quality &amp; Craftsmanship</p>
          <h2 id="craft-title" className="craft__title reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Every Detail
            <br />
            Matters.
          </h2>
          <p className="reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
            From the foundation beneath your feet to the details you see every day, Zeven-M is committed to precision,
            craftsmanship and lasting quality.
          </p>
          <ArrowLink href="/#process" className="link-arrow--light reveal">
            Our Approach
          </ArrowLink>
        </div>
        <ul className="craft__details">
          {images.craftDetails.map((d, i) => (
            <li key={d.label} className="reveal reveal--image" style={{ '--d': `${200 + i * 120}ms` } as React.CSSProperties}>
              <Image src={d.src} alt={`${d.label} — construction detail (placeholder image)`} fill sizes="(max-width: 760px) 33vw, 200px" />
              <span>{d.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
