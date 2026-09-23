/* Fine-line architectural icon set (24×24, 1.3px stroke). */

const paths = {
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M3 8h18M3 16h12" />,
  phone: <path d="M5 3.5h3.2l1.6 4.2-2.1 1.3a11 11 0 0 0 5.3 5.3l1.3-2.1 4.2 1.6V17a2.5 2.5 0 0 1-2.5 2.5A15.5 15.5 0 0 1 2.5 6 2.5 2.5 0 0 1 5 3.5Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
  pin: <><path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.8" r="2.3" /></>,
  chat: <><path d="M4 5.5h16v10H9.5L5 19.5v-4H4z" /><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01" strokeWidth="2.2" /></>,
  send: <><path d="M4 12 20 4l-5 16-3.5-6.5L4 12Z" /><path d="m11.5 13.5 3.5-4" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="1" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  plan: <><rect x="3.5" y="3.5" width="17" height="17" /><path d="M3.5 12h7v8.5M10.5 3.5V8M14 12h6.5M14 12v3" /></>,
  development: <path d="M3 21h18M5 21V9l5-3v15M10 21V4l7 3v14M13.5 9.5h1M13.5 13h1M13.5 16.5h1M7 12h.5M7 15.5h.5" />,
  design: <><path d="M12 3v3M8.2 20.5 12 6l3.8 14.5M9.5 15.5h5" /><circle cx="12" cy="6" r="1.6" /><path d="M4 20.5h16" /></>,
  contracting: <><path d="M4 21V5.5L14 3v18M14 7h7l-2.5 3.5M10 21v-3.5M4 9.5h10M17.5 10.5v4" /><rect x="16" y="14.5" width="3" height="3" /><path d="M2.5 21h19" /></>,
  realestate: <><path d="M3.5 11 12 4l8.5 7M5.5 9.5V20h13V9.5" /><circle cx="12" cy="13.2" r="2" /><path d="M12 15.2V18M12 17h1.3" /></>,
  pool: <path d="M3 17c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1M8 15V5.5a2 2 0 0 1 4 0M16 15V5.5a2 2 0 0 0-4 0M8 9h8M8 12.5h8" />,
  clubhouse: <path d="M3 20.5h18M4.5 20.5V10L12 5l7.5 5v10.5M9.5 20.5V15h5v5.5M8 11.5h8" />,
  gym: <path d="M6.5 7v10M17.5 7v10M4 9.5v5M20 9.5v5M6.5 12h11" />,
  leaf: <><path d="M5 19c0-8 5.5-13 15-14-.5 9.5-6 15-14 15" /><path d="M5 19c3-4 6-6.5 10-8.5" /></>,
  play: <><circle cx="8" cy="5.5" r="1.8" /><path d="M8 7.3v6M8 13.3 5 20M8 13.3l3 6.7M5 10l3 1.5 3-1.5M14 20.5V8l6.5 12.5" /></>,
  games: <><rect x="3" y="8" width="18" height="10" rx="5" /><path d="M7.5 11v4M5.5 13h4M15 12h.01M17.5 14h.01M12 8V5.5" /></>,
  hall: <path d="M3 20.5h18M3.5 8.5 12 4l8.5 4.5M5 8.5v12M9.5 8.5v12M14.5 8.5v12M19 8.5v12" />,
  shield: <><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m8.8 12 2.2 2.2 4.2-4.4" /></>,
  parking: <><rect x="3.5" y="3.5" width="17" height="17" rx="1" /><path d="M9.5 17V7.5h3.3a2.8 2.8 0 0 1 0 5.6H9.5" /></>,
  track: <><ellipse cx="12" cy="12" rx="9" ry="6" /><ellipse cx="12" cy="12" rx="5" ry="2.5" /></>,
  quote: <path d="M10 7C6.5 8 4.5 10.5 4.5 14v3.5H10V12H7c0-2 1-3.3 3-4ZM19.5 7c-3.5 1-5.5 3.5-5.5 7v3.5h5.5V12h-3c0-2 1-3.3 3-4Z" />,
} as const;

export type IconName = keyof typeof paths | 'whatsapp';

export function Icon({ name, className }: { name: IconName; className?: string }) {
  if (name === 'whatsapp') {
    return (
      <svg className={`icon ${className ?? ''}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12.04 2.5a9.43 9.43 0 0 0-8.1 14.26L2.5 21.5l4.87-1.4a9.44 9.44 0 1 0 4.67-17.6Zm0 17.2a7.8 7.8 0 0 1-3.98-1.09l-.28-.17-2.9.83.84-2.82-.19-.29a7.78 7.78 0 1 1 6.51 3.54Zm4.27-5.82c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.52.12-.16.23-.6.76-.74.91-.13.16-.27.18-.5.06a6.37 6.37 0 0 1-3.17-2.77c-.24-.41.24-.38.69-1.27.08-.16.04-.29-.02-.41-.06-.12-.52-1.26-.72-1.72-.19-.45-.38-.39-.52-.4h-.45a.86.86 0 0 0-.62.3 2.6 2.6 0 0 0-.82 1.94 4.53 4.53 0 0 0 .95 2.4 10.36 10.36 0 0 0 3.97 3.5c1.48.64 2.06.7 2.8.59.45-.07 1.38-.56 1.57-1.11.2-.55.2-1.02.14-1.12-.06-.1-.21-.16-.44-.27Z"
        />
      </svg>
    );
  }
  return (
    <svg
      className={`icon ${className ?? ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
