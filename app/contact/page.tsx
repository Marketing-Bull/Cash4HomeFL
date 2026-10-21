import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildContactPageProps } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Contact | cash4homefl.com',
  description: 'Send your property details and request a cash offer.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = buildContactPageProps(searchParams);
  return <PageTemplate {...page} />;
}
