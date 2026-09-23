import type { Metadata } from 'next';
import { images } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { WhyZevenM } from '@/components/sections/WhyZevenM';
import { Craftsmanship } from '@/components/sections/Craftsmanship';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Why Zeven-M',
  description: 'Built on precision, driven by purpose — quality, enduring design, transparent execution and a client-centric approach.',
};

export default function WhyPage() {
  return (
    <>
      <PageHero
        crumb="Why Zeven-M"
        eyebrow="Why Zeven-M"
        title={
          <>
            Built on Precision. <em>Driven by Purpose.</em>
          </>
        }
        lead="We don’t simply construct buildings. We create spaces with vision, precision and purpose."
        image={images.pageWhy}
        alt="Contemporary villa with a swimming pool (placeholder image)"
      />
      <WhyZevenM />
      <Craftsmanship />
      <CtaBanner />
    </>
  );
}
