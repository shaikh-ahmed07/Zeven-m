import { stats } from '@/lib/data';
import { Counter } from '@/components/ui/Counter';

export function Stats() {
  return (
    <section className="stats" aria-label="Zeven-M at a glance">
      <div className="container">
        <ul className="stats__list reveal reveal--lines">
          {stats.map((s, i) => (
            <li key={s.label} className="stats__item reveal" style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <span className="stats__value">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="stats__label">{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="placeholder-note placeholder-note--dark">Statistics are placeholder values for demonstration.</p>
      </div>
    </section>
  );
}
