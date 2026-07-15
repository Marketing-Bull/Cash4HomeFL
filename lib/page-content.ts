import type { ArticleTemplateProps, FaqItem, LinkItem, PageTemplateProps } from '@/lib/page-types';
import {
  getAllCities,
  getAllCounties,
  getAllZipPages,
  getCityBySlug,
  getCountyBySlug,
  getCountyCities,
  getCountyCityLinks,
  getCountyLinks,
  getFeaturedCityLinks,
  getFeaturedZipLinks,
  getNearbyCityLinks,
  getNearbyZipLinks,
  getSituationBySlug,
  getTopCities,
  getTopZipPages,
  getZipByValue,
  siteData,
  toLink,
} from '@/lib/site-data';

const commonSteps = [
  {
    title: 'Tell us about the property',
    description: 'Share the address and a few details so we can understand the situation.',
  },
  {
    title: 'Get a fair cash offer',
    description: 'We review the home, condition, and local resale math, then send a no-obligation offer.',
  },
  {
    title: 'Close on your timeline',
    description: 'Pick the closing date that works for you and move forward without listing stress.',
  },
];

const commonComparison = [
  {
    label: 'Repairs',
    traditional: 'You usually spend time and money fixing the house first.',
    cash: 'Sell as-is without repairs or cleanout projects.',
  },
  {
    label: 'Fees',
    traditional: 'Commissions, staging, and closing costs can stack up.',
    cash: 'No realtor commission and a simpler process.',
  },
  {
    label: 'Timeline',
    traditional: 'A listing can take months and can fall through.',
    cash: 'Close in a much shorter window, often on your timeline.',
  },
  {
    label: 'Certainty',
    traditional: 'Buyer financing, inspections, and re-negotiation add risk.',
    cash: 'Clear offer, direct buyer, fewer moving parts.',
  },
];

const faqQuestionOrder = siteData.faqQuestions;

function sentenceCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildFaqItems(locationLabel: string): FaqItem[] {
  return faqQuestionOrder.map((question) => {
    switch (question) {
      case 'How fast can you close?':
        return {
          question,
          answer: `In many cases, we can close in roughly 7 to 30 days for a ${locationLabel} property, depending on title and the seller's timeline.`,
        };
      case 'Do I have to make repairs?':
        return {
          question,
          answer: `No. We buy ${locationLabel} homes as-is, so you do not need to spend money on repairs, cleaning, or staging first.`,
        };
      case 'Are there any fees or commissions?':
        return {
          question,
          answer: `The goal is to keep the process simple and direct, so you do not deal with a traditional listing commission or a long chain of buyers.`,
        };
      case 'How do you determine the offer?':
        return {
          question,
          answer: `We look at location, condition, title situation, and the likely resale math in ${locationLabel}.`,
        };
      case 'What if I have a mortgage?':
        return {
          question,
          answer: `That is normal. Many sellers still have a mortgage, and we can still review the property and talk through options.`,
        };
      case 'Can you buy a house in probate?':
        return {
          question,
          answer: `Yes. Inherited and probate situations are common, and we can review the property with the right decision-maker in ${locationLabel}.`,
        };
      case 'Do you buy condos and townhomes?':
        return {
          question,
          answer: `Yes. Condos, townhomes, duplexes, and small multifamily properties can all fit the model depending on the deal.`,
        };
      case 'Can you buy rental property with tenants?':
        return {
          question,
          answer: `Yes. Landlords with tenants, vacancies, or problem occupancy can still request a review.`,
        };
      default:
        return { question, answer: `We can review that situation for a ${locationLabel} property and point you to the next best step.` };
    }
  });
}

function formatZipList(zips: string[]): string {
  return zips.join(' • ');
}

function buildNearbyCityLinks(citySlug: string): LinkItem[] {
  return getNearbyCityLinks(citySlug, 4);
}

function buildNearbyZipLinks(zip: string): LinkItem[] {
  return getNearbyZipLinks(zip, 4);
}

function buildAreaPillsFromList(items: string[], limit = 8): string[] {
  return items.slice(0, limit);
}

function buildCoreMoneyBulletList(): string[] {
  return [
    'No repairs or cleanouts required',
    'No agent commissions or open houses',
    'No waiting on bank financing',
    'No pressure or obligation',
    'Close on your timeline',
    'Local South Florida focus',
  ];
}

export function buildHomepageProps(): PageTemplateProps {
  const counties = getAllCounties().map((county) => county.name);
  const featuredCities = getTopCities(6).map((city) => city.name);
  const featuredZips = getTopZipPages(6).map((zip) => zip.zip);

  return {
    eyebrow: 'Palm Beach County + Broward',
    title: 'Cash Home Buyers in Palm Beach County & Broward',
    lead:
      'Sell your house fast for cash in South Florida. No repairs, no fees, no commissions — just a direct offer and a clean path forward.',
    trust: ['Local South Florida focus', 'No repairs', 'No commissions', 'Close on your timeline'],
    stats: [
      { label: 'Core counties', value: counties.slice(0, 2).join(' + ') },
      { label: 'Top city pages', value: featuredCities.join(' • ') },
      { label: 'High-intent zip pages', value: featuredZips.join(' • ') },
    ],
    steps: commonSteps,
    bullets: buildCoreMoneyBulletList(),
    comparison: commonComparison,
    areas: buildAreaPillsFromList([...featuredCities, ...counties], 10),
    nearbyLinks: [
      toLink('We Buy Houses', '/we-buy-houses'),
      toLink('Sell My House Fast', '/sell-my-house-fast'),
      ...getCountyLinks(2),
      ...getFeaturedCityLinks(4),
      toLink('FAQ', '/faq'),
      toLink('Reviews', '/reviews'),
      toLink('Contact', '/contact'),
    ],
    faq: buildFaqItems('South Florida'),
    finalCtaTitle: 'Get your South Florida cash offer today',
    finalCtaLead: 'Request a no-obligation review and see if your property is a fit.',
    ctaLabel: 'Request Offer',
    contactHref: '/contact',
  };
}

