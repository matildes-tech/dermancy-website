import {
  Syringe, Sparkles, Droplets, Heart, Zap, CircleDot, Activity, ThermometerSun,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Treatment {
  slug: string;
  translationKey: string;
  icon: LucideIcon;
  category: 'face' | 'body' | 'skin' | 'hair';
  duration: string;
  resultsTimeline: string;
  longevity: string;
  downtime: string;
}

export const treatments: Treatment[] = [
  {
    slug: 'botox',
    translationKey: 'botox',
    icon: Syringe,
    category: 'face',
    duration: '15-30 min',
    resultsTimeline: '3-5 days (full at 10-14 days)',
    longevity: '4-6 months',
    downtime: 'None',
  },
  {
    slug: 'fillers',
    translationKey: 'fillers',
    icon: Sparkles,
    category: 'face',
    duration: '30-60 min',
    resultsTimeline: 'Immediate',
    longevity: '6-18 months',
    downtime: 'Minimal',
  },
  {
    slug: 'mesotherapy',
    translationKey: 'mesotherapy',
    icon: Droplets,
    category: 'skin',
    duration: '30-45 min',
    resultsTimeline: 'Progressive over sessions',
    longevity: 'Ongoing with maintenance',
    downtime: 'Minimal',
  },
  {
    slug: 'skin-boosters',
    translationKey: 'skinBoosters',
    icon: Heart,
    category: 'skin',
    duration: '30 min',
    resultsTimeline: 'Visible within weeks',
    longevity: 'Ongoing with series',
    downtime: 'Minimal',
  },
  {
    slug: 'biostimulator',
    translationKey: 'biostimulator',
    icon: Zap,
    category: 'skin',
    duration: '45-60 min',
    resultsTimeline: 'Progressive over weeks',
    longevity: 'Months of improvement',
    downtime: 'Minimal',
  },
  {
    slug: 'prp',
    translationKey: 'prp',
    icon: CircleDot,
    category: 'hair',
    duration: '60 min',
    resultsTimeline: 'Gradual regeneration',
    longevity: 'Progressive improvement',
    downtime: 'None',
  },
  {
    slug: 'body-treatments',
    translationKey: 'bodyTreatments',
    icon: Activity,
    category: 'body',
    duration: '60-90 min',
    resultsTimeline: 'Progressive over sessions',
    longevity: 'Long-lasting with lifestyle',
    downtime: 'Minimal',
  },
  {
    slug: 'hyperhidrosis',
    translationKey: 'hyperhidrosis',
    icon: ThermometerSun,
    category: 'body',
    duration: '< 30 min',
    resultsTimeline: 'Within days',
    longevity: '6-9 months',
    downtime: 'None',
  },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export const treatmentSlugs = treatments.map((t) => t.slug);
