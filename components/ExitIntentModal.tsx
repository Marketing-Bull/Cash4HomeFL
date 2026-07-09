'use client';
import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';

const COOKIE_KEY = 'c4hfl_exit_seen';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function ExitIntentModal() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already seen in the last 7 days
    if (getCookie(COOKIE_KEY)) return;

    let triggered = false;

    // Exit intent: mouse moves near the top of the viewport (toward browser chrome)
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered || dismissed) return;
      if (e.clientY < 20) {
        triggered = true;
        setVisible(true);
        track('Exit Intent Triggered', { method: 'mouse_leave' });
      }
    };

    // Scroll trigger: user has read 70% of the page
    const handleScroll = () => {
      if (triggered || dismissed) return;
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.70) {
        triggered = true;
        setVisible(true);
        track('Exit Intent Triggered', { method: 'scroll_70' });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dismissed]);

  const dismiss = () => {
    setCookie(COOKIE_KEY, '1', 7); // suppress for 7 days after first view
    setVisible(false);
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get your cash offer"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '0.75rem',
          padding: '2rem 2rem 1.5rem',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* Close (×) button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            lineHeight: 1,
            cursor: 'pointer',
            color: '#6b7280',
            padding: '0.25rem 0.5rem',
          }}
        >
          ×
        </button>

        <p style={{ fontSize: '1.5rem', margin: '0 0 0.25rem', fontWeight: 700, color: '#111827' }}>
          Still here?
        </p>
        <p style={{ fontSize: '1rem', margin: '0 0 1.25rem', color: '#374151', lineHeight: 1.5 }}>
          Get your cash offer in 24 hours — no repairs, no fees, no commissions.
        </p>

        <a
          href="tel:+15612209399"
          onClick={() => {
            track('Exit Intent Phone Click');
            dismiss();
          }}
          style={{
            display: 'block',
            background: '#1d4ed8',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.125rem',
            marginBottom: '0.75rem',
          }}
        >
          📞 (561) 220-9399
        </a>

        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.8rem',
            color: '#9ca3af',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
