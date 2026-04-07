import { Figtree, Noto_Sans, Cormorant, Montserrat, Space_Grotesk, DM_Sans } from 'next/font/google';

export const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-figtree',
  display: 'swap',
});

export const notoSans = Noto_Sans({
  subsets: ['latin', 'latin-ext', 'greek'],
  variable: '--font-noto-sans',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const cormorant = Cormorant({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const fontVariables = [
  figtree.variable,
  notoSans.variable,
  cormorant.variable,
  montserrat.variable,
  spaceGrotesk.variable,
  dmSans.variable,
].join(' ');
