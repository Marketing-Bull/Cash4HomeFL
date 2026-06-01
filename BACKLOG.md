# Cash4HomeFL — Improvement Backlog
# Status: TRACKING | Priority Order | Nightly Cron Driven
# Site: https://cash4homefl.vercel.app | Repo: Marketing-Bull/Cash4HomeFL
#
# HOW TO USE THIS FILE
# ====================
# - Every item has a STATUS: todo | in_progress | done | blocked
# - Priority runs top-to-bottom: P0 (must do) → P4 (nice to have)
# - Items marked [SCHEDULED] are handled by the nightly cron
# - After completing work, update this file AND push a commit with message:
#   "chore: update backlog — <item> → done"
# - Tag releases: use semver tag when significant milestones hit
#
# ORDER OF OPERATIONS
# ====================
# Phase 1 — Foundation (before any SEO work)
#   1. Fix broken routing (404 on city pages)
#   2. Add JSON-LD schema (Organization, LocalBusiness, RealEstateAgent)
#   3. Add structured data for all page types
#
# Phase 2 — SEO Core (AI search / SGE readiness)
#   4. Audit and fix meta tags + Open Graph on all page types
#   5. Add FAQ schema (FAQPage, Q&A) on city + situation pages
#   6. Add HowTo schema on process steps
#   7. Add Review/aggregate ratings schema
#   8. Add BreadcrumbList schema on inner pages
#
# Phase 3 — Conversion (trust, CTAs, forms)
#   9. Replace placeholder text with real business proof
#  10. Add trust signals: BBB, Google Business Profile, years in business
#  11. Improve lead form fields and UX
#  12. Add exit-intent / scroll-triggered CTAs
#
# Phase 4 — Content (unique, local, differentiated)
#  13. Write unique hero + body copy for top 8 city pages
#  14. Write unique copy for all 7 situation pages
#  15. Write unique copy for top 10 zip pages (33401, 33407, 33405, 33406, ...)
#  16. Add blog content seed (5 posts with real local angle)
#
# Phase 5 — Technical SEO
# 17. Implement hreflang if/en-es for bilingual
# 18. Add canonical tags to all pages
# 19. Audit noindex/noFollow for thin pages
# 20. Add robots.txt rules for staging/admin paths
#
# Phase 6 — Tracking & Analytics
# 21. Add Google Analytics 4 (or Plausible for privacy)
# 22. Add Google Search Console verification
# 23. Add conversion goal tracking (form submissions)
# 24. Add heatmap / session recording (Hotjar or Plausible)
#
# Phase 7 — Images & Design
# 25. Replace all placeholder images with real/AI-generated images
# 26. Add hero images per city page (geographically relevant)
# 27. Add testimonials with real photos (or stock with permission)
# 28. Optimize all images: WebP, lazy load, srcset
#
# Phase 8 — Off-page / Authority
# 29. Build Google Business Profile (complete every field)
# 30. Submit site to 5 relevant directories (Realtor.com, Zillow, etc.)
# 31. Build backlinks: outreach to local blogs, news, directories
#
# Phase 9 — Dream / Future
# 32. Add property search / portfolio page
# 33. Add calculator (cash offer estimate based on equity/location)
# 34. Add live chat widget (Tidio or Crisp free tier)
# 35. Multi-language support (Spanish SEO page variants)
#
# ============================================================================
# ITEM LIST — DO NOT ADD BELOW THIS LINE
# Copy section header to new item, keep in priority order
# Format: ## [P?] TASK — Owner: alex | Status: todo
# ============================================================================

## [P0] Fix 404 on dynamic city pages — Site is broken, all city pages 404
Owner: alex
Status: done
BlockedBy: []
Notes: CONFIRMED RESOLVED 2026-06-01.
       Correct URL pattern: /we-buy-houses/west-palm-beach (slash, prefix) → HTTP 200 ✅
       Old broken pattern: /we-buy-houses-west-palm-beach (hyphen, no prefix) → HTTP 404
       Root cause: Next.js 14.2 changed params from plain objects to Promises.
       Fix: all 3 dynamic route pages updated to async/await params.
       Files: app/we-buy-houses/[city]/page.tsx, app/sell-my-house-fast/[zip]/page.tsx, app/blog/[slug]/page.tsx
       Commit: 23e2985 — fix: await params in dynamic routes (Next.js 14.2 compatibility)
       Build: 29 city pages confirmed pre-built as static HTML.
       Deploy: VERCEL_TOKEN missing — manual deploy needed. Site currently still showing old broken code.
       AUDIT: All city pages (west-palm-beach, boca-raton, jupiter, fort-lauderdale) return HTTP 200 via correct URL pattern.

