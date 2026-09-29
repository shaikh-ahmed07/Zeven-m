import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { Leadership } from '@/components/sections/Leadership';
import { Marquee } from '@/components/about/Marquee';
import { AboutStory } from '@/components/about/AboutStory';
import { Stats } from '@/components/sections/Stats';
import { Pillars } from '@/components/about/Pillars';
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
      <AboutHero />
      <Leadership />
      <Marquee />
      <AboutStory />
      <Stats />
      <Pillars />
      <Process />
      <CtaBanner />
    </>
  );
}
