import type { ThemeConfig } from './types';

export const cleanMinimalTheme: ThemeConfig = {
  name: 'clean-minimal',
  label: 'Clean Minimal',
  hero: {
    layout: 'single-column',
    hasParticles: false,
    hasVideoBackground: false,
  },
  card: { variant: 'flat' },
  animation: { preset: 'minimal' },
  classes: {
    heroHeading: 'heading-hero text-foreground max-w-5xl',
    heroSubheading: 'text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mt-6',
    sectionContainer: 'px-4 sm:px-6 lg:px-8 py-20 md:py-32 max-w-7xl mx-auto',
    sectionHeading: 'heading-section text-foreground mb-12',
    cardWrapper: 'bg-surface border border-border rounded-card p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer',
    ctaButton: 'bg-cta hover:bg-cta-hover text-white px-8 py-3 rounded-button font-semibold transition-colors duration-200 cursor-pointer',
    ctaButtonOutline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-button font-semibold transition-colors duration-200 cursor-pointer',
    navLink: 'text-foreground hover:text-primary transition-colors duration-200',
    menuOverlay: 'bg-overlay',
    menuLink: 'text-4xl md:text-6xl font-heading font-black tracking-tight text-foreground hover:text-primary transition-colors duration-200',
    badge: 'bg-muted text-muted-foreground text-xs px-2 py-1 rounded-card font-medium',
    input: 'w-full bg-surface border border-border rounded-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-shadow duration-200',
  },
};
