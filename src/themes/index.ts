import type { ThemeConfig, ThemeName } from './types';
import { cleanMinimalTheme } from './clean-minimal';
import { darkAestheticTheme } from './dark-aesthetic';
import { modernProfessionalTheme } from './modern-professional';

export const themes: Record<ThemeName, ThemeConfig> = {
  'clean-minimal': cleanMinimalTheme,
  'dark-aesthetic': darkAestheticTheme,
  'modern-professional': modernProfessionalTheme,
};

export const themeNames = Object.keys(themes) as ThemeName[];
export const defaultTheme: ThemeName = 'clean-minimal';

export { type ThemeConfig, type ThemeName } from './types';
