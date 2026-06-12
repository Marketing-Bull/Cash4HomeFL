import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'We received your property request and will review it soon.',
};

export default function ThankYouPage() {
  return (
    <main className="page-shell">
      <section className="section section--article">
        <div className="container article">
          <p className="eyebrow">Submitted</p>
          <h1>Thanks — we received your request</h1>
          <p className="lead">
            We will review the property details and get back to you as soon as possible.
          </p>

          <div className="card card--panel">
            <h2 className="section-title section-title--small">What happens next</h2>
            <ul className="bullet-list">
              <li>We review your property details within 24 hours.</li>
              <li>You get a call or text to confirm a few specifics.</li>
              <li>You receive a no-obligation cash offer — no repairs, no fees.</li>
            </ul>
          </div>

          <div className="article-cta">
            <Link className="button" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
