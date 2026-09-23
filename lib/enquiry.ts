/* ==========================================================================
   Enquiry submission — shared by every form, the chatbot and the API route.
   ========================================================================== */

export type EnquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  interest?: string;
  configuration?: string;
  message?: string;
  project?: string;
  /** Where the enquiry came from: 'contact-page', 'enquiry-panel', 'project-page', 'chat'. */
  source: string;
  /** Honeypot — real visitors never fill this in. */
  website?: string;
};

export type EnquiryErrors = Partial<Record<'name' | 'phone' | 'email' | 'choice' | 'message', string>>;

const PHONE = /^\+?\d{8,14}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalisePhone = (value: string) => value.replace(/[\s()-]/g, '');

/** Pure validation used on both client and server. */
export function validateEnquiry(
  data: Partial<EnquiryPayload>,
  opts: { requireEmail?: boolean; requireMessage?: boolean; choiceField?: 'interest' | 'configuration' } = {},
): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!data.name || data.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!data.phone || !PHONE.test(normalisePhone(data.phone))) e.phone = 'Please enter a valid phone number.';
  if (opts.requireEmail && !data.email?.trim()) e.email = 'Please enter your email address.';
  else if (data.email?.trim() && !EMAIL.test(data.email.trim())) e.email = 'Please enter a valid email address.';
  if (opts.choiceField && !data[opts.choiceField]) e.choice = 'Please choose an option.';
  if (opts.requireMessage && (!data.message || data.message.trim().length < 5)) e.message = 'Please add a short message.';
  if (data.message && data.message.length > 2000) e.message = 'Please keep your message under 2000 characters.';
  return e;
}

/**
 * Sends an enquiry to the API. Resolves only when the server confirms it was
 * delivered; otherwise throws with a message that can be shown to the visitor.
 * Point NEXT_PUBLIC_ENQUIRY_ENDPOINT at an external form service to bypass the built-in route.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || '/api/enquiry';
  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We couldn’t reach our server. Please check your connection and try again.');
  }
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || 'Something went wrong while sending your enquiry.');
  }
}

/** Plain-text summary, used for WhatsApp / email fallbacks when online submission fails. */
export function enquirySummary(p: Partial<EnquiryPayload>) {
  return [
    'Hello Zeven-M, I would like to make an enquiry.',
    p.name && `Name: ${p.name}`,
    p.phone && `Phone: ${p.phone}`,
    p.email && `Email: ${p.email}`,
    p.project && `Project: ${p.project}`,
    p.interest && `Interested in: ${p.interest}`,
    p.configuration && `Configuration: ${p.configuration}`,
    p.message && `Message: ${p.message}`,
  ]
    .filter(Boolean)
    .join('\n');
}
