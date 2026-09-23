'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { interestOptions, site, whatsappLink } from '@/lib/data';
import { enquirySummary, submitEnquiry, validateEnquiry, type EnquiryErrors, type EnquiryPayload } from '@/lib/enquiry';
import { Icon } from '@/components/ui/Icon';

type Props = {
  /** When provided, shows "Preferred Configuration" instead of "Interested In". */
  configurations?: string[];
  interest?: string;
  project?: string;
  submitLabel?: string;
  /** Identifies the form in the delivered enquiry (e.g. 'contact-page'). */
  source: string;
  requireMessage?: boolean;
};

/**
 * Reusable enquiry form. Submits through `submitEnquiry` (→ /api/enquiry) and
 * only shows success once the server confirms delivery.
 */
export function EnquiryForm({ configurations, interest, project, submitLabel = 'Request a Callback', source, requireMessage }: Props) {
  const id = useId();
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [failure, setFailure] = useState<{ message: string; payload: EnquiryPayload } | null>(null);
  const [sentName, setSentName] = useState('');
  const successRef = useRef<HTMLDivElement>(null);
  const failureRef = useRef<HTMLDivElement>(null);

  const choiceName = configurations ? 'configuration' : 'interest';

  useEffect(() => {
    if (status === 'sent') successRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    if (status === 'error') failureRef.current?.focus();
  }, [status]);

  const clearError = (ev: React.FormEvent<HTMLFormElement>) => {
    const name = (ev.target as HTMLInputElement).name;
    const key = (name === choiceName ? 'choice' : name) as keyof EnquiryErrors;
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status === 'sending') return;
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? '').trim();
    const payload: EnquiryPayload = {
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      [choiceName]: get(choiceName),
      message: get('message'),
      project,
      source,
      website: get('website'),
    };
    const e = validateEnquiry(payload, { requireEmail: true, requireMessage, choiceField: choiceName });
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setStatus('sending');
    setFailure(null);
    try {
      await submitEnquiry(payload);
      setSentName(payload.name.split(' ')[0]);
      setStatus('sent');
      form.reset();
    } catch (err) {
      // Keep everything the visitor typed and offer direct alternatives.
      setFailure({ message: (err as Error).message, payload });
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div ref={successRef} className="form form--sent" role="status" aria-live="polite">
        <div className="form__success">
          <span className="form__success-icon">
            <Icon name="check" />
          </span>
          <h3>Thank you{sentName ? `, ${sentName}` : ''}.</h3>
          <p>
            Your enquiry{project ? ` for ${project}` : ''} has been received. A Zeven-M advisor will be in touch shortly.
          </p>
          <button type="button" className="link-arrow" onClick={() => setStatus('idle')}>
            Send another enquiry <Icon name="arrow" />
          </button>
        </div>
      </div>
    );
  }

  const field = (key: keyof EnquiryErrors, label: string, control: React.ReactNode, full = false) => (
    <div className={`form__field ${full ? 'form__field--full' : ''} ${errors[key] ? 'has-error' : ''}`}>
      {control}
      <label htmlFor={`${id}-${key}`}>
        {label}
        {key === 'message' && !requireMessage ? <span className="form__optional"> (optional)</span> : null}
      </label>
      <span className="form__error" id={`${id}-${key}-err`}>
        {errors[key]}
      </span>
    </div>
  );
  const aria = (key: keyof EnquiryErrors) => ({
    id: `${id}-${key}`,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${id}-${key}-err` : undefined,
  });

  return (
    <form className="form" noValidate onSubmit={onSubmit} onInput={clearError} onChange={clearError} aria-busy={status === 'sending'}>
      <div className="form__grid">
        {field('name', 'Name', <input {...aria('name')} name="name" type="text" autoComplete="name" autoCapitalize="words" enterKeyHint="next" placeholder=" " />)}
        {field('email', 'Email', <input {...aria('email')} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} enterKeyHint="next" placeholder=" " />)}
        {field('phone', 'Phone', <input {...aria('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" placeholder=" " />)}
        {field(
          'choice',
          configurations ? 'Preferred Configuration' : 'Interested In',
          <select {...aria('choice')} name={choiceName} defaultValue={interest ?? ''}>
            <option value="" disabled>
              Select an option
            </option>
            {(configurations ? [...configurations, 'Not sure yet'] : interestOptions).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>,
        )}
        {field(
          'message',
          'Message',
          <textarea {...aria('message')} name="message" rows={3} maxLength={2000} enterKeyHint="send" placeholder=" " />,
          true,
        )}
        {/* Honeypot for spam bots — hidden from people and assistive tech. */}
        <div className="form__hp" aria-hidden="true">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === 'error' && failure && (
        <div ref={failureRef} className="form__failure" role="alert" tabIndex={-1}>
          <p>
            <strong>Your enquiry was not sent.</strong> {failure.message}
          </p>
          <div className="form__failure-actions">
            <a href={site.phoneHref}>
              <Icon name="phone" /> Call
            </a>
            <a href={whatsappLink(enquirySummary(failure.payload))} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> WhatsApp
            </a>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(enquirySummary(failure.payload))}`}>
              <Icon name="mail" /> Email
            </a>
          </div>
        </div>
      )}

      <p className="form__note">By submitting, you agree to be contacted by Zeven-M regarding your enquiry.</p>
      <div className="form__actions">
        <button className="btn btn--dark" type="submit" disabled={status === 'sending'}>
          <span>{status === 'sending' ? 'Sending…' : status === 'error' ? 'Try Again' : submitLabel}</span>
          <Icon name="arrow" />
        </button>
      </div>
    </form>
  );
}