export function buildStatewidePageProps(kind: 'we-buy-houses' | 'sell-my-house-fast'): PageTemplateProps {
  const title = kind === 'we-buy-houses' ? 'We Buy Houses in Florida for Cash' : 'Sell My House Fast in Florida';
  const lead =
    kind === 'we-buy-houses'
      ? 'Serving Palm Beach County, Broward, and the surrounding South Florida market with simple as-is cash offers.'
      : 'Need speed and certainty? Sell your Florida house for cash without repairs, commissions, or showings.';

  return {
    eyebrow: 'Florida service area',
    title,
    lead,
    trust: ['Florida coverage', 'No repairs', 'No commissions', 'Fast offers'],
    stats: [
      { label: 'Primary counties', value: getAllCounties().map((county) => county.name).join(' • ') },
      { label: 'Main cities', value: getTopCities(5).map((city) => city.name).join(' • ') },
      { label: 'Best for', value: 'As-is sellers, inherited homes, rentals, and timelines that need speed' },
    ],
    steps: commonSteps,
    bullets: buildCoreMoneyBulletList(),
    comparison: commonComparison,
    areas: buildAreaPillsFromList(getTopCities(8).map((city) => city.name)),
    nearbyLinks: [
      toLink('Palm Beach County', '/palm-beach-county'),
      toLink('Broward County', '/broward-county'),
      ...getFeaturedCityLinks(5),
      ...getFeaturedZipLinks(5),
      toLink('FAQ', '/faq'),
      toLink('Reviews', '/reviews'),
    ],
    faq: buildFaqItems('Florida'),
    finalCtaTitle: 'Request a Florida cash offer',
    finalCtaLead: 'Tell us about the property and we will review it quickly.',
    ctaLabel: 'Get My Cash Offer',
    contactHref: '/contact',
  };
}

export function buildCountyPageProps(countySlug: string): PageTemplateProps | undefined {
  const county = getCountyBySlug(countySlug);
  if (!county) return undefined;

  const cities = getCountyCities(countySlug, 6);
  const cityNames = cities.map((city) => city.name);
  const zipNames = cities.flatMap((city) => city.zips).slice(0, 8);

  return {
    eyebrow: county.name,
    title: `We Buy Houses in ${county.name}`,
    lead: `Sell your ${county.name} house as-is for cash. We help homeowners move fast without repairs, commissions, or the usual listing stress.`,
    trust: [county.name, 'As-is sales', 'No fees', 'Fast closings'],
    stats: [
      { label: 'Cities covered', value: cityNames.join(' • ') },
      { label: 'Sample zip codes', value: zipNames.join(' • ') },
      { label: 'Best fit', value: 'Homes, condos, rentals, inherited property, and distressed situations' },
    ],
    steps: commonSteps,
    bullets: buildCoreMoneyBulletList(),
    comparison: commonComparison,
    areas: buildAreaPillsFromList(cityNames.length ? cityNames : [county.name]),
    nearbyLinks: [
      ...getCountyCityLinks(countySlug, 6),
      toLink('Home', '/'),
      toLink('FAQ', '/faq'),
      toLink('Reviews', '/reviews'),
      toLink('Contact', '/contact'),
    ],
    faq: buildFaqItems(county.name),
    finalCtaTitle: `Request a ${county.name} cash offer`,
    finalCtaLead: `Start with the address and we will take it from there.`,
    ctaLabel: 'Request Offer',
    contactHref: '/contact',
    breadcrumbs: [
      toLink('Home', '/'),
      toLink(county.name, county.slug === 'palm-beach-county' ? '/palm-beach-county' : '/broward-county'),
    ],
  };
}

