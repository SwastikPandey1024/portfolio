import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeliGuide } from '@/hooks/useMeliGuide';
import { MeliSprite } from '@/components/meli/MeliSprite';
import { MELI_FIRST_VISIT } from '@/data/meliGuide';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const MeliGuideWidget: React.FC = () => {
  const {
    guideEnabled,
    guideExpanded,
    isFirstVisitPrompt,
    currentGuidance,
    spriteState,
    enableGuide,
    openGuide,
    closeGuide,
    dismissPrompt,
  } = useMeliGuide();

  const prefersReducedMotion = useReducedMotion();

  const accentClasses = {
    cyan: {
      border: 'border-semantic-cyan/60',
      glow: 'shadow-glow-cyan',
      badge: 'bg-semantic-cyan/15 text-semantic-cyan border-semantic-cyan/40',
      button: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-glow-cyan',
    },
    indigo: {
      border: 'border-semantic-indigo/60',
      glow: 'shadow-glow-indigo',
      badge: 'bg-semantic-indigo/15 text-semantic-indigo border-semantic-indigo/40',
      button: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow-indigo',
    },
    emerald: {
      border: 'border-semantic-emerald/60',
      glow: 'shadow-glow-emerald',
      badge: 'bg-semantic-emerald/15 text-semantic-emerald border-semantic-emerald/40',
      button: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-emerald',
    },
    violet: {
      border: 'border-semantic-violet/60',
      glow: 'shadow-glow-violet',
      badge: 'bg-semantic-violet/15 text-semantic-violet border-semantic-violet/40',
      button: 'bg-violet-600 hover:bg-violet-500 text-white shadow-glow-violet',
    },
  };

  const currentAccent = currentGuidance ? accentClasses[currentGuidance.accentColor] : accentClasses.cyan;

  return (
    <aside
      aria-label="Meli Portfolio Guide"
      className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-md pointer-events-none"
    >
      <div className="pointer-events-auto">
        <AnimatePresence>
          {/* 1. First-Visit Prompt Dialog with Large Companion Over Dialogue Box */}
          {isFirstVisitPrompt && (
            <motion.div
              key="meli-first-visit-prompt"
              role="dialog"
              aria-modal="false"
              aria-labelledby="meli-prompt-title"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 15, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: prefersReducedMotion ? 0 : 0.2 }}
              className="flex flex-col items-end filter drop-shadow-2xl max-w-[320px] sm:max-w-[370px]"
            >
              {/* Floating Companion Avatar Over Box */}
              <div className="relative select-none flex flex-col items-center self-center sm:self-end sm:mr-8 -mb-2 z-10">
                <motion.div
                  initial={prefersReducedMotion ? {} : { y: 12, scale: 0.95 }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [0, -6, 0],
                          rotate: [0, -0.8, 0.8, 0],
                        }
                  }
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                >
                  <MeliSprite state="greeting" size="avatar" />
                </motion.div>
                {/* Synchronized ground shadow */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          scaleX: [1, 0.86, 1],
                          opacity: [0.6, 0.35, 0.6],
                        }
                  }
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 sm:w-24 h-2.5 rounded-full bg-black/60 blur-[3px] -mt-1.5"
                />
              </div>

              {/* Prompt Speech Bubble */}
              <div className="surface-card p-4 sm:p-5 border border-semantic-violet/60 bg-surface/95 backdrop-blur-md shadow-surface-elevated rounded-2xl flex flex-col gap-3 w-full relative z-0">
                {/* Speech Bubble Tail pointing UPWARDS to Meli */}
                <div className="absolute -top-1.5 right-12 sm:right-16 w-3.5 h-3.5 bg-surface/95 border-l border-t border-semantic-violet/60 transform rotate-45 pointer-events-none" />

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-semantic-violet uppercase tracking-wider font-semibold block mb-0.5">
                      AI COMPANION // CONTEXTUAL GUIDE
                    </span>
                    <h4 id="meli-prompt-title" className="font-display text-sm sm:text-base font-bold text-content-primary">
                      {MELI_FIRST_VISIT.title}
                    </h4>
                    <p className="font-body text-[11px] sm:text-xs text-content-muted mt-1 leading-relaxed">
                      {MELI_FIRST_VISIT.prompt}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={dismissPrompt}
                    aria-label="Close guide prompt"
                    className="p-1 text-content-subtle hover:text-content-primary rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-border/60">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={enableGuide}
                    className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex-1 shadow-glow-violet"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    {MELI_FIRST_VISIT.guideAction}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={dismissPrompt}
                    className="text-xs"
                  >
                    {MELI_FIRST_VISIT.exploreAction}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Expanded Active Contextual Guide with Large Character Over Dialogue Box */}
          {guideEnabled && guideExpanded && !isFirstVisitPrompt && currentGuidance && (
            <motion.div
              key={`meli-guide-${currentGuidance.sectionId}`}
              id="meli-guide-panel"
              role="region"
              aria-label="Contextual Guide Note"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 15, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-end filter drop-shadow-2xl max-w-[320px] sm:max-w-[380px]"
            >
              {/* Floating Meli Character Avatar Standing Over the Dialogue Box */}
              <div className="relative select-none flex flex-col items-center self-center sm:self-end sm:mr-8 -mb-2 z-10">
                <motion.div
                  initial={prefersReducedMotion ? {} : { y: 10, scale: 0.95 }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [0, -6, 0],
                          rotate: [0, -0.8, 0.8, 0],
                        }
                  }
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                >
                  <MeliSprite state={spriteState} size="avatar" />
                </motion.div>
                {/* Synchronized ground shadow right above the box edge */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          scaleX: [1, 0.86, 1],
                          opacity: [0.6, 0.35, 0.6],
                        }
                  }
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 sm:w-24 h-2.5 rounded-full bg-black/60 blur-[3px] -mt-1.5"
                />
              </div>

              {/* Speech Bubble Box */}
              <div
                className={cn(
                  'surface-card p-4 sm:p-5 border bg-surface/95 backdrop-blur-md shadow-surface-elevated rounded-2xl flex flex-col gap-2.5 w-full relative z-0',
                  currentAccent.border
                )}
              >
                {/* Speech Bubble Tail pointing UPWARDS toward Meli */}
                <div
                  className={cn(
                    'absolute -top-1.5 right-12 sm:right-16 w-3.5 h-3.5 bg-surface/95 border-l border-t transform rotate-45 pointer-events-none',
                    currentAccent.border
                  )}
                />

                {/* Header Bar with Elevated Meli Guide Label & Close Button */}
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <span className={cn('font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded border font-bold shadow-sm', currentAccent.badge)}>
                      MELI GUIDE
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-content-subtle tracking-wide font-medium">
                      // {currentGuidance.sectionId.toUpperCase()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={closeGuide}
                    aria-label="Close Meli guide"
                    className="p-1 text-content-subtle hover:text-content-primary rounded transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Dialogue Body */}
                <div>
                  <p className="font-body text-xs sm:text-sm text-content-primary leading-relaxed">
                    "{currentGuidance.message}"
                  </p>

                  {/* Contextual Action Link */}
                  {currentGuidance.actionText && currentGuidance.targetSection && (
                    <a
                      href={`#${currentGuidance.targetSection}`}
                      className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] font-semibold text-semantic-cyan hover:underline mt-2"
                    >
                      {currentGuidance.actionText} <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. Minimized Dock Toggle Pill */}
          {!isFirstVisitPrompt && (!guideExpanded || !guideEnabled) && (
            <motion.button
              key="meli-dock-toggle"
              type="button"
              onClick={openGuide}
              aria-expanded={guideExpanded}
              aria-controls="meli-guide-panel"
              aria-label={guideEnabled ? 'Meli Guide is minimized. Click to expand contextual note.' : 'Enable Meli Portfolio Guide'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-surface-subtle transition-all cursor-pointer font-mono text-xs',
                guideEnabled
                  ? 'bg-surface-raised/95 border-semantic-cyan/50 text-content-primary hover:border-semantic-cyan'
                  : 'bg-surface/90 border-border/80 text-content-muted hover:text-content-primary hover:border-content-muted'
              )}
            >
              <span>{guideEnabled ? 'Meli: On' : 'Guide'}</span>
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  guideEnabled ? 'bg-semantic-cyan animate-pulse' : 'bg-content-subtle'
                )}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};
