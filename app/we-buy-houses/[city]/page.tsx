import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageTemplate } from '@/components/PageTemplate';
import { buildCityPageProps } from '@/lib/page-content';
import { getCityParams } from '@/lib/site-data';

export function generateStaticParams() {
  return getCityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const page = buildCityPageProps(city);
  if (!page) {
    return { title: 'City not found' };
  }

  return {
    title: page.title,
    description: page.lead,
    openGraph: {
      title: page.title,
      description: page.lead,
      url: `https://cash4homefl.vercel.app/we-buy-houses/${city}`,
      type: 'website',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: page.title }],
    },
    alternates: {
      canonical: `https://cash4homefl.vercel.app/we-buy-houses/${city}`,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const page = buildCityPageProps(city);
  if (!page) notFound();
  return <PageTemplate {...page} />;
}
