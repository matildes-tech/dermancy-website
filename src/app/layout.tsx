import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Dermancy Medical House',
    default: 'Dermancy Medical House | Premium Medical Aesthetics in Rhodes',
  },
  description:
    'Elevate your beauty with premium medical aesthetics in Rhodes. Dr. Ioannis Michalakis offers personalized Botox, Fillers, Mesotherapy, PRP, and more.',
  metadataBase: new URL('https://www.dermancy.com'),
  openGraph: {
    type: 'website',
    siteName: 'Dermancy Medical House',
    locale: 'en',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
