const words = ['Development', 'Design & PMC', 'Contracting', 'Real Estate', 'Vision to Handover'];

function Row() {
  return (
    <>
      {words.map((w) => (
        <span key={w} className="marquee__item">
          {w}
          <span className="marquee__star" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </>
  );
}

/** Endless ribbon of what Zeven-M does. The second copy exists only to close the loop. */
export function Marquee() {
  return (
    <section className="marquee" aria-label="What we do">
      <div className="marquee__track">
        <div className="marquee__group">
          <Row />
        </div>
        <div className="marquee__group" aria-hidden="true">
          <Row />
        </div>
      </div>
    </section>
  );
}
