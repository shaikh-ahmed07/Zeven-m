'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { interestOptions } from '@/lib/data';
import { Icon } from '@/components/ui/Icon';

type Props = {
  /** When provided, shows "Preferred Configuration" instead of "Interested In". */
  configurations?: string[];
  interest?: string;
  project?: string;
  submitLabel?: string;
  tone?: 'light' | 'dark';
  secondary?: React.ReactNode;
  compactLabels?: boolean;
};

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'choice', string>>;

/**
 * Reusable enquiry form. Front-end only for the template: submission is
 * simulated. Connect `submitEnquiry` to your CRM / API route / form service.
 */
async function submitEnquiry(data: Record<string, string>) {
  await new Promise((r) => setTimeout(r, 900));
  if (process.env.NODE_ENV === 'development') console.info('[Zeven-M] enquiry (demo only):', data);
}

export function EnquiryForm({
  configurations,
  interest,
  project,
  submitLabel = 'Request a Callback',
  tone = 'light',
  secondary,
  compactLabels,
}: Props) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [sentName, setSentName] = useState('');

  const choiceName = configurations ? 'configuration' : 'interest';
  const successRef = useRef<HTMLDivElement>(null);

  // Keep the confirmation visible once the (taller) form is replaced.
  useEffect(() => {
    if (status === 'sent') successRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [status]);

  const clearError = (ev: React.FormEvent<HTMLFormElement>) => {
    const name = (ev.target as HTMLInputElement).name;
    const key = (name === choiceName ? 'choice' : name) as keyof Errors;
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (fd: FormData): Errors => {
    const e: Errors = {};
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').replace(/[\s-]/g, '');
    const email = String(fd.get('email') || '').trim();
    if (name.length < 2) e.name = 'Please enter your name.';
    if (!/^\+?\d{8,14}$/.test(phone)) e.phone = 'Please enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email address.';
    if (!fd.get(choiceName)) e.choice = 'Please choose an option.';
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setStatus('sending');
    const data = Object.fromEntries(Array.from(fd.entries()).map(([k, v]) => [k, String(v)]));
    await submitEnquiry({ ...data, ...(project ? { project } : {}) });
    setSentName(String(fd.get('name')).trim().split(' ')[0]);
    setStatus('sent');
    form.reset();
  };

  if (status === 'sent') {
    return (
      <div ref={successRef} className={`form form--${tone} form--sent`} role="status" aria-live="polite">
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

  const field = (key: keyof Errors, label: string, control: React.ReactNode, full = false) => (
    <div className={`form__field ${full ? 'form__field--full' : ''} ${errors[key] ? 'has-error' : ''}`}>
      {control}
      <label htmlFor={`${id}-${key}`}>{label}</label>
      <span className="form__error" id={`${id}-${key}-err`}>
        {errors[key]}
      </span>
    </div>
  );
  const aria = (key: keyof Errors) => ({
    id: `${id}-${key}`,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${id}-${key}-err` : undefined,
  });

  return (
    <form className={`form form--${tone}`} noValidate onSubmit={onSubmit} onInput={clearError} onChange={clearError}>
      <div className="form__grid">
        {field('name', compactLabels ? 'Name' : 'Full Name', <input {...aria('name')} name="name" type="text" autoComplete="name" autoCapitalize="words" enterKeyHint="next" placeholder=" " />)}
        {field('phone', compactLabels ? 'Phone' : 'Phone Number', <input {...aria('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" placeholder=" " />)}
        {field('email', 'Email', <input {...aria('email')} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} enterKeyHint="next" placeholder=" " />)}
        {field(
          'choice',
          configurations ? 'Preferred Configuration' : 'Interested In',
          <select {...aria('choice')} name={choiceName} defaultValue={interest ?? ''} className="is-select">
            <option value="" disabled>
              Select an option
            </option>
            {(configurations ? [...configurations, 'Not sure yet'] : interestOptions).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>,
        )}
        <div className="form__field form__field--full">
          <textarea id={`${id}-message`} name="message" rows={3} enterKeyHint="send" placeholder=" " />
          <label htmlFor={`${id}-message`}>Message</label>
        </div>
      </div>
      <p className="form__note">By submitting, you agree to be contacted by Zeven-M regarding your enquiry.</p>
      <div className="form__actions">
        <button className={`btn btn--${tone === 'dark' ? 'gold' : 'dark'}`} type="submit" disabled={status === 'sending'}>
          <span>{status === 'sending' ? 'Sending…' : submitLabel}</span>
          <Icon name="arrow" />
        </button>
        {secondary}
      </div>
    </form>
  );
}
