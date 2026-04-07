'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Scan, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useThemeConfig } from '@/themes/ThemeProvider';

export function ThreeDTeaser() {
  const t = useTranslations('threeDScan');
  const locale = useLocale();
  const { classes } = useThemeConfig();
  const prefix = `/${locale}`;

  return (
    <section className="py-20 md:py-32 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Preview Placeholder */}
          <div className="relative aspect-square rounded-section bg-gradient-to-br from-primary/5 to-cta/5 border border-border overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Scan className="w-20 h-20 text-primary/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Interactive 3D Model</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Click to explore</p>
              </div>
            </div>
            {/* Animated grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(var(--color-primary) 1px, transparent 1px),
                  linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <h2 className={classes.sectionHeading}>{t('title')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('instruction')}
            </p>
            <div>
              <Link href={`${prefix}/3d-body-scan`} className={classes.ctaButton}>
                {t('cta')}
                <ArrowRight className="w-4 h-4 ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
