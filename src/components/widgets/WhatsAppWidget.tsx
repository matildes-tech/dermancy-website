'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CLINIC } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);
  const t = useTranslations('common');

  const whatsappUrl = `https://wa.me/${CLINIC.phone.whatsapp}?text=${encodeURIComponent('Hello! I would like to book a consultation at Dermancy Medical House.')}`;

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-4 max-w-[260px] animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 end-2 p-1 text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-sm text-foreground font-medium mb-1">
            {t('whatsapp')}
          </p>
          <p className="text-xs text-muted-foreground">
            Chat with us on WhatsApp for quick consultations and booking.
          </p>
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center',
          'bg-[#25D366] hover:bg-[#20BD5A] text-white',
          'shadow-lg hover:shadow-xl transition-all duration-200',
          'cursor-pointer'
        )}
        aria-label={t('whatsapp')}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
