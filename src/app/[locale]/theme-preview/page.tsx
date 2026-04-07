'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { themeNames, themes } from '@/themes';
import { cn } from '@/lib/utils';
import { Check, Palette } from 'lucide-react';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('themePreview');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const themeCards = [
    {
      name: 'clean-minimal' as const,
      translationKey: 'cleanMinimal',
      preview: {
        bg: '#F0FDFA',
        accent: '#0891B2',
        cta: '#22C55E',
        text: '#134E4A',
        font: 'Figtree',
      },
    },
    {
      name: 'dark-aesthetic' as const,
      translationKey: 'darkAesthetic',
      preview: {
        bg: '#0F0F0F',
        accent: '#B76E79',
        cta: '#B76E79',
        text: '#E8E8E8',
        font: 'Cormorant',
      },
    },
    {
      name: 'modern-professional' as const,
      translationKey: 'modernProfessional',
      preview: {
        bg: '#FFFFFF',
        accent: '#0891B2',
        cta: '#22C55E',
        text: '#134E4A',
        font: 'Space Grotesk',
      },
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Palette className="w-4 h-4" />
            Design Preview
          </div>
          <h1 className="heading-section text-foreground mb-4">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {themeCards.map((tc) => {
            const isActive = mounted && theme === tc.name;
            return (
              <button
                key={tc.name}
                onClick={() => setTheme(tc.name)}
                className={cn(
                  'glass-card p-6 text-start transition-all duration-300 cursor-pointer relative overflow-hidden',
                  isActive && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                )}
              >
                {isActive && (
                  <div className="absolute top-4 end-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                {/* Color Preview Strip */}
                <div className="flex gap-2 mb-6">
                  <div
                    className="flex-1 h-24 rounded-lg"
                    style={{ backgroundColor: tc.preview.bg, border: '1px solid rgba(0,0,0,0.1)' }}
                  >
                    <div className="p-3">
                      <div
                        className="w-12 h-1.5 rounded mb-2"
                        style={{ backgroundColor: tc.preview.accent }}
                      />
                      <div
                        className="w-20 h-1 rounded mb-1"
                        style={{ backgroundColor: tc.preview.text, opacity: 0.6 }}
                      />
                      <div
                        className="w-16 h-1 rounded mb-3"
                        style={{ backgroundColor: tc.preview.text, opacity: 0.3 }}
                      />
                      <div
                        className="w-14 h-4 rounded-sm"
                        style={{ backgroundColor: tc.preview.cta }}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {t(`${tc.translationKey}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t(`${tc.translationKey}.description`)}
                </p>

                {/* Font + Color samples */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Font: {tc.preview.font}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <div className="flex gap-1">
                    {Object.values(tc.preview).filter(v => v.startsWith('#')).slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {isActive && (
                  <div className="mt-4 text-xs font-medium text-primary">{t('current')}</div>
                )}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
