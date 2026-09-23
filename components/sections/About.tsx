import Image from 'next/image';
import { images } from '@/lib/data';
import { ArrowLink } from '@/components/ui/Button';

/** `full` (the /about page) adds the second paragraph and pillars; the homepage shows the teaser. */
export function About({ full = false }: { full?: boolean }) {
  return (
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__media">
          <div className="about__main reveal reveal--image reveal--side">
            <Image
              src={images.about}
              alt="Modern residence with timber and glass facade at dusk (placeholder image)"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              data-parallax="0.05"
              className="parallax-img"
            />
          </div>
          <div className="about__inset reveal reveal--image" style={{ '--d': '200ms' } as React.CSSProperties}>
            <Image src={images.aboutInset} alt="Landscaped garden of a contemporary home (placeholder image)" fill sizes="(max-width: 900px) 45vw, 22vw" />
          </div>
          <p className="about__caption" aria-hidden="true">
            Design · Develop · Construct
          </p>
        </div>

        <div className="about__copy">
          <p className="eyebrow reveal">Who We Are</p>
          <h2 id="about-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Building Spaces.
            <br />
            <em>Creating Possibilities.</em>
          </h2>
          <p className="about__lead reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
            Zeven-M Projects &amp; Realty transforms visions into premium living and working spaces through end-to-end
            excellence in Development, Design &amp; PMC, and Contracting.
          </p>
          {full && (
            <>
              <p className="reveal" style={{ '--d': '220ms' } as React.CSSProperties}>
                From luxury homes and signature villas to modern commercial spaces, we bring together thoughtful design,
                disciplined execution and uncompromising attention to detail to create developments built around the way
                people live, work and grow.
              </p>
              <ul className="about__pillars reveal" style={{ '--d': '280ms' } as React.CSSProperties}>
                <li>Development</li>
                <li>Design &amp; PMC</li>
                <li>Contracting</li>
              </ul>
            </>
          )}
          {full ? (
            <ArrowLink href="/why-zeven" className="reveal">
              Why Zeven-M
            </ArrowLink>
          ) : (
            <ArrowLink href="/about" className="about__more reveal">
              Discover Zeven-M
            </ArrowLink>
          )}
        </div>
      </div>
    </section>
  );
}
