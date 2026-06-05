import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildStatewidePageProps } from '@/lib/page-content';

const page = buildStatewidePageProps('we-buy-houses');

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  alternates: {
    canonical: 'https://cash4homefl.vercel.app/we-buy-houses',
  },
};

export default function WeBuyHousesPage() {
  return <PageTemplate {...page} />;
}
