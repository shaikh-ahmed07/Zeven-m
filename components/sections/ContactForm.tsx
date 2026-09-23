'use client';

import { useSearchParams } from 'next/navigation';
import { interestOptions } from '@/lib/data';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

/** Contact-page form; `/contact?interest=Design%20%26%20PMC` pre-selects "Interested In". */
export function ContactForm() {
  const param = useSearchParams().get('interest');
  const interest = param && interestOptions.includes(param) ? param : undefined;
  return <EnquiryForm key={interest ?? 'default'} interest={interest} source="contact-page" requireMessage submitLabel="Send Enquiry" />;
}
