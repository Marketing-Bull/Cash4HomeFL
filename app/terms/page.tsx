import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildTermsArticle } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildTermsArticle();

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return <ArticleTemplate {...page} />;
}
