import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, TrendingUp, Cpu, Sliders, BarChart3, Database } from 'lucide-react';
import type { FlagshipProject } from '@/types/project';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SystemPipelineDiagram } from '@/components/projects/SystemPipelineDiagram';
import { cn } from '@/lib/utils';

export interface SalesPulseShowcaseProps {
  project: FlagshipProject;
}

export const SalesPulseShowcase: React.FC<SalesPulseShowcaseProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<'forecast' | 'scenario' | 'benchmark' | 'batch'>('forecast');

  const evidenceTabs = [
    { id: 'forecast', label: 'Multi-Horizon Forecast', icon: TrendingUp, asset: project.supportingAssets[0] },
    { id: 'scenario', label: 'Scenario Simulator', icon: Sliders, asset: project.supportingAssets[1] },
    { id: 'benchmark', label: 'Model Benchmarks', icon: BarChart3, asset: project.supportingAssets[2] },
    { id: 'batch', label: 'Batch Processing', icon: Database, asset: project.supportingAssets[3] },
  ] as const;

  const currentTab = evidenceTabs.find((t) => t.id === activeTab) || evidenceTabs[0];

  return (
    <article
      id="salespulse"
      className="surface-card p-6 sm:p-10 lg:p-12 mb-16 border border-border/80 bg-surface/60 overflow-hidden relative"
      aria-labelledby="salespulse-heading"
    >
      {/* Editorial Header & Top Meta */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-base font-bold text-semantic-emerald">
            {project.numericId}
          </span>
          <span className="text-border">/</span>
          <Badge variant="emerald">{project.domain}</Badge>
          <span className="text-border hidden sm:inline">/</span>
          <span className="font-mono text-xs text-content-muted hidden sm:inline">
            NARRATIVE: {project.narrative}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">
            <Cpu className="w-3 h-3 mr-1 text-semantic-emerald" /> XGBoost + Random Forest Blend
          </Badge>
          <Badge variant="emerald" size="sm">
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Main Editorial Showcase Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-8">
        {/* Left Column: Problem, Why AI, Metrics, CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-wider text-semantic-emerald font-semibold mb-2">
            THE THESIS: "{project.conceptualCore}"
          </span>
          <h3
            id="salespulse-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-content-primary leading-tight"
          >
            {project.title}
          </h3>
          <p className="font-body text-base text-content-primary font-medium mt-3 leading-relaxed">
            {project.tagline}
          </p>

          <div className="my-5 p-4 rounded-lg bg-surface-raised/60 border border-border/60 text-xs font-body text-content-muted leading-relaxed">
            <strong className="text-content-primary block mb-1 font-display">Core Business Challenge:</strong>
            {project.problemStatement}
          </div>

          {/* Verified Evidence Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full my-2">
            {project.metrics.slice(0, 6).map((m) => (
              <div key={m.label} className="p-3 rounded bg-surface border border-border/60 flex flex-col">
                <span className="font-mono text-lg font-bold text-semantic-emerald leading-none">
                  {m.value}
                </span>
                <span className="font-body text-[11px] text-content-muted mt-1 leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 my-4">
            {project.technologies.map((t) => (
              <span key={t.name} className="tech-badge">
                {t.name}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to={`/work/${project.id}`}>
              <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-500 border-emerald-500/50 shadow-glow-emerald">
                Explore Case Study <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">
                  Live Streamlit App <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </a>
            )}
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md">
                <Github className="w-4 h-4 mr-1.5" /> Repository
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Large Hero Overview Screenshot */}
        <div className="lg:col-span-6">
          <div className="rounded-xl overflow-hidden border border-border/80 bg-surface shadow-surface-elevated group relative">
            <picture>
              <source srcSet={project.primaryAsset.path} type="image/webp" />
              <img
                src={project.primaryAsset.path.replace('.webp', '.png')}
                alt={project.primaryAsset.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </picture>
            <div className="p-3 bg-surface-raised/90 border-t border-border flex items-center justify-between text-xs font-mono text-content-muted">
              <span>Main Overview & KPI Analytics Console</span>
              <span className="text-semantic-emerald font-semibold">9,994 Records</span>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Pipeline Flow Component */}
      <div className="pt-6 border-t border-border/60">
        <span className="font-mono text-xs text-content-subtle font-semibold uppercase tracking-wider block mb-2">
          INTELLIGENCE PIPELINE ARCHITECTURE
        </span>
        <SystemPipelineDiagram steps={project.pipelineSteps} colorTheme="emerald" />
      </div>

      {/* Lower Horizontal Evidence Exploration Stage */}
      <div className="mt-8 pt-6 border-t border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <span className="font-mono text-xs text-content-subtle font-semibold uppercase tracking-wider">
            DEEP DIVE EVIDENCE ARTIFACTS
          </span>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="SalesPulse Evidence Views">
            {evidenceTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    'flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-md border transition-all cursor-pointer',
                    isSelected
                      ? 'bg-semantic-emerald/15 text-semantic-emerald border-semantic-emerald/50 font-semibold'
                      : 'bg-surface text-content-muted border-border hover:border-content-muted'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Evidence Viewer */}
        {currentTab && currentTab.asset && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl overflow-hidden border border-border/80 bg-surface"
          >
            <picture>
              <source srcSet={currentTab.asset.path} type="image/webp" />
              <img
                src={currentTab.asset.path.replace('.webp', '.png')}
                alt={currentTab.asset.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover max-h-[580px]"
              />
            </picture>
            {currentTab.asset.caption && (
              <div className="p-3.5 bg-surface-raised/90 border-t border-border font-mono text-xs text-content-muted flex items-center justify-between">
                <span>{currentTab.asset.caption}</span>
                <span className="text-semantic-emerald font-semibold uppercase text-[10px] tracking-wider">
                  Verified Screenshot
                </span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </article>
  );
};
