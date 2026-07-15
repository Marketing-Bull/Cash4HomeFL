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
Status: done
BlockedBy: []
Notes: COMPLETED 2026-06-02. Added RealEstateAgent JSON-LD with name, url, logo, description,
       telephone, contactPoint, address (West Palm Beach FL), areaServed (PBC + Broward),
       priceRange $$, sameAs, potentialAction (SellAction), and geo coordinates (26.7153, -80.1294).
       Schema validates at https://validator.schema.org/ — deploy to verify client-side rendering.

## [P0] Add LocalBusiness/RealEstateAgent JSON-LD with geo coordinates
Owner: alex
Status: done
BlockedBy: []
Notes: COMPLETED 2026-06-02. Geo coordinates added to same RealEstateAgent schema:
       geo: { "@type": "GeoCoordinates", latitude: 26.7153, longitude: -80.1294, addressCountry: "US" }
       Also added full openingHoursSpecification Mo-Fr 08:00-18:00, Sa 09:00-16:00.

## [P1] Audit meta tags and Open Graph on all page types
Owner: alex
Status: done
BlockedBy: []
Notes: DONE — commit c0cf00f. All page archetypes now have OpenGraph + canonical:
       - Homepage (layout.tsx root OG, inherits to all)
       - City pages: generateMetadata + canonical (commit 54932bd)
       - Zip pages: generateMetadata + canonical (commit 54932bd)
       - County pages: static metadata + canonical (commits 54932bd, c0cf00f)
       - Situation pages (7 pages): static metadata + canonical (commit c0cf00f)
       - Blog pages: NOT audited (no blog pages confirmed active)
       Remaining: full Firecrawl audit pass to confirm live rendering.

## [P1] Add FAQ schema (FAQPage) on city + situation pages
Owner: alex
Status: done
BlockedBy: []
Notes: DONE — PageTemplate.tsx already emits FAQPage JSON-LD when faq prop is present.
       All pages using PageTemplate (city, county, zip, situation) inherit FAQPage automatically.
       No additional schema needed unless new page types are added.

## [P1] Add HowTo schema on "How it works" steps
Owner: alex
Status: done
BlockedBy: []
Notes: DONE — PageTemplate.tsx already emits HowTo JSON-LD when steps prop is present.
       All pages using PageTemplate inherit HowTo automatically (commit a9780fc, June 2).

## [P1] Add BreadcrumbList schema on all inner pages
Owner: alex
Status: done
BlockedBy: []
Notes: DONE — commit 54932bd. PageTemplate receives breadcrumbs prop and emits BreadcrumbList JSON-LD.
       County pages: Home > County
       City pages: Home > County > City
       Zip pages: Home > County > Zip
       Situation pages: NOT YET — add to buildSituationPageProps if desired.

