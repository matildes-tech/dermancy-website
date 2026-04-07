'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useThemeConfig } from '@/themes/ThemeProvider';
import { treatments } from '@/lib/treatments';
import { cn } from '@/lib/utils';

export function FeaturedTreatments() {
  const t = useTranslations();
  const locale = useLocale();
  const { classes } = useThemeConfig();
  const prefix = `/${locale}`;

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className={classes.sectionHeading}>{t('treatments.title')}</h2>
            <p className="text-muted-foreground max-w-2xl">{t('treatments.subtitle')}</p>
          </div>
          <Link
            href={`${prefix}/treatments`}
            className="text-primary hover:text-primary-hover font-medium inline-flex items-center gap-1.5 transition-colors shrink-0"
          >
            {t('treatments.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((treatment) => {
            const Icon = treatment.icon;
            return (
              <Link
                key={treatment.slug}
                href={`${prefix}/treatments/${treatment.slug}`}
                className={cn(classes.cardWrapper, 'group block')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {t(`treatments.${treatment.translationKey}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t(`treatments.${treatment.translationKey}.shortDescription`)}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{treatment.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>{treatment.downtime} downtime</span>
                </div>
                <div className="mt-4 text-primary text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('treatments.learnMore')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
