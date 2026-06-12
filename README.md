# cash4homefl.com Architecture Pack

This folder is the launch blueprint for **cash4homefl.com**, a Florida wholesaler site focused on Palm Beach County and Broward.

## Recommended stack

- **Next.js App Router** for dynamic routes and SEO
- **Plain CSS** for the initial scaffold UI
- **MDX / Markdown** for hand-edited local content
- **File-based JSON data** for cities, zips, FAQs, testimonials, and page rules
- **Native sitemap/robots routes** for XML sitemap generation
- **No new APIs required** for launch

## Why this approach

- One template can generate dozens of city and zip pages
- File-based content keeps costs low and avoids API sprawl
- Fast static generation helps ranking and crawlability
- Easy to expand later into a CMS if needed

## Files in this pack

- `ARCHITECTURE.md` — URL structure, route rules, SEO rules, indexing strategy
- `DESIGN-BRIEF.md` — best way to get design direction and component system
- `CONTENT-BRIEF.md` — best way to get page copy and local content
- `IMAGE-BRIEF.md` — best way to source photos, graphics, and hero images
- `data/site-data.json` — seed data for dynamic page generation

## Launch order

1. Homepage + core trust pages
2. Palm Beach County and Broward county pages
3. Top city pages: West Palm Beach, Fort Lauderdale, Boca Raton, Delray Beach, etc.
4. Highest-intent zip pages: 33401, 33407, 33301, 33304, 33020, 33025, etc.
5. Situation pages: foreclosure, probate, divorce, damaged property, rentals, liens
6. Blog / FAQ content to support ranking and internal linking

## Rule of thumb

If a page is thin or repetitive, keep it **noindex** until it has enough unique local value.

## Scaffold status

The Next.js scaffold is now in place under:

- `app/` — routes and page files
- `components/` — shared UI blocks
- `lib/` — site data and content builders

### Key dynamic routes

- `/we-buy-houses/[city]`
- `/sell-my-house-fast/[zip]`
- `/blog/[slug]`

### To run locally

```bash
npm install
npm run dev
```

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `GHL_WEBHOOK_URL` | Server (Vercel project settings / Cloudflare Worker variables) | GoHighLevel inbound-webhook URL. Each lead-form submission is POSTed here as JSON (`full_address`, `address1`, `city`, `state`, `postal_code`, `phone`, `email`, `latitude`, `longitude`, `page_url`, `source`). If unset, submissions still redirect to /thank-you but are **not** captured anywhere — only a server-side warning is logged. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Build-time public (set in the host's build env) | Enables Google Places address autocomplete on the lead form. Restrict the key to your domains + Places API (New) in Google Cloud console. If unset, the address field is a plain text input. |
