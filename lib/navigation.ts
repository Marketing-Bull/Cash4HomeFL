export type NavigationLink = { label: string; href: string };
export type NavigationItem = NavigationLink | { label: string; children: NavigationLink[] };

export const sellerLinks: NavigationLink[] = [
  { label: 'How we buy houses', href: '/we-buy-houses' },
  { label: 'Sell my house fast', href: '/sell-my-house-fast' },
  { label: 'Sell as-is', href: '/we-buy-houses-as-is' },
  { label: 'Foreclosure', href: '/we-buy-houses-foreclosure' },
  { label: 'Probate / inherited', href: '/we-buy-houses-probate' },
  { label: 'Divorce', href: '/we-buy-houses-divorce' },
  { label: 'Damaged property', href: '/we-buy-houses-damaged' },
  { label: 'Liens & back taxes', href: '/we-buy-houses-liens' },
  { label: 'Rental property', href: '/we-buy-houses-rental' },
];
export const areaLinks: NavigationLink[] = [
  { label: 'Palm Beach County', href: '/palm-beach-county' },
  { label: 'Broward County', href: '/broward-county' },
  { label: 'West Palm Beach', href: '/we-buy-houses/west-palm-beach' },
  { label: 'Fort Lauderdale', href: '/we-buy-houses/fort-lauderdale' },
  { label: 'Boca Raton', href: '/we-buy-houses/boca-raton' },
  { label: 'Boynton Beach', href: '/we-buy-houses/boynton-beach' },
  { label: 'Coral Springs', href: '/we-buy-houses/coral-springs' },
  { label: 'Delray Beach', href: '/we-buy-houses/delray-beach' },
];
export const companyLinks: NavigationLink[] = [
  { label: 'About us', href: '/about' },
  { label: 'Seller stories', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Seller guides', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Sell your house', children: sellerLinks },
  { label: 'Areas we serve', children: areaLinks },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
