'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUI } from '@/components/providers/UIProvider';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/layout/Logo';
import { whatsappLink } from '@/lib/data';
import { scrollToId, useScrollLock, whenUnlocked } from '@/lib/scroll';

type Action = { label: string; send?: string; href?: string; external?: boolean };
type Message = { id: number; from: 'bot' | 'user'; text: string; actions?: Action[] };
type Capture = null | 'name' | 'phone';

const QUICK_ACTIONS: Action[] = [
  { label: 'View Projects', send: 'What projects do you have?' },
  { label: 'Buy a Flat', send: 'I want to buy a flat.' },
  { label: 'Book Site Visit', send: 'Can I schedule a site visit?' },
  { label: 'Villa Enquiry', send: 'Tell me about your villas.' },
  { label: 'Talk to Sales', send: 'I want to talk to sales.' },
  { label: 'Construction / PMC', send: 'I need construction & PMC services.' },
];

const GREETING = 'Hi! Welcome to Zeven-M Projects & Realty. How can I help you?';

/* Predefined demo responses — replace with a live assistant / CRM integration later. */
function respond(input: string): { text: string; actions?: Action[]; capture?: Capture } {
  const q = input.toLowerCase();
  const has = (...words: string[]) => words.some((w) => q.includes(w));

  if (has('site visit', 'visit', 'schedule', 'book'))
    return {
      text: 'Yes. Please share your name and phone number and our team will get in touch to arrange a site visit. First, may I have your name?',
      capture: 'name',
    };
  if (/\b[234]\s?bhk\b/.test(q)) {
    const cfg = q.match(/[234]\s?bhk/)![0].replace(/\s/, ' ').toUpperCase();
    return {
      text: `Great choice. ${cfg} homes are showcased across our residential developments, including Zeven-M Residences and Zeven-M Heights. Would you like our team to share details and availability?`,
      actions: [
        { label: 'View Zeven-M Residences', href: '/projects/zeven-m-residences' },
        { label: 'Book Site Visit', send: 'Can I schedule a site visit?' },
      ],
    };
  }
  if (has('villa'))
    return {
      text: 'Our villa communities feature signature 4 BHK homes with private gardens and resort-style amenities. Would you like to explore Zeven-M Villas?',
      actions: [
        { label: 'View Zeven-M Villas', href: '/projects/zeven-m-villas' },
        { label: 'Book Site Visit', send: 'Can I schedule a site visit?' },
      ],
    };
  if (has('flat', 'apartment', 'buy', 'home', 'house', 'residence'))
    return {
      text: 'Absolutely. Tell us your preferred configuration — 2 BHK, 3 BHK or 4 BHK — and our team can help you with project details and availability.',
      actions: [
        { label: '2 BHK', send: '2 BHK' },
        { label: '3 BHK', send: '3 BHK' },
        { label: '4 BHK', send: '4 BHK' },
      ],
    };
  if (has('commercial', 'office', 'retail', 'shop', 'showroom'))
    return {
      text: 'Zeven-M Business Hub and Zeven-M Square showcase our commercial work — Grade-A offices, retail and showrooms.',
      actions: [{ label: 'View Business Hub', href: '/projects/zeven-m-business-hub' }],
    };
  if (has('construction', 'pmc', 'contract', 'design', 'build', 'architect'))
    return {
      text: 'We offer integrated Design & PMC and Contracting — from architectural concept and approvals to disciplined execution and handover. Tell us about your site or project and our team will reach out.',
      actions: [
        { label: 'Our Services', href: '/#services' },
        { label: 'Talk to Sales', send: 'I want to talk to sales.' },
      ],
    };
  if (has('project', 'portfolio', 'development', 'property', 'properties'))
    return {
      text: 'We currently showcase premium residential, villa and commercial developments. Explore our Projects section to view available developments.',
      actions: [
        { label: 'Explore Projects', href: '/#projects' },
        { label: 'Explore Apartments', send: 'I want to buy a flat.' },
      ],
    };
  if (/\b(price|prices|pricing|cost|rates?|budget|emi)\b/.test(q))
    return {
      text: 'Pricing depends on the project, configuration and floor. Our sales team can share the latest price sheet and payment plans with you.',
      actions: [{ label: 'Talk to Sales', send: 'I want to talk to sales.' }],
    };
  if (has('sales', 'call', 'talk', 'contact', 'phone', 'number'))
    return {
      text: 'Our sales team would be glad to help. You can reach us on WhatsApp, or share your details and we will call you back.',
      actions: [
        { label: 'WhatsApp Sales', href: whatsappLink('Hello Zeven-M Sales team, I would like to speak with you.'), external: true },
        { label: 'Request a Callback', send: 'Can I schedule a site visit?' },
      ],
    };
  if (has('where', 'location', 'address', 'office', 'hyderabad'))
    return { text: 'Our office is in Hyderabad, Telangana, India. Our showcased developments are located across the Hyderabad region.' };
  if (/\b(hi|hello|hey|namaste)\b/.test(q))
    return { text: 'Hello! Are you looking for a new home, a villa, a commercial space or construction services?', actions: QUICK_ACTIONS.slice(0, 4) };
  if (has('thank'))
    return { text: 'You are most welcome. Is there anything else I can help you with?' };

  return {
    text: 'I can help with our projects, apartments, villas, site visits and construction services. Choose an option below or connect with our sales team.',
    actions: QUICK_ACTIONS,
  };
}

