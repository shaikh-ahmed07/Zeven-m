import type { Metadata } from 'next';
import { images } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { Projects } from '@/components/sections/Projects';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Residential, villa and commercial developments by Zeven-M Projects & Realty.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Portfolio"
        title={
          <>
            Our <em>Projects</em>
          </>
        }
        lead="Spaces designed to become landmarks."
        image={images.pageProjects}
        alt="Modern apartment building facade with balconies (placeholder image)"
      />
      <Projects variant="full" />
      <CtaBanner />
    </>
  );
}
