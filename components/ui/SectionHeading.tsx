type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = 'left', tone = 'light', as: Tag = 'h2', className = '' }: Props) {
  return (
    <header className={`section-heading section-heading--${align} section-heading--${tone} ${className}`}>
      <p className="eyebrow reveal">{eyebrow}</p>
      <Tag className="display reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
        {title}
      </Tag>
      {lead && (
        <p className="lead reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
          {lead}
        </p>
      )}
    </header>
  );
}
