import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { PageTemplateProps, FaqItem, StepItem, LinkItem } from '@/lib/page-types';
import { LeadForm } from '@/components/LeadForm';

/* ── Schema Markup ── */
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
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }),
      }}
    />
  );
}

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
          description: 'A step-by-step guide to selling your home as-is for cash with no repairs, no fees, and no commissions.',
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

/* ── Trust Bar ── */
const trustItems = [
  'No repairs needed',
  'No realtor commissions',
  'Close in 7–30 days',
  'Local South Florida buyer',
  '100+ homes purchased',
];

function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="container trust-bar__inner">
        {trustItems.map((item, i) => (
          <span key={item} style={{ display: 'contents' }}>
            <div className="trust-bar__item">
              <span className="check-icon">✓</span>
              {item}
            </div>
            {i < trustItems.length - 1 && (
              <div className="trust-bar__divider" aria-hidden="true" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stats Band ── */
function StatsBand() {
  const stats = [
    { value: '100+', label: 'Homes purchased in South FL' },
    { value: '18 days', label: 'Average time to close' },
    { value: '$0', label: 'Commissions or hidden fees' },
    { value: '5 ★', label: 'Google-rated local buyer' },
  ];
  return (
    <div className="stats-band">
      <div className="container">
        <div className="stats-band__grid">
          {stats.map((s) => (
            <div className="stats-band__item" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Featured Testimonials ── */
const featuredTestimonials = [
  {
    name: 'Marcus T.',
    city: 'West Palm Beach',
    situation: 'Inherited rental',
    quote: "They came out, looked at it, and handed me an offer within a week. I didn't have to lift a finger.",
    outcome: 'Closed in 18 days, as-is',
    initials: 'MT',
    avatar: '/images/testimonials/marcus-t.jpg',
  },
  {
    name: 'Sandra R.',
    city: 'Boca Raton',
    situation: 'Storm damage',
    quote: 'Cash4HomeFL looked at the property on a Tuesday and I signed Friday. No repairs, no waiting.',
    outcome: 'Closed in 11 days',
    initials: 'SR',
    avatar: '/images/testimonials/sandra-r.jpg',
  },
  {
    name: 'Carmen M.',
    city: 'Boynton Beach',
    situation: 'Foreclosure prevention',
    quote: "They worked fast enough that I was able to pay off the mortgage and walk away with cash instead of losing everything.",
    outcome: 'Closed in 26 days, mortgage paid',
    initials: 'CM',
    avatar: '/images/testimonials/carmen-m.jpg',
  },
];

function TestimonialsSection() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Real sellers, real results</p>
          <h2 className="section-title">What South Florida homeowners say</h2>
          <p className="lead">Every situation is different. Here are a few sellers who chose a faster path.</p>
        </div>
        <div className="testimonials-grid">
          {featuredTestimonials.map((t) => (
            <div className="card card--testimonial" key={t.name}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-quote">&#8220;{t.quote}&#8221;</p>
              <span className="testimonial-outcome">✓ {t.outcome}</span>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ overflow: 'hidden', padding: 0 }}>
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-meta">{t.city} · {t.situation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link className="button button--ghost" href="/reviews">
            Read all seller stories →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Social Proof Split Section ── */
function SocialProofSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="split-section">
          <div className="split-image">
            <Image
              src="/images/hero/happy-sellers-v2.jpg"
              alt="Happy South Florida homeowners after selling their house for cash to Cash4HomeFL"
              width={800}
              height={600}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="split-content">
            <p className="eyebrow">Why sellers choose us</p>
            <h2 className="section-title">A straightforward process, no surprises</h2>
            <p className="lead">
              We are a local South Florida cash buyer — not a national chain or iBuyer algorithm.
              When you call, you speak with someone who knows Palm Beach County and Broward County.
            </p>
            <ul className="bullet-list" style={{ gridTemplateColumns: '1fr' }}>
              <li>Direct buyer — no middlemen or assignment fees</li>
              <li>Sell in any condition — no repairs, cleaning, or staging</li>
              <li>Choose your closing date — we work on your timeline</li>
              <li>No open houses or strangers walking through your home</li>
              <li>Transparent offer with no hidden deductions at closing</li>
            </ul>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <Link className="button" href="/contact">Get My Cash Offer</Link>
              <a className="button button--ghost" href="tel:+15612209399">(561) 220-9399</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section Wrapper ── */
function Section({
  eyebrow,
  title,
  children,
  alt,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  alt?: boolean;
}) {
  return (
    <section className={`section${alt ? ' section--alt' : ''}`}>
      <div className="container">
        <div className="section-header">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ── Step illustration paths ── */
const stepIllustrations = [
  '/images/process/step-submit-v2.png',
  '/images/process/step-offer-v2.png',
  '/images/process/step-close-v2.png',
];

/* ── Main PageTemplate ── */
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

      {/* ── Hero with full-bleed background image ── */}
      <section className="section--hero">
        <div className="hero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/hero-home-v2.jpg"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1>{title}</h1>
            <p className="lead">{lead}</p>
            {trust?.length ? (
              <div className="trust-row" aria-label="Trust signals">
                {trust.map((item) => (
                  <span className="pill" key={item}>{item}</span>
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

      {/* ── Trust Bar ── */}
      <TrustBar />

      {/* ── Stats Band ── */}
      <StatsBand />

      {/* ── How It Works with illustrations ── */}
      {steps?.length ? (
        <Section eyebrow="Simple process" title="How it works — 3 easy steps">
          <div className="step-grid">
            {steps.map((step, index) => (
              <article className="card card--step" key={step.title}>
                <div className="step-illustration">
                  <Image
                    src={stepIllustrations[index] ?? stepIllustrations[0]}
                    alt={step.title}
                    width={70}
                    height={70}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <span className="step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── Social Proof Split Section ── */}
      <SocialProofSection />

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── What You Get (Bullets) ── */}
      {bullets?.length ? (
        <Section eyebrow="Your benefits" title="What you get with a cash sale">
          <div className="card card--panel">
            <ul className="bullet-list">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* ── Comparison ── */}
      {comparison?.length ? (
        <Section eyebrow="Side by side" title="Cash sale vs. traditional listing" alt>
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

      {/* ── Areas ── */}
      {areas?.length ? (
        <Section eyebrow="Local focus" title="Areas we serve">
          <div className="pill-grid">
            {areas.map((area) => (
              <span className="pill pill--soft" key={area}>{area}</span>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── Nearby Links ── */}
      {nearbyLinks?.length ? (
        <Section eyebrow="Explore more" title="Nearby pages and related routes" alt>
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

      {/* ── FAQ ── */}
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

      {/* ── Final CTA ── */}
      <section className="section--cta">
        <div className="container cta-grid">
          <div>
            <p className="eyebrow">Ready to move?</p>
            <h2>{finalCtaTitle ?? 'Get your cash offer today'}</h2>
            <p className="lead lead--compact">{finalCtaLead ?? lead}</p>
          </div>
          <div className="cta-actions">
            <Link className="button button--lg" href={contactHref ?? '/contact'}>
              {ctaLabel ?? 'Get My Cash Offer'}
            </Link>
            <a className="button button--ghost" href="tel:+15612209399">
              Call (561) 220-9399
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
