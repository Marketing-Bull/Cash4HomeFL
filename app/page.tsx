import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildHomepageProps } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildHomepageProps();

export const metadata: Metadata = buildPageMetadata({
  path: '/',
  title: page.metaTitle ?? page.title,
  description: page.metaDescription ?? page.lead,
});

export default function HomePage() {
  return <PageTemplate {...page} />;
}
