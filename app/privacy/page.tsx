import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildPrivacyArticle } from '@/lib/page-content';

const page = buildPrivacyArticle();

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function PrivacyPage() {
  return <ArticleTemplate {...page} />;
}
