import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildContactPageProps } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  path: '/contact',
  title: 'Contact Cash4HomeFL | Request a Cash Offer',
  description:
    'Send your property details to Cash4HomeFL for a free, no-obligation cash offer in Palm Beach County or Broward. No repairs, no fees. Call or text.',
  absoluteTitle: true,
});

export default function ContactPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = buildContactPageProps(searchParams);
  return <PageTemplate {...page} />;
}
