export interface TreatmentZone {
  id: string;
  label: string;
  treatmentSlug: string;
  position: [number, number, number];
  scale: [number, number, number];
  highlightColor: string;
}

export const treatmentZones: TreatmentZone[] = [
  {
    id: 'forehead',
    label: 'Forehead & Frown Lines',
    treatmentSlug: 'botox',
    position: [0, 1.7, 0.3],
    scale: [0.3, 0.15, 0.15],
    highlightColor: '#22D3EE',
  },
  {
    id: 'cheeks',
    label: 'Cheeks & Volume',
    treatmentSlug: 'fillers',
    position: [0.15, 1.5, 0.3],
    scale: [0.2, 0.15, 0.15],
    highlightColor: '#EC4899',
  },
  {
    id: 'lips',
    label: 'Lip Enhancement',
    treatmentSlug: 'fillers',
    position: [0, 1.38, 0.35],
    scale: [0.12, 0.06, 0.08],
    highlightColor: '#F472B6',
  },
  {
    id: 'undereyes',
    label: 'Under-Eye Rejuvenation',
    treatmentSlug: 'mesotherapy',
    position: [0, 1.55, 0.35],
    scale: [0.25, 0.08, 0.1],
    highlightColor: '#A78BFA',
  },
  {
    id: 'scalp',
    label: 'Scalp & Hair',
    treatmentSlug: 'prp',
    position: [0, 1.85, 0],
    scale: [0.3, 0.15, 0.3],
    highlightColor: '#FBBF24',
  },
  {
    id: 'torso',
    label: 'Body Contouring',
    treatmentSlug: 'body-treatments',
    position: [0, 0.8, 0],
    scale: [0.4, 0.5, 0.25],
    highlightColor: '#34D399',
  },
  {
    id: 'underarms',
    label: 'Hyperhidrosis Zone',
    treatmentSlug: 'hyperhidrosis',
    position: [0.35, 1.15, 0],
    scale: [0.15, 0.15, 0.15],
    highlightColor: '#60A5FA',
  },
];
