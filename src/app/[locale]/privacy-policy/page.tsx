import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: t('title') };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <section className="py-16 md:py-24">
      <Container size="md">
        <h1 className="heading-section text-foreground mb-2">{t('title')}</h1>
        <p className="text-sm text-muted-foreground mb-8">{t('effectiveDate')}</p>
        <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
          <p>{t('content')}</p>
        </div>
      </Container>
    </section>
  );
}
