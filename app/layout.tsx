import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteFrame } from '@/components/SiteFrame';

export const metadata: Metadata = {
  metadataBase: new URL('https://cash4homefl.com'),
  title: {
    default: 'cash4homefl.com',
    template: '%s | cash4homefl.com',
  },
  description: 'Cash home buyers for Palm Beach County and Broward.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
