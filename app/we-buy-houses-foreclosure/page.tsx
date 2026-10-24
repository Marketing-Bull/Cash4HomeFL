import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildSituationPageProps('foreclosure')!;

export const metadata: Metadata = buildPageMetadata({
  path: '/we-buy-houses-foreclosure',
  title: page.metaTitle ?? page.title,
  description: page.metaDescription ?? page.lead,
});

export default function ForeclosurePage() {
  return <PageTemplate {...page} />;
}
