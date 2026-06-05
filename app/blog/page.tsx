import Link from 'next/link';
import type { Metadata } from 'next';
import { buildBlogIndexProps } from '@/lib/page-content';

const page = buildBlogIndexProps();

export const metadata: Metadata = {
  title: page.title,
  description: page.lead,
  alternates: {
    canonical: 'https://cash4homefl.vercel.app/blog',
  },
};

export default function BlogIndexPage() {
  return (
    <main className="page-shell">
      <section className="section section--article">
        <div className="container article">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.lead}</p>

          <div className="link-grid article-links">
            {page.posts.map((post) => (
              <Link className="card card--link" href={`/blog/${post.slug}`} key={post.slug}>
                <span>
                  <strong>{post.title}</strong>
                  <br />
                  <span className="muted">{post.description}</span>
                </span>
                <span className="card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
