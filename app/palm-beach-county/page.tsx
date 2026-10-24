import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildCountyPageProps } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildCountyPageProps('palm-beach-county')!;

export const metadata: Metadata = buildPageMetadata({
  path: '/palm-beach-county',
  title: page.metaTitle ?? page.title,
  description: page.metaDescription ?? page.lead,
});

export default function PalmBeachCountyPage() {
  return <PageTemplate {...page} />;
}
