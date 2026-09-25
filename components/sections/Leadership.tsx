import Image from 'next/image';
import { leadership } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

const initials = (name: string) => {
  const words = name.split(' ').filter((w) => !w.endsWith('.'));
  return `${words[0][0]}${words[words.length - 1][0]}`;
};

export function Leadership() {
  return (
    <section id="leadership" className="leadership section" aria-labelledby="leadership-title">
      <div className="container">
        <SectionHeading
          eyebrow="Leadership"
          title={
            <span id="leadership-title">
              The People Behind <em>Zeven-M Projects &amp; Realty</em>
            </span>
          }
          className="leadership__head"
          lead="Spaces for a better tomorrow — guided by leaders who see every project through from vision to handover."
        />
        <ul className="leadership__grid">
          {leadership.map((l, i) => (
            <li key={l.name} className="leader reveal" style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
              <div className="leader__photo">
                {l.photo ? (
                  <Image src={l.photo} alt={`${l.name}, ${l.role}`} fill sizes="(max-width: 760px) 100vw, 40vw" />
                ) : (
                  <span className="leader__initials" aria-hidden="true">
                    {initials(l.name)}
                  </span>
                )}
              </div>
              <div className="leader__body">
                <h3 className="leader__name">{l.name}</h3>
                <p className="leader__role">{l.role}</p>
                {l.credential && <p className="leader__credential">{l.credential}</p>}
                <a className="leader__phone" href={l.phoneHref}>
                  <Icon name="phone" /> {l.phoneDisplay}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
