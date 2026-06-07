import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',         // POST endpoint for lead capture — no SEO value, no crawler need
          '/thank-you',    // post-conversion landing page — no SEO value
          '/404',          // not a real page; prevents accidental indexing of error responses
        ],
      },
    ],
    sitemap: 'https://cash4homefl.vercel.app/sitemap.xml',
    // Note: 'host' directive was deprecated by Google in 2018 — canonical host is set
    // via <link rel="canonical"> in the layout, not robots.txt.
  };
}
