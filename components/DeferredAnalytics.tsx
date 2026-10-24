'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

/**
 * Mounts Vercel Analytics only after the window `load` event and a browser idle slot,
 * so its script never competes with rendering, hydration or the hero image.
 * The initial pageview is still recorded when the script starts.
 */
export function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const afterLoad = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 4000 });
      } else {
        // Safari has no requestIdleCallback.
        timeoutId = setTimeout(() => setReady(true), 2000);
      }
    };

    if (document.readyState === 'complete') afterLoad();
    else window.addEventListener('load', afterLoad, { once: true });

    return () => {
      window.removeEventListener('load', afterLoad);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return ready ? <Analytics /> : null;
}
