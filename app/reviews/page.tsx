import type { Metadata } from 'next';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { buildReviewsArticle, sellerReviews } from '@/lib/page-content';
import { SITE_URL } from '@/lib/site-url';

const page = buildReviewsArticle();

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
};

export default function ReviewsPage() {
  return <ArticleTemplate {...page} reviews={sellerReviews} />;
}
