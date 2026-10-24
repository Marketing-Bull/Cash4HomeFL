import type { Metadata } from 'next';
import { socialImage } from '@/lib/social-metadata';
import { SITE_URL } from '@/lib/site-url';

type PageMetadataInput = {
  /** Site-relative path, e.g. `/we-buy-houses/davie`. Use `/` for the homepage. */
  path: string;
  title: string;
  description: string;
  /** Skip the root `%s | Cash4HomeFL` title template (title already carries the brand). */
  absoluteTitle?: boolean;
  ogType?: 'website' | 'article';
};

/**
 * One place that builds a page's title, description, canonical and Open Graph tags,
 * so `og:url` and `<link rel="canonical">` can never drift apart or fall back to the
 * homepage value. Next.js replaces `openGraph` wholesale when a page sets it, so the
 * site-wide OG fields are repeated here.
 */
export function buildPageMetadata({ path, title, description, absoluteTitle, ogType = 'website' }: PageMetadataInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      siteName: 'Cash4HomeFL',
      title,
      description,
      url,
      images: [socialImage],
    },
  };
}
