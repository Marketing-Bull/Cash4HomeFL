import { socialImage } from '@/lib/social-metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageTemplate } from '@/components/PageTemplate';
import { buildZipPageProps } from '@/lib/page-content';
import { getZipParams } from '@/lib/site-data';
import { SITE_URL } from '@/lib/site-url';

export function generateStaticParams() {
  return getZipParams();
}

export async function generateMetadata({ params }: { params: Promise<{ zip: string }> }): Promise<Metadata> {
  const { zip } = await params;
  const page = buildZipPageProps(zip);
  if (!page) {
    return { title: 'Zip not found' };
  }

  return {
    title: page.title,
    description: page.lead,
    openGraph: {
      title: page.title,
      description: page.lead,
      url: `${SITE_URL}/sell-my-house-fast/${zip}`,
      type: 'website',
      images: [socialImage],
    },
    alternates: {
      canonical: `${SITE_URL}/sell-my-house-fast/${zip}`,
    },
  };
}

export default async function ZipPage({ params }: { params: Promise<{ zip: string }> }) {
  const { zip } = await params;
  const page = buildZipPageProps(zip);
  if (!page) notFound();
  return <PageTemplate {...page} />;
}
