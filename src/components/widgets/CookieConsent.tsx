'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function CookieConsent() {
  const t = useTranslations('cookie');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const prefix = `/${locale}`;

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 start-0 end-0 z-50 p-4',
        'animate-in slide-in-from-bottom fade-in duration-500'
      )}
    >
      <div className="max-w-xl mx-auto bg-surface border border-border rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          {t('message')}{' '}
          <Link
            href={`${prefix}/privacy-policy`}
            className="text-primary hover:underline"
          >
            {t('learnMore')}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {t('decline')}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-primary text-white rounded-button hover:bg-primary-hover transition-colors cursor-pointer"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
