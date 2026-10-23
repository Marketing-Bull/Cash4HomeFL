import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { NavDropdown } from '@/components/NavDropdown';
import { MobileNav } from '@/components/MobileNav';
import { navigationItems, sellerLinks, areaLinks, companyLinks } from '@/lib/navigation';

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site-frame">
      <header className="topbar">
        <div className="container topbar__inner">
          <Link className="brand" href="/" aria-label="Cash4HomeFL — Home">
            <Image src="/images/logo/logo-primary.png" alt="Cash4HomeFL" width={210} height={48} priority className="brand__logo" sizes="(max-width: 680px) 180px, 210px" />
          </Link>
          <nav className="nav" aria-label="Primary navigation">
            {navigationItems.map(item => 'children' in item ? (
              <NavDropdown key={item.label} label={item.label} items={item.children} />
            ) : <Link className="nav-link" href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
          <a className="phone-link" href="tel:+15612209399">(561) 220-9399</a>
          <MobileNav items={navigationItems} />
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <Link className="brand brand--footer" href="/" aria-label="Cash4HomeFL — Home">
              <Image src="/images/logo/logo-white.png" alt="Cash4HomeFL" width={210} height={48} className="brand__logo" sizes="(max-width: 680px) 180px, 210px" />
            </Link>
            <p className="muted">A South Florida cash home buyer focused on Palm Beach County and Broward. We buy houses as-is — no repairs, no commissions, no hassle.</p>
            <div className="footer__contact">
              <a className="phone-link phone-link--footer" href="tel:+15612209399">(561) 220-9399</a>
              <a className="footer__email" href="mailto:hello@cash4homefl.com">hello@cash4homefl.com</a>
            </div>
            <div className="footer__address">Serving Palm Beach County &amp; Broward County, Florida</div>
          </div>
          {[{ title: 'Sell your house', links: sellerLinks }, { title: 'Areas we serve', links: areaLinks }, { title: 'Company', links: companyLinks }].map(group => (
            <nav key={group.title} aria-label={`Footer: ${group.title}`}>
              <h2 className="footer-title">{group.title}</h2>
              <div className="footer-links">{group.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
            </nav>
          ))}
        </div>
        <div className="container footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cash4HomeFL. All rights reserved. We are a private cash buyer, not a licensed real estate broker.</p>
          <nav aria-label="Legal and site links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <a href="/sitemap.xml">Sitemap</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
