import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildReviewsArticle, sellerReviews } from '@/lib/page-content';

const page = buildReviewsArticle();

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function ReviewsPage() {
  return <ArticleTemplate {...page} reviews={sellerReviews} />;
}
