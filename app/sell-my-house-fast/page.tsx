import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildStatewidePageProps } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildStatewidePageProps('sell-my-house-fast');

export const metadata: Metadata = buildPageMetadata({
  path: '/sell-my-house-fast',
  title: page.metaTitle ?? page.title,
  description: page.metaDescription ?? page.lead,
});

export default function SellMyHouseFastPage() {
  return <PageTemplate {...page} />;
}
