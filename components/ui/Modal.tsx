'use client';

import { useEffect, useRef } from 'react';
import { NAVIGATE_EVENT } from '@/components/providers/UIProvider';
import { useScrollLock } from '@/lib/scroll';
import { Icon } from './Icon';

/** Accessible modal built on the native <dialog> element (bottom sheet on phones with `modal--sheet`). */
export function Modal({
  open,
  onClose,
  label,
  className = '',
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useScrollLock(open);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener(NAVIGATE_EVENT, onClose);
    return () => window.removeEventListener(NAVIGATE_EVENT, onClose);
  }, [open, onClose]);

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
        <Icon name="close" />
      </button>
      {open && children}
    </dialog>
  );
}
