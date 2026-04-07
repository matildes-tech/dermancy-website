'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();

  const prefix = `/${locale}`;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 start-0 end-0 z-40 transition-transform duration-300',
          scrollDirection === 'down' && scrollY > 100 ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="mx-4 mt-4">
          <nav
            className={cn(
              'flex items-center justify-between px-4 sm:px-6 py-3',
              'bg-surface/80 backdrop-blur-lg border border-border rounded-2xl',
              'shadow-sm transition-all duration-[var(--transition-duration)]'
            )}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href={`${prefix}/`}
              className="font-heading font-bold text-xl text-foreground hover:text-primary transition-colors"
            >
              Dermancy
            </Link>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <div className="w-px h-5 bg-border mx-1" />
              <LanguageSwitcher compact />

              {/* Burger button - ALWAYS visible */}
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                aria-label={t('menu')}
                aria-expanded={menuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