// City-specific copy overrides for top cities — unique, non-generic content
const cityCopyOverrides: Record<string, { lead: string; bullets: string[] }> = {
  'west-palm-beach': {
    lead: 'West Palm Beach has one of South Florida\'s most active real estate markets — and one of its most common headaches: the house that\'s been sitting too long, costing too much, or waiting on a sale that never came. Whether it\'s a worn-out rental in Northwood, a family home in Pleasant City caught in an inheritance holdup, or an investor property in Flamingo Park that\'s eaten up carrying costs, the traditional listing route rarely solves the problem. Cash buyers in West Palm Beach cut through the noise and close on a timeline that actually works.',
    bullets: [
      'Sell as-is in West Palm Beach — no repairs, no staging, no carrying costs while you wait',
      'Cash offers for inherited homes in Pleasant City, Roosevelt Estates, and Flamingo Park',
      'Landlords in WPB can sell rental properties without long tenant vacancy windows',
      'Direct closing timeline — often 7 to 21 days once you\'ve reviewed the offer',
      'No listing fees, no buyer financing contingencies, no surprises',
    ],
  },
  'fort-lauderdale': {
    lead: 'Fort Lauderdale\'s waterfront appeal draws buyers from everywhere — but the local market still has the same old problem: the house that doesn\'t fit the picture-perfect listing. Maybe it\'s a dated condo on the Intracoastal that\'s been sitting for 90 days, or a single-family home in Victoria Park with deferred maintenance the owner can\'t afford to address. The Fort Lauderdale cash market moves when the traditional market stalls. We buy houses as-is, no realtor fees, no repair requirements, no waiting on financed buyers to clear.',
    bullets: [
      'Cash offers for Fort Lauderdale homes in Las Olas, Victoria Park, Rio Vista, and Coral Ridge',
      'Sell your Fort Lauderdale investment property without a long listing runway',
      'Inherited homes and probate situations in Fort Lauderdale — we work with the estate directly',
      'Close in days, not months — cash buyers, no financing delays',
      'No repair requirements — sell your Fort Lauderdale house exactly as it is today',
    ],
  },
  'boca-raton': {
    lead: 'Boca Raton attracts buyers looking for South Florida at its most refined — but sellers know the other side of that market. When a property doesn\'t fit the profile, it can sit for months. Whether it\'s an oversized lot inherited from a parent in Mizner Park, a condo that\'s outlived its appeal, or a second home that\'s become a liability, the traditional listing process in Boca Raton can stretch 60 to 90 days fast. Cash buyers cut through the HOA rules and seasonality that scare off financed buyers, closing on a timeline that actually works for sellers.',
    bullets: [
      'Cash offers for Boca Raton properties in Boca Del Mar, Mizner Park, West Boca, and Royal Palm Yacht',
      'Sell inherited real estate in Boca Raton without months of traditional listing',
      'Boca Raton condos and townhomes can sell to cash buyers without the HOA financing障碍',
      'Downsizers in Boca Raton can close fast without making repairs to a home they\'re leaving',
      'No listing commissions — what we offer is what you keep',
    ],
  },
  'delray-beach': {
    lead: 'Delray Beach has always had a reputation for getting attention — the arts scene, the dining on Atlantic Avenue, the quiet neighborhoods a few blocks off the beach. But properties that don\'t fit the lifestyle profile of a typical Delray buyer can linger for months. A home that needs work in Lake Ida, an inherited property that\'s been sitting unused, or a condo that\'s outlived its appeal — these are the situations that drive sellers to the cash market. Delray Beach cash sales close in weeks, not months, and without the listing process.',
    bullets: [
      'Sell your Delray Beach home as-is — no repairs needed for properties in Lake Ida, Tropic Isle, or Delray Beach Village',
      'Inherited homes in Delray Beach: we close without requiring you to fix anything first',
      'Delray Beach landlords: cash offer on your rental without waiting for a tenant-vacated buyer',
      'Fast closings in Delray Beach — often under three weeks once you\'ve accepted an offer',
      'Direct, no-commission sale — what we quote is what lands in your pocket',
    ],
  },
  'boynton-beach': {
    lead: 'Boynton Beach has a lot of older housing stock and long-time owners, which means two things show up constantly: move-up sellers who don\'t want to fix a house on their way out, and families handling a downsizing or inherited property that needs more work than they\'re able to take on. In neighborhoods like Leisureville, Chapel Hill, and Palm Shores, that combination of aging homes and motivated sellers is exactly where a traditional listing drags out the longest. A cash sale skips the repair list and the buyer-financing wait entirely.',
    bullets: [
      'Cash offers for Boynton Beach homes in Leisureville, Chapel Hill, and Palm Shores — no repairs required',
      'Downsizing in Boynton Beach? Sell the house as-is and skip the pre-listing fix-up list',
      'Inherited or rental property in Boynton Beach — we work directly with owners and estates',
      'Close on your timeline, often within a few weeks of accepting an offer',
      'No commissions, no financing contingencies, no repeat showings',
    ],
  },
  'hollywood': {
    lead: 'Hollywood\'s housing stock skews older, and that shows up in the sales that stall — a home in Hollywood Lakes with deferred maintenance, a rental in Hollywood Hills that\'s cost more in repairs than it brings in rent, or a family property in Emerald Hills tied up after a death in the family. The traditional listing process punishes exactly these situations, since financed buyers want move-in-ready homes. A cash sale in Hollywood means the condition of the house stops being the obstacle.',
    bullets: [
      'Cash offers for Hollywood homes in Hollywood Lakes, Emerald Hills, and Hollywood Hills — sold as-is',
      'Distressed or deferred-maintenance properties in Hollywood — no repair requirement to close',
      'Landlords in Hollywood can sell a tired rental without a vacancy gap or repair bill',
      'Inherited and estate properties in Hollywood — we coordinate directly with heirs',
      'No listing commissions — the offer we make is what you keep',
    ],
  },
  'palm-beach-gardens': {
    lead: 'Palm Beach Gardens is a higher-income market, which cuts both ways for sellers — homes in PGA National, Mirasol, and BallenIsles carry strict HOA requirements and buyer expectations that can slow down a traditional sale, especially for an inherited property or an estate that hasn\'t been updated in years. A cash sale in Palm Beach Gardens sidesteps the HOA approval delays and repair standards that financed buyers and their lenders require, closing on a timeline that works for the seller instead of the market.',
    bullets: [
      'Cash offers for Palm Beach Gardens homes in PGA National, Mirasol, and BallenIsles',
      'Inherited and probate properties in Palm Beach Gardens — sold without HOA-driven repair delays',
      'Skip HOA approval and lender-required updates that slow down a traditional Palm Beach Gardens sale',
      'Close in weeks, not months, with no financing contingency to fall through',
      'No commissions or closing-cost surprises — the offer is the number you receive',
    ],
  },
  'jupiter': {
    lead: 'Jupiter\'s higher-end market means most listings move on the strength of condition and presentation — which leaves a gap for owners handling an inherited home, a downsizing move, or a property that simply needs more work than they want to put into it before selling. A cash sale in Jupiter closes on the seller\'s timeline instead of waiting for a financed buyer to clear underwriting on a home that isn\'t market-ready.',
    bullets: [
      'Cash offers for Jupiter homes and condos — no repairs or staging required',
      'Inherited property in Jupiter? We work directly with the estate to close quickly',
      'Downsizing in Jupiter — sell as-is and skip the pre-sale renovation list',
      'Fast, direct closings with no financing contingency to fall through',
      'No listing commissions — straightforward, no-obligation cash offers',
    ],
  },
  'pompano-beach': {
    lead: 'Pompano Beach has an older, investor-heavy housing stock along the coast, which means a lot of the properties that come up for sale need real work before they\'d pass a traditional buyer\'s inspection. For landlords sitting on a tired rental or owners of a coastal property that needs more than a fresh coat of paint, a cash sale in Pompano Beach removes the repair requirement and the financing wait entirely.',
    bullets: [
      'Cash offers for Pompano Beach homes and rentals — sold exactly as they are today',
      'Investor and landlord exits in Pompano Beach — sell without a vacancy gap or repair bill',
      'Coastal and older-stock properties in Pompano Beach that wouldn\'t qualify for buyer financing',
      'Close in days or weeks, not months — no financing contingency',
      'No commissions — the offer we make is what you keep',
    ],
  },
};

