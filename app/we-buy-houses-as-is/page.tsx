import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';

const page = buildSituationPageProps('as-is')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  openGraph: {
    title: page.title,
    description: page.lead,
    url: 'https://cash4homefl.vercel.app/we-buy-houses-as-is',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: page.title }],
  },
  alternates: {
    canonical: 'https://cash4homefl.vercel.app/we-buy-houses-as-is',
  },
};

export default function AsIsPage() {
  return <PageTemplate {...page} />;
}
