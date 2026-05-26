import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { getBlogParams, getBlogPostBySlug } from '@/lib/page-content';

export function generateStaticParams() {
  return getBlogParams();
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: 'Blog post not found' };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();
  return <ArticleTemplate {...post} />;
}
