import Link from 'next/link';
import { site, whatsappLink } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';
import { Logo } from './Logo';

const columns = [
  {
    title: 'Company',
    links: [
      ['About', '/#about'],
      ['Projects', '/#projects'],
      ['Services', '/#services'],
      ['Why Zeven-M', '/#why-zeven'],
      ['Contact', '/#contact'],
    ],
  },
  {
    title: 'Projects',
    links: [
      ['Residential', '/?filter=residential#projects'],
      ['Villas', '/?filter=villas#projects'],
      ['Commercial', '/?filter=commercial#projects'],
      ['Ongoing', '/?filter=ongoing#projects'],
      ['Completed', '/?filter=completed#projects'],
    ],
  },
  {
    title: 'Services',
    links: [
      ['Development', '/#service-development'],
      ['Design & PMC', '/#service-design-pmc'],
      ['Contracting', '/#service-contracting'],
      ['Real Estate', '/#service-real-estate'],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo variant="gold" className="footer__logo" />
            <p className="footer__name">{site.name}</p>
            <p className="footer__tagline">{site.tagline}</p>
          </div>

          <div className="footer__cols">
            {columns.map((col) => (
              <nav key={col.title} className="footer__col" aria-label={col.title}>
                <h2>{col.title}</h2>
                <ul>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="footer__col">
              <h2>Contact</h2>
              <ul>
                <li>
                  <span className="footer__line">
                    <Icon name="pin" /> Hyderabad, India
                  </span>
                </li>
                <li>
                  <a href={site.phoneHref}>
                    <Icon name="phone" /> {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`}>
                    <Icon name="mail" /> {site.email}
                  </a>
                </li>
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <Icon name="whatsapp" /> WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Zeven-M Projects & Realty. All Rights Reserved.</p>
          <p className="footer__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </p>
        </div>
        <p className="footer__disclaimer">
          Template notice: project details, figures, images and contact numbers on this website are placeholders for
          demonstration and do not represent actual offerings.
        </p>
      </div>
    </footer>
  );
}
