import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildAboutArticle } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildAboutArticle();

export const metadata: Metadata = buildPageMetadata({
  path: '/about',
  title: page.title,
  description: page.metaDescription ?? page.description,
});

export default function AboutPage() {
  return <ArticleTemplate {...page} />;
}
