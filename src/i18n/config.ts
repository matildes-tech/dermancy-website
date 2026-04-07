export const locales = ['en', 'el', 'de', 'fr', 'es', 'it', 'he', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const rtlLocales: Locale[] = ['he'];
