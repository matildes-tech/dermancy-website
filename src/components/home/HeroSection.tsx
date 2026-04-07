'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useThemeConfig } from '@/themes/ThemeProvider';
import { Container } from '@/components/ui/Container';
import { ThemeSwitcher } from '@/components/layout/ThemeSwitcher';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { hero, classes, name } = useThemeConfig();
  const prefix = `/${locale}`;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects per theme */}
      {hero.hasParticles && <ParticleBackground />}

      {/* Theme Selector - top right of hero */}
      <div className="absolute top-4 end-4 z-10">
        <ThemeSwitcher variant="full" />
      </div>

      <Container>
        {hero.layout === 'single-column' && (
          <div className="flex flex-col items-start gap-8 py-20">
            <h1 className={classes.heroHeading}>{t('title')}</h1>
            <p className={classes.heroSubheading}>{t('description')}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href={`${prefix}/booking`} className={classes.ctaButton}>
                {t('cta')}
              </Link>
              <Link href={`${prefix}/treatments`} className={classes.ctaButtonOutline}>
                {t('ctaSecondary')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {hero.layout === 'centered' && (
          <div className="flex flex-col items-center text-center gap-8 py-20">
            <div className={cn(classes.badge, 'mb-2')}>
              Dermancy Medical House
            </div>
            <h1 className={classes.heroHeading}>{t('title')}</h1>
            <p className={classes.heroSubheading}>{t('description')}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link href={`${prefix}/booking`} className={classes.ctaButton}>
                {t('cta')}
              </Link>
              <Link href={`${prefix}/treatments`} className={classes.ctaButtonOutline}>
                {t('ctaSecondary')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {hero.layout === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
            <div className="flex flex-col gap-6">
              <div className={classes.badge}>
                Dermancy Medical House
              </div>
              <h1 className={classes.heroHeading}>{t('title')}</h1>
              <p className={classes.heroSubheading}>{t('description')}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href={`${prefix}/booking`} className={classes.ctaButton}>
                  {t('cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`${prefix}/treatments`} className={classes.ctaButtonOutline}>
                  {t('ctaSecondary')}
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-section bg-muted/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-cta/20 flex items-center justify-center mb-4">
                    <span className="text-4xl font-heading font-bold text-primary">DM</span>
                  </div>
                  <p className="text-sm">Dr. Ioannis Michalakis</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Decorative gradient */}
      <div
        className="absolute bottom-0 start-0 end-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, var(--color-background), transparent)`,
        }}
      />
    </section>
  );
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
