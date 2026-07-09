'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * Fires a Vercel Analytics custom event when the thank-you page mounts.
 * Drop this into any page that represents a conversion — no GA4, no Measurement ID needed.
 * Visible in Vercel Dashboard → Analytics → Events tab.
 */
export function TrackConversion() {
  useEffect(() => {
    track('Lead Form Submit');
  }, []);
  return null;
}
