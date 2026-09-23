import type { Metadata } from 'next';
import { ArrowLink } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function Page() {
  return (
    <section className="legal section">
      <div className="container legal__inner">
        <p className="eyebrow">Legal</p>
        <h1 className="display">Privacy Policy</h1>
        <p className="lead">
          This is placeholder content for the website template. Replace it with the company&rsquo;s approved
          privacy policy, covering how enquiry data is collected, stored and used.
        </p>
        <ArrowLink href="/">Back to Home</ArrowLink>
      </div>
    </section>
  );
}
