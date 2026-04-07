'use client';

import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const themeOptions = [
  {
    name: 'clean-minimal' as const,
    label: 'Minimal',
    colors: ['#F0FDFA', '#0891B2', '#22C55E'],
  },
  {
    name: 'dark-aesthetic' as const,
    label: 'Dark',
    colors: ['#0F0F0F', '#B76E79', '#1A1A1A'],
  },
  {
    name: 'modern-professional' as const,
    label: 'Modern',
    colors: ['#FFFFFF', '#0891B2', '#22C55E'],
  },
];

interface ThemeSwitcherProps {
  variant?: 'compact' | 'full';
}

export function ThemeSwitcher({ variant = 'compact' }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (variant === 'full') {
    return (
      <div className="flex items-center gap-2">
        {themeOptions.map((opt) => (
          <button
            key={opt.name}
            onClick={() => setTheme(opt.name)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
              theme === opt.name
                ? 'bg-primary text-white shadow-md scale-105'
                : 'bg-surface/80 text-foreground/70 hover:bg-surface border border-border hover:border-primary/30'
            )}
            aria-label={`Switch to ${opt.label} theme`}
          >
            <div className="flex gap-0.5">
              {opt.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {themeOptions.map((opt) => (
        <button
          key={opt.name}
          onClick={() => setTheme(opt.name)}
          className={cn(
            'p-1.5 rounded-lg transition-all duration-200 cursor-pointer',
            theme === opt.name
              ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
              : 'hover:bg-muted/20'
          )}
          aria-label={`Switch to ${opt.label} theme`}
          title={opt.label}
        >
          <div className="flex gap-0.5">
            {opt.colors.map((color, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-foreground/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
