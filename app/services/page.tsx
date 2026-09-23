import type { Metadata } from 'next';
import { images } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { ServiceDetails } from '@/components/sections/ServiceDetails';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Development, Design & PMC, Contracting and Real Estate — from concept to completion, driven by precision.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Our Expertise"
        title={
          <>
            What <em>We Do</em>
          </>
        }
        lead="From concept to completion, every stage is driven by precision."
        image={images.pageServices}
        alt="Project team reviewing a construction site (placeholder image)"
      />
      <ServiceDetails />
      <CtaBanner />
    </>
  );
}
