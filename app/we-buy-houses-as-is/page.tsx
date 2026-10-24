import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildSituationPageProps('as-is')!;

export const metadata: Metadata = buildPageMetadata({
  path: '/we-buy-houses-as-is',
  title: page.metaTitle ?? page.title,
  description: page.metaDescription ?? page.lead,
});

export default function AsIsPage() {
  return <PageTemplate {...page} />;
}
