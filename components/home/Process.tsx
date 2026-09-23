import { processSteps } from '@/lib/data';

export function Process() {
  return (
    <section id="process" className="process section" aria-labelledby="process-title">
      <div className="container">
        <div className="process__head">
          <p className="eyebrow reveal">Our Process</p>
          <h2 id="process-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            From Vision <em>to Creation</em>
          </h2>
        </div>
        <ol className="timeline" data-timeline>
          {processSteps.map((s, i) => (
            <li key={s.title} className="timeline__step" style={{ '--i': i } as React.CSSProperties}>
              <span className="timeline__dot" aria-hidden="true" />
              <span className="timeline__no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
