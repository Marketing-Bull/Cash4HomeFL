import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildStatewidePageProps } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildStatewidePageProps('we-buy-houses');

export const metadata: Metadata = buildPageMetadata({
  path: '/we-buy-houses',
  title: page.metaTitle ?? page.title,
  description: page.metaDescription ?? page.lead,
});

export default function WeBuyHousesPage() {
  return <PageTemplate {...page} />;
}