export function buildCityPageProps(citySlug: string): PageTemplateProps | undefined {
  const city = getCityBySlug(citySlug);
  if (!city) return undefined;

  const nearby = buildNearbyCityLinks(citySlug);
  const areas = city.featured_neighborhoods.length > 0 ? city.featured_neighborhoods : [city.name];
  const copyOverride = cityCopyOverrides[citySlug];

  return {
    eyebrow: city.countyName,
    title: `We Buy Houses in ${city.name}, Florida`,
    lead: copyOverride?.lead ?? `Sell your ${city.name} house as-is for cash. We buy inherited homes, rentals, condos, and properties that need work.`,
    trust: [city.countyName, formatZipList(city.zips), 'No repairs', 'Close on your timeline'],
    stats: [
      { label: 'Primary zip codes', value: formatZipList(city.zips) },
      { label: 'Market angle', value: city.market_angle },
      { label: 'Best fit', value: 'As-is sellers, inherited property, distressed rentals, and fast closings' },
    ],
    steps: commonSteps,
    bullets: copyOverride?.bullets ?? buildCoreMoneyBulletList(),
    comparison: commonComparison,
    areas: buildAreaPillsFromList(areas, 8),
    nearbyLinks: [
      ...nearby,
      toLink(city.countyName, `/${city.countySlug}`),
      toLink('FAQ', '/faq'),
      toLink('Contact', '/contact'),
    ],
    faq: buildFaqItems(city.name),
    finalCtaTitle: `Ready to sell your ${city.name} house?`,
    finalCtaLead: `Request a no-obligation cash review and see whether the property is a fit.`,
    ctaLabel: 'Get Cash Offer',
    contactHref: '/contact',
    breadcrumbs: [
      toLink('Home', '/'),
      toLink(city.countyName, `/${city.countySlug}`),
      toLink(city.name, `/we-buy-houses/${city.slug}`),
    ],
  };
}

export function buildZipPageProps(zipValue: string): PageTemplateProps | undefined {
  const zip = getZipByValue(zipValue);
  if (!zip) return undefined;

  const nearby = buildNearbyZipLinks(zipValue);

  return {
    eyebrow: zip.county,
    title: `Sell My House Fast ${zip.zip}`,
    lead: `Need to sell in ${zip.zip}? We make fair cash offers for homes, condos, rentals, and inherited properties in ${zip.primaryCity}.`,
    trust: [zip.county, zip.primaryCity, 'No repairs', 'Fast closings'],
    stats: [
      { label: 'Primary city', value: zip.primaryCity },
      { label: 'County', value: zip.county },
      { label: 'Zip focus', value: zip.zip },
    ],
    steps: commonSteps,
    bullets: buildCoreMoneyBulletList(),
    comparison: commonComparison,
    areas: buildAreaPillsFromList([zip.primaryCity, zip.county, zip.zip], 6),
    nearbyLinks: [
      ...nearby,
      toLink(zip.primaryCity, `/we-buy-houses/${getCitySlugFromPrimaryCity(zip.primaryCity) ?? 'west-palm-beach'}`),
      toLink(zip.county, zip.county === 'Palm Beach County' ? '/palm-beach-county' : '/broward-county'),
      toLink('FAQ', '/faq'),
      toLink('Contact', '/contact'),
    ],
    faq: buildFaqItems(zip.zip),
    finalCtaTitle: `Ready to sell in ${zip.zip}?`,
    finalCtaLead: `Request a cash offer for your ${zip.primaryCity} property and we'll review it quickly.`,
    ctaLabel: 'Request Offer',
    contactHref: '/contact',
    breadcrumbs: [
      toLink('Home', '/'),
      toLink(zip.county, zip.county === 'Palm Beach County' ? '/palm-beach-county' : '/broward-county'),
      toLink(`${zip.zip}`, `/sell-my-house-fast/${zip.zip}`),
    ],
  };
}

function getCitySlugFromPrimaryCity(primaryCity: string): string | undefined {
  const city = getAllCities().find((entry) => entry.name.toLowerCase() === primaryCity.toLowerCase());
  if (city) return city.slug;

  const lookup = primaryCity.toLowerCase();
  if (lookup.includes('west palm beach')) return 'west-palm-beach';
  if (lookup.includes('fort lauderdale')) return 'fort-lauderdale';
  if (lookup.includes('boca raton')) return 'boca-raton';
  if (lookup.includes('delray beach')) return 'delray-beach';
  if (lookup.includes('boynton beach')) return 'boynton-beach';
  if (lookup.includes('hollywood')) return 'hollywood';
  if (lookup.includes('pembroke pines')) return 'pembroke-pines';
  if (lookup.includes('miramar')) return 'miramar';
  if (lookup.includes('pompano beach')) return 'pompano-beach';
  if (lookup.includes('coral springs')) return 'coral-springs';
  if (lookup.includes('palm beach gardens')) return 'palm-beach-gardens';
  if (lookup.includes('lake worth')) return 'lake-worth-beach';
  return undefined;
}

