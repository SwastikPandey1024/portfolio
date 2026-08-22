import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ABOUT_DATA } from '@/data/about';
import { Sparkles, Code2, Database, Briefcase, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-16 sm:py-24 border-b border-border/60">
      <PageContainer size="wide">
        {/* Section Header */}
        <div className="mb-12">
          <SectionHeader
            tag="05 / PERSPECTIVE"
            tagVariant="indigo"
            title="About Me"
            description="Engineering mindset, technical architecture philosophy, and the principles that shape how I build software."
          />
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Core Philosophy & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div className="surface-card p-6 sm:p-8 border border-border/80 bg-surface/70 shadow-surface-elevated">
              <span className="font-mono text-xs uppercase tracking-wider text-semantic-indigo font-semibold block mb-2">
                CORE ORIENTATION
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-content-primary leading-tight">
                "{ABOUT_DATA.primaryStatement}"
              </h3>

              <div className="my-6 w-12 h-[2px] bg-semantic-indigo/50" />

              <p className="font-body text-base sm:text-lg text-content-primary font-medium leading-relaxed">
                {ABOUT_DATA.supportingNarrative}
              </p>

              <p className="font-body text-xs sm:text-sm text-content-muted mt-4 leading-relaxed">
                Whether structuring multi-horizon ensemble forecasts, fine-tuning medical convolutional vision models, or building native ambient desktop companions, my focus is bridging raw mathematical capability with clean, resilient software architecture.
              </p>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-content-subtle">
                <span>Location: India (UTC+05:30)</span>
                <span className="text-semantic-indigo font-semibold">Open to Impactful Roles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Pillars Matrix */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT_DATA.themes.map((theme, idx) => {
              const icons = [Sparkles, Code2, Database, Briefcase];
              const IconComponent = icons[idx % icons.length] || BookOpen;

              return (
                <div
                  key={theme.title}
                  className="surface-card p-5 border border-border/80 bg-surface/60 hover:bg-surface hover:border-border-highlight transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-semantic-indigo-dim text-semantic-indigo flex items-center justify-center mb-3">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h5 className="font-display font-bold text-sm text-content-primary">
                      {theme.title}
                    </h5>
                    <p className="font-body text-xs text-content-muted mt-1.5 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Personal Interests Strip */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="font-mono text-xs text-content-subtle font-semibold uppercase tracking-wider">
            PERSONAL SIGNALS
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {ABOUT_DATA.interests.map((interest) => (
              <div
                key={interest.name}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border/80 text-xs font-body text-content-muted hover:text-content-primary hover:border-semantic-indigo/50 transition-all"
              >
                <span>{interest.symbol}</span>
                <span className="font-medium text-content-primary">{interest.name}</span>
                <span className="text-content-subtle text-[11px]">· {interest.tagline}</span>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
