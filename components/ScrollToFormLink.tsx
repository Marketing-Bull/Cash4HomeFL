'use client';

import type { ReactNode } from 'react';

export function ScrollToFormLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const form = document.getElementById('lead-form');
    if (!form) return; // let the href="/contact" fallback navigate normally
    e.preventDefault();
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Focus the first visible input after the scroll animation settles.
    setTimeout(() => {
      const first = form.querySelector<HTMLElement>('input:not([type="hidden"]):not([tabindex="-1"])');
      first?.focus({ preventScroll: true });
    }, 400);
  }

  return (
    <a href="#lead-form" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
