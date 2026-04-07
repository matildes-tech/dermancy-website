import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { BodyScanClient } from '@/components/3d/BodyScanClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'threeDScan' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ThreeDBodyScanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'threeDScan' });

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="heading-section text-foreground mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground mb-2">{t('description')}</p>
          <p className="text-sm text-muted-foreground">{t('instruction')}</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <BodyScanClient />
        </div>
      </Container>
    </section>
  );
}
