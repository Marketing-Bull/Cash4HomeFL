export type FormDefaults = {
  address?: string;
  phone?: string;
  email?: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type StepItem = {
  title: string;
  description: string;
};

export type ComparisonRow = {
  label: string;
  traditional: string;
  cash: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Review = {
  name: string;
  city: string;
  situation: string;
  quote: string;
  outcome: string;
  date: string;
};

export type PageTemplateProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  /** <meta name="description"> text (110-160 chars). Falls back to `lead` when omitted. */
  metaDescription?: string;
  /** <title> override when the on-page H1 `title` is too long for a search result. */
  metaTitle?: string;
  trust?: string[];
  stats?: StatItem[];
  steps?: StepItem[];
  bullets?: string[];
  comparison?: ComparisonRow[];
  areas?: string[];
  nearbyLinks?: LinkItem[];
  /** Full crawlable link list rendered as a directory section (hub pages). */
  directory?: { eyebrow: string; title: string; links: LinkItem[] };
  faq?: FaqItem[];
  ctaLabel?: string;
  finalCtaTitle?: string;
  finalCtaLead?: string;
  contactHref?: string;
  formDefaults?: FormDefaults;
  breadcrumbs?: LinkItem[];
};

export type ArticleTemplateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  /** <meta name="description"> text (110-160 chars). Falls back to `description` when omitted. */
  metaDescription?: string;
  paragraphs: string[];
  bullets?: string[];
  relatedLinks?: LinkItem[];
  ctaLabel?: string;
  ctaHref?: string;
  reviews?: Review[];
};
