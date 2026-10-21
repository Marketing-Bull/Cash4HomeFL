import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildFaqPageProps } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildFaqPageProps();

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

export default function FaqPage() {
  return <PageTemplate {...page} />;
}
