import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildCountyPageProps } from '@/lib/page-content';

const page = buildCountyPageProps('broward-county')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
};

export default function BrowardCountyPage() {
  return <PageTemplate {...page} />;
}
