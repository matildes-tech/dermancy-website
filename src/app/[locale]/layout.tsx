import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { fontVariables } from '@/lib/fonts';
import { DermancyThemeProvider } from '@/themes/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { WhatsAppWidget } from '@/components/widgets/WhatsAppWidget';
import { AiChatWidget } from '@/components/widgets/AiChatWidget';
import { CookieConsent } from '@/components/widgets/CookieConsent';
import { locales, rtlLocales } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <DermancyThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <SkipLink />
            <Header />
            <main id="main-content" className="flex-1 pt-24">
              {children}
            </main>
            <Footer />
            <WhatsAppWidget />
            <AiChatWidget />
            <CookieConsent />
          </NextIntlClientProvider>
        </DermancyThemeProvider>
      </body>
    </html>
  );
}
