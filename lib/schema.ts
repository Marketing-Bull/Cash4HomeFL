import { SITE_URL } from '@/lib/site-url';

/** Stable @id so other JSON-LD nodes (WebSite publisher, Article author/publisher) can reference the business. */
export const ORG_ID = `${SITE_URL}/#organization`;

/** Square 512x512 logo; Google requires at least 112x112 and rejects a 16px favicon. */
export const LOGO_URL = `${SITE_URL}/images/logo/logo-512.png`;

export const BUSINESS_PHONE = '+15612209399';
export const BUSINESS_EMAIL = 'hello@cash4homefl.com';

/** Plain Organization (not a LocalBusiness subtype, so no address is required) for `publisher` / `author` fields. */
export const ORG_REF = {
  '@type': 'Organization',
  name: 'Cash4HomeFL',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
} as const;
