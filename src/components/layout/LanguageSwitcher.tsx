'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LOCALES, LOCALE_NAMES, LOCALE_FLAGS, type Locale } from '@/lib/constants';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export function LanguageSwitcher({ compact = true }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split('/');
    // Remove existing locale prefix if present
    if (LOCALES.includes(segments[1] as Locale)) {
      segments[1] = newLocale === 'en' ? '' : newLocale;
    } else {
      segments.splice(1, 0, newLocale === 'en' ? '' : newLocale);
    }
    const newPath = segments.filter(Boolean).join('/') || '/';
    router.push(`/${newPath.replace(/^\/+/, '')}`);
    setOpen(false);
  }

  if (!compact) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {LOCALES.map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-card text-start transition-colors cursor-pointer',
              l === locale
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-foreground/70 hover:bg-muted/20'
            )}
          >
            <span className="text-lg">{getFlagEmoji(LOCALE_FLAGS[l])}</span>
            <span className="text-sm">{LOCALE_NAMES[l]}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors cursor-pointer p-2"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{locale}</span>
        <ChevronDown className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute end-0 top-full mt-2 bg-surface border border-border rounded-card shadow-lg py-1 min-w-[180px] z-50">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-start transition-colors cursor-pointer',
                l === locale
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground/70 hover:bg-muted/10'
              )}
            >
              <span>{getFlagEmoji(LOCALE_FLAGS[l])}</span>
              <span className="text-sm">{LOCALE_NAMES[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
