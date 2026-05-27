import Link from 'next/link';
import type { ReactNode } from 'react';
import { getCountyLinks, getFeaturedCityLinks } from '@/lib/site-data';

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'We Buy Houses', href: '/we-buy-houses' },
  { label: 'Sell My House Fast', href: '/sell-my-house-fast' },
  { label: 'Palm Beach County', href: '/palm-beach-county' },
  { label: 'Broward County', href: '/broward-county' },
  { label: 'FAQ', href: '/faq' },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site-frame">
      <header className="topbar">
        <div className="container topbar__inner">
          <Link className="brand" href="/">
            Cash4HomeFL
          </Link>

          <nav className="nav" aria-label="Primary navigation">
            {primaryLinks.map((link) => (
              <Link className="nav-link" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <a className="phone-link" href="tel:+15612209399">
            (561) 220-9399
          </a>
        </div>
      </header>

      {children}

      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <Link className="brand brand--footer" href="/">
              Cash4HomeFL
            </Link>
            <p className="muted">
              A South Florida cash home buyer focused on Palm Beach County and Broward. We buy houses as-is — no repairs, no commissions, no hassle.
            </p>
            <div className="footer__contact">
              <a className="phone-link phone-link--footer" href="tel:+15612209399">
                (561) 220-9399
              </a>
              <span className="footer__sep" aria-hidden="true">·</span>
              <a className="footer__email" href="mailto:hello@cash4homefl.com">
                hello@cash4homefl.com
              </a>
            </div>
            <div className="footer__address">
              Serving Palm Beach County &amp; Broward County, Florida
            </div>
            <a
              className="footer__gbp"
              href="https://business.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our Google Business Profile"
            >
              ★★★★★ View on Google
            </a>
          </div>

          <div>
            <h2 className="footer-title">Core pages</h2>
            <div className="footer-links">
              {primaryLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/reviews">Reviews</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>

          <div>
            <h2 className="footer-title">Counties</h2>
            <div className="footer-links">
              {getCountyLinks(2).map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="footer-title">Top cities</h2>
            <div className="footer-links">
              {getFeaturedCityLinks(6).map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