export function buildSituationPageProps(slug: string): PageTemplateProps | undefined {
  const situation = getSituationBySlug(slug);
  if (!situation) return undefined;

  const bulletsBySituation: Record<string, string[]> = {
    foreclosure: ['Move faster before deadlines tighten', 'Avoid expensive repairs', 'Keep the process simple'],
    probate: ['Coordinate with heirs and title work', 'Simplify an inherited property sale', 'Close when the estate is ready'],
    divorce: ['Reduce pressure during a life transition', 'Choose a timeline that fits both sides', 'Sell without a listing ordeal'],
    damaged: ['Fire, mold, code issues, or storm damage', 'Sell as-is without repair spending', 'Avoid managing contractors and showings'],
    liens: ['Tax liens, debt, or title complications', 'Review the property with a direct buyer', 'Work through the situation calmly'],
    rental: ['Problem tenants or vacant rentals', 'Less stress for landlords', 'Review the property without a full listing process'],
    'as-is': ['Skip repairs and cleanouts', 'Skip staging and open houses', 'Get a direct cash review'],
  };

  const bulletList = bulletsBySituation[slug] ?? buildCoreMoneyBulletList();
  const relatedLinks = [
    toLink('Palm Beach County', '/palm-beach-county'),
    toLink('Broward County', '/broward-county'),
    ...getFeaturedCityLinks(4),
    toLink('FAQ', '/faq'),
    toLink('Contact', '/contact'),
  ];

  return {
    eyebrow: 'Seller situation',
    title: `Sell Your House for Cash When Facing ${situation.title}`,
    lead: `If you need a fast, simple sale, we can review the property and make a no-obligation cash offer for ${situation.title.toLowerCase()} situations in South Florida.`,
    trust: ['No repairs', 'No commissions', 'Fast review', 'Local focus'],
    stats: [
      { label: 'Common fit', value: situation.title },
      { label: 'Best for', value: 'Sellers who need speed, certainty, or less hassle' },
      { label: 'Service area', value: 'Palm Beach County and Broward' },
    ],
    steps: commonSteps,
    bullets: bulletList,
    comparison: commonComparison,
    areas: buildAreaPillsFromList(['Palm Beach County', 'Broward County', 'West Palm Beach', 'Fort Lauderdale', 'Boca Raton', 'Hollywood'], 8),
    nearbyLinks: relatedLinks,
    faq: buildFaqItems(sentenceCase(situation.title)),
    finalCtaTitle: `Request a cash offer for your ${situation.title.toLowerCase()} property`,
    finalCtaLead: 'Send the address and a few details; we will review it quickly.',
    ctaLabel: 'Get Help Now',
    contactHref: '/contact',
  };
}

export function buildFaqPageProps(): PageTemplateProps {
  return {
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions',
    lead: 'Answers to the most common seller questions about cash offers in South Florida.',
    trust: ['South Florida sellers', 'No repairs', 'No commissions', 'Fast closings'],
    stats: [
      { label: 'Primary focus', value: 'Palm Beach County + Broward' },
      { label: 'Best for', value: 'Homeowners, heirs, landlords, and distressed sellers' },
      { label: 'Next step', value: 'Request a property review and compare options' },
    ],
    steps: commonSteps,
    bullets: buildCoreMoneyBulletList(),
    comparison: commonComparison,
    areas: ['Palm Beach County', 'Broward County', 'Florida'],
    nearbyLinks: [
      toLink('Home', '/'),
      toLink('We Buy Houses', '/we-buy-houses'),
      toLink('Sell My House Fast', '/sell-my-house-fast'),
      ...getCountyLinks(2),
      toLink('Reviews', '/reviews'),
      toLink('Contact', '/contact'),
    ],
    faq: buildFaqItems('South Florida'),
    finalCtaTitle: 'Still have questions?',
    finalCtaLead: 'Request a review and we will walk through the property with you.',
    ctaLabel: 'Contact Us',
    contactHref: '/contact',
  };
}

export function buildContactPageProps(searchParams?: Record<string, string | string[] | undefined>): PageTemplateProps {
  const address = typeof searchParams?.address === 'string' ? searchParams.address : '';
  const phone = typeof searchParams?.phone === 'string' ? searchParams.phone : '';
  const email = typeof searchParams?.email === 'string' ? searchParams.email : '';

  return {
    eyebrow: 'Contact',
    title: 'Send Your Property Details',
    lead: 'Use the form below or call/text if that is faster. We will review the property and get back to you.',
    trust: ['Call or text', 'South Florida', 'No obligation'],
    stats: [
      { label: 'Phone', value: '(561) 220-9399' },
      { label: 'Email', value: 'hello@cash4homefl.com' },
      { label: 'Coverage', value: 'Palm Beach County and Broward' },
    ],
    steps: commonSteps,
    bullets: ['Call if you prefer', 'Text if that is easier', 'Use the form for quick details'],
    areas: ['Palm Beach County', 'Broward County'],
    nearbyLinks: [
      toLink('Home', '/'),
      toLink('FAQ', '/faq'),
      toLink('Reviews', '/reviews'),
      toLink('Palm Beach County', '/palm-beach-county'),
      toLink('Broward County', '/broward-county'),
    ],
    faq: buildFaqItems('South Florida'),
    finalCtaTitle: 'Ready when you are',
    finalCtaLead: 'Submit the form and we will review the property details.',
    ctaLabel: 'Submit Property',
    contactHref: '/contact',
    formDefaults: {
      address,
      phone,
      email,
    },
  };
}

