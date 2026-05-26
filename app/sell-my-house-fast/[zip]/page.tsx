import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageTemplate } from '@/components/PageTemplate';
import { buildZipPageProps } from '@/lib/page-content';
import { getZipParams } from '@/lib/site-data';

export function generateStaticParams() {
  return getZipParams();
}

export function generateMetadata({ params }: { params: { zip: string } }): Metadata {
  const page = buildZipPageProps(params.zip);
  if (!page) {
    return { title: 'Zip not found' };
  }

  return {
    title: page.title,
    description: page.lead,
  };
}

export default function ZipPage({ params }: { params: { zip: string } }) {
  const page = buildZipPageProps(params.zip);
  if (!page) notFound();
  return <PageTemplate {...page} />;
}
