'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { themes, defaultTheme } from './index';
import type { ThemeConfig, ThemeName } from './types';

const ThemeConfigContext = createContext<ThemeConfig>(themes[defaultTheme]);

export function useThemeConfig(): ThemeConfig {
  return useContext(ThemeConfigContext);
}

export function DermancyThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={defaultTheme}
      themes={Object.keys(themes)}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <ThemeConfigBridge>{children}</ThemeConfigBridge>
    </NextThemesProvider>
  );
}

function ThemeConfigBridge({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Always return default theme config until mounted to prevent hydration mismatch.
  // CSS variables still switch instantly via next-themes' script injection,
  // so colors/fonts change immediately. Only structural differences (hero layout,
  // card variant, menu link classes) wait for mount.
  const config = useMemo(() => {
    if (!mounted) return themes[defaultTheme];
    return themes[(resolvedTheme as ThemeName) || defaultTheme] || themes[defaultTheme];
  }, [mounted, resolvedTheme]);

  return (
    <ThemeConfigContext.Provider value={config}>
      {children}
    </ThemeConfigContext.Provider>
  );
}
