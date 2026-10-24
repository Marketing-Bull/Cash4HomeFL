import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { getBlogParams, getBlogPostBySlug } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';

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
  return <ArticleTemplate {...post} />;
}
