# cash4homefl.com Site Architecture

## Goal

Build a Florida wholesaler website that can rank quickly in **Palm Beach County** and **Broward** by combining:

- high-intent local landing pages
- dynamic city / zip pages
- situation-based pages
- strong internal linking
- trust proof and real seller objections
- fast, clean technical SEO

## Recommended implementation pattern

Use **one template per intent class** instead of dozens of hand-built static pages.

### Template classes

- Homepage
- County page
- City page
- Zip page
- Situation page
- Situation + city page
- Property type page
- Blog post
- FAQ / Reviews / About

## Core URL structure

### Core pages

- `/` — homepage
- `/we-buy-houses` — statewide service page
- `/sell-my-house-fast` — primary offer page
- `/about` — local story and credibility
- `/reviews` — testimonials and proof
- `/faq` — objections and schema
- `/contact` — phone, form, text, email
- `/privacy` — privacy policy
- `/terms` — terms of service

### County pages

- `/palm-beach-county`
- `/broward-county`

### City pages

- `/we-buy-houses/[city]`
  - `/we-buy-houses/west-palm-beach`
  - `/we-buy-houses/fort-lauderdale`
  - `/we-buy-houses/boca-raton`
  - `/we-buy-houses/delray-beach`
  - etc.

### Zip pages

- `/sell-my-house-fast/[zip]`
  - `/sell-my-house-fast/33401`
  - `/sell-my-house-fast/33407`
  - `/sell-my-house-fast/33301`
  - `/sell-my-house-fast/33020`
  - etc.

### Situation pages

- `/we-buy-houses-foreclosure`
- `/we-buy-houses-probate`
- `/we-buy-houses-divorce`
- `/we-buy-houses-damaged`
- `/we-buy-houses-liens`
- `/we-buy-houses-rental`
- `/we-buy-houses-as-is`

### Situation + city pages

- `/we-buy-houses-foreclosure/west-palm-beach`
- `/we-buy-houses-probate/fort-lauderdale`
- `/we-buy-houses-divorce/boca-raton`

### Property type pages

- `/sell-my-condo-fast`
- `/sell-my-townhouse-fast`
- `/sell-multifamily-property`
- `/sell-vacant-land`
- `/sell-mobile-home-fast`

### Blog

- `/blog`
- `/blog/[slug]`

## Page composition rules

Every money page should reuse the same conversion blocks:

1. **Hero** — headline, subhead, address form, phone, trust bar
2. **How it works** — 3 steps
3. **Local proof** — reviews, testimonials, local presence
4. **Situation blocks** — inherited, foreclosure, divorce, bad tenants, repairs
5. **Comparison** — cash sale vs traditional listing
6. **FAQ** — schema-friendly objections
7. **Nearby links** — internal links to adjacent city/zip pages
8. **Final CTA** — repeated address form and call button

## SEO rules

### Title pattern

- City page: `We Buy Houses in {City}, FL | Cash Offer in 24 Hours`
- Zip page: `Sell My House Fast {Zip} | Cash Home Buyers {Zip}`
- Situation page: `Sell Your House During {Situation} in Florida`

### H1 pattern

- One clear H1 only
- Example: `We Buy Houses in West Palm Beach, Florida`

### Meta description pattern

Include:
- city or zip
- no repairs / no fees
- fast closing
- call to action

### Schema

Add:
- LocalBusiness
- FAQPage
- Review / AggregateRating where valid
- Service
- BreadcrumbList

### Canonical + indexing

- Use canonical URLs for every page
- Keep thin pages `noindex` until they are unique enough
- Only index pages that have unique city / zip data, local proof, and sufficient copy

## Ranking-quick strategy

Do not try to index everything at once.

### Phase 1 — launch first

- Homepage
- County pages
- Top city pages:
  - West Palm Beach
  - Fort Lauderdale
  - Boca Raton
  - Delray Beach
  - Boynton Beach
  - Hollywood
  - Pembroke Pines
  - Miramar
  - Pompano Beach
  - Coral Springs
- FAQ, Reviews, About

### Phase 2 — next

- Remaining city pages
- Top zip pages
- Situation pages
- Situation + city combinations

### Phase 3 — support content

- Blog posts
- Neighborhood pages if needed
- Comparison posts
- Seller education posts

## Data model

Keep the site content in a few simple source files.

### Required objects

- `county`
- `city`
- `zip`
- `situation`
- `propertyType`
- `faqItem`
- `testimonial`
- `reviewSnippet`
- `imageAsset`

### Example fields for city data

- `name`
- `slug`
- `county`
- `priority`
- `zips[]`
- `marketAngle`
- `featuredNeighborhoods[]`
- `nearbyCities[]`
- `heroLine`
- `ctaLine`

### Example fields for zip data

- `zip`
- `slug`
- `primaryCity`
- `county`
- `priority`
- `heroLine`
- `localProofLine`

## Internal linking rules

- Homepage links to top city pages, county pages, and key situation pages
- Every city page links to nearby cities, county page, and related situation pages
- Every zip page links to its parent city and county page
- Every blog post links to 2-3 money pages

## Technical SEO checklist

- Fast page load
- Responsive images
- Lazy-load below-the-fold media
- Clean URL slugs
- XML sitemap
- Robots.txt
- Open Graph tags
- Twitter cards
- Breadcrumbs
- Mobile-friendly forms
- Click-to-call phone links
- Structured data

## What not to do

- Do not publish thin duplicate pages with only the city name swapped
- Do not use fake testimonials
- Do not rely on cheesy stock photos for the hero
- Do not require extra APIs to launch
- Do not hide the phone number
- Do not bury the form below long filler copy
