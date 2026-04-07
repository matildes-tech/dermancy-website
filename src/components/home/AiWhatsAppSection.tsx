'use client';

import { useTranslations } from 'next-intl';
import { Bot, MessageCircle, Calendar, Scan } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useThemeConfig } from '@/themes/ThemeProvider';

const features = [
  { key: 'aiChat', icon: Bot },
  { key: 'whatsapp', icon: MessageCircle },
  { key: 'booking', icon: Calendar },
  { key: 'bodyScan', icon: Scan },
] as const;

export function AiWhatsAppSection() {
  const t = useTranslations('technology');
  const { classes } = useThemeConfig();

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={classes.sectionHeading}>{t('title')}</h2>
          <p className="text-muted-foreground mt-4">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ key, icon: Icon }) => (
            <div key={key} className={classes.cardWrapper}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-card bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {t(`${key}.description`)}
                  </p>
                  <ul className="space-y-1.5">
                    {(t.raw(`${key}.features`) as string[]).map((feature: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cta shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
