import React from 'react';
import type { PipelineStep } from '@/types/project';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowDown } from 'lucide-react';

export interface SystemPipelineDiagramProps {
  steps: PipelineStep[];
  colorTheme?: 'cyan' | 'indigo' | 'emerald' | 'violet';
  className?: string;
}

export const SystemPipelineDiagram: React.FC<SystemPipelineDiagramProps> = ({
  steps,
  colorTheme = 'cyan',
  className,
}) => {
  const borderColors = {
    cyan: 'border-semantic-cyan/30 hover:border-semantic-cyan/60',
    indigo: 'border-indigo-500/30 hover:border-indigo-500/60',
    emerald: 'border-semantic-emerald/30 hover:border-semantic-emerald/60',
    violet: 'border-semantic-violet/30 hover:border-semantic-violet/60',
  };

  const tagColors = {
    cyan: 'text-semantic-cyan bg-semantic-cyan-dim',
    indigo: 'text-indigo-400 bg-semantic-indigo-dim',
    emerald: 'text-semantic-emerald bg-semantic-emerald-dim',
    violet: 'text-semantic-violet bg-semantic-violet-dim',
  };

  const arrowColors = {
    cyan: 'text-semantic-cyan',
    indigo: 'text-indigo-400',
    emerald: 'text-semantic-emerald',
    violet: 'text-semantic-violet',
  };

  return (
    <div className={cn('w-full my-6', className)} aria-label="System Architecture Flow Diagram">
      <div className="hidden lg:flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div
              className={cn(
                'flex-1 min-w-[160px] p-3.5 rounded-lg bg-surface/90 border transition-all duration-200',
                borderColors[colorTheme]
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-[10px] text-content-subtle font-semibold">
                  STEP {step.number}
                </span>
                {step.tag && (
                  <span
                    className={cn(
                      'font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider',
                      tagColors[colorTheme]
                    )}
                  >
                    {step.tag}
                  </span>
                )}
              </div>
              <h5 className="font-display font-bold text-xs text-content-primary leading-tight">
                {step.title}
              </h5>
              <p className="font-body text-[11px] text-content-muted mt-1 leading-snug">
                {step.description}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div className="shrink-0 px-1 text-content-subtle">
                <ArrowRight className={cn('w-4 h-4', arrowColors[colorTheme])} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Responsive Mobile / Tablet Vertical Stepper */}
      <div className="lg:hidden flex flex-col gap-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div
              className={cn(
                'p-3.5 rounded-lg bg-surface/90 border transition-all duration-200',
                borderColors[colorTheme]
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-[10px] text-content-subtle font-semibold">
                  STEP {step.number}
                </span>
                {step.tag && (
                  <span
                    className={cn(
                      'font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider',
                      tagColors[colorTheme]
                    )}
                  >
                    {step.tag}
                  </span>
                )}
              </div>
              <h5 className="font-display font-bold text-sm text-content-primary">
                {step.title}
              </h5>
              <p className="font-body text-xs text-content-muted mt-0.5">
                {step.description}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div className="flex justify-center py-0.5 text-content-subtle">
                <ArrowDown className={cn('w-3.5 h-3.5', arrowColors[colorTheme])} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
