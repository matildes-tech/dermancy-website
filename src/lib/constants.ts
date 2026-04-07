export const CLINIC = {
  name: 'Dermancy Medical House',
  tagline: 'Elevate Your Beauty with Premium Medical Aesthetics in Rhodes',
  philosophy: 'Aesthetic medicine should never erase your identity — it should refine it.',
  values: 'Personalized. Natural. Clinically grounded.',
  design: 'Subtle. Sophisticated. True to you.',
  address: {
    street: 'Larnakas 5',
    city: 'Rhodes',
    postalCode: '85100',
    country: 'Greece',
    countryCode: 'GR',
  },
  phone: {
    main: '+30 2241 309994',
    mobile: '+30 695 663 9172',
    whatsapp: '306956639172',
  },
  email: 'info@dermancy.com',
  hours: {
    days: 'Monday – Saturday',
    open: '10:30',
    close: '19:00',
    closed: 'Sunday',
  },
  social: {
    instagramDoctor: 'https://instagram.com/dr.michalakis',
    instagramClinic: 'https://instagram.com/dermancy_medical_house',
  },
  coordinates: {
    lat: 36.4349,
    lng: 28.2176,
  },
} as const;

export const DOCTOR = {
  name: 'Dr. Ioannis Michalakis',
  title: 'Specialist in Aesthetic Medicine & Anti-Aging',
  experience: '3+ years of clinical experience',
  expertise: 'Advanced injectable techniques, facial harmonization',
  philosophy: 'Subtle enhancements that maintain natural beauty',
  bio: 'With years of clinical experience and a refined eye for balance, Dr. Michalakis has developed a unique approach to aesthetic medicine — one that respects natural beauty while restoring youthful vitality.',
} as const;

export const LOCALES = ['en', 'el', 'de', 'fr', 'es', 'it', 'he', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const RTL_LOCALES: Locale[] = ['he'];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  el: 'Ελληνικά',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  he: 'עברית',
  zh: '中文',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: 'GB',
  el: 'GR',
  de: 'DE',
  fr: 'FR',
  es: 'ES',
  it: 'IT',
  he: 'IL',
  zh: 'CN',
};
