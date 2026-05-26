import siteDataRaw from '@/data/site-data.json';
import type { LinkItem } from '@/lib/page-types';

export type CityData = {
  name: string;
  slug: string;
  priority: number;
  zips: string[];
  market_angle: string;
  featured_neighborhoods: string[];
};

export type CountyData = {
  name: string;
  slug: string;
  priority: number;
  cities: CityData[];
};

export type ZipPageData = {
  zip: string;
  slug: string;
  county: string;
  primaryCity: string;
  priority: number;
};

export type SituationData = {
  slug: string;
  title: string;
};

export type SiteData = {
  site: {
    name: string;
    stack: string[];
    launch_strategy: string;
    api_policy: string;
  };
  counties: CountyData[];
  zipPages: ZipPageData[];
  situations: SituationData[];
  propertyTypes: string[];
  faqQuestions: string[];
};

export type CityRecord = CityData & {
  countyName: string;
  countySlug: string;
  countyPriority: number;
};

export const siteData = siteDataRaw as SiteData;

export function getAllCounties(): CountyData[] {
  return [...siteData.counties].sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));
}

export function getCountyBySlug(slug: string): CountyData | undefined {
  return siteData.counties.find((county) => county.slug === slug);
}

export function getAllCities(): CityRecord[] {
  return siteData.counties
    .flatMap((county) =>
      county.cities.map((city) => ({
        ...city,
        countyName: county.name,
        countySlug: county.slug,
        countyPriority: county.priority,
      })),
    )
    .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));
}

export function getCityBySlug(slug: string): CityRecord | undefined {
  return getAllCities().find((city) => city.slug === slug);
}

export function getTopCities(limit = 8): CityRecord[] {
  return getAllCities().slice(0, limit);
}

export function getCountyCities(countySlug: string, limit = 8): CityRecord[] {
  const county = getCountyBySlug(countySlug);
  if (!county) return [];
  return getAllCities()
    .filter((city) => city.countySlug === countySlug)
    .slice(0, limit);
}

export function getZipByValue(zip: string): ZipPageData | undefined {
  return siteData.zipPages.find((entry) => entry.zip === zip);
}

export function getAllZipPages(): ZipPageData[] {
  return [...siteData.zipPages].sort((a, b) => a.priority - b.priority || a.zip.localeCompare(b.zip));
}

export function getTopZipPages(limit = 8): ZipPageData[] {
  return getAllZipPages().slice(0, limit);
}

export function getSituationBySlug(slug: string): SituationData | undefined {
  return siteData.situations.find((entry) => entry.slug === slug);
}

export function getCityParams(): Array<{ city: string }> {
  return getAllCities().map((city) => ({ city: city.slug }));
}

export function getZipParams(): Array<{ zip: string }> {
  return getAllZipPages().map((zip) => ({ zip: zip.zip }));
}

export function getSituationParams(): Array<{ slug: string }> {
  return siteData.situations.map((entry) => ({ slug: entry.slug }));
}

export function getBlogParams(): Array<{ slug: string }> {
  return [];
}

export function toLink(label: string, href: string): LinkItem {
  return { label, href };
}

export function getNearbyCityLinks(citySlug: string, limit = 4): LinkItem[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return getAllCities()
    .filter((entry) => entry.countySlug === city.countySlug && entry.slug !== city.slug)
    .slice(0, limit)
    .map((entry) => toLink(entry.name, `/we-buy-houses/${entry.slug}`));
}

export function getCountyCityLinks(countySlug: string, limit = 6): LinkItem[] {
  return getCountyCities(countySlug, limit).map((entry) => toLink(entry.name, `/we-buy-houses/${entry.slug}`));
}

export function getNearbyZipLinks(zipValue: string, limit = 4): LinkItem[] {
  const zip = getZipByValue(zipValue);
  if (!zip) return [];
  return getAllZipPages()
    .filter((entry) => entry.county === zip.county && entry.zip !== zip.zip)
    .slice(0, limit)
    .map((entry) => toLink(entry.zip, `/sell-my-house-fast/${entry.zip}`));
}

export function getCountyLinks(limit = 4): LinkItem[] {
  return getAllCounties().slice(0, limit).map((county) => toLink(county.name, `/${county.slug}`));
}

export function getCoreLinks(): LinkItem[] {
  return [
    toLink('Home', '/'),
    toLink('We Buy Houses', '/we-buy-houses'),
    toLink('Sell My House Fast', '/sell-my-house-fast'),
    toLink('Palm Beach County', '/palm-beach-county'),
    toLink('Broward County', '/broward-county'),
    toLink('FAQ', '/faq'),
    toLink('Reviews', '/reviews'),
    toLink('Contact', '/contact'),
  ];
}

export function getFeaturedCityLinks(limit = 8): LinkItem[] {
  return getTopCities(limit).map((city) => toLink(city.name, `/we-buy-houses/${city.slug}`));
}

export function getFeaturedZipLinks(limit = 8): LinkItem[] {
  return getTopZipPages(limit).map((zip) => toLink(zip.zip, `/sell-my-house-fast/${zip.zip}`));
}
