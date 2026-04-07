import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { treatments } from '@/lib/treatments';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'treatments' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function TreatmentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'treatments' });
  const prefix = `/${locale}`;

  const categories = [
    { key: 'face', label: 'Face' },
    { key: 'skin', label: 'Skin' },
    { key: 'body', label: 'Body' },
    { key: 'hair', label: 'Hair' },
  ];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mb-16">
          <h1 className="heading-section text-foreground mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {categories.map((category) => {
          const categoryTreatments = treatments.filter((tr) => tr.category === category.key);
          if (categoryTreatments.length === 0) return null;

          return (
            <div key={category.key} className="mb-16 last:mb-0">
              <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
                {category.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTreatments.map((treatment) => {
                  const Icon = treatment.icon;
                  return (
                    <Link
                      key={treatment.slug}
                      href={`${prefix}/treatments/${treatment.slug}`}
                      className="glass-card p-6 group block hover:scale-[1.01] transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">
                          {t(`${treatment.translationKey}.title`)}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {t(`${treatment.translationKey}.shortDescription`)}
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mb-4">
                        <div>
                          <span className="block text-foreground font-medium">{t('duration')}</span>
                          {treatment.duration}
                        </div>
                        <div>
                          <span className="block text-foreground font-medium">{t('downtime')}</span>
                          {treatment.downtime}
                        </div>
                        <div>
                          <span className="block text-foreground font-medium">{t('results')}</span>
                          {treatment.resultsTimeline}
                        </div>
                        <div>
                          <span className="block text-foreground font-medium">{t('longevity')}</span>
                          {treatment.longevity}
                        </div>
                      </div>
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t('learnMore')}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
