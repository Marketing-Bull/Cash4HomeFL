import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildTermsArticle } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildTermsArticle();

export const metadata: Metadata = buildPageMetadata({
  path: '/terms',
  title: 'Terms of Service',
  description: page.metaDescription ?? page.description,
});

export default function TermsPage() {
  return <ArticleTemplate {...page} />;
}
