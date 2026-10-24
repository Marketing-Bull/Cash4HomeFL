import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { getBlogParams, getBlogPostBySlug } from '@/lib/page-content';
import { buildPageMetadata } from '@/lib/seo';
import { ORG_REF } from '@/lib/schema';
import { SITE_URL } from '@/lib/site-url';
import { socialImage } from '@/lib/social-metadata';

// Date the blog launched (all posts were added together); posts carry no per-post date yet.
const BLOG_PUBLISHED = '2026-06-09';

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
  const url = `${SITE_URL}/blog/${slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription ?? post.description,
    image: `${SITE_URL}${socialImage.url}`,
    datePublished: BLOG_PUBLISHED,
    author: ORG_REF,
    publisher: ORG_REF,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ArticleTemplate {...post} />
    </>
  );
}
