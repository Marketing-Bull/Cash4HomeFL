'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { NavigationItem } from '@/lib/navigation';

export function MobileNav({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) { dialog.close(); return; }
    // The native top layer escapes the filtered header and makes the page inert.
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 981px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);
  return (
    <>
      <button className="mobile-nav-btn" type="button" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-nav-drawer" onClick={() => setOpen(true)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
      </button>
      <dialog ref={dialogRef} id="mobile-nav-drawer" className="mobile-nav-drawer" aria-label="Navigation" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], summary'))
            .filter(control => control.getClientRects().length > 0);
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}>
        <div className="mobile-nav-header"><span>Menu</span><button type="button" className="mobile-nav-close" aria-label="Close navigation" onClick={() => setOpen(false)}>×</button></div>
        <nav aria-label="Mobile navigation">
          {items.map(item => 'children' in item ? (
            <details className="mobile-nav-group" key={item.label}>
              <summary>{item.label}</summary>
              {item.children.map(link => <Link key={link.href} className="mobile-nav-link mobile-nav-link--sub" href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
            </details>
          ) : <Link key={item.href} className="mobile-nav-link" href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
        <a className="button mobile-nav-call" href="tel:+15612209399">Call (561) 220-9399</a>
      </dialog>
    </>
  );
}