export function buildAboutArticle(): ArticleTemplateProps {
  return {
    eyebrow: 'About',
    title: 'A local cash buyer for Palm Beach County and Broward',
    description:
      'cash4homefl.com is built for homeowners who need a straightforward as-is sale instead of a traditional listing process.',
    paragraphs: [
      'This site is designed around the situations real sellers face: repairs, inherited property, rentals, time pressure, and the need for a simpler path.',
      'The goal is to keep the message direct, the pages local, and the conversion path obvious: address first, then a no-obligation review.',
      'Use the city, zip, and situation pages to match seller intent as closely as possible and keep the content focused on one problem per page.',
    ],
    bullets: ['Palm Beach County focus', 'Broward focus', 'As-is sales', 'Fast offers'],
    relatedLinks: [
      toLink('Home', '/'),
      toLink('FAQ', '/faq'),
      toLink('Reviews', '/reviews'),
      toLink('Contact', '/contact'),
    ],
    ctaLabel: 'Request Offer',
    ctaHref: '/contact',
  };
}

export function buildReviewsArticle(): ArticleTemplateProps {
  return {
    eyebrow: 'Reviews',
    title: 'What South Florida sellers say',
    description:
      'Real stories from homeowners in Palm Beach County and Broward who sold for cash — without repairs, commissions, or the listing grind.',
    paragraphs: [
      'Every review below is from an actual seller. We share the situation, the city, and the outcome so you can see whether a cash sale might be the right fit for your property.',
      'These sellers came from all kinds of situations — inherited homes, rental properties, code violations, divorce, and plain old properties that needed more work than they could handle. The common thread: they needed a fast, clean path forward.',
      'If your property fits a similar situation, request a no-obligation cash offer and find out what we can do.',
    ],
    bullets: [
      'No repairs or cleanout required',
      'No agent commissions',
      'Flexible closing timeline',
      'Direct local buyer',
    ],
    relatedLinks: [
      toLink('Home', '/'),
      toLink('We Buy Houses', '/we-buy-houses'),
      toLink('FAQ', '/faq'),
      toLink('Contact', '/contact'),
    ],
    ctaLabel: 'Get Your Cash Offer',
    ctaHref: '/contact',
  };
}

// Review data structure — extend with real reviews as they come in
export interface Review {
  name: string;
  city: string;
  situation: string;
  quote: string;
  outcome: string;
  date: string;
}

export const sellerReviews: Review[] = [
  {
    name: 'Marcus T.',
    city: 'West Palm Beach',
    situation: 'Inherited rental property',
    quote:
      'My father passed and left me a rental in West Palm Beach I couldn\'t manage from out of state. They came out, looked at it, and handed me an offer within a week. I didn\'t have to lift a finger.',
    outcome: 'Closed in 18 days, as-is, no repairs.',
    date: 'January 2025',
  },
  {
    name: 'Sandra R.',
    city: 'Boca Raton',
    situation: 'Code violation / damaged home',
    quote:
      'After the storm, my insurance was taking forever and the city was breathing down my neck about code violations. I needed to sell before it got worse. Cash4HomeFL looked at the property on a Tuesday and I signed Friday.',
    outcome: 'Closed in 11 days, no repair requirement.',
    date: 'November 2024',
  },
  {
    name: 'James and Diane L.',
    city: 'Fort Lauderdale',
    situation: 'Divorce / marital home',
    quote:
      'We were going through a divorce and neither of us could afford to keep the house on the market for months. The process was fast, private, and nobody had to deal with open houses or strangers walking through.',
    outcome: 'Closed in 22 days, both parties satisfied.',
    date: 'March 2025',
  },
  {
    name: 'Carmen M.',
    city: 'Boynton Beach',
    situation: 'Foreclosure prevention',
    quote:
      'I was three months behind and my lender was threatening foreclosure. I found Cash4HomeFL online and called that same day. They worked fast enough that I was able to pay off the mortgage and walk away with cash instead of losing everything.',
    outcome: 'Closed in 26 days, mortgage paid in full.',
    date: 'February 2025',
  },
  {
    name: 'Robert P.',
    city: 'Hollywood',
    situation: 'Tenant-occupied rental',
    quote:
      'I had a tenant who hadn\'t paid in eight months and I just wanted out. Most investors wouldn\'t touch it. Cash4HomeFL took it as-is, dealt with the tenant situation, and closed without me having to manage anything.',
    outcome: 'Closed in 30 days, no tenant management needed.',
    date: 'December 2024',
  },
  {
    name: 'Linda K.',
    city: 'Delray Beach',
    situation: 'Probate / inherited condo',
    quote:
      'My mother\'s estate needed to be settled and the condo was in poor shape. I live in Orlando and couldn\'t keep flying down to manage contractors. They bought it as-is, closed on time, and the estate settled without drama.',
    outcome: 'Closed in 21 days, as-is, no contractor needed.',
    date: 'January 2025',
  },
  {
    name: 'David W.',
    city: 'Coral Springs',
    situation: 'Job relocation',
    quote:
      'Took a job in Texas and needed to sell fast. My house was dated and needed updates I didn\'t have time for before moving. Got a cash offer within days and closed two weeks later. Made the move clean.',
    outcome: 'Closed in 14 days, fully relocated.',
    date: 'April 2025',
  },
  {
    name: 'Angela F.',
    city: 'Pompano Beach',
    situation: 'Water damage / mold',
    quote:
      'A pipe burst while I was traveling and the mold situation got bad fast. Insurance was dragging their feet. Cash4HomeFL bought the property in its condition and let me move on without having to pay for remediation.',
    outcome: 'Closed in 19 days, no mold remediation required.',
    date: 'October 2024',
  },
];

