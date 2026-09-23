import Image from 'next/image';
import Link from 'next/link';
import { featured, images, site } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <div className="hero__drift">
          <Image
          src={images.hero}
          alt="Contemporary glass residential towers against an open sky (placeholder image)"
          fill
          preload
          sizes="100vw"
          className="hero__img"
          />
        </div>
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__light" aria-hidden="true" />

      <div className="hero__content container">
        <p className="eyebrow eyebrow--light hero__eyebrow">{site.name}</p>
        <h1 id="hero-title" className="hero__title">
          <span className="line"><span>From Vision</span></span>
          <span className="line"><span><em>to</em> Creation.</span></span>
        </h1>
        <p className="hero__sub">Excellence in Design, Development &amp; Construction</p>
        <p className="hero__text">
          Creating premium spaces where architecture, craftsmanship and purposeful development come together.
        </p>
        <div className="hero__actions">
          <ButtonLink href="/#projects" variant="light">
            Explore Our Projects
          </ButtonLink>
          <ButtonLink href="/#contact" variant="ghost" icon={null}>
            Enquire Now
          </ButtonLink>
        </div>
      </div>

      <Link href={`/projects/${featured.slug}`} className="hero__feature" aria-label={`Featured: ${featured.name}`}>
        <span className="hero__feature-label">Featured Development</span>
        <span className="hero__feature-name">{featured.name}</span>
        <span className="hero__feature-meta">
          {featured.config} · {featured.status}
        </span>
        <Icon name="arrowUpRight" />
      </Link>

      <a href="#featured" className="hero__scroll" aria-label="Scroll to featured development">
        <span>Scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>

      <p className="hero__supporting" aria-hidden="true">
        {site.supporting}
      </p>
    </section>
  );
}
