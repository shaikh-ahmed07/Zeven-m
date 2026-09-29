import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/lib/data';

/** /about banner: the title rises line by line and a cue points down to the leadership team. */
export function AboutHero() {
  return (
    <section className="page-hero about-hero" aria-labelledby="page-title">
      <div className="page-hero__media hero__drift">
        <Image
          src={images.pageAbout}
          alt="Contemporary residence with timber cladding (placeholder image)"
          fill
          preload
          sizes="100vw"
          className="hero__img"
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__light" aria-hidden="true" />
      <div className="container page-hero__content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>
        <p className="eyebrow eyebrow--light hero__eyebrow">About Zeven-M</p>
        <h1 id="page-title" className="page-hero__title about-hero__title">
          <span className="about-hero__line">
            <span>Building Spaces.</span>
          </span>
          <span className="about-hero__line">
            <em>Creating</em>
          </span>
          <span className="about-hero__line">
            <em>Possibilities.</em>
          </span>
        </h1>
        <p className="page-hero__lead about-hero__lead">
          Design. Develop. Construct. — end-to-end excellence from the first sketch to the final handover.
        </p>
        <a className="about-hero__cue" href="#leadership">
          <span className="about-hero__cue-line" aria-hidden="true" />
          Meet the team
        </a>
      </div>
    </section>
  );
}
