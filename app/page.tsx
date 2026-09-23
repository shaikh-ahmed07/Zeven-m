import { Hero } from '@/components/home/Hero';
import { FeaturedProject } from '@/components/home/FeaturedProject';
import { About } from '@/components/home/About';
import { Stats } from '@/components/home/Stats';
import { Services } from '@/components/home/Services';
import { Projects } from '@/components/home/Projects';
import { WhyZevenM } from '@/components/home/WhyZevenM';
import { Process } from '@/components/home/Process';
import { Craftsmanship } from '@/components/home/Craftsmanship';
import { Testimonials } from '@/components/home/Testimonials';
import { CtaBanner } from '@/components/home/CtaBanner';
import { Contact } from '@/components/home/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProject />
      <About />
      <Stats />
      <Services />
      <Projects />
      <WhyZevenM />
      <Process />
      <Craftsmanship />
      <Testimonials />
      <CtaBanner />
      <Contact />
    </>
  );
}