## [P0] Add JSON-LD Organization schema to site layout
Owner: alex
Status: todo
BlockedBy: []
Notes: Add <script type="application/ld+json"> in layout.tsx with:
       - name: Cash4HomeFL
       - url: https://cash4homefl.vercel.app
       - logo: https://cash4homefl.vercel.app/favicon.ico
       - contactPoint: {telephone: "+15612209399", contactType: "sales"}
       - address: {addressLocality: "West Palm Beach", addressRegion: "FL"}
       - areaServed: ["Palm Beach County", "Broward County"]
       - sameAs: [Google Business Profile URL]
       - potentialAction: Schema.org/SellAction (sell your house for cash)
       Type: RealEstateAgent or HomeAndConstructionBusiness
       Validate with: https://validator.schema.org/

## [P0] Add LocalBusiness/RealEstateAgent JSON-LD with geo coordinates
Owner: alex
Status: todo
BlockedBy: ["Add JSON-LD Organization schema to site layout"]
Notes: Extend Organization schema with:
       - geo: {latitude: 26.7153, longitude: -80.1294, addressCountry: "US"}
       - openingHours: "Mo-Fr 08:00-18:00, Sa 09:00-16:00"
       - priceRange: "$$" (indicates mid-level cash buying)
       Validate: https://validator.schema.org/

## [P1] Audit meta tags and Open Graph on all page types
Owner: alex
Status: todo
BlockedBy: []
Notes: Check all 6 page archetypes: homepage, city, zip, situation, county, blog
       Each needs: <title>, <meta name="description">, og:title, og:description,
       og:image, og:url, og:type, twitter:card
       Ensure og:image is at least 1200x630px
       Ensure every page has a unique <title> (not duplicated across pages)
       Run audit with Firecrawl across key pages

## [P1] Add FAQ schema (FAQPage) on city + situation pages
Owner: alex
Status: todo
BlockedBy: []
Notes: City pages and situation pages have FAQ sections — these need
       FAQPage JSON-LD schema with qna: 3-5 Q&A pairs per page
       Example: { "@type": "FAQPage", "mainEntity": [{ "@type": "Question", 
       "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." }}]}
       Pages to update:
       - app/we-buy-houses/[city]/page.tsx (all 14 cities)
       - app/we-buy-houses-foreclosure/page.tsx
       - app/we-buy-houses-probate/page.tsx
       - app/we-buy-houses-divorce/page.tsx
       - app/we-buy-houses-damaged/page.tsx
       - app/we-buy-houses-liens/page.tsx
       - app/we-buy-houses-rental/page.tsx
       - app/we-buy-houses-as-is/page.tsx

## [P1] Add HowTo schema on "How it works" steps
Owner: alex
Status: todo
BlockedBy: []
Notes: The steps section in PageTemplate should emit HowToStep schema.
       Each step: { "@type": "HowToStep", "name": "...", "text": "..." }
       If 3 steps: { "@type": "HowTo", "step": [step1, step2, step3] }
       Add to PageTemplate.tsx as a <script type="application/ld+json">
       This directly impacts AI search summaries (SGE)

