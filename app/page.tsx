import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildHomepageProps } from '@/lib/page-content';

const page = buildHomepageProps();

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
};

export default function HomePage() {
  return <PageTemplate {...page} />;
}
