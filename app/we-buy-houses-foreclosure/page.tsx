import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';

const page = buildSituationPageProps('foreclosure')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
};

export default function ForeclosurePage() {
  return <PageTemplate {...page} />;
}
