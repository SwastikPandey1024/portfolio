import React from 'react';
import { MeliGuideWidget } from '@/components/meli/MeliGuideWidget';
import { useSectionObserver } from '@/hooks/useSectionObserver';

export const MeliGuideBoundary: React.FC = () => {
  // Activate section-aware scroll observation for the companion guide
  useSectionObserver();

  return <MeliGuideWidget />;
};
