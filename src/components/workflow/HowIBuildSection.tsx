import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { WorkflowTimeline } from '@/components/workflow/WorkflowTimeline';
import { ShieldCheck, Compass, GitMerge, CheckCircle, Terminal } from 'lucide-react';

export const HowIBuildSection: React.FC = () => {
  return (
    <section id="build" className="relative w-full py-16 sm:py-24 border-b border-border/60">
      <PageContainer size="wide">
        {/* Section Header */}
        <div className="mb-12">
          <SectionHeader
            tag="02 / METHODOLOGY"
            tagVariant="cyan"
            title="How I Build"
            description="AI-augmented engineering combines rapid exploration loops with rigorous software discipline. AI accelerates discovery; engineering judgment owns the system, failure modes, and long-term maintainability."
          />

          {/* Anchor Philosophy Callout */}
          <div className="mt-8 p-5 sm:p-6 rounded-xl bg-surface-raised/80 border border-semantic-cyan/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-surface-elevated">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-semantic-cyan font-semibold block mb-1">
                CORE PHILOSOPHY
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-content-primary">
                AI accelerates the workflow. Engineering judgment owns the result.
              </h3>
              <p className="font-body text-xs sm:text-sm text-content-muted mt-1 leading-relaxed">
                Large language models accelerate drafting, refactoring, and exploring API spaces. As the engineer, I own the data distribution audits, test isolation, deterministic behavior, and production architecture.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-semantic-cyan-dim text-semantic-cyan border border-semantic-cyan/40 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Human-in-the-Loop
              </span>
            </div>
          </div>
        </div>

        {/* 4 Guiding Principles Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="surface-card p-4.5 border border-border/80 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-semantic-cyan-dim text-semantic-cyan flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h5 className="font-display font-bold text-sm text-content-primary">
                Problem-First Framing
              </h5>
              <p className="font-body text-xs text-content-muted mt-1.5 leading-relaxed">
                Validate real business constraints and feasibility metrics before selecting models or architectures.
              </p>
            </div>
          </div>

          <div className="surface-card p-4.5 border border-border/80 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-semantic-cyan-dim text-semantic-cyan flex items-center justify-center mb-3">
                <GitMerge className="w-4 h-4" />
              </div>
              <h5 className="font-display font-bold text-sm text-content-primary">
                Deterministic Scaffolding
              </h5>
              <p className="font-body text-xs text-content-muted mt-1.5 leading-relaxed">
                Wrap stochastic intelligence layers with strict schema validation, fallbacks, and predictable contracts.
              </p>
            </div>
          </div>

          <div className="surface-card p-4.5 border border-border/80 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-semantic-cyan-dim text-semantic-cyan flex items-center justify-center mb-3">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h5 className="font-display font-bold text-sm text-content-primary">
                Continuous Verification
              </h5>
              <p className="font-body text-xs text-content-muted mt-1.5 leading-relaxed">
                Empirical test suites, ground-truth evaluations, and zero-leakage partitions ensure robust deployments.
              </p>
            </div>
          </div>

          <div className="surface-card p-4.5 border border-border/80 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-semantic-cyan-dim text-semantic-cyan flex items-center justify-center mb-3">
                <Terminal className="w-4 h-4" />
              </div>
              <h5 className="font-display font-bold text-sm text-content-primary">
                Product-Centric Polish
              </h5>
              <p className="font-body text-xs text-content-muted mt-1.5 leading-relaxed">
                Deliver responsive interfaces, low latency feedback, and high visual standards for real human operators.
              </p>
            </div>
          </div>
        </div>

        {/* 9-Stage Interactive Workflow Lifecycle */}
        <div className="pt-6 border-t border-border/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-semantic-cyan font-semibold block">
                9-STAGE ENGINEERING LIFECYCLE
              </span>
              <h4 className="font-display text-xl font-bold text-content-primary mt-1">
                From Problem Framing to Deployed Intelligence
              </h4>
            </div>
            <span className="font-mono text-xs text-content-subtle hidden sm:inline-block">
              HUMAN OWNERSHIP · AI ACCELERATED
            </span>
          </div>

          <WorkflowTimeline />
        </div>
      </PageContainer>
    </section>
  );
};
