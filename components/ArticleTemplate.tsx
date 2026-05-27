import Link from 'next/link';
import type { ArticleTemplateProps, Review } from '@/lib/page-types';

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__avatar" aria-hidden="true">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="review-card__name">{review.name}</div>
          <div className="review-card__meta">
            <span className="review-card__city">{review.city}</span>
            <span className="review-card__dot" aria-hidden="true">·</span>
            <span className="review-card__situation">{review.situation}</span>
          </div>
        </div>
      </div>
      <blockquote className="review-card__quote">&ldquo;{review.quote}&rdquo;</blockquote>
      <div className="review-card__outcome">
        <strong>Outcome:</strong> {review.outcome}
      </div>
    </div>
  );
}

export function ArticleTemplate({
  eyebrow,
  title,
  description,
  paragraphs,
  bullets,
  relatedLinks,
  ctaLabel,
  ctaHref,
  reviews,
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

          {reviews && reviews.length > 0 && (
            <section className="reviews-section">
              <h2 className="section-title section-title--small">Seller stories</h2>
              <div className="reviews-grid">
                {reviews.map((review) => (
                  <ReviewCard key={review.name + review.city} review={review} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
