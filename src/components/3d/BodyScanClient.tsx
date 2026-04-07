'use client';

import dynamic from 'next/dynamic';

const BodyViewer = dynamic(
  () => import('./BodyViewer').then((mod) => ({ default: mod.BodyViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[3/4] bg-surface rounded-section border border-border flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading 3D Viewer...</p>
        </div>
      </div>
    ),
  }
);

export function BodyScanClient() {
  return <BodyViewer />;
}
