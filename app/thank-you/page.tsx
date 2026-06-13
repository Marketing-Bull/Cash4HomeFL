import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You — We Got Your Request | Cash4HomeFL',
  description: 'We received your property information and will follow up shortly with a no-obligation cash offer.',
};

const steps = [
  {
    n: '1',
    title: 'We review your property',
    body: 'Our team looks over the details you submitted — usually within a few hours.',
  },
  {
    n: '2',
    title: 'Quick call or text',
    body: 'We may reach out to confirm a few specifics about the home.',
  },
  {
    n: '3',
    title: 'You get a cash offer',
    body: 'No repairs, no commissions, no fees — just a straightforward number.',
  },
  {
    n: '4',
    title: 'You choose the closing date',
    body: 'Close in as little as 7 days, or pick a date that works for your timeline.',
  },
];

export default function ThankYouPage() {
  return (
    <main className="page-shell">
      <section className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '680px' }}>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'var(--color-accent)', marginBottom: '1.5rem',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="eyebrow">Submitted successfully</p>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', marginBottom: '0.75rem' }}>
              We got your request!
            </h1>
            <p className="lead" style={{ maxWidth: '520px', margin: '0 auto' }}>
              Expect to hear from us within <strong>24 hours</strong>. In the meantime, here&rsquo;s what happens next.
            </p>
          </div>

          <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem' }}>
            {steps.map((step) => (
              <li key={step.n} style={{
                display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                padding: '1.25rem 0', borderBottom: '1px solid var(--color-border)',
              }}>
                <span style={{
                  flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%',
                  background: 'var(--color-accent)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '1rem',
                }}>
                  {step.n}
                </span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{step.title}</strong>
                  <p style={{ margin: 0, color: 'var(--color-muted)' }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)', padding: '1.75rem', textAlign: 'center',
            marginBottom: '2rem',
          }}>
            <p style={{ margin: '0 0 0.75rem', fontWeight: 600 }}>Prefer to talk now?</p>
            <a
              href="tel:+15612209399"
              className="button"
              style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              Call (561) 220-9399
            </a>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/" style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              &larr; Back to home
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
