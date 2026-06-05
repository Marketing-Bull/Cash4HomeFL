import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';

const page = buildSituationPageProps('rental')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  openGraph: {
    title: page.title,
    description: page.lead,
    url: 'https://cash4homefl.vercel.app/we-buy-houses-rental',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: page.title }],
  },
  alternates: {
    canonical: 'https://cash4homefl.vercel.app/we-buy-houses-rental',
  },
};

export default function RentalPage() {
  return <PageTemplate {...page} />;
}
