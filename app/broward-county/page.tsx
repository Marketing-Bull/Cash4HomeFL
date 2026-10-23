import { socialImage } from '@/lib/social-metadata';
import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildCountyPageProps } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildCountyPageProps('broward-county')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  openGraph: {
    title: page.title,
    description: page.lead,
    url: `${SITE_URL}/broward-county`,
    type: 'website',
    images: [socialImage],
  },
  alternates: {
    canonical: `${SITE_URL}/broward-county`,
  },
};

export default function BrowardCountyPage() {
  return <PageTemplate {...page} />;
}
