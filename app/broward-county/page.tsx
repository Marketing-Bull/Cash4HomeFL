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
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: page.title }],
  },
  alternates: {
    canonical: `${SITE_URL}/broward-county`,
  },
};

export default function BrowardCountyPage() {
  return <PageTemplate {...page} />;
}
