import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CLINIC } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mb-16">
          <h1 className="heading-section text-foreground mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <ContactForm />
          </div>

          {/* Contact Info + Map */}
          <div className="space-y-8">
            <div className="glass-card p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{t('info.address')}</p>
                  <p className="text-muted-foreground text-sm">{CLINIC.address.street}, {CLINIC.address.city}, {CLINIC.address.postalCode}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{t('info.phone')}</p>
                  <a href={`tel:${CLINIC.phone.main}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">{CLINIC.phone.main}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{t('info.email')}</p>
                  <a href={`mailto:${CLINIC.email}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">{CLINIC.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-card bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{t('info.hours')}</p>
                  <p className="text-muted-foreground text-sm">{t('info.hoursDetail')}</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card overflow-hidden aspect-[4/3]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${CLINIC.coordinates.lng}!3d${CLINIC.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2s!4v1`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('map')}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
