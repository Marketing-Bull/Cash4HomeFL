import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { getBlogParams, getBlogPostBySlug } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';
import { buildArticleSchema } from '@/lib/schema';

export function generateStaticParams() {
  return getBlogParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: 'Blog post not found' };
  }

  return buildPageMetadata({
    path: `/blog/${slug}`,
    title: post.title,
    description: post.metaDescription ?? post.description,
    ogType: 'article',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  const articleSchema = buildArticleSchema({
    type: 'BlogPosting',
    path: `/blog/${slug}`,
    headline: post.title,
    description: post.metaDescription ?? post.description,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ArticleTemplate {...post} />
    </>
  );
}
