import { ArrowLink } from '@/components/ui/Button';
import { principles } from '@/lib/data';

export function WhyZevenM() {
  return (
    <section id="why-zeven" className="why section" aria-labelledby="why-title">
      <div className="container why__grid">
        <div className="why__intro">
          <p className="eyebrow eyebrow--light reveal">Why Zeven-M</p>
          <h2 id="why-title" className="display display--light reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Built on Precision.
            <br />
            <em>Driven by Purpose.</em>
          </h2>
          <p className="why__quote reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
            We don’t simply construct buildings. We create spaces with vision, precision and purpose.
          </p>
          <ArrowLink href="/about#process" className="link-arrow--light why__link reveal">
            See How We Work
          </ArrowLink>
        </div>
        <ol className="why__list">
          {principles.map((p, i) => (
            <li key={p.title} className="why__item reveal" style={{ '--d': `${i * 110}ms` } as React.CSSProperties}>
              <span className="why__no" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
