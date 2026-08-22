import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WorkflowStep } from '@/types/workflow';
import { WORKFLOW_STEPS } from '@/data/workflow';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { CheckCircle2, Cpu, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export interface WorkflowTimelineProps {
  steps?: WorkflowStep[];
  className?: string;
}

export const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({
  steps = WORKFLOW_STEPS,
  className,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = steps[activeStepIndex] || steps[0]!;

  return (
    <div className={cn('w-full flex flex-col gap-8', className)} aria-label="AI-Augmented Engineering Workflow Timeline">
      {/* Desktop Horizontal Step Navigation Rail */}
      <div className="hidden lg:flex items-center justify-between border-b border-border/80 pb-4 relative">
        <div className="flex items-center justify-between w-full gap-2">
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isPast = idx < activeStepIndex;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                aria-pressed={isActive}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all text-center group cursor-pointer relative',
                  isActive
                    ? 'text-semantic-cyan'
                    : isPast
                    ? 'text-content-muted hover:text-content-primary'
                    : 'text-content-subtle hover:text-content-muted'
                )}
              >
                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold border transition-all',
                      isActive
                        ? 'bg-semantic-cyan text-canvas border-semantic-cyan shadow-glow-cyan'
                        : isPast
                        ? 'bg-surface-raised text-semantic-cyan border-semantic-cyan/40'
                        : 'bg-surface text-content-subtle border-border'
                    )}
                  >
                    {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.number}
                  </span>
                </div>
                <span
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-wider font-semibold transition-colors',
                    isActive ? 'text-semantic-cyan' : 'text-content-muted group-hover:text-content-primary'
                  )}
                >
                  {step.stage}
                </span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <motion.div
                    layoutId="active-workflow-indicator"
                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-semantic-cyan shadow-glow-cyan"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Detailed Showcase Box (Desktop & Tablet) */}
      <div className="hidden sm:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.number}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="surface-card p-6 sm:p-8 bg-surface/80 border border-border/80 shadow-surface-elevated relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xl font-bold text-semantic-cyan">
                    STEP {activeStep.number}
                  </span>
                  <span className="text-border">/</span>
                  <span className="font-mono text-sm uppercase tracking-wider text-content-muted font-semibold">
                    {activeStep.stage}
                  </span>
                  {activeStep.tool && (
                    <Badge variant="cyan" size="sm">
                      <Cpu className="w-3 h-3 mr-1" /> Accelerator: {activeStep.tool}
                    </Badge>
                  )}
                </div>

                <h4 className="font-display text-2xl font-bold text-content-primary tracking-tight">
                  "{activeStep.tagline}"
                </h4>

                <p className="font-body text-sm text-content-muted mt-3 leading-relaxed max-w-3xl">
                  {activeStep.description}
                </p>
              </div>

              {/* Engineering Ownership Guarantee Box */}
              <div className="md:w-72 shrink-0 p-4 rounded-lg bg-surface-raised/90 border border-border/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-semantic-cyan font-semibold uppercase mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Engineering Ownership
                  </div>
                  <p className="font-body text-xs text-content-primary leading-snug">
                    {activeStep.engineeringOwnership}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-content-subtle">
                  <span>AI: Acceleration</span>
                  <span>Human: Responsibility</span>
                </div>
              </div>
            </div>

            {/* Quick Next Step Controller */}
            <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-content-subtle">
                <span>STAGE {activeStepIndex + 1} OF {steps.length}</span>
              </div>
              <div className="flex items-center gap-2">
                {activeStepIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((prev) => prev - 1)}
                    className="font-mono text-xs px-3 py-1 rounded bg-surface border border-border text-content-muted hover:text-content-primary hover:border-content-muted transition-all cursor-pointer"
                  >
                    ← Previous Stage
                  </button>
                )}
                {activeStepIndex < steps.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((prev) => prev + 1)}
                    className="font-mono text-xs px-3 py-1 rounded bg-semantic-cyan-dim border border-semantic-cyan/40 text-semantic-cyan hover:bg-semantic-cyan/20 transition-all flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    Next Stage <ArrowRight className="w-3 h-3 ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Vertical Timeline (Responsive Layout) */}
      <div className="sm:hidden flex flex-col gap-4">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;

          return (
            <div
              key={step.number}
              onClick={() => setActiveStepIndex(idx)}
              className={cn(
                'surface-card p-4 border transition-all cursor-pointer',
                isActive
                  ? 'border-semantic-cyan/60 bg-surface shadow-glow-cyan'
                  : 'border-border/80 bg-surface/60'
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-semantic-cyan">
                    {step.number}
                  </span>
                  <span className="font-mono text-xs font-semibold text-content-primary uppercase">
                    {step.stage}
                  </span>
                </div>
                {step.tool && (
                  <Badge variant="cyan" size="sm">
                    {step.tool}
                  </Badge>
                )}
              </div>
              <p className="font-display text-sm font-semibold text-content-primary">
                "{step.tagline}"
              </p>
              <p className="font-body text-xs text-content-muted mt-1 leading-relaxed">
                {step.description}
              </p>
              <div className="mt-3 pt-2 border-t border-border/60 text-[11px] font-body text-semantic-cyan flex items-center gap-1">
                <Wrench className="w-3 h-3" /> {step.engineeringOwnership}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
