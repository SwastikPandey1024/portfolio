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
      badge: 'bg-semantic-cyan/15 text-semantic-cyan border-semantic-cyan/30',
      button: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    },
    indigo: {
      border: 'border-semantic-indigo/60',
      glow: 'shadow-glow-indigo',
      badge: 'bg-semantic-indigo/15 text-semantic-indigo border-semantic-indigo/30',
      button: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    },
    emerald: {
      border: 'border-semantic-emerald/60',
      glow: 'shadow-glow-emerald',
      badge: 'bg-semantic-emerald/15 text-semantic-emerald border-semantic-emerald/30',
      button: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    violet: {
      border: 'border-semantic-violet/60',
      glow: 'shadow-glow-violet',
      badge: 'bg-semantic-violet/15 text-semantic-violet border-semantic-violet/30',
      button: 'bg-violet-600 hover:bg-violet-500 text-white',
    },
  };

  const currentAccent = currentGuidance ? accentClasses[currentGuidance.accentColor] : accentClasses.cyan;

  return (
    <aside
      aria-label="Meli Portfolio Guide"
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-xl pointer-events-none"
    >
      <div className="pointer-events-auto">
        <AnimatePresence>
          {/* 1. First-Visit Prompt Dialog with 3D-style Character Outside Box */}
          {isFirstVisitPrompt && (
            <motion.div
              key="meli-first-visit-prompt"
              role="dialog"
              aria-modal="false"
              aria-labelledby="meli-prompt-title"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 10, scale: 0.95 }}
              transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : 0.6 }}
              className="flex items-end gap-2 sm:gap-3 filter drop-shadow-2xl max-w-[340px] sm:max-w-[420px]"
            >
              {/* Floating Companion Avatar Outside the Box */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="shrink-0 relative select-none flex flex-col items-center pb-1"
              >
                <MeliSprite state="greeting" size="avatar" className="w-16 sm:w-20 h-28 sm:h-36" />
                <div className="w-10 h-1.5 rounded-full bg-black/50 blur-[2px] -mt-1" />
              </motion.div>

              {/* Prompt Speech Bubble */}
              <div className="surface-card p-3.5 sm:p-5 border border-semantic-violet/60 bg-surface/95 backdrop-blur-md shadow-surface-elevated rounded-2xl flex flex-col gap-3 flex-1 relative mb-2">
                {/* Speech Bubble Tail pointing to Meli */}
                <div className="absolute -left-1.5 bottom-6 w-3 h-3 bg-surface/95 border-l border-b border-semantic-violet/60 transform rotate-45 pointer-events-none" />

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-semantic-violet uppercase tracking-wider font-semibold block">
                      AI COMPANION
                    </span>
                    <h4 id="meli-prompt-title" className="font-display text-sm sm:text-base font-bold text-content-primary">
                      {MELI_FIRST_VISIT.title}
                    </h4>
                    <p className="font-body text-[11px] sm:text-xs text-content-muted mt-0.5 leading-relaxed">
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
                    className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex-1"
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

          {/* 2. Expanded Active Contextual Guide with 3D-Style Companion Outside Speech Bubble */}
          {guideEnabled && guideExpanded && !isFirstVisitPrompt && currentGuidance && (
            <motion.div
              key={`meli-guide-${currentGuidance.sectionId}`}
              id="meli-guide-panel"
              role="region"
              aria-label="Contextual Guide Note"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-end gap-2 sm:gap-3 filter drop-shadow-2xl max-w-[340px] sm:max-w-[430px]"
            >
              {/* Floating Meli Character Standing Outside the Box */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="shrink-0 relative select-none flex flex-col items-center pb-1"
              >
                <MeliSprite
                  state={spriteState}
                  size="avatar"
                  className="w-16 sm:w-20 h-28 sm:h-36"
                />
                <div className="w-10 h-1.5 rounded-full bg-black/50 blur-[2px] -mt-1" />
              </motion.div>

              {/* Speech Bubble Box */}
              <div
                className={cn(
                  'surface-card p-3 sm:p-4 border bg-surface/95 backdrop-blur-md shadow-surface-elevated rounded-2xl flex flex-col gap-2 flex-1 relative mb-2',
                  currentAccent.border
                )}
              >
                {/* Speech Bubble Tail pointing towards Meli */}
                <div
                  className={cn(
                    'absolute -left-1.5 bottom-6 w-3 h-3 bg-surface/95 border-l border-b transform rotate-45 pointer-events-none',
                    currentAccent.border
                  )}
                />

                {/* Header Bar with Section Tag and Close Button (Speaker removed) */}
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <span className={cn('font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border font-semibold', currentAccent.badge)}>
                      MELI GUIDE
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-content-subtle">
                      {currentGuidance.sectionId.toUpperCase()}
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
                'flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-surface-subtle transition-all cursor-pointer font-mono text-xs',
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
