import Link from 'next/link';
import type { ReactNode } from 'react';
import { getCountyLinks, getFeaturedCityLinks } from '@/lib/site-data';

const situationLinks = [
  { label: 'Foreclosure', href: '/we-buy-houses-foreclosure' },
  { label: 'Probate / Inherited', href: '/we-buy-houses-probate' },
  { label: 'Divorce', href: '/we-buy-houses-divorce' },
  { label: 'Damaged / As-Is', href: '/we-buy-houses-damaged' },
  { label: 'Liens & Back Taxes', href: '/we-buy-houses-liens' },
  { label: 'Rental Property', href: '/we-buy-houses-rental' },
  { label: 'Sell As-Is', href: '/we-buy-houses-as-is' },
];

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
              link.label === 'We Buy Houses' ? (
                <div className="nav-dropdown" key={link.href}>
                  <Link className="nav-link nav-link--dropdown" href={link.href}>
                    {link.label}
                    <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <div className="dropdown-panel">
                    <div className="dropdown-section">
                      <span className="dropdown-label">Situations we help with</span>
                      {situationLinks.map((s) => (
                        <Link className="dropdown-link" href={s.href} key={s.href}>{s.label}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link className="nav-link" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              )
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
            <h2 className="footer-title">Conditions we help with</h2>
            <div className="footer-links">
              {situationLinks.map((link) => (
                <Link href={link.href} key={link.href}>{link.label}</Link>
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
        {/* Footer bottom bar */}
        <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            &copy; {new Date().getFullYear()} Cash4HomeFL. All rights reserved. We are a private cash buyer, not a licensed real estate broker.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link href="/privacy" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
