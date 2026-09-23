import { nearbyDefault, type Project } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';

function MapPlaceholder({ name }: { name: string }) {
  return (
    <svg className="map-svg" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Location map placeholder for ${name}`}>
      <rect width="800" height="520" className="map-bg" />
      <path className="map-block" d="M40 40h160v110H40zM230 40h130v70H230zM400 30h170v120H400zM610 50h150v90H610zM60 190h120v130H60zM420 200h120v90H420zM590 190h170v140H590zM80 390h110v90H80zM270 400h180v80H270zM500 380h110v100H500zM650 390h120v90H650z" />
      <path className="map-green" d="M230 200h130v110H230z" />
      <path className="map-water" d="M0 350c90-30 170 10 250-20s150-60 260-30 190 20 290-10v40c-100 30-180 40-290 10s-180 0-260 30-160-10-250 20z" />
      <path className="map-road map-road--major" d="M0 170h800M380 0v520M0 480 800 110" />
      <path className="map-road" d="M210 0v520M580 0v520M0 360h800M0 20h800" />
      <circle cx="380" cy="170" r="90" className="map-radius" />
      <g transform="translate(380 170)">
        <circle r="26" className="map-pulse" />
        <circle r="9" className="map-pin" />
      </g>
      <text x="400" y="150" className="map-label">{name.toUpperCase()}</text>
    </svg>
  );
}

export function LocationSection({ project }: { project: Project }) {
  return (
    <section id="location" className="location section" aria-labelledby="location-title">
      <div className="container location__grid">
        <div className="location__map reveal reveal--image">
          <MapPlaceholder name={project.name} />
          <a
            className="location__open"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Hyderabad, Telangana')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps <Icon name="arrowUpRight" />
          </a>
        </div>
        <div className="location__copy">
          <p className="eyebrow reveal">Location</p>
          <h2 id="location-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Connected <em>by Design</em>
          </h2>
          <p className="reveal" style={{ '--d': '140ms' } as React.CSSProperties}>
            <Icon name="pin" /> {project.location}
          </p>
          <ul className="nearby">
            {nearbyDefault.map((n, i) => (
              <li key={n.place} className="reveal" style={{ '--d': `${160 + i * 50}ms` } as React.CSSProperties}>
                <span>{n.place}</span>
                <span className="nearby__line" aria-hidden="true" />
                <span className="nearby__time">{n.time}</span>
              </li>
            ))}
          </ul>
          <p className="placeholder-note">Map and travel times are placeholders.</p>
        </div>
      </div>
    </section>
  );
}
