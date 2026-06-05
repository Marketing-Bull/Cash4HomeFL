import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildTermsArticle } from '@/lib/page-content';

const page = buildTermsArticle();

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: 'https://cash4homefl.vercel.app/terms',
  },
};

export default function TermsPage() {
  return <ArticleTemplate {...page} />;
}