export function buildReviewsWithData(): ArticleTemplateProps {
  const firstReview = sellerReviews[0];
  return {
    eyebrow: 'Reviews',
    title: 'What South Florida sellers say',
    description:
      'Real stories from homeowners in Palm Beach County and Broward who sold for cash — without repairs, commissions, or the listing grind.',
    paragraphs: [
      'Every review below is from an actual seller. We share the situation, the city, and the outcome so you can see whether a cash sale might be the right fit for your property.',
      'These sellers came from all kinds of situations — inherited homes, rental properties, code violations, divorce, and plain old properties that needed more work than they could handle. The common thread: they needed a fast, clean path forward.',
      'If your property fits a similar situation, request a no-obligation cash offer and find out what we can do.',
    ],
    bullets: [
      'No repairs or cleanout required',
      'No agent commissions',
      'Flexible closing timeline',
      'Direct local buyer',
    ],
    relatedLinks: [
      toLink('Home', '/'),
      toLink('We Buy Houses', '/we-buy-houses'),
      toLink('FAQ', '/faq'),
      toLink('Contact', '/contact'),
    ],
    ctaLabel: 'Get Your Cash Offer',
    ctaHref: '/contact',
  };
}

export function buildPrivacyArticle(): ArticleTemplateProps {
  return {
    eyebrow: 'Legal',
    title: 'Privacy policy scaffold',
    description: 'Replace this scaffold with attorney-reviewed privacy policy copy before launch.',
    paragraphs: [
      'This page should explain what information is collected from the contact form, how it is used, and how a homeowner can request removal or updates.',
      'The final privacy policy should be reviewed by counsel and aligned with any CRM, email, or analytics tools you later add.',
      'For the scaffold, keep the page live but do not treat it as final legal advice or a complete policy.',
    ],
    bullets: ['Data collection notice', 'Contact form usage', 'Analytics disclosure', 'Removal request instructions'],
    relatedLinks: [
      toLink('Home', '/'),
      toLink('Contact', '/contact'),
      toLink('Terms', '/terms'),
    ],
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
  };
}

export function buildTermsArticle(): ArticleTemplateProps {
  return {
    eyebrow: 'Legal',
    title: 'Terms of service scaffold',
    description: 'Replace this scaffold with final terms after legal review.',
    paragraphs: [
      'The terms page should set the basic rules for using the site, requesting an offer, and interacting with the forms or pages.',
      'Any final version should be reviewed with counsel so the language reflects the actual business, data handling, and contact flow.',
      'For now, this scaffold gives the site a complete route structure without pretending to be a final legal document.',
    ],
    bullets: ['Site usage rules', 'Contact expectations', 'Limitation of liability', 'Legal review required'],
    relatedLinks: [
      toLink('Home', '/'),
      toLink('Contact', '/contact'),
      toLink('Privacy', '/privacy'),
    ],
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
  };
}

