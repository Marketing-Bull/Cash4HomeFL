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
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const page = buildCityPageProps(city);
  if (!page) notFound();
  return <PageTemplate {...page} />;
}
