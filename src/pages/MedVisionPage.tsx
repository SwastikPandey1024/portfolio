import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Metric } from '@/components/ui/Metric';
import { SystemPipelineDiagram } from '@/components/projects/SystemPipelineDiagram';
import { ProjectNavigation } from '@/components/case-study/ProjectNavigation';
import { FLAGSHIP_PROJECTS } from '@/data/projects';
import { ArrowLeft, ArrowUpRight, Github, ShieldAlert } from 'lucide-react';

export const MedVisionPage: React.FC = () => {
  const project = FLAGSHIP_PROJECTS.find((p) => p.id === 'medvision');
  if (!project) return null;

  return (
    <Section spacing="default">
      <PageContainer size="wide">
        <Link
          to="/#work"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-content-muted hover:text-indigo-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Systems
        </Link>

        {/* Case Study Header */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <Badge variant="indigo">{project.numericId} // {project.domain}</Badge>
            <Badge variant="neutral">{project.status}</Badge>
            <span className="font-mono text-xs text-content-muted">NARRATIVE: {project.narrative}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-content-primary">
            {project.title}
          </h1>

          <p className="font-display text-2xl text-indigo-400 font-semibold">
            "{project.conceptualCore}"
          </p>

          <p className="font-body text-xl text-content-muted leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="bg-indigo-600 hover:bg-indigo-500 border-indigo-500/50 shadow-glow-indigo">
                <Github className="w-4 h-4 mr-1.5" /> View Research Repository <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>

        {/* Mandatory Academic / Research Disclaimer */}
        <div className="my-8 p-4 rounded-lg bg-surface-raised/80 border border-indigo-500/30 flex items-start gap-3 max-w-4xl">
          <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs font-body text-content-muted">
            <span className="font-semibold text-content-primary font-mono uppercase text-[11px] block">
              AI Computer Vision Research & Educational Experiment
            </span>
            Developed strictly for academic research and evaluation of deep learning architectures on the RSNA Pneumonia Detection dataset. Not certified as a clinical diagnostic medical device.
          </div>
        </div>

        {/* Problem Statement & Why AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          <div className="surface-card p-6 border-l-4 border-l-indigo-500">
            <h3 className="font-display font-bold text-lg text-content-primary mb-2">
              The Medical CV Problem
            </h3>
            <p className="font-body text-sm text-content-muted leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="surface-card p-6 border-l-4 border-l-indigo-500">
            <h3 className="font-display font-bold text-lg text-content-primary mb-2">
              Methodology: Patient-Aware Splits & Explainability
            </h3>
            <p className="font-body text-sm text-content-muted leading-relaxed">
              {project.whyAi}
            </p>
          </div>
        </div>

        {/* Verified Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-12">
          {project.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} context={m.context} highlightColor="indigo" />
          ))}
        </div>

        {/* System Pipeline Architecture */}
        <div className="my-12">
          <h3 className="font-display font-bold text-xl text-content-primary mb-2">
            Research & Evaluation Pipeline Architecture
          </h3>
          <p className="font-body text-sm text-content-muted mb-4">
            Patient-level group-aware partitioning, DenseNet121 transfer learning with batch-norm protection, and Grad-CAM spatial activation mapping.
          </p>
          <SystemPipelineDiagram steps={project.pipelineSteps} colorTheme="indigo" />
        </div>

        {/* Primary Hero Screenshot */}
        <div className="my-12 rounded-xl overflow-hidden border border-border bg-surface">
          <picture>
            <source srcSet={project.primaryAsset.path} type="image/webp" />
            <img
              src={project.primaryAsset.path.replace('.webp', '.png')}
              alt={project.primaryAsset.alt}
              className="w-full h-auto object-cover"
            />
          </picture>
          <div className="p-4 bg-surface-raised border-t border-border font-mono text-xs text-content-muted">
            MedVision AI Streamlit research interface for pneumonia detection analysis and metric logging.
          </div>
        </div>

        {/* Deep Dive Evidence Artifacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {project.supportingAssets.map((asset) => (
            <div key={asset.path} className="surface-card overflow-hidden">
              <picture>
                <source srcSet={asset.path} type="image/webp" />
                <img
                  src={asset.path.replace('.webp', '.png')}
                  alt={asset.alt}
                  className="w-full h-auto object-cover"
                />
              </picture>
              <div className="p-4 bg-surface-raised border-t border-border font-mono text-xs text-content-muted">
                {asset.caption}
              </div>
            </div>
          ))}
        </div>

        {/* Adjacent Project Navigation */}
        <ProjectNavigation currentProjectId={project.id} />
      </PageContainer>
    </Section>
  );
};
