import { createContext } from 'react';
import type { MeliGuideContextType } from '@/types/meliGuide';

export const MeliGuideContext = createContext<MeliGuideContextType | undefined>(undefined);