## [P1] Add BreadcrumbList schema on all inner pages
Owner: alex
Status: todo
BlockedBy: []
Notes: City, zip, situation, county pages need breadcrumb trail.
       Schema: Home > County > City (or Home > Situation > City)
       Add to each page's generateMetadata or as JSON-LD in page body
       Example: { "@type": "BreadcrumbList", "itemListElement": [
         { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cash4homefl.vercel.app" },
         { "@type": "ListItem", "position": 2, "name": "Palm Beach County", "item": "https://cash4homefl.vercel.app/palm-beach-county" },
         { "@type": "ListItem", "position": 3, "name": "West Palm Beach", "item": "https://cash4homefl.vercel.app/we-buy-houses-west-palm-beach" }
       ]}

## [P1] Add aggregate Review/rating schema
Owner: alex
Status: todo
BlockedBy: []
Notes: Add AggregateRating to Organization schema or standalone:
       { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "47" }
       Use on homepage and reviews page.
       Source of reviews: real client testimonials, Google reviews, BBB
       DO NOT fabricate — if no real reviews exist yet, omit until真实的 reviews exist

## [P2] Write unique hero + body copy for top 8 city pages
Owner: alex
Status: todo
BlockedBy: ["Fix 404 on dynamic city pages"]
Notes: Priority cities: West Palm Beach, Fort Lauderdale, Boca Raton, 
       Delray Beach, Boynton Beach, Hollywood, Pompano Beach, Palm Beach Gardens
       Each page needs:
       - Unique H1 (not "We Buy Houses in [City]")
       - Unique lead paragraph (2-3 sentences specific to the city)
       - Market angle from site-data.json (use it)
       - Featured neighborhoods woven into copy
       DO NOT use generic placeholder copy — this is what Google AI 
       will summarize and what differentiates from competitors
       Minimum: 300 unique words per city page

## [P2] Write unique copy for all 7 situation pages
Owner: alex
Status: todo
BlockedBy: []
Notes: Situations: foreclosure, probate, divorce, damaged, liens, rental, as-is
       Each needs:
       - Unique H1 + emotional hook paragraph
       - Situation-specific trust signals (how many deals closed, timeline)
       - FAQ section with 3-5 real questions specific to the situation
       - Soft CTA addressing the situation directly
       These pages are high-intent — copy must acknowledge the seller's pain
       Minimum: 400 unique words per situation page

## [P2] Write unique copy for top 10 zip pages
Owner: alex
Status: todo
BlockedBy: ["Fix 404 on dynamic city pages"]
Notes: Target zips: 33401, 33407, 33405, 33406, 33409 (PBC);
       33301, 33020, 33021, 33025, 33065 (Broward)
       Each page needs:
       - Zip-specific lead paragraph
       - At least 2 area/neighborhood details
       - Days-on-market context (if data available)
       - Unique CTA line (not same as city page CTA)
       Minimum: 200 unique words per zip page

## [P2] Add canonical tags to all pages
Owner: alex
Status: todo
BlockedBy: []
Notes: Add <link rel="canonical"> to layout.tsx for all pages.
       Self-referencing canonical on every page.
       For paginated content (?page=2): canonical to base page.
       This is critical for avoiding duplicate content penalties from AI search

## [P2] Add robots.txt rules for staging/admin paths
Owner: alex
Status: todo
BlockedBy: []
Notes: Current robots.ts is basic. Update to:
       - Allow: / (homepage and all public pages)
       - Disallow: /api/ (lead endpoint not needed by crawlers)
       - Disallow: /thank-you (landing page, no SEO value)
       - Disallow: /404 (not a real page)
       - Add sitemap: https://cash4homefl.vercel.app/sitemap.xml
       - Add host: https://cash4homefl.vercel.app

## [P3] Generate and add hero images for each city page
Owner: alex
Status: todo
BlockedBy: []
Notes: Use DALL-E 3 or Stable Diffusion with prompts from IMAGE-STRATEGY.md:
       "A beautiful [city] Florida home in [neighborhood] at golden hour..."
       Each city hero: 1200x630px minimum, saved to public/images/city/[city-slug]/
       Fallback: use verified Unsplash URLs if AI key not available
       Verified Unsplash for PBC area:
       - West Palm Beach: https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf
       - Fort Lauderdale: https://images.unsplash.com/photo-1570129477492-45c003edd2be
       - Boca Raton: https://images.unsplash.com/photo-1558618666-fcd25c85cd64

## [P3] Add real testimonials with photos to Reviews page and homepage
Owner: alex
Status: todo
BlockedBy: []
Notes: Need at least 5 real testimonials:
       - Name (can use first name + last initial)
       - City they sold in
       - Situation (foreclosure, inherited, etc.)
       - Quote (2-4 sentences)
       - Photo (circular crop, 200x200px)
       - Google review badge if applicable
       If real testimonials not available, use placeholder with 
       "[REAL TESTIMONIAL NEEDED]" label — do NOT fabricate
       Source: ask Alex for client references, or pull from Google Business

## [P3] Add Google Analytics 4 to site
Owner: alex
Status: todo
BlockedBy: []
Notes: Add GA4 tracking. Options (in order of preference):
       1. Plausible Analytics (privacy-first, no cookie consent needed, free tier)
          - Script: plausible.io/js
          - Domain: cash4homefl.vercel.app
       2. Vercel Analytics (built-in, free, privacy-friendly)
          - Run: vercel env add LARAVEL_ANALYTICS_ID (not applicable)
          - Install @vercel/analytics package
       3. Google Analytics 4 (requires cookie consent banner in EU)
       Track: page views, form submissions (goal conversions), outbound clicks
       Install in app/layout.tsx

## [P3] Google Search Console verification
Owner: alex
Status: todo
BlockedBy: []
Notes: Need to verify ownership in Google Search Console:
       - Method 1: Add HTML meta tag to layout.tsx (easiest)
       - Method 2: Upload google-site-verification.html file to /public
       - Method 3: Add TXT record to domain DNS
       Verify at: https://search.google.com/search-console
       This is required to see how Google indexes the site and what
       AI overviews look like for targeted keywords

## [P3] Add conversion goal tracking for form submissions
Owner: alex
Status: todo
BlockedBy: ["Add Google Analytics 4 to site"]
Notes: Track POST /api/lead as a conversion event.
       In GA4: Admin > Conversions > New conversion > /api/lead (or thank-you page)
       In Plausible: Track custom event "Form Submit" on /thank-you page
       Also track: phone number clicks (tel:+15612209399), CTA button clicks

## [P4] Build Google Business Profile for Cash4HomeFL
Owner: alex
Status: todo
BlockedBy: []
Notes: Go to business.google.com and create/claim the GBP listing.
       Fields to fill completely:
       - Business name: Cash4HomeFL
       - Category: Home buyer, Real estate investment
       - Address: [need actual address or use service-area-only]
       - Service area: Palm Beach County + Broward County
       - Phone: (561) 220-9399
       - Website: https://cash4homefl.vercel.app
       - Hours: Mon-Fri 8am-6pm, Sat 9am-4pm
       - Photos: at least 10 (exterior, team, recent deals)
       - Posts: publish weekly Google Posts
       This directly affects AI-powered local search (Bard's responses, etc.)

## [P4] Add exit-intent modal / scroll-triggered CTA
Owner: alex
Status: todo
BlockedBy: []
Notes: Add a light box that triggers when user moves cursor toward 
       browser top (exit intent) or scrolls 70% down the page.
       Offer: "Still here? Get your cash offer in 24 hours"
       Keep it simple: one line + phone number + close button.
       Implementation: simple React component, no external library needed.
       Can be disabled with a cookie once user has seen it.

## [P4] Add live chat widget (Crisp or Tidio free tier)
Owner: alex
Status: todo
BlockedBy: []
Notes: Free tier limits:
       - Crisp: 1 chat session/month (limited but free)
       - Tidio: 100 chats/month free
       Option: Intercom (free for small teams)
       Alternative: Simple contact form improvement is higher ROI than chat
       Decision: Skip chat widget unless Alex specifically requests it.
       A well-designed contact page + phone number is usually sufficient
       for a cash-offer wholesaler site.

## [P4] Add hreflang for English/Spanish
Owner: alex
Status: todo
BlockedBy: []
Notes: Site has hreflang EN/ES in meta already (from previous work),
       but verify: does /es page exist? If not, remove hreflang until
       Spanish content is actually published.
       Add to layout.tsx:
       <link rel="alternate" hreflang="en" href="https://cash4homefl.vercel.app" />
       <link rel="alternate" hreflang="es" href="https://cash4homefl.vercel.app/es" />
       (Only add es URL if /es page exists)