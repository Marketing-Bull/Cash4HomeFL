import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildFaqPageProps } from '@/lib/page-content';

const page = buildFaqPageProps();

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
};

export default function FaqPage() {
  return <PageTemplate {...page} />;
}
