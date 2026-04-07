'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useThemeConfig } from '@/themes/ThemeProvider';
import { CLINIC } from '@/lib/constants';

export function BookingCTA() {
  const t = useTranslations();
  const locale = useLocale();
  const { classes } = useThemeConfig();
  const prefix = `/${locale}`;

  return (
    <section className="py-20 md:py-32">
      <Container size="md">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-cta/10 flex items-center justify-center mx-auto">
            <CalendarDays className="w-8 h-8 text-cta" />
          </div>
          <h2 className={classes.sectionHeading}>
            {t('booking.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('booking.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href={`${prefix}/booking`} className={classes.ctaButton}>
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${CLINIC.phone.main}`}
              className={classes.ctaButtonOutline}
            >
              {t('common.callUs')}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
