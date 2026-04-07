'use client';

import { useTranslations } from 'next-intl';
import { Heart, User, Target } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useThemeConfig } from '@/themes/ThemeProvider';

const values = [
  { key: 'natural', icon: Heart },
  { key: 'personalized', icon: User },
  { key: 'precision', icon: Target },
] as const;

export function PhilosophySection() {
  const t = useTranslations('about.philosophy');
  const { classes } = useThemeConfig();

  return (
    <section className="py-20 md:py-32 bg-surface">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={classes.sectionHeading}>{t('title')}</h2>
          <p className="text-lg text-muted-foreground mt-4 leading-relaxed italic">
            &ldquo;{t('description')}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(({ key, icon: Icon }) => (
            <div key={key} className={classes.cardWrapper}>
              <div className="w-12 h-12 rounded-card bg-primary/10 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                {t(`values.${key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`values.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
