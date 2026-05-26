import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';

const page = buildSituationPageProps('as-is')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
};

export default function AsIsPage() {
  return <PageTemplate {...page} />;
}
