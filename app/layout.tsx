import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteFrame } from '@/components/SiteFrame';
import { Analytics } from '@vercel/analytics/react';
import { ExitIntentModal } from '@/components/ExitIntentModal';

export const metadata: Metadata = {
  metadataBase: new URL('https://cash4homefl.vercel.app'),
  title: {
    default: 'Cash4HomeFL — Cash Home Buyers in Palm Beach & Broward',
    template: '%s | Cash4HomeFL',
  },
  description: 'Cash home buyers for Palm Beach County and Broward County, Florida. We buy houses as-is — no repairs, no fees, no commissions.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cash4homefl.vercel.app',
    siteName: 'Cash4HomeFL',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cash4HomeFL — We Buy Houses in South Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cash4homefl',
  },
  alternates: {
    canonical: 'https://cash4homefl.vercel.app',
  },
};

// Organization JSON-LD — RealEstateAgent schema for the whole site
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Cash4HomeFL",
  "url": "https://cash4homefl.vercel.app",
  "logo": "https://cash4homefl.vercel.app/favicon.ico",
  "description": "Cash home buyers for Palm Beach County and Broward County, Florida. We buy houses as-is — no repairs, no fees, no commissions.",
  "telephone": "+156****9399",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+156****9399",
    "contactType": "sales",
    "areaServed": ["Palm Beach County", "Broward County"],
    "availableLanguage": ["English", "Spanish"],
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.7153,
    "longitude": -80.1294,
    "addressCountry": "US",
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "West Palm Beach",
    "addressRegion": "FL",
    "addressCountry": "US",
  },
  "areaServed": [
    {
      "@type": "Place",
      "name": "Palm Beach County",
      "containsPlace": [
        { "@type": "City", "name": "West Palm Beach" },
        { "@type": "City", "name": "Boca Raton" },
        { "@type": "City", "name": "Delray Beach" },
        { "@type": "City", "name": "Boynton Beach" },
        { "@type": "City", "name": "Palm Beach Gardens" },
        { "@type": "City", "name": "Jupiter" },
      ],
    },
    {
      "@type": "Place",
      "name": "Broward County",
      "containsPlace": [
        { "@type": "City", "name": "Fort Lauderdale" },
        { "@type": "City", "name": "Hollywood" },
        { "@type": "City", "name": "Boca Raton" },
        { "@type": "City", "name": "Pembroke Pines" },
      ],
    },
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "16:00",
    },
  ],
  "priceRange": "$$",
  "image": "https://cash4homefl.vercel.app/favicon.ico",
  "sameAs": [
    "https://www.facebook.com/cash4homefl",
    "https://www.instagram.com/cash4homefl",
  ],
  "potentialAction": {
    "@type": "SellAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://cash4homefl.vercel.app/contact",
    },
    "object": {
      "@type": "Offer",
      "description": "Sell your house for cash",
    },
  },
};

// WebSite JSON-LD — unlocks Google sitelinks search box
// Mirrors competitor implementation (cashhomebuyers.io, floridacashhomebuyers.com)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cash4HomeFL",
  "url": "https://cash4homefl.vercel.app",
  "description": "Cash home buyers for Palm Beach County and Broward County, Florida. We buy houses as-is — no repairs, no fees, no commissions.",
  "publisher": {
    "@type": "RealEstateAgent",
    "name": "Cash4HomeFL",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cash4homefl.vercel.app/favicon.ico",
    },
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://cash4homefl.vercel.app/sell-my-house-fast/{zip}",
    },
    "query-input": "required name=zip",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
        <ExitIntentModal />
        <Analytics />
      </body>
    </html>
  );
}
