import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Eye, Activity, ShieldAlert, FileSearch, LineChart, Layers, ShieldCheck } from 'lucide-react';
import type { FlagshipProject } from '@/types/project';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SystemPipelineDiagram } from '@/components/projects/SystemPipelineDiagram';
import { cn } from '@/lib/utils';

export interface MedVisionShowcaseProps {
  project: FlagshipProject;
}

export const MedVisionShowcase: React.FC<MedVisionShowcaseProps> = ({ project }) => {
  const [activeResearchTab, setActiveResearchTab] = useState<'gradcam' | 'prediction' | 'roc' | 'benchmarks'>('gradcam');

  const researchTabs = [
    { id: 'gradcam', label: 'Grad-CAM Explainability', icon: Eye, asset: project.supportingAssets[0] },
    { id: 'prediction', label: 'Inference Summary', icon: Activity, asset: project.supportingAssets[1] },
    { id: 'roc', label: 'Test ROC Evaluation', icon: LineChart, asset: project.supportingAssets[2] },
    { id: 'benchmarks', label: 'Architecture Benchmarks', icon: Layers, asset: project.supportingAssets[3] },
  ] as const;

  const currentResearchAsset = researchTabs.find((t) => t.id === activeResearchTab)?.asset || project.supportingAssets[0];

  return (
    <article
      id="medvision"
      className="surface-card p-6 sm:p-10 lg:p-12 mb-16 border border-border/80 bg-surface/60 overflow-hidden relative"
      aria-labelledby="medvision-heading"
    >
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-base font-bold text-indigo-400">
            {project.numericId}
          </span>
          <span className="text-border">/</span>
          <Badge variant="indigo">{project.domain}</Badge>
          <span className="text-border hidden sm:inline">/</span>
          <span className="font-mono text-xs text-content-muted hidden sm:inline">
            NARRATIVE: {project.narrative}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">
            <FileSearch className="w-3 h-3 mr-1 text-indigo-400" /> DenseNet121 + Grad-CAM
          </Badge>
          <Badge variant="indigo" size="sm">
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Mandatory Academic / Research Disclaimer Banner */}
      <div className="my-6 p-3.5 rounded-lg bg-surface-raised/80 border border-indigo-500/30 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs font-body text-content-muted">
          <span className="font-semibold text-content-primary font-mono uppercase text-[11px] block">
            AI Computer Vision Research & Educational Experiment
          </span>
          Developed strictly for academic research and evaluation of deep learning architectures on the RSNA Pneumonia Detection dataset. Not certified as a clinical diagnostic medical device.
        </div>
      </div>

      {/* Split Case Study Stage: Left Information + Right Interactive Evidence Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start my-8">
        {/* Left Column: Thesis, Methodology, Leakage Prevention, Metrics, CTAs */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-2">
            THE THESIS: "{project.conceptualCore}"
          </span>
          <h3
            id="medvision-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-content-primary leading-tight"
          >
            {project.title}
          </h3>
          <p className="font-body text-base text-content-primary font-medium mt-3 leading-relaxed">
            {project.tagline}
          </p>

          <p className="font-body text-xs text-content-muted mt-3 leading-relaxed">
            {project.summary}
          </p>

          {/* Key Rigorous Research Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full my-6">
            {project.metrics.slice(0, 6).map((m) => (
              <div key={m.label} className="p-3 rounded bg-surface border border-border/60 flex flex-col">
                <span className="font-mono text-lg font-bold text-indigo-400 leading-none">
                  {m.value}
                </span>
                <span className="font-body text-[11px] text-content-muted mt-1 leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((t) => (
              <span key={t.name} className="tech-badge">
                {t.name}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to={`/work/${project.id}`}>
              <Button variant="primary" className="bg-indigo-600 hover:bg-indigo-500 border-indigo-500/50 shadow-glow-indigo">
                Explore Case Study <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md">
                <Github className="w-4 h-4 mr-1.5" /> Repository
              </Button>
            </a>
          </div>
        </div>

        {/* Right Column: Tabbed Evidence Viewport (Matching DocuChat Pattern) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Evidence View Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="MedVision Research Evidence Views">
            {researchTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeResearchTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveResearchTab(tab.id as typeof activeResearchTab)}
                  className={cn(
                    'flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-md border transition-all cursor-pointer',
                    isSelected
                      ? 'bg-semantic-indigo/20 text-indigo-300 border-indigo-500/50 font-semibold shadow-sm'
                      : 'bg-surface text-content-muted border-border hover:border-content-muted'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Single Interactive Evidence Viewport */}
          <motion.div
            key={activeResearchTab}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl overflow-hidden border border-border/80 bg-surface shadow-surface-elevated"
          >
            {currentResearchAsset && (
              <picture>
                <source srcSet={currentResearchAsset.path} type="image/webp" />
                <img
                  src={currentResearchAsset.path.replace('.webp', '.png')}
                  alt={currentResearchAsset.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover max-h-[560px]"
                />
              </picture>
            )}
            <div className="p-3 bg-surface-raised/90 border-t border-border flex items-center justify-between text-xs font-mono text-content-muted">
              <span>{currentResearchAsset?.caption || currentResearchAsset?.alt}</span>
              <span className="text-indigo-400 font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Academic Evidence
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Architecture Pipeline Flow Component */}
      <div className="pt-6 border-t border-border/60">
        <span className="font-mono text-xs text-content-subtle font-semibold uppercase tracking-wider block mb-2">
          RIGOROUS RESEARCH & EVALUATION PIPELINE
        </span>
        <SystemPipelineDiagram steps={project.pipelineSteps} colorTheme="indigo" />
      </div>
    </article>
  );
};
