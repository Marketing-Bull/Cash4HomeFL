import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildSituationPageProps('liens')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  openGraph: {
    title: page.title,
    description: page.lead,
    url: `${SITE_URL}/we-buy-houses-liens`,
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: page.title }],
  },
  alternates: {
    canonical: `${SITE_URL}/we-buy-houses-liens`,
  },
};

export default function LiensPage() {
  return <PageTemplate {...page} />;
}
