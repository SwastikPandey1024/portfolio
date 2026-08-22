import { useContext } from 'react';
import { MeliGuideContext } from '@/context/MeliGuideContextDefinition';
import type { MeliGuideContextType } from '@/types/meliGuide';

export const useMeliGuide = (): MeliGuideContextType => {
  const context = useContext(MeliGuideContext);
  if (!context) {
    throw new Error('useMeliGuide must be used within a MeliGuideProvider');
  }
  return context;
};
