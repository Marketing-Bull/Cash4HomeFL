import { socialImage } from '@/lib/social-metadata';
import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildSituationPageProps } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildSituationPageProps('divorce')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  openGraph: {
    title: page.title,
    description: page.lead,
    url: `${SITE_URL}/we-buy-houses-divorce`,
    type: 'website',
    images: [socialImage],
  },
  alternates: {
    canonical: `${SITE_URL}/we-buy-houses-divorce`,
  },
};

export default function DivorcePage() {
  return <PageTemplate {...page} />;
}
