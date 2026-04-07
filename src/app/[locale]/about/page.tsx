import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PhysicianSchema } from '@/components/seo/PhysicianSchema';
import { DOCTOR, CLINIC } from '@/lib/constants';
import { Heart, User, Target, Award, Stethoscope, Eye } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('doctorBio'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <PhysicianSchema />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-section text-foreground mb-6">{t('title')}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t('clinic.description')}
              </p>
              <p className="text-primary font-heading font-semibold text-lg">
                {t('clinic.tagline')}
              </p>
            </div>
            <div className="relative aspect-square rounded-section bg-gradient-to-br from-primary/10 to-cta/10 border border-border overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-cta/20 flex items-center justify-center mb-6">
                  <span className="text-5xl font-heading font-bold text-primary">DM</span>
                </div>
                <p className="text-muted-foreground text-sm">{CLINIC.name}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Doctor */}
      <section className="py-16 md:py-24 bg-surface">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-cta/20 flex items-center justify-center mb-8">
              <Stethoscope className="w-14 h-14 text-primary" />
            </div>
            <h2 className="heading-section text-foreground mb-2">{t('doctorName')}</h2>
            <p className="text-primary font-medium mb-6">{t('doctorTitle')}</p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              {t('doctorBio')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-cta" />
                {t('experience')}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4 text-cta" />
                {t('expertise')}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-section text-foreground mb-4">{t('philosophy.title')}</h2>
            <p className="text-xl text-muted-foreground italic leading-relaxed">
              &ldquo;{t('philosophy.description')}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { key: 'natural', icon: Heart },
              { key: 'personalized', icon: User },
              { key: 'precision', icon: Target },
            ].map(({ key, icon: Icon }) => (
              <div key={key} className="glass-card p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {t(`philosophy.values.${key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`philosophy.values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
