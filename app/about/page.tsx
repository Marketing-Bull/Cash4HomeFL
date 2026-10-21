import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildAboutArticle } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildAboutArticle();

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return <ArticleTemplate {...page} />;
}
