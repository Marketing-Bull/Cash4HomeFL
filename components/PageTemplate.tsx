import Link from 'next/link';
import type { ReactNode } from 'react';
import type { PageTemplateProps } from '@/lib/page-types';
import type { FaqItem, StepItem, LinkItem } from '@/lib/page-types';
import { LeadForm } from '@/components/LeadForm';

// BreadcrumbList JSON-LD — injected when breadcrumbs array is present
function BreadcrumbSchema({ items }: { items: LinkItem[] }) {
  if (!items?.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            item: `https://cash4homefl.vercel.app${item.href}`,
          })),
        }),
      }}
    />
  );
}

// FAQPage JSON-LD — injected when faq array is present
function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs?.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}

// HowTo JSON-LD — injected when steps array is present
function HowToSchema({ steps }: { steps: StepItem[] }) {
  if (!steps?.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to sell your house for cash in South Florida',
          description:
            'A step-by-step guide to selling your home as-is for cash with no repairs, no fees, and no commissions.',
          step: steps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.description,
          })),
        }),
      }}
    />
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="container">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function PageTemplate({
  eyebrow,
  title,
  lead,
  trust,
  stats,
  steps,
  bullets,
  comparison,
  areas,
  nearbyLinks,
  faq,
  ctaLabel,
  finalCtaTitle,
  finalCtaLead,
  contactHref,
  formDefaults,
  breadcrumbs,
}: PageTemplateProps) {
  return (
    <main className="page-shell">
      <BreadcrumbSchema items={breadcrumbs ?? []} />
      <FaqSchema faqs={faq ?? []} />
      <HowToSchema steps={steps ?? []} />
      <section className="section section--hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1>{title}</h1>
            <p className="lead">{lead}</p>

            {trust?.length ? (
              <div className="trust-row" aria-label="Trust signals">
                {trust.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            {stats?.length ? (
              <div className="stat-grid" aria-label="Page highlights">
                {stats.map((stat) => (
                  <div className="card card--stat" key={stat.label}>
                    <span className="card__label">{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <LeadForm defaults={formDefaults} />
        </div>
      </section>

      {steps?.length ? (
        <Section eyebrow="Process" title="How it works">
          <div className="step-grid">
            {steps.map((step, index) => (
              <article className="card" key={step.title}>
                <span className="step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {bullets?.length ? (
        <Section eyebrow="Why sellers choose this" title="What you get with a cash sale">
          <div className="card card--panel">
            <ul className="bullet-list">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {comparison?.length ? (
        <Section eyebrow="Comparison" title="Cash sale vs traditional listing">
          <div className="comparison-grid">
            <div className="comparison-grid__head">
              <div>Category</div>
              <div>Traditional listing</div>
              <div>Cash4HomeFL</div>
            </div>
            {comparison.map((row) => (
              <div className="comparison-grid__row" key={row.label}>
                <div className="comparison-grid__label">{row.label}</div>
                <div>{row.traditional}</div>
                <div>{row.cash}</div>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {areas?.length ? (
        <Section eyebrow="Local focus" title="Areas we serve">
          <div className="pill-grid">
            {areas.map((area) => (
              <span className="pill pill--soft" key={area}>
                {area}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      {nearbyLinks?.length ? (
        <Section eyebrow="Internal links" title="Nearby pages and related routes">
          <div className="link-grid">
            {nearbyLinks.map((link) => (
              <Link className="card card--link" href={link.href} key={link.href}>
                <span>{link.label}</span>
                <span className="card__arrow">→</span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {faq?.length ? (
        <Section eyebrow="FAQ" title="Common seller questions">
          <div className="faq-list">
            {faq.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>
      ) : null}

      <section className="section section--cta">
        <div className="container cta-grid">
          <div>
            <p className="eyebrow">Ready to move?</p>
            <h2>{finalCtaTitle ?? 'Get your cash offer today'}</h2>
            <p className="lead lead--compact">{finalCtaLead ?? lead}</p>
          </div>
          <div className="cta-actions">
            <Link className="button" href={contactHref ?? '/contact'}>
              {ctaLabel ?? 'Get My Cash Offer'}
            </Link>
            <a className="button button--ghost" href="tel:+156****9399">
              Call (561) 220-9399
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}