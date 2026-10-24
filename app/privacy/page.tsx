import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildPrivacyArticle } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildPrivacyArticle();

export const metadata: Metadata = buildPageMetadata({
  path: '/privacy',
  title: 'Privacy Policy',
  description: page.metaDescription ?? page.description,
});

export default function PrivacyPage() {
  return <ArticleTemplate {...page} />;
}
