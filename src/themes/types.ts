export type ThemeName = 'clean-minimal' | 'dark-aesthetic' | 'modern-professional';

export interface HeroConfig {
  layout: 'single-column' | 'centered' | 'split';
  hasParticles: boolean;
  hasVideoBackground: boolean;
}

export interface CardConfig {
  variant: 'flat' | 'glass' | 'bordered';
}

export interface AnimationConfig {
  preset: 'minimal' | 'fluid' | 'snappy';
}

export interface ThemeClasses {
  heroHeading: string;
  heroSubheading: string;
  sectionContainer: string;
  sectionHeading: string;
  cardWrapper: string;
  ctaButton: string;
  ctaButtonOutline: string;
  navLink: string;
  menuOverlay: string;
  menuLink: string;
  badge: string;
  input: string;
}

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  hero: HeroConfig;
  card: CardConfig;
  animation: AnimationConfig;
  classes: ThemeClasses;
}
