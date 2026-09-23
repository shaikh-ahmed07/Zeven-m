import { Hero } from '@/components/sections/Hero';
import { FeaturedProject } from '@/components/sections/FeaturedProject';
import { About } from '@/components/sections/About';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProject />
      <About />
      <Stats />
      <Services />
      <Projects variant="preview" />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
