import type { Metadata } from 'next';
import { images } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { About } from '@/components/sections/About';
import { Process } from '@/components/sections/Process';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Zeven-M Projects & Realty transforms visions into premium living and working spaces through Development, Design & PMC, and Contracting.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About Zeven-M"
        title={
          <>
            Building Spaces. <em>Creating Possibilities.</em>
          </>
        }
        lead="Design. Develop. Construct. — end-to-end excellence from the first sketch to the final handover."
        image={images.pageAbout}
        alt="Contemporary residence with timber cladding (placeholder image)"
      />
      <About full />
      <Process />
      <CtaBanner />
    </>
  );
}
