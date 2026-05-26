import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildAboutArticle } from '@/lib/page-content';

const page = buildAboutArticle();

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function AboutPage() {
  return <ArticleTemplate {...page} />;
}
