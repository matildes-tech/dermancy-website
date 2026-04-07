'use client';

import { useTranslations } from 'next-intl';

export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}
