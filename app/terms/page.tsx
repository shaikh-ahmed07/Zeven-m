import type { Metadata } from 'next';
import { ArrowLink } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Terms & Conditions' };

export default function Page() {
  return (
    <section className="legal section">
      <div className="container legal__inner">
        <p className="eyebrow">Legal</p>
        <h1 className="display">Terms & Conditions</h1>
        <p className="lead">
          This is placeholder content for the website template. Replace it with the company&rsquo;s approved
          terms and conditions of use for this website.
        </p>
        <ArrowLink href="/">Back to Home</ArrowLink>
      </div>
    </section>
  );
}
