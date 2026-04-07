import type { ThemeConfig } from './types';

export const modernProfessionalTheme: ThemeConfig = {
  name: 'modern-professional',
  label: 'Modern Professional',
  hero: {
    layout: 'split',
    hasParticles: false,
    hasVideoBackground: false,
  },
  card: { variant: 'bordered' },
  animation: { preset: 'snappy' },
  classes: {
    heroHeading: 'heading-hero text-foreground',
    heroSubheading: 'text-lg md:text-xl text-muted-foreground max-w-xl mt-6 leading-relaxed',
    sectionContainer: 'px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl mx-auto',
    sectionHeading: 'heading-section text-foreground mb-10',
    cardWrapper: 'bg-surface border border-border rounded-card p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-150 cursor-pointer',
    ctaButton: 'bg-cta hover:bg-cta-hover text-white px-8 py-3 rounded-button font-semibold transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer',
    ctaButtonOutline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-button font-semibold transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer',
    navLink: 'text-foreground hover:text-primary transition-colors duration-150 font-medium',
    menuOverlay: 'bg-overlay',
    menuLink: 'text-2xl md:text-4xl font-heading font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-150',
    badge: 'bg-primary/10 text-primary text-xs px-3 py-1 rounded-md font-semibold',
    input: 'w-full bg-white border-2 border-border rounded-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-[3px] focus:ring-primary/30 focus:border-primary transition-all duration-150',
  },
};
