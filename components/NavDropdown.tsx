'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

type Item = { label: string; href: string };

export function NavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: Item[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const suppressNextFocus = useRef(false);

  function close() {
    setOpen(false);
  }

  return (
    <div
      className="nav-dropdown"
      ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        // Close when focus leaves the entire dropdown container.
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          close();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          // Suppress the focus handler so returning focus to trigger doesn't re-open.
          suppressNextFocus.current = true;
          close();
          containerRef.current?.querySelector<HTMLElement>('a.nav-link')?.focus();
        }
      }}
    >
      <Link
        className="nav-link nav-link--dropdown"
        href={href}
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={() => {
          if (suppressNextFocus.current) { suppressNextFocus.current = false; return; }
          setOpen(true);
        }}
      >
        {label}
        <svg
          className={`dropdown-arrow${open ? ' dropdown-arrow--open' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          width="14"
          height="14"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      {open && (
        <div className="dropdown-panel" role="menu">
          <div className="dropdown-section">
            <span className="dropdown-label">Situations we help with</span>
            {items.map((item) => (
              <Link
                key={item.href}
                className="dropdown-link"
                href={item.href}
                role="menuitem"
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
