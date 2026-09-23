'use client';

import { useUI, type EnquiryContext } from '@/components/providers/UIProvider';
import { Icon, type IconName } from './Icon';
import type { ButtonVariant } from './Button';

type Props = EnquiryContext & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: IconName | null;
  className?: string;
};

/** Opens the slide-in enquiry panel, optionally pre-filled for a project or interest. */
export function EnquireButton({ children, variant = 'dark', icon = 'arrow', className = '', ...ctx }: Props) {
  const { openEnquiry } = useUI();
  return (
    <button type="button" className={`btn btn--${variant} ${className}`} onClick={() => openEnquiry(ctx)}>
      <span>{children}</span>
      {icon && <Icon name={icon} />}
    </button>
  );
}
