import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageTemplate } from '@/components/PageTemplate';
import { buildZipPageProps } from '@/lib/page-content';
import { getZipParams } from '@/lib/site-data';

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
      url: `https://cash4homefl.vercel.app/sell-my-house-fast/${zip}`,
      type: 'website',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: page.title }],
    },
    alternates: {
      canonical: `https://cash4homefl.vercel.app/sell-my-house-fast/${zip}`,
    },
  };
}

export default async function ZipPage({ params }: { params: Promise<{ zip: string }> }) {
  const { zip } = await params;
  const page = buildZipPageProps(zip);
  if (!page) notFound();
  return <PageTemplate {...page} />;
}
