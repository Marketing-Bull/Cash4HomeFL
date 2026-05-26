import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'We received your property request and will review it soon.',
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const address = typeof searchParams.address === 'string' ? searchParams.address : '';
  const phone = typeof searchParams.phone === 'string' ? searchParams.phone : '';
  const email = typeof searchParams.email === 'string' ? searchParams.email : '';

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
            <h2 className="section-title section-title--small">What you sent</h2>
            <ul className="bullet-list">
              {address ? <li>Address: {address}</li> : null}
              {phone ? <li>Phone: {phone}</li> : null}
              {email ? <li>Email: {email}</li> : null}
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
