import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, Clock, Zap, Timer, Shield, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { treatments, getTreatmentBySlug, treatmentSlugs } from '@/lib/treatments';
import { JsonLd } from '@/components/seo/JsonLd';
import { CLINIC } from '@/lib/constants';

export function generateStaticParams() {
  return treatmentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) return {};
  const t = await getTranslations({ locale, namespace: 'treatments' });
  return {
    title: t(`${treatment.translationKey}.title`),
    description: t(`${treatment.translationKey}.shortDescription`),
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'treatments' });
  const prefix = `/${locale}`;
  const Icon = treatment.icon;

  const benefits = t.raw(`${treatment.translationKey}.benefits`) as string[];
  const relatedTreatments = treatments
    .filter((tr) => tr.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: t(`${treatment.translationKey}.title`),
          description: t(`${treatment.translationKey}.description`),
          procedureType: 'NoninvasiveProcedure',
          howPerformed: t(`${treatment.translationKey}.description`),
          preparation: 'Consultation with Dr. Michalakis',
          followup: 'Follow-up appointment as recommended',
          status: 'EventScheduled',
          provider: {
            '@type': 'MedicalOrganization',
            name: CLINIC.name,
            telephone: CLINIC.phone.main,
          },
        }}
      />

      <section className="py-16 md:py-24">
        <Container>
          {/* Breadcrumb */}
          <Link
            href={`${prefix}/treatments`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('title')}
          </Link>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-card bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <Badge>{treatment.category}</Badge>
              </div>
              <h1 className="heading-section text-foreground mb-2">
                {t(`${treatment.translationKey}.title`)}
              </h1>
              <p className="text-xl text-primary font-heading font-medium italic mb-6">
                {t(`${treatment.translationKey}.tagline`)}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t(`${treatment.translationKey}.description`)}
              </p>
            </div>

            {/* Quick Facts */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 space-y-5">
                <h3 className="font-heading font-semibold text-foreground">{t('whatToExpect')}</h3>
                <div className="space-y-4">
                  {[
                    { icon: Clock, label: t('duration'), value: treatment.duration },
                    { icon: Zap, label: t('results'), value: treatment.resultsTimeline },
                    { icon: Timer, label: t('longevity'), value: treatment.longevity },
                    { icon: Shield, label: t('downtime'), value: treatment.downtime },
                  ].map(({ icon: ItemIcon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-card bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ItemIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
                        <p className="text-sm text-foreground">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`${prefix}/booking`}
                  className="block w-full text-center bg-cta hover:bg-cta-hover text-white px-6 py-3 rounded-button font-semibold transition-colors cursor-pointer"
                >
                  {t('bookNow')}
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="heading-section text-foreground mb-8">{t('benefits')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 glass-card">
                  <CheckCircle2 className="w-5 h-5 text-cta shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results Detail */}
          <div className="mb-16 glass-card p-8">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">{t('results')}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t(`${treatment.translationKey}.resultsDetail`)}
            </p>
          </div>

          {/* Related Treatments */}
          <div>
            <h2 className="heading-section text-foreground mb-8">Related Treatments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedTreatments.map((rel) => {
                const RelIcon = rel.icon;
                return (
                  <Link
                    key={rel.slug}
                    href={`${prefix}/treatments/${rel.slug}`}
                    className="glass-card p-6 group block"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-card bg-primary/10 flex items-center justify-center">
                        <RelIcon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-foreground text-sm">
                        {t(`${rel.translationKey}.title`)}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {t(`${rel.translationKey}.shortDescription`)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
