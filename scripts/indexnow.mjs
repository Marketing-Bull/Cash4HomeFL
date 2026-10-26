#!/usr/bin/env node
/**
 * Submits the site's sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver, etc.).
 *
 * Usage:
 *   node scripts/indexnow.mjs                 # submit every URL in the live sitemap
 *   node scripts/indexnow.mjs /faq /contact   # submit specific paths only
 *   DRY_RUN=1 node scripts/indexnow.mjs       # print what would be sent
 *
 * The key is public by design: IndexNow verifies it by fetching public/<key>.txt from the site.
 * SITE_URL overrides the origin (for local testing against `next start`).
 */

const KEY = '4351af69eb6d3b7154f79f008112214c';
const SITE_URL = (process.env.SITE_URL ?? 'https://cash4homefl.com').replace(/\/$/, '');
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function getUrls(paths) {
  if (paths.length) return paths.map((p) => new URL(p, SITE_URL).href);
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  return [...(await res.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

const keyLocation = `${SITE_URL}/${KEY}.txt`;
const keyRes = await fetch(keyLocation);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file not served at ${keyLocation} (HTTP ${keyRes.status}); deploy it before submitting.`);
  process.exit(1);
}

const urlList = await getUrls(process.argv.slice(2));
console.log(`Submitting ${urlList.length} URLs to IndexNow`);
if (process.env.DRY_RUN) process.exit(0);

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE_URL).host, key: KEY, keyLocation, urlList }),
});
// 200 = received, 202 = received and key validation pending; anything else is a failure.
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
