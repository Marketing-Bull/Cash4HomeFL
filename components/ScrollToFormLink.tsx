'use client';

import type { ReactNode } from 'react';

export function ScrollToFormLink({
  className,
  href = '#lead-form',
  children,
}: {
  className?: string;
  href?: string;
  children: ReactNode;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const form = document.getElementById('lead-form');
    if (!form) return; // let the href fallback navigate normally
    e.preventDefault();
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Focus the first visible input after the scroll animation settles.
    setTimeout(() => {
      const first = form.querySelector<HTMLElement>('input:not([type="hidden"]):not([tabindex="-1"])');
      first?.focus({ preventScroll: true });
    }, 400);
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
