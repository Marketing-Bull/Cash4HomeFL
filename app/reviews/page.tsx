import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildReviewsArticle, sellerReviews } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

const page = buildReviewsArticle();

export const metadata: Metadata = buildPageMetadata({
  path: '/reviews',
  title: page.title,
  description: page.metaDescription ?? page.description,
});

export default function ReviewsPage() {
  return <ArticleTemplate {...page} reviews={sellerReviews} />;
}
