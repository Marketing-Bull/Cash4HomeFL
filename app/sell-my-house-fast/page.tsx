import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildStatewidePageProps } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildStatewidePageProps('sell-my-house-fast');

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  alternates: {
    canonical: `${SITE_URL}/sell-my-house-fast`,
  },
};

export default function SellMyHouseFastPage() {
  return <PageTemplate {...page} />;
}
