import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';

const page = buildSituationPageProps('damaged')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
};

export default function DamagedPage() {
  return <PageTemplate {...page} />;
}