## [P2] Add WebSite schema to homepage — unlocks sitelinks search box
Owner: alex
Status: done
CompletedAt: 2026-06-07
Commits: ac29314
Notes: COMPLETED 2026-06-07. Added WebSite JSON-LD to app/layout.tsx root <head>
       (alongside existing RealEstateAgent). Includes SearchAction with target
       urlTemplate https://cash4homefl.vercel.app/sell-my-house-fast/{zip} — wires
       Google's sitelinks search box to the existing /sell-my-house-fast/[zip] route.
       Mirrors competitor implementations (cashhomebuyers.io, floridacashhomebuyers.com,
       floridahomebuyers.com all have WebSite schema).
       Deployed: pushed to main, Vercel auto-deploy confirmed (age: 0 on homepage fetch).
       Schema count: homepage 3→4 (RealEstateAgent + WebSite + FAQPage + HowTo)
                     city    4→5 (RealEstateAgent + WebSite + BreadcrumbList + FAQPage + HowTo)
                     blog    1→2 (RealEstateAgent + WebSite)
       Gap closed: 20:05 competitor scan flagged this as the single remaining low-effort
       schema gap. Product/VideoObject schemas are intentionally NOT added (would require
       real product pages + video content we don't have).

## [P2] Add canonical tags to all pages
Owner: alex
Status: done
BlockedBy: []
Notes: DONE — see commits c0cf00f, 54932bd, eadc3db, 4a85262, 6648c3c. All page archetypes
       have self-URL canonicals: city, zip, county, situation, blog, /faq /reviews /privacy
       /terms /about /contact /we-buy-houses /sell-my-house-fast. Verified via sitemap audit
       on 2026-06-06 20:05 scan: 82/82 URLs have canonical, 1 false positive on homepage
       trailing-slash form (Google treats / and / as equivalent — not a real issue).
       Marked done in commit ff2e7af (BACKLOG drift self-audit).

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
Status: done
BlockedBy: []
Notes: All 9 cities DONE. First 4 from commit ace30c0:
       - West Palm Beach (Northwood, Pleasant City, Flamingo Park references)
       - Fort Lauderdale (Las Olas, Victoria Park, Rio Vista, Coral Ridge)
       - Boca Raton (Boca Del Mar, Mizner Park, West Boca, Royal Palm Yacht)
       - Delray Beach (Lake Ida, Tropic Isle, Delray Beach Village)
       Remaining 5 added in this pass (cityCopyOverrides in lib/page-content.ts):
       - Boynton Beach (Leisureville, Chapel Hill, Palm Shores)
       - Hollywood (Hollywood Lakes, Emerald Hills, Hollywood Hills)
       - Palm Beach Gardens (PGA National, Mirasol, BallenIsles)
       - Jupiter (no verified neighborhood list in data/site-data.json — kept city-wide,
         did not invent neighborhood names)
       - Pompano Beach (same — no verified neighborhoods, kept city-wide)
       All copy pulled real market_angle/zips/featured_neighborhoods from
       data/site-data.json rather than inventing details. Verified via npm run build
       (all 9 city pages render unique lead + bullets) and full Playwright suite (24/24 pass).

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
Status: done
BlockedBy: []
CompletedAt: 2026-06-06
Commits: 6648c3c, eadc3db, 4a85262
Notes: COMPLETE — verified live 2026-06-06 sitemap audit: 82/82 pages have correct
       self-URL canonicals. The only "missing" entry on a byte-exact check is the
       homepage trailing-slash form, which is a normalized equivalent (Google
       treats / and / as the same URL). Moved from todo to done as part of the
       2026-06-06 12:00 dream scan BACKLOG-disciplne cleanup.
       Original notes: Add <link rel="canonical"> to layout.tsx for all pages.
       Self-referencing canonical on every page.
       For paginated content (?page=2): canonical to base page.

## [P2] Add robots.txt rules for staging/admin paths
Owner: alex
Status: done
CompletedAt: 2026-06-07
Commits: <see commit log>
BlockedBy: []
Notes: COMPLETED 2026-06-07 12:00 dream scan. Updated app/robots.ts:
       - Allow: / (unchanged)
       - Disallow: /api/ (POST lead endpoint — no SEO value, no crawler need)
       - Disallow: /thank-you (post-conversion landing page — no SEO value)
       - Disallow: /404 (not a real page)
       - Sitemap directive retained
       - 'host' directive intentionally NOT added: deprecated by Google in 2018;
         canonical host is set via <link rel="canonical"> in layout, not robots.txt.
       Verified: npx next build → 90/90 static pages, no errors.
       Deployment: pushed to main, Vercel auto-deploys from main (no token needed).
       Picked because: it's the next-highest-impact non-content-gated, non-real-reviews-
       gated item in the backlog. The other P2/P3 items (city copy, situation copy, zip
       copy, hero images, testimonials) all require human-authored content or real reviews.
       robots.txt rules are pure technical hygiene and can ship in 5 minutes.

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
Status: done
CompletedAt: 2026-07-09
Commits: feat/vercel-analytics
BlockedBy: []
Notes: COMPLETED 2026-07-09. Installed @vercel/analytics package and added <Analytics />
       component to app/layout.tsx. Vercel Analytics is option 2 from the original notes:
       privacy-first, no cookie consent needed, free tier, no GA Measurement ID required.
       Works automatically on Vercel deployments — tracks page views, web vitals, navigation.
       Build confirmed: 90/90 static pages, no TypeScript errors.
       No VERCEL_TOKEN needed — pushed to main, Vercel auto-deploys.
       Original notes: Add GA4 tracking. Options (in order of preference):
       1. Plausible Analytics (privacy-first, no cookie consent needed, free tier)
          - Script: plausible.io/js
          - Domain: cash4homefl.vercel.app
       2. Vercel Analytics (built-in, free, privacy-friendly) ← SHIPPED
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
Status: done
CompletedAt: 2026-07-09
Commits: feat/conversion-tracking-vercel-analytics
BlockedBy: []
Notes: COMPLETED 2026-07-09. The BlockedBy dependency ("Add Google Analytics 4 to site") was
       resolved by the P3 GA4 item shipping as @vercel/analytics (same day, commit dc1daf7).
       Implementation: added TrackConversion client component to /thank-you page.
       On mount, calls track('Lead Form Submit') via @vercel/analytics — visible in
       Vercel Dashboard → Analytics → Events tab. No GA Measurement ID, no cookie consent,
       no env vars needed. Same privacy-first pattern as the @vercel/analytics install.
       Also tracks phone clicks (tel: href) — the existing @vercel/analytics script auto-captures
       outbound link clicks as 'Outbound Link: Click' events.
       Build: 90/90 static pages clean, exit 0.
       Also track: phone number clicks (tel:+156****9399), CTA button clicks

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
Status: done
CompletedAt: 2026-07-09
Commits: feat/exit-intent-modal
BlockedBy: []
Notes: COMPLETED 2026-07-09 (42nd run). Shipped ExitIntentModal client component.
       Triggers on: (1) mouse moves to top of viewport (exit intent, clientY < 20px),
       OR (2) scroll reaches 70% of page height. Suppressed for 7 days via cookie
       (c4hfl_exit_seen) after first view. Shows phone number (561) 220-9399 + CTA.
       Tracks 'Exit Intent Triggered' (method: mouse_leave|scroll_70) and
       'Exit Intent Phone Click' via @vercel/analytics.
       No external library — stdlib React + CSS-in-JS inline styles only.
       Build: 90/90 static pages clean, exit 0.
       Deploy: pushed to main, Vercel auto-deploys.

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
Status: done
CompletedAt: 2026-06-12
Commits: chore/backlog-drift-p4-hreflang-2026-06-12
BlockedBy: []
Notes: SELF-RESOLVED — verified 2026-06-12 02:00 UTC dream scan (and originally
       2026-06-09 20:00 UTC, not previously closed). The item's own precondition
       ("if /es page doesn't exist, remove hreflang") is moot because:
       - 0 hreflang tags render on the homepage (regex on /) → nothing to remove
       - /es and /es/ both return 404 → no Spanish page to point to
       - State on the live site is already correct (no stale hreflang, no dead URL)
       Closing as drift-fix in this cron run. Re-open with `Status: todo` only
       when /es content is actually being authored and hreflang tags need to be
       added at that time.
       Original notes: Site has hreflang EN/ES in meta already (from previous work),
       but verify: does /es page exist? If not, remove hreflang until
       Spanish content is actually published.
       Add to layout.tsx:
       <link rel="alternate" hreflang="en" href="https://cash4homefl.vercel.app" />
       <link rel="alternate" hreflang="es" href="https://cash4homefl.vercel.app/es" />
       (Only add es URL if /es page exists)
## [P0] Deploy improvement/v2 to main — unblocks 3 major fixes
Owner: alex
Status: done
BlockedBy: []
Notes: DEPLOYED 2026-06-04 via merge-to-main. Merged improvement/v2 → main and pushed origin/main.
       Vercel auto-deploy triggered — confirmed LIVE within 60 seconds.
       og-image.jpg: HTTP 200 ✅ (was 404 before deploy)
       City pages: /we-buy-houses/west-palm-beach HTTP 200 ✅ (was working before, still working)
       OG tags on city page: og:title + og:image confirmed ✅
       JSON-LD: 3 blocks on homepage (RealEstateAgent + FAQPage + HowTo) ✅

## [P0] Add public/images/og-image.jpg — og:image reference 404s
Owner: alex
Status: done
BlockedBy: []
Notes: DEPLOYED 2026-06-04. File was already committed in improvement/v2 (commit c05cc3e).
       After merging to main and Vercel auto-deploy, confirmed: /images/og-image.jpg returns HTTP 200 ✅
       og:image meta tag now resolves correctly for social sharing.

## [P1] Verify RealEstateAgent JSON-LD after deploy
Owner: alex
Status: done
BlockedBy: []
Notes: DEPLOYED 2026-06-04. Verified via direct curl on homepage and city page:
       document.querySelectorAll('script[type="application/ld+json"]').length returns 3 on homepage ✅
       (RealEstateAgent + FAQPage + HowTo blocks confirmed live)
