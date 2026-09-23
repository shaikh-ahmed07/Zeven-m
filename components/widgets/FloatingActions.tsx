'use client';

import { usePathname } from 'next/navigation';
import { useUI } from '@/components/providers/UIProvider';
import { Icon } from '@/components/ui/Icon';
import { getProject, site, whatsappLink } from '@/lib/data';

/** Desktop: floating WhatsApp button. Mobile: persistent bottom action bar. */
export function FloatingActions() {
  const { openEnquiry, setChatOpen } = useUI();
  const pathname = usePathname();
  const project = pathname.startsWith('/projects/') ? getProject(pathname.split('/')[2]) : undefined;
  const wa = whatsappLink(
    project ? `Hello Zeven-M, I would like to know more about ${project.name}.` : undefined,
  );

  return (
    <>
      <a className="fab fab--whatsapp" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <Icon name="whatsapp" />
        <span className="fab__tip">Chat on WhatsApp</span>
      </a>

      <nav className="mobile-bar" aria-label="Quick contact">
        <a className="mobile-bar__item" href={wa} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" />
          <span>WhatsApp</span>
        </a>
        <a className="mobile-bar__item" href={site.phoneHref}>
          <Icon name="phone" />
          <span>Call</span>
        </a>
        <button type="button" className="mobile-bar__item" onClick={() => setChatOpen(true)} aria-haspopup="dialog">
          <Icon name="chat" />
          <span>Chat</span>
        </button>
        <button
          type="button"
          className="mobile-bar__cta"
          onClick={() => openEnquiry(project ? { project: project.name } : {})}
          aria-haspopup="dialog"
        >
          Enquire Now <Icon name="arrow" />
        </button>
      </nav>
    </>
  );
}
