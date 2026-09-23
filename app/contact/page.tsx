import type { Metadata } from 'next';
import { images } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to Zeven-M Projects & Realty about a new home, a site visit, a development or a construction partnership.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        crumb="Contact"
        eyebrow="Contact"
        title={
          <>
            Have a Vision? <em>Let’s Build It.</em>
          </>
        }
        lead="Call, WhatsApp or send an enquiry — a Zeven-M advisor will get back to you."
        image={images.pageContact}
        alt="Modern home with landscaped garden (placeholder image)"
      />
      <Contact />
    </>
  );
}
