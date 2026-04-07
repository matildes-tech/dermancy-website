import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Bot, MessageCircle, Calendar, Scan, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'technology' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'technology' });
  const prefix = `/${locale}`;

  const techFeatures = [
    {
      key: 'aiChat',
      icon: Bot,
      gradient: 'from-purple-500/10 to-blue-500/10',
      accentColor: 'text-purple-500',
      link: null,
    },
    {
      key: 'whatsapp',
      icon: MessageCircle,
      gradient: 'from-green-500/10 to-emerald-500/10',
      accentColor: 'text-green-500',
      link: null,
    },
    {
      key: 'booking',
      icon: Calendar,
      gradient: 'from-blue-500/10 to-cyan-500/10',
      accentColor: 'text-blue-500',
      link: `${prefix}/booking`,
    },
    {
      key: 'bodyScan',
      icon: Scan,
      gradient: 'from-amber-500/10 to-orange-500/10',
      accentColor: 'text-amber-500',
      link: `${prefix}/3d-body-scan`,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Next-Generation Medical Care
          </div>
          <h1 className="heading-section text-foreground mb-6">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-8">
          {techFeatures.map(({ key, icon: Icon, gradient, accentColor, link }, i) => (
            <div
              key={key}
              className={`glass-card p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              {/* Visual */}
              <div className={`aspect-[4/3] rounded-section bg-gradient-to-br ${gradient} flex items-center justify-center ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <Icon className={`w-20 h-20 ${accentColor} opacity-30`} />
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
                  {t(`${key}.title`)}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t(`${key}.description`)}
                </p>
                <ul className="space-y-2 mb-6">
                  {(t.raw(`${key}.features`) as string[]).map((feature: string, fi: number) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-foreground">
                      <Shield className="w-4 h-4 text-cta shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {link && (
                  <Link
                    href={link}
                    className="text-primary hover:text-primary-hover font-medium inline-flex items-center gap-1.5 transition-colors"
                  >
                    Try it now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
