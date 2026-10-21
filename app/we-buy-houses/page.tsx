import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildStatewidePageProps } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildStatewidePageProps('we-buy-houses');

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  alternates: {
    canonical: `${SITE_URL}/we-buy-houses`,
  },
};

export default function WeBuyHousesPage() {
  return <PageTemplate {...page} />;
}