export function Chatbot() {
  const { chatOpen, setChatOpen } = useUI();
  const router = useRouter();
  const pathname = usePathname();
  const windowRef = useRef<HTMLElement>(null);
  const [mobile, setMobile] = useState(false);
  useScrollLock(chatOpen && mobile);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // On phones, size the chat to the visual viewport so the keyboard never covers the input.
  useEffect(() => {
    const vv = window.visualViewport;
    const el = windowRef.current;
    if (!chatOpen || !mobile || !vv || !el) return;
    const fit = () => {
      el.style.height = `${vv.height}px`;
      el.style.top = `${vv.offsetTop}px`;
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    };
    fit();
    vv.addEventListener('resize', fit);
    vv.addEventListener('scroll', fit);
    return () => {
      vv.removeEventListener('resize', fit);
      vv.removeEventListener('scroll', fit);
      el.style.height = '';
      el.style.top = '';
    };
  }, [chatOpen, mobile]);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [capture, setCapture] = useState<Capture>(null);
  const [lead, setLead] = useState<{ name?: string }>({});
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (!chatOpen) return;
    // Desktop: focus the input. Phones: leave the keyboard down until the user taps the field.
    const t = window.matchMedia('(pointer: fine)').matches
      ? setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300)
      : undefined;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setChatOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [chatOpen, setChatOpen]);

  const push = (m: Omit<Message, 'id'>) => setMessages((prev) => [...prev, { ...m, id: nextId.current++ }]);

  const botReply = (reply: { text: string; actions?: Action[] }) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      push({ from: 'bot', ...reply });
    }, 650 + Math.min(900, reply.text.length * 6));
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    push({ from: 'user', text });
    setInput('');

    if (capture === 'name') {
      const name = text.replace(/^(my name is|i am|i'm)\s+/i, '').split(' ')[0];
      setLead({ name });
      setCapture('phone');
      return botReply({ text: `Thank you, ${name}. What is the best phone number to reach you on?` });
    }
    if (capture === 'phone') {
      const digits = text.replace(/[^\d+]/g, '');
      if (!/^\+?\d{8,14}$/.test(digits))
        return botReply({ text: 'That number doesn’t look quite right. Could you share a 10-digit mobile number?' });
      setCapture(null);
      return botReply({
        text: `Perfect${lead.name ? `, ${lead.name}` : ''}. Our team will call you on ${digits} to arrange your site visit at a convenient time. (Demo: no details are sent in this template.)`,
        actions: [{ label: 'Explore Projects', href: '/#projects' }],
      });
    }

    const r = respond(text);
    if (r.capture) setCapture(r.capture);
    botReply(r);
  };

  const onAction = (a: Action) => {
    if (a.send) return send(a.send);
    if (a.href && a.external) return window.open(a.href, '_blank', 'noopener,noreferrer');
    if (a.href) {
      if (mobile) setChatOpen(false);
      const [path, hash] = a.href.split('#');
      if (hash && (path || '/') === pathname) whenUnlocked(() => scrollToId(hash));
      else router.push(a.href);
    }
  };

  const lastBot = [...messages].reverse().find((m) => m.from === 'bot');

  return (
    <div className={`chat ${chatOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="chat__launcher"
        aria-expanded={chatOpen}
        aria-controls="chat-window"
        aria-label={chatOpen ? 'Close chat' : 'Chat with Zeven-M'}
        onClick={() => setChatOpen(!chatOpen)}
      >
        <Icon name="chat" className="chat__icon-open" />
        <Icon name="close" className="chat__icon-close" />
        <span className="chat__tip">Chat with Zeven-M</span>
      </button>

      <section
        ref={windowRef}
        id="chat-window"
        className="chat__window"
        role="dialog"
        aria-label="Zeven-M Assistant"
        aria-hidden={!chatOpen}
        inert={!chatOpen}
      >
        <header className="chat__header">
          <span className="chat__avatar">
            <Logo variant="gold" />
          </span>
          <div>
            <h2 className="chat__title">Zeven-M Assistant</h2>
            <p className="chat__subtitle">
              <span className="chat__status" aria-hidden="true" /> How can we help you today?
            </p>
          </div>
          <button type="button" className="chat__close" onClick={() => setChatOpen(false)} aria-label="Close chat">
            <Icon name="close" />
          </button>
        </header>

        <div className="chat__body" ref={listRef} aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`chat__msg chat__msg--${m.from}`}>
              <p>{m.text}</p>
              {m.actions && m === lastBot && !typing && (
                <div className="chat__chips">
                  {m.actions.map((a) => (
                    <button type="button" key={a.label} className="chip" onClick={() => onAction(a)}>
                      {a.label}
                      {a.href && <Icon name="arrowUpRight" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {messages.length === 1 && !typing && (
            <div className="chat__chips chat__chips--intro">
              {QUICK_ACTIONS.map((a) => (
                <button type="button" key={a.label} className="chip" onClick={() => onAction(a)}>
                  {a.label}
                </button>
              ))}
            </div>
          )}
          {typing && (
            <div className="chat__msg chat__msg--bot chat__typing" aria-label="Assistant is typing">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <form
          className="chat__input"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="chat-input" className="sr-only">
            Type your message
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={capture === 'name' ? 'Your name' : capture === 'phone' ? 'Your phone number' : 'Type your message…'}
            inputMode={capture === 'phone' ? 'tel' : 'text'}
            autoComplete="off"
            enterKeyHint="send"
          />
          <button type="submit" aria-label="Send message" disabled={!input.trim() || typing}>
            <Icon name="send" />
          </button>
        </form>
        <a className="chat__sales" href={whatsappLink('Hello Zeven-M Sales team.')} target="_blank" rel="noopener noreferrer">
          Connect With Sales <Icon name="arrow" />
        </a>
      </section>
    </div>
  );
}
