import { socialImage } from '@/lib/social-metadata';
import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildCountyPageProps } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildCountyPageProps('palm-beach-county')!;

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  openGraph: {
    title: page.title,
    description: page.lead,
    url: `${SITE_URL}/palm-beach-county`,
    type: 'website',
    images: [socialImage],
  },
  alternates: {
    canonical: `${SITE_URL}/palm-beach-county`,
  },
};

export default function PalmBeachCountyPage() {
  return <PageTemplate {...page} />;
}
