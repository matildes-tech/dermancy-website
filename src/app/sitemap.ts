import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { treatmentSlugs } from '@/lib/treatments';

const BASE_URL = 'https://www.dermancy.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/treatments', '/3d-body-scan', '/technology', '/booking', '/contact', '/privacy-policy'];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of staticPages) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      alternates[locale] = `${BASE_URL}${prefix}${page}`;
    }

    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1 : 0.8,
      alternates: { languages: alternates },
    });
  }

  // Treatment pages
  for (const slug of treatmentSlugs) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      alternates[locale] = `${BASE_URL}${prefix}/treatments/${slug}`;
    }

    entries.push({
      url: `${BASE_URL}/treatments/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: alternates },
    });
  }

  return entries;
}
