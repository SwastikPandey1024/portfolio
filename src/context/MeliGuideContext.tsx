import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  MeliGuideState,
  MeliSpriteState,
  SectionGuidance,
} from '@/types/meliGuide';
import { SECTION_GUIDANCE_MAP } from '@/data/meliGuide';
import { MeliGuideContext } from '@/context/MeliGuideContextDefinition';

const STORAGE_KEYS = {
  SEEN: 'meliGuideSeen',
  ENABLED: 'meliGuideEnabled',
  MUTED: 'meliGuideMuted',
};

export const MeliGuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstVisitPrompt, setIsFirstVisitPrompt] = useState<boolean>(false);
  const [guideEnabled, setGuideEnabled] = useState<boolean>(false);
  const [guideExpanded, setGuideExpanded] = useState<boolean>(false);
  const [guideMuted, setGuideMuted] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionIdState] = useState<string>('hero');
  const [guideState, setGuideState] = useState<MeliGuideState>('IDLE');

  // Initialize from sessionStorage on client mount
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEYS.SEEN);
      const enabled = sessionStorage.getItem(STORAGE_KEYS.ENABLED);
      const muted = sessionStorage.getItem(STORAGE_KEYS.MUTED);

      if (muted === 'true') {
        setGuideMuted(true);
      }

      if (!seen) {
        // Show prompt on first visit after a natural slight delay
        const timer = setTimeout(() => {
          setIsFirstVisitPrompt(true);
          setGuideState('GREETING');
        }, 1200);
        return () => clearTimeout(timer);
      } else if (enabled === 'true') {
        setGuideEnabled(true);
        setGuideExpanded(true);
        setGuideState('PROJECT_CONTEXT');
      } else {
        setGuideEnabled(false);
        setGuideExpanded(false);
        setGuideState('DISABLED');
      }
    } catch {
      // Fallback for environments where sessionStorage is restricted
      setIsFirstVisitPrompt(false);
    }
  }, []);

  const openGuide = useCallback(() => {
    setGuideEnabled(true);
    setGuideExpanded(true);
    setGuideState('PROJECT_CONTEXT');
  }, []);

  const closeGuide = useCallback(() => {
    setGuideExpanded(false);
  }, []);

  const enableGuide = useCallback(() => {
    setIsFirstVisitPrompt(false);
    setGuideEnabled(true);
    setGuideExpanded(true);
    setGuideState('PROJECT_CONTEXT');
    try {
      sessionStorage.setItem(STORAGE_KEYS.SEEN, 'true');
      sessionStorage.setItem(STORAGE_KEYS.ENABLED, 'true');
    } catch {
      /* ignore */
    }
  }, []);

  const disableGuide = useCallback(() => {
    setGuideEnabled(false);
    setGuideExpanded(false);
    setIsFirstVisitPrompt(false);
    setGuideState('DISABLED');
    try {
      sessionStorage.setItem(STORAGE_KEYS.SEEN, 'true');
      sessionStorage.setItem(STORAGE_KEYS.ENABLED, 'false');
    } catch {
      /* ignore */
    }
  }, []);

  const toggleGuide = useCallback(() => {
    if (!guideEnabled) {
      enableGuide();
    } else {
      setGuideExpanded((prev) => !prev);
    }
  }, [guideEnabled, enableGuide]);

  const toggleMute = useCallback(() => {
    setGuideMuted((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(STORAGE_KEYS.MUTED, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const dismissPrompt = useCallback(() => {
    setIsFirstVisitPrompt(false);
    setGuideEnabled(false);
    setGuideExpanded(false);
    setGuideState('DISABLED');
    try {
      sessionStorage.setItem(STORAGE_KEYS.SEEN, 'true');
      sessionStorage.setItem(STORAGE_KEYS.ENABLED, 'false');
    } catch {
      /* ignore */
    }
  }, []);

  const skipGuidance = useCallback(() => {
    setGuideExpanded(false);
  }, []);

  const setActiveSectionId = useCallback((id: string) => {
    setActiveSectionIdState((prevId) => {
      if (prevId !== id) {
        // Automatically open contextual guidance when scrolling into a new section
        setGuideExpanded(true);
      }
      return id;
    });
  }, []);

  // Compute current guidance item based on activeSectionId
  const currentGuidance: SectionGuidance | null = useMemo(() => {
    return SECTION_GUIDANCE_MAP[activeSectionId] ?? SECTION_GUIDANCE_MAP.hero ?? null;
  }, [activeSectionId]);

  const spriteState: MeliSpriteState = useMemo(() => {
    if (isFirstVisitPrompt) return 'greeting';
    if (!currentGuidance) return 'idle';
    return currentGuidance.spriteState;
  }, [isFirstVisitPrompt, currentGuidance]);

  // Global Escape key listener to close prompt or expanded card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFirstVisitPrompt) {
          dismissPrompt();
        } else if (guideExpanded) {
          setGuideExpanded(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFirstVisitPrompt, guideExpanded, dismissPrompt]);

  const value = useMemo(
    () => ({
      guideEnabled,
      guideExpanded,
      guideDismissed: !guideExpanded,
      guideMuted,
      isFirstVisitPrompt,
      activeSectionId,
      currentGuidance,
      spriteState,
      guideState,
      openGuide,
      closeGuide,
      enableGuide,
      disableGuide,
      toggleGuide,
      toggleMute,
      dismissPrompt,
      skipGuidance,
      setActiveSectionId,
    }),
    [
      guideEnabled,
      guideExpanded,
      guideMuted,
      isFirstVisitPrompt,
      activeSectionId,
      currentGuidance,
      spriteState,
      guideState,
      openGuide,
      closeGuide,
      enableGuide,
      disableGuide,
      toggleGuide,
      toggleMute,
      dismissPrompt,
      skipGuidance,
      setActiveSectionId,
    ]
  );

  return <MeliGuideContext.Provider value={value}>{children}</MeliGuideContext.Provider>;
};