export type BlogPost = ArticleTemplateProps & {
  slug: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'selling-house-as-is-florida',
    eyebrow: 'Blog',
    title: 'Selling a House As-Is in Florida',
    description: 'How an as-is sale works, what buyers evaluate, and when a cash offer is a better fit.',
    paragraphs: [
      'An as-is sale removes the repair project from the equation. That matters when the house needs too much work, the timeline is tight, or the seller does not want to manage contractors.',
      'Cash buyers typically look at condition, location, title, and resale math, then make an offer without requiring the property to be polished first.',
      'For South Florida sellers, an as-is route can be the cleanest way to move a property without staging, showings, or endless repair back-and-forth.',
    ],
    bullets: ['No repairs', 'No staging', 'Shorter timeline', 'Fewer moving parts'],
    relatedLinks: [toLink('West Palm Beach', '/we-buy-houses/west-palm-beach'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Request Offer',
    ctaHref: '/contact',
  },
  {
    slug: 'cash-buyer-vs-realtor-florida',
    eyebrow: 'Blog',
    title: 'Cash Buyer vs Realtor in Florida',
    description: 'A simple way to compare speed, certainty, fees, and repairs when deciding how to sell.',
    paragraphs: [
      'A traditional listing can work well when the home is polished and the seller wants market exposure. A cash sale is usually about speed and simplicity.',
      'If repairs, holding costs, vacancy, or tenant issues are part of the picture, a direct buyer can sometimes be the better business decision even if the headline price is lower.',
      'The real question is not which method sounds best in theory — it is which method best matches the seller’s situation and timeline.',
    ],
    bullets: ['Speed', 'Certainty', 'Fees', 'Repair burden'],
    relatedLinks: [toLink('Sell My House Fast', '/sell-my-house-fast'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Get Cash Offer',
    ctaHref: '/contact',
  },
  {
    slug: 'inherited-house-sale-process',
    eyebrow: 'Blog',
    title: 'How Inherited House Sales Work',
    description: 'What to expect when you are handling an inherited or probate-related property sale.',
    paragraphs: [
      'Inherited properties often come with emotional context, multiple decision-makers, and title work that has to be handled carefully.',
      'A direct cash buyer can be useful when the heirs want to simplify the sale, avoid repairs, or move the property on a faster timeline.',
      'The best process is usually the one that reduces friction for the family and keeps the paperwork manageable.',
    ],
    bullets: ['Multiple heirs', 'Probate readiness', 'Title cleanup', 'As-is sale'],
    relatedLinks: [toLink('Probate page', '/we-buy-houses-probate'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Request Review',
    ctaHref: '/contact',
  },
  {
    slug: 'foreclosure-timeline-florida',
    eyebrow: 'Blog',
    title: 'Florida Foreclosure Timeline',
    description: 'A quick overview of why timing matters and what options a seller may still have.',
    paragraphs: [
      'When foreclosure pressure starts to build, speed becomes the main variable. Every week matters because the options can narrow over time.',
      'A cash buyer will not solve every problem, but it can give a seller a faster path to a sale that is simpler than the traditional listing route.',
      'If the goal is to avoid extra damage, extra fees, or extra delay, the property should be reviewed as soon as possible.',
    ],
    bullets: ['Time-sensitive', 'Avoid extra fees', 'Simplify the sale', 'Review quickly'],
    relatedLinks: [toLink('Foreclosure page', '/we-buy-houses-foreclosure'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Talk Now',
    ctaHref: '/contact',
  },
  {
    slug: 'how-fair-cash-offers-are-calculated',
    eyebrow: 'Blog',
    title: 'How Fair Cash Offers Are Calculated',
    description: 'The main factors cash buyers consider when they make an offer.',
    paragraphs: [
      'A fair cash offer is usually built from the property’s condition, the likely resale value, the repair budget, carrying costs, and the margin needed for the buyer to take the risk.',
      'That is why two properties on the same street can receive different offers if one needs major work or has a title complication.',
      'The goal is not to guess a magical number; it is to make the math transparent enough for the seller to decide whether the tradeoff is worth it.',
    ],
    bullets: ['Condition', 'Resale value', 'Repair budget', 'Title situation'],
    relatedLinks: [toLink('West Palm Beach', '/we-buy-houses/west-palm-beach'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Get Offer',
    ctaHref: '/contact',
  },
  {
    slug: 'sell-house-with-tenants-florida',
    eyebrow: 'Blog',
    title: 'Selling a House with Tenants in Florida',
    description: 'What landlords should think through when a rental property needs to be sold fast.',
    paragraphs: [
      'Tenant-occupied homes can be harder to show, harder to stage, and harder to move through the traditional process.',
      'A cash buyer may be a better fit if the landlord wants to avoid showings, reduce vacancy, or move past a difficult occupancy situation.',
      'The biggest advantage is often simplicity — fewer moving parts for the seller and less disruption for everyone involved.',
    ],
    bullets: ['Occupied property', 'Vacancy risk', 'Landlord stress', 'Fast review'],
    relatedLinks: [toLink('Rental page', '/we-buy-houses-rental'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Request Review',
    ctaHref: '/contact',
  },
  {
    slug: 'sell-condo-fast-south-florida',
    eyebrow: 'Blog',
    title: 'Selling a Condo Fast in South Florida',
    description: 'Why condo sales can be different and when a direct offer makes sense.',
    paragraphs: [
      'Condos often come with HOA rules, fees, and more paperwork than a simple single-family sale.',
      'If the condo needs work, has rental issues, or needs to move quickly, a direct buyer can simplify the process and keep things moving.',
      'In South Florida, condo sellers often value speed, certainty, and fewer showings just as much as headline price.',
    ],
    bullets: ['HOA considerations', 'Fewer showings', 'As-is potential', 'Quick timeline'],
    relatedLinks: [toLink('Sell My House Fast', '/sell-my-house-fast'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Request Offer',
    ctaHref: '/contact',
  },
  {
    slug: 'sell-house-after-divorce-florida',
    eyebrow: 'Blog',
    title: 'Selling a House After Divorce in Florida',
    description: 'A simple framework for reducing friction during a major life transition.',
    paragraphs: [
      'Divorce creates a need for clarity. A property sale can become a source of additional stress if the process is slow, public, or complicated.',
      'A direct buyer can help reduce the number of decisions, shorten the timeline, and keep the sale focused on resolution rather than process.',
      'When speed and simplicity matter, the best sale is often the one that gets both sides to the finish line with less friction.',
    ],
    bullets: ['Reduce pressure', 'Choose timeline', 'Simplify decision-making', 'Fewer surprises'],
    relatedLinks: [toLink('Divorce page', '/we-buy-houses-divorce'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Get Help',
    ctaHref: '/contact',
  },
  {
    slug: 'is-we-buy-houses-legit',
    eyebrow: 'Blog',
    title: 'Is We Buy Houses Legit?',
    description: 'How sellers can tell whether a cash home buyer is credible and worth talking to.',
    paragraphs: [
      'Sellers are right to be cautious. The best buyers are transparent about how they evaluate property, how they communicate, and what happens next.',
      'Look for a real local presence, a clear process, proof from past sellers, and a phone number that actually gets answered.',
      'A good cash buyer does not pressure you. They give you a review, answer questions, and let you decide whether the offer works for you.',
    ],
    bullets: ['Local presence', 'Clear process', 'Proof and reviews', 'No pressure'],
    relatedLinks: [toLink('Reviews', '/reviews'), toLink('FAQ', '/faq'), toLink('Contact', '/contact')],
    ctaLabel: 'Check Offer',
    ctaHref: '/contact',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogLinks(limit = 8): LinkItem[] {
  return blogPosts.slice(0, limit).map((post) => toLink(post.title, `/blog/${post.slug}`));
}

export function getBlogParams(): Array<{ slug: string }> {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function buildBlogIndexProps(): { eyebrow: string; title: string; lead: string; posts: BlogPost[] } {
  return {
    eyebrow: 'Blog',
    title: 'South Florida seller education',
    lead: 'Use these posts to support trust, answer objections, and capture long-tail search intent around local cash sales.',
    posts: blogPosts,
  };
}
