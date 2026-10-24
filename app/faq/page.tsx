import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildFaqPageProps } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildFaqPageProps();

export const metadata: Metadata = buildPageMetadata({
  path: '/faq',
  title: page.metaTitle ?? page.title,
  description: page.metaDescription ?? page.lead,
});

export default function FaqPage() {
  return <PageTemplate {...page} />;
}
