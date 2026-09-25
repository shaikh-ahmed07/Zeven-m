import { amenityCatalogue, type Project } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';

export function Amenities({ project }: { project: Project }) {
  if (!project.amenities.length) return null;
  return (
    <section id="amenities" className="amenities section" aria-labelledby="amenities-title">
      <div className="container">
        <div className="amenities__head">
          <p className="eyebrow eyebrow--light reveal">Amenities</p>
          <h2 id="amenities-title" className="display display--light reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            A Life, <em>Well Appointed</em>
          </h2>
        </div>
        <ul className="amenities__grid">
          {project.amenities.map((key, i) => {
            const a = amenityCatalogue[key];
            return (
              <li key={key} className="amenity reveal" style={{ '--d': `${(i % 5) * 70}ms` } as React.CSSProperties}>
                <Icon name={a.icon} className="amenity__icon" />
                <span>{a.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
