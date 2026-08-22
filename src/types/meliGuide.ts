export type MeliSpriteState =
  | 'idle'
  | 'greeting'
  | 'thinking'
  | 'working'
  | 'happy'
  | 'curious'
  | 'confused'
  | 'focused'
  | 'sleepy'
  | 'error'
  | 'complete'
  | 'celebration'
  | 'hover'
  | 'proximity'
  | 'click_pet'
  | 'surprised';

export type MeliGuideState =
  | 'IDLE'
  | 'GREETING'
  | 'INTRO'
  | 'PROJECT_TRANSITION'
  | 'PROJECT_CONTEXT'
  | 'FAREWELL'
  | 'DISABLED';

export type MeliAccentColor = 'cyan' | 'indigo' | 'emerald' | 'violet';

export interface SectionGuidance {
  sectionId: string;
  speaker: string;
  message: string;
  spriteState: MeliSpriteState;
  accentColor: MeliAccentColor;
  actionText?: string;
  targetSection?: string;
}

export interface MeliGuideContextType {
  guideEnabled: boolean;
  guideExpanded: boolean;
  guideDismissed: boolean;
  guideMuted: boolean;
  isFirstVisitPrompt: boolean;
  activeSectionId: string;
  currentGuidance: SectionGuidance | null;
  spriteState: MeliSpriteState;
  guideState: MeliGuideState;
  openGuide: () => void;
  closeGuide: () => void;
  enableGuide: () => void;
  disableGuide: () => void;
  toggleGuide: () => void;
  toggleMute: () => void;
  dismissPrompt: () => void;
  skipGuidance: () => void;
  setActiveSectionId: (id: string) => void;
}
