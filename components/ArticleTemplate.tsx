import Link from 'next/link';
import type { ArticleTemplateProps } from '@/lib/page-types';

export function ArticleTemplate({
  eyebrow,
  title,
  description,
  paragraphs,
  bullets,
  relatedLinks,
  ctaLabel,
  ctaHref,
}: ArticleTemplateProps) {
  return (
    <main className="page-shell">
      <section className="section section--article">
        <div className="container article">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          <p className="lead">{description}</p>

          <div className="article-body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {bullets?.length ? (
            <div className="card card--panel article-panel">
              <h2 className="section-title section-title--small">Key points</h2>
              <ul className="bullet-list">
                {bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {relatedLinks?.length ? (
            <div className="link-grid article-links">
              {relatedLinks.map((link) => (
                <Link className="card card--link" href={link.href} key={link.href}>
                  <span>{link.label}</span>
                  <span className="card__arrow">→</span>
                </Link>
              ))}
            </div>
          ) : null}

          {ctaHref ? (
            <div className="article-cta">
              <Link className="button" href={ctaHref}>
                {ctaLabel ?? 'Get My Cash Offer'}
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
