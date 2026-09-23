import Image from 'next/image';
import { images } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';

export function CtaBanner() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__media">
        <Image
          src={images.cta}
          alt="Modern building facade illuminated at dusk (placeholder image)"
          fill
          sizes="100vw"
          data-parallax="0.1"
          className="parallax-img"
        />
      </div>
      <div className="cta__shade" aria-hidden="true" />
      <div className="container cta__inner">
        <h2 id="cta-title" className="cta__title reveal">
          Have a Vision?
          <br />
          <em>Let’s Build It.</em>
        </h2>
        <p className="reveal" style={{ '--d': '120ms' } as React.CSSProperties}>
          Whether you’re looking for your next home, planning a development or seeking a reliable construction partner,
          Zeven-M Projects &amp; Realty is ready to bring your vision to life.
        </p>
        <div className="cta__actions reveal" style={{ '--d': '200ms' } as React.CSSProperties}>
          <ButtonLink href="/#contact" variant="gold">
            Start a Conversation
          </ButtonLink>
          <ButtonLink href="/#projects" variant="ghost" icon={null}>
            Explore Projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
