import Link from 'next/link';
import type { Metadata } from 'next';
import { TrackConversion } from '@/components/TrackConversion';

export const metadata: Metadata = {
  title: 'Thank You — We Got Your Request | Cash4HomeFL',
  description:
    'Thank you for reaching out. We received your property details and will follow up shortly with a fair, no-obligation cash offer. No pressure, ever.',
};

const steps = [
  {
    n: '1',
    title: 'We review your property — today',
    body: 'A real person on our local team looks over the details you sent, usually within a few hours.',
  },
  {
    n: '2',
    title: 'A friendly call or text',
    body: 'We reach out to say hello and ask a couple of quick questions about the home. No sales pressure — just a conversation.',
  },
  {
    n: '3',
    title: 'Your fair cash offer',
    body: 'We put together a straightforward, no-obligation offer. No repairs, no commissions, no hidden fees taken out at the end.',
  },
  {
    n: '4',
    title: 'You decide — on your terms',
    body: 'Take the offer or leave it, no hard feelings. If it works for you, you pick the closing date — as soon as 7 days or whenever suits you.',
  },
];

const reassurances = [
  'No obligation, ever',
  '100% private',
  'No fees or repairs',
  'Local & family-run',
];

export default function ThankYouPage() {
  return (
    <main className="page-shell">
      <TrackConversion />
      {/* ── Warm welcome hero ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--green-light) 0%, #ffffff 100%)',
          padding: '4.5rem 0 3rem',
        }}
      >
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 0 10px rgba(22, 163, 74, 0.12)',
              marginBottom: '1.5rem',
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            You&rsquo;re in good hands
          </p>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', margin: '0.25rem 0 1rem' }}>
            Thank you — we&rsquo;ve got it from here
          </h1>
          <p className="lead" style={{ margin: '0 auto 1.5rem' }}>
            We know reaching out about your home is a big step, and we don&rsquo;t take that lightly.
            Your request is in, and a real person from our South Florida team will be in touch
            within <strong>24 hours</strong> — often much sooner.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
            }}
          >
            {reassurances.map((item) => (
              <span className="pill pill--soft" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          {/* ── Personal note ── */}
          <div
            style={{
              background: 'var(--surface-warm)',
              border: '1px solid #f0e6c8',
              borderLeft: '4px solid var(--gold)',
              borderRadius: 'var(--radius)',
              padding: '1.75rem 1.75rem 1.5rem',
              marginBottom: '3rem',
            }}
          >
            <p
              style={{
                margin: '0 0 0.85rem',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--gold)',
              }}
            >
              A quick note from our team
            </p>
            <p style={{ margin: '0 0 0.85rem', lineHeight: 1.7 }}>
              Selling a home can come at a stressful time — a move, a loss, a tough financial
              stretch, or simply being ready for something new. Whatever brought you here, please
              know there&rsquo;s <strong>no pressure and no obligation of any kind</strong>. We&rsquo;ll
              treat your information with care, give you a fair and honest cash offer, and leave the
              decision entirely up to you.
            </p>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--text)' }}>
              — The Cash4HomeFL Team
              <span style={{ display: 'block', fontWeight: 400, color: 'var(--muted)', fontSize: '0.9rem' }}>
                Proudly serving Palm Beach County &amp; Broward
              </span>
            </p>
          </div>

          {/* ── What happens next ── */}
          <h2
            className="section-title section-title--small"
            style={{ textAlign: 'center', marginBottom: '1.75rem' }}
          >
            What happens next
          </h2>

          <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem' }}>
            {steps.map((step, i) => (
              <li
                key={step.n}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                  padding: '1.25rem 0',
                  borderBottom: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.3rem', fontSize: '1.05rem' }}>
                    {step.title}
                  </strong>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65 }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* ── Talk to a real person ── */}
          <div
            style={{
              background: 'var(--accent)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem 1.75rem',
              textAlign: 'center',
              color: '#fff',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h2 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 0.5rem' }}>
              Have a question right now?
            </h2>
            <p
              style={{
                margin: '0 auto 1.5rem',
                maxWidth: '420px',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.65,
              }}
            >
              You don&rsquo;t have to wait for us to call. We&rsquo;re real people right here in South
              Florida — reach out any time and we&rsquo;ll be glad to help.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="tel:+15612209399"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#fff',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  padding: '0.8rem 1.5rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                Call (561) 220-9399
              </a>
              <a
                href="sms:+15612209399"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255,255,255,0.14)',
                  color: '#fff',
                  fontWeight: 700,
                  padding: '0.8rem 1.5rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
                </svg>
                Text us
              </a>
            </div>
          </div>

          {/* ── Trust line ── */}
          <p
            style={{
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: '0.9rem',
              margin: '2rem 0 0',
            }}
          >
            <span style={{ color: 'var(--gold)' }}>★★★★★</span>{' '}
            Trusted by 100+ South Florida homeowners · Local, family-run · No pressure, ever
          </p>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              &larr; Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
