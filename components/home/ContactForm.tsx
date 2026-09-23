'use client';

import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { useUI } from '@/components/providers/UIProvider';

/** Homepage enquiry form; pre-selects "Interested In" when reached from a service or CTA. */
export function ContactForm() {
  const { contactInterest } = useUI();
  return <EnquiryForm key={contactInterest ?? 'default'} interest={contactInterest} />;
}
