import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { buildContactPageProps } from '@/lib/page-content';

export const metadata: Metadata = {
  title: 'Contact | cash4homefl.com',
  description: 'Send your property details and request a cash offer.',
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = buildContactPageProps(searchParams);
  return <PageTemplate {...page} />;
}
