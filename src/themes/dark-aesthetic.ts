import type { ThemeConfig } from './types';

export const darkAestheticTheme: ThemeConfig = {
  name: 'dark-aesthetic',
  label: 'Dark Aesthetic',
  hero: {
    layout: 'centered',
    hasParticles: true,
    hasVideoBackground: false,
  },
  card: { variant: 'glass' },
  animation: { preset: 'fluid' },
  classes: {
    heroHeading: 'heading-hero text-foreground text-center',
    heroSubheading: 'text-lg md:text-xl text-muted-foreground font-light text-center max-w-xl mx-auto mt-8 tracking-wide',
    sectionContainer: 'px-4 sm:px-6 lg:px-8 py-24 md:py-36 max-w-7xl mx-auto',
    sectionHeading: 'heading-section text-foreground mb-16 text-center',
    cardWrapper: 'glass-card p-8 hover:scale-[1.02] transition-all duration-500 cursor-pointer',
    ctaButton: 'bg-cta hover:bg-cta-hover text-white px-10 py-4 rounded-button font-medium tracking-wider uppercase text-sm transition-all duration-500 cursor-pointer',
    ctaButtonOutline: 'border border-cta text-cta hover:bg-cta hover:text-white px-10 py-4 rounded-button font-medium tracking-wider uppercase text-sm transition-all duration-500 cursor-pointer',
    navLink: 'text-foreground/80 hover:text-primary transition-colors duration-500',
    menuOverlay: 'bg-overlay backdrop-blur-xl',
    menuLink: 'text-3xl md:text-5xl font-heading font-light tracking-widest text-foreground/90 hover:text-primary transition-all duration-500',
    badge: 'border border-primary/30 text-primary text-xs px-3 py-1 rounded-full font-light tracking-wider uppercase',
    input: 'w-full bg-surface/50 backdrop-blur-sm border border-border rounded-full px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-500',
  },
};
