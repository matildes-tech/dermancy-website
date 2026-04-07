import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { BookingWizard } from '@/components/booking/BookingWizard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'booking' });

  return (
    <section className="py-16 md:py-24">
      <Container size="md">
        <div className="text-center mb-12">
          <h1 className="heading-section text-foreground mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>
        <BookingWizard />
      </Container>
    </section>
  );
}
