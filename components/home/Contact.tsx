import { site, whatsappLink } from '@/lib/data';
import { ContactForm } from './ContactForm';
import { Icon } from '@/components/ui/Icon';

export function Contact() {
  const items = [
    { icon: 'pin' as const, label: 'Office', value: site.office },
    { icon: 'phone' as const, label: 'Phone', value: site.phoneDisplay, href: site.phoneHref },
    { icon: 'mail' as const, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: 'whatsapp' as const, label: 'WhatsApp', value: 'Chat with our team', href: whatsappLink(), external: true },
  ];
  return (
    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow reveal">Contact</p>
          <h2 id="contact-title" className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            Let’s Build Something <em>Remarkable.</em>
          </h2>
          <p className="lead reveal" style={{ '--d': '140ms' } as React.CSSProperties}>
            Tell us what you’re planning — a new home, a site visit, a development or a construction partnership.
          </p>
          <ul className="contact__list">
            {items.map((it, i) => (
              <li key={it.label} className="reveal" style={{ '--d': `${200 + i * 70}ms` } as React.CSSProperties}>
                <span className="contact__icon">
                  <Icon name={it.icon} />
                </span>
                <div>
                  <span className="contact__label">{it.label}</span>
                  {it.href ? (
                    <a href={it.href} {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {it.value}
                    </a>
                  ) : (
                    <span>{it.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact__form reveal" style={{ '--d': '120ms' } as React.CSSProperties}>
          <h3 className="contact__form-title">Request a Callback</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
