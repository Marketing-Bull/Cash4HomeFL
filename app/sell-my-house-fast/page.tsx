import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildStatewidePageProps } from '@/lib/page-content';

const page = buildStatewidePageProps('sell-my-house-fast');

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
};

export default function SellMyHouseFastPage() {
  return <PageTemplate {...page} />;
}
