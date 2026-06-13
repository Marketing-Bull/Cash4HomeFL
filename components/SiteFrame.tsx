import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { getCountyLinks, getFeaturedCityLinks } from '@/lib/site-data';
import { NavDropdown } from '@/components/NavDropdown';
import { MobileNav } from '@/components/MobileNav';

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
          <Link className="brand" href="/" aria-label="Cash4HomeFL — Home">
            <Image
              src="/images/logo/logo-primary.png"
              alt="Cash4HomeFL"
              width={220}
              height={60}
              priority
              style={{ objectFit: 'contain', height: '56px', width: 'auto' }}
            />
          </Link>

          <nav className="nav" aria-label="Primary navigation">
            {primaryLinks.map((link) => (
              link.label === 'We Buy Houses' ? (
                <NavDropdown
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  items={situationLinks}
                />
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

          <MobileNav primaryLinks={primaryLinks} situationLinks={situationLinks} />
        </div>
      </header>

      {children}

      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <Link className="brand brand--footer" href="/" aria-label="Cash4HomeFL — Home">
              <Image
                src="/images/logo/logo-white.png"
                alt="Cash4HomeFL"
                width={220}
                height={60}
                style={{ objectFit: 'contain', height: '56px', width: 'auto', filter: 'brightness(1)' }}
              />
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
