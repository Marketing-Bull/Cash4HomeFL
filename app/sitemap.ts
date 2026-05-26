import type { MetadataRoute } from 'next';
import { blogPosts, getBlogParams } from '@/lib/page-content';
import { getAllCounties, getCityParams, getSituationParams, getZipParams } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cash4homefl.com';
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/we-buy-houses`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/sell-my-house-fast`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/faq`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/reviews`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.6 },
  ];

  for (const county of getAllCounties()) {
    urls.push({ url: `${base}/${county.slug}`, changeFrequency: 'weekly', priority: 0.85 });
  }

  for (const params of getCityParams()) {
    urls.push({ url: `${base}/we-buy-houses/${params.city}`, changeFrequency: 'weekly', priority: 0.82 });
  }

  for (const params of getZipParams()) {
    urls.push({ url: `${base}/sell-my-house-fast/${params.zip}`, changeFrequency: 'weekly', priority: 0.75 });
  }

  for (const params of getSituationParams()) {
    urls.push({ url: `${base}/we-buy-houses-${params.slug}`, changeFrequency: 'monthly', priority: 0.65 });
  }

  for (const post of blogPosts) {
    urls.push({ url: `${base}/blog/${post.slug}`, changeFrequency: 'monthly', priority: 0.55 });
  }

  return urls;
}
