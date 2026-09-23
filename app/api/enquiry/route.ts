import { NextResponse } from 'next/server';
import { normalisePhone, validateEnquiry, type EnquiryPayload } from '@/lib/enquiry';

/**
 * POST /api/enquiry
 *
 * Validates the enquiry and forwards it as JSON to ENQUIRY_WEBHOOK_URL
 * (a CRM, Zapier/Make webhook, Google Apps Script, Formspree, Slack, etc.).
 * Until that variable is set, the route answers 503 so visitors are told the
 * enquiry was NOT sent and are offered phone / WhatsApp / email instead.
 */
export async function POST(request: Request) {
  let data: Partial<EnquiryPayload>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots fill every field. Accept silently so they do not retry.
  if (data.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(data, { requireEmail: data.source !== 'chat' });
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: Object.values(errors)[0], fields: errors }, { status: 422 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.error('[enquiry] ENQUIRY_WEBHOOK_URL is not set — enquiry was not delivered.');
    return NextResponse.json(
      { error: 'Online enquiries are not connected yet. Please call or WhatsApp us and we will help right away.' },
      { status: 503 },
    );
  }

  const enquiry = {
    name: String(data.name).trim().slice(0, 120),
    phone: normalisePhone(String(data.phone)),
    email: data.email?.trim().slice(0, 200) || undefined,
    interest: data.interest?.slice(0, 80) || undefined,
    configuration: data.configuration?.slice(0, 80) || undefined,
    project: data.project?.slice(0, 120) || undefined,
    message: data.message?.trim().slice(0, 2000) || undefined,
    source: String(data.source || 'website').slice(0, 40),
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') ?? undefined,
  };

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error('[enquiry] delivery failed:', err);
    return NextResponse.json(
      { error: 'We couldn’t send your enquiry just now. Please try again, or call / WhatsApp us.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
