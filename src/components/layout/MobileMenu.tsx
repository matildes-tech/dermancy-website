'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { X, Phone, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeConfig } from '@/themes/ThemeProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CLINIC } from '@/lib/constants';
import { treatments } from '@/lib/treatments';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { classes } = useThemeConfig();
  const [treatmentsExpanded, setTreatmentsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const prefix = `/${locale}`;

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const navLinks = [
    { href: `${prefix}/`, label: t('nav.home') },
    { href: `${prefix}/about`, label: t('nav.about') },
    { href: null, label: t('nav.treatments'), expandable: true },
    { href: `${prefix}/3d-body-scan`, label: t('nav.threeDScan') },
    { href: `${prefix}/technology`, label: t('nav.technology') },
    { href: `${prefix}/booking`, label: t('nav.booking') },
    { href: `${prefix}/contact`, label: t('nav.contact') },
  ];

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-all duration-500',
        open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0',
          classes.menuOverlay,
          'transition-opacity duration-500',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Menu Content */}
      <div
        ref={menuRef}
        className={cn(
          'absolute inset-0 flex flex-col overflow-y-auto',
          'transition-transform duration-500 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label={t('nav.close')}
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col justify-center px-8 sm:px-16 gap-4">
          {navLinks.map((link, i) => (
            <div
              key={link.label}
              className={cn(
                'transition-all duration-500',
                open
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: open ? `${150 + i * 75}ms` : '0ms' }}
            >
              {link.expandable ? (
                <div>
                  <button
                    onClick={() => setTreatmentsExpanded(!treatmentsExpanded)}
                    className={cn(classes.menuLink, 'flex items-center gap-3 cursor-pointer w-full text-start')}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-6 h-6 transition-transform', treatmentsExpanded && 'rotate-180')} />
                  </button>
                  {treatmentsExpanded && (
                    <div className="ms-4 mt-3 flex flex-col gap-2">
                      <Link
                        href={`${prefix}/treatments`}
                        onClick={onClose}
                        className="text-lg text-muted-foreground hover:text-primary transition-colors"
                      >
                        {t('treatments.viewAll')}
                      </Link>
                      {treatments.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`${prefix}/treatments/${treatment.slug}`}
                          onClick={onClose}
                          className="text-lg text-muted-foreground hover:text-primary transition-colors"
                        >
                          {t(`treatments.${treatment.translationKey}.title`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href!}
                  onClick={onClose}
                  className={classes.menuLink}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="px-8 sm:px-16 pb-10 space-y-6">
          {/* Language Switcher */}
          <div>
            <p className="text-sm text-muted-foreground mb-3 font-medium uppercase tracking-wider">
              {t('nav.language')}
            </p>
            <LanguageSwitcher compact={false} />
          </div>

          {/* Phone CTA */}
          <a
            href={`tel:${CLINIC.phone.main}`}
            className="flex items-center gap-3 text-primary hover:text-primary-hover transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="font-medium">{CLINIC.phone.main}</span>
          </a>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href={CLINIC.social.instagramDoctor}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Dr. Michalakis Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a
              href={CLINIC.social.instagramClinic}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Dermancy Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
