import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageTemplate } from '@/components/PageTemplate';
import { buildCityPageProps } from '@/lib/page-content';
import { getCityParams } from '@/lib/site-data';

export function generateStaticParams() {
  return getCityParams();
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const page = buildCityPageProps(params.city);
  if (!page) {
    return { title: 'City not found' };
  }

  return {
    title: page.title,
    description: page.lead,
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const page = buildCityPageProps(params.city);
  if (!page) notFound();
  return <PageTemplate {...page} />;
}
