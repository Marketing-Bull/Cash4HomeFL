'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import type { NavigationLink } from '@/lib/navigation';

export function NavDropdown({ label, items }: { label: string; items: NavigationLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="nav-dropdown" ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { if (!containerRef.current?.contains(document.activeElement)) setOpen(false); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}>
      <button ref={triggerRef} className="nav-link nav-link--dropdown" type="button" aria-expanded={open} aria-controls={panelId} onClick={(event) => setOpen(value => event.detail === 0 ? !value : true)}>
        {label}
        <svg className={`dropdown-arrow${open ? ' dropdown-arrow--open' : ''}`} viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="dropdown-panel" id={panelId} hidden={!open}>
        <ul className="dropdown-section" aria-label={label}>
          {items.map(item => <li key={item.href}><Link className="dropdown-link" href={item.href} onClick={() => setOpen(false)}>{item.label}</Link></li>)}
        </ul>
      </div>
    </div>
  );
}
