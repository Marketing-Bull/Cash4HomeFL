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

export type PageTemplateProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  trust?: string[];
  stats?: StatItem[];
  steps?: StepItem[];
  bullets?: string[];
  comparison?: ComparisonRow[];
  areas?: string[];
  nearbyLinks?: LinkItem[];
  faq?: FaqItem[];
  ctaLabel?: string;
  finalCtaTitle?: string;
  finalCtaLead?: string;
  contactHref?: string;
  formDefaults?: FormDefaults;
};

export type ArticleTemplateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  paragraphs: string[];
  bullets?: string[];
  relatedLinks?: LinkItem[];
  ctaLabel?: string;
  ctaHref?: string;
};
