import Link from 'next/link';
import { Icon, type IconName } from './Icon';

export type ButtonVariant = 'light' | 'ghost' | 'dark' | 'gold' | 'outline';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: IconName | null;
  className?: string;
  external?: boolean;
};

/** Primary call-to-action rendered as a link. */
export function ButtonLink({ href, children, variant = 'dark', icon = 'arrow', className = '', external }: Props) {
  const cls = `btn btn--${variant} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} />}
    </>
  );
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {content}
    </Link>
  );
}

/** Understated text link with a sliding arrow, e.g. "View Project →". */
export function ArrowLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link className={`link-arrow ${className}`} href={href}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}
