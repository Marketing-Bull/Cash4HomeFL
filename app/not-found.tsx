import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="section section--article">
        <div className="container article">
          <p className="eyebrow">404</p>
          <h1>Page not found</h1>
          <p className="lead">The page you requested does not exist. Try the homepage or a city page instead.</p>
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
