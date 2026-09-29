import Image from 'next/image';
import { images } from '@/lib/data';
import { ArrowLink } from '@/components/ui/Button';
import { ScrollWords } from './ScrollWords';

export function AboutStory() {
  return (
    <section id="about" className="story section" aria-labelledby="story-title">
      <div className="container">
        <p className="eyebrow reveal">Who We Are</p>
        <h2 id="story-title" className="sr-only">
          Who We Are
        </h2>
        <ScrollWords
          className="story__statement"
          text="Zeven-M Projects & Realty transforms visions into *premium living and working spaces* through end-to-end excellence in Development, Design & PMC, and Contracting."
        />

        <div className="story__grid">
          <div className="story__media">
            <div className="story__main reveal reveal--image reveal--side">
              <Image
                src={images.about}
                alt="Modern residence with timber and glass facade at dusk (placeholder image)"
                fill
                sizes="(max-width: 900px) 90vw, 50vw"
                data-parallax="0.06"
                className="parallax-img"
              />
            </div>
            <div className="story__inset reveal reveal--image" style={{ '--d': '220ms' } as React.CSSProperties}>
              <Image src={images.aboutInset} alt="Landscaped garden of a contemporary home (placeholder image)" fill sizes="(max-width: 900px) 50vw, 22vw" />
            </div>
            <span className="story__badge reveal" style={{ '--d': '420ms' } as React.CSSProperties} aria-hidden="true">
              <svg viewBox="0 0 120 120" className="story__badge-text">
                <defs>
                  <path id="story-badge-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text>
                  <textPath href="#story-badge-path" textLength="272" lengthAdjust="spacing">DESIGN · DEVELOP · CONSTRUCT · </textPath>
                </text>
              </svg>
              <span className="story__badge-mark">Z</span>
            </span>
          </div>

          <div className="story__copy">
            <p className="reveal">
              From luxury homes and signature villas to modern commercial spaces, we bring together thoughtful design,
              disciplined execution and uncompromising attention to detail to create developments built around the way
              people live, work and grow.
            </p>
            <ul className="story__pillars">
              {['Development', 'Design & PMC', 'Contracting'].map((p, i) => (
                <li key={p} className="reveal" style={{ '--d': `${120 + i * 110}ms` } as React.CSSProperties}>
                  <span className="story__pillar-no">0{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
            <ArrowLink href="/why-zeven" className="reveal">
              Why Zeven-M
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
