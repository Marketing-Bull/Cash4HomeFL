import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildPrivacyArticle } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildPrivacyArticle();

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return <ArticleTemplate {...page} />;
}
