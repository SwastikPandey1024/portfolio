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
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Lock,
  CameraOff,
  Database,
  Terminal,
  ShieldAlert,
  Cpu,
  Layers,
} from 'lucide-react';

export const MeliPage: React.FC = () => {
  const project = FLAGSHIP_PROJECTS.find((p) => p.id === 'meli');
  if (!project) return null;

  return (
    <Section spacing="default">
      <PageContainer size="wide">
        <Link
          to="/#work"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-content-muted hover:text-semantic-violet transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Systems
        </Link>

        {/* Case Study Header */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <Badge variant="violet">{project.numericId} // {project.domain}</Badge>
            <Badge variant="neutral">{project.status}</Badge>
            <span className="font-mono text-xs text-content-muted">NARRATIVE: {project.narrative}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-content-primary">
            {project.title}
          </h1>

          <p className="font-display text-2xl text-semantic-violet font-semibold">
            "{project.conceptualCore}"
          </p>

          <p className="font-body text-xl text-content-muted leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="bg-purple-600 hover:bg-purple-500 border-purple-500/50 shadow-glow-violet">
                <Github className="w-4 h-4 mr-1.5" /> View GitHub Repository <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>

        {/* Problem Statement & Why AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          <div className="surface-card p-6 border-l-4 border-l-semantic-violet">
            <h3 className="font-display font-bold text-lg text-content-primary mb-2">
              The Interaction Barrier
            </h3>
            <p className="font-body text-sm text-content-muted leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="surface-card p-6 border-l-4 border-l-semantic-violet">
            <h3 className="font-display font-bold text-lg text-content-primary mb-2">
              Why Native Desktop + Dual-Brain Memory?
            </h3>
            <p className="font-body text-sm text-content-muted leading-relaxed">
              {project.whyAi}
            </p>
          </div>
        </div>

        {/* Verified Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-12">
          {project.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} context={m.context} highlightColor="violet" />
          ))}
        </div>

        {/* Compact Security & Trust Strip */}
        <div className="my-12 p-6 rounded-xl bg-surface border border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-semantic-violet uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> SECURITY & PRIVACY SANDBOX (shell=False)
            </span>
            <span className="font-body text-sm text-content-muted mt-1">
              Powerful enough to act. Constrained enough to trust.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 font-mono text-xs text-content-primary">
              <CameraOff className="w-4 h-4 text-semantic-violet shrink-0" />
              <span>NO BACKGROUND SURVEILLANCE</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-content-primary">
              <Database className="w-4 h-4 text-semantic-violet shrink-0" />
              <span>NO RAW IMAGE RETENTION</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-content-primary">
              <Terminal className="w-4 h-4 text-semantic-violet shrink-0" />
              <span>NO ARBITRARY SHELL EXEC</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-content-primary">
              <ShieldAlert className="w-4 h-4 text-semantic-emerald shrink-0" />
              <span>EXPLICIT CONFIRMATION GATES</span>
            </div>
          </div>
        </div>

        {/* System Pipeline Architecture */}
        <div className="my-12">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-xl text-content-primary">
              Canonical Cognitive Lifecycle (6 Stages)
            </h3>
            <Badge variant="violet" size="sm">
              <Cpu className="w-3 h-3 mr-1 inline" /> Dual-Brain Pipeline
            </Badge>
          </div>
          <p className="font-body text-sm text-content-muted mb-4">
            Continuous cycle connecting multimodal intent routing, PostgreSQL persistent memory, Elasticsearch BM25 retrieval, Whisper & Qwen perception, dual-brain reasoning, and deterministic native execution.
          </p>
          <SystemPipelineDiagram steps={project.pipelineSteps} colorTheme="violet" />
        </div>

        {/* Character State Showcase Matrix */}
        <div className="my-12">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-xl text-content-primary">
              16-State Living Character Engine
            </h3>
            <Badge variant="neutral" size="sm">
              <Layers className="w-3 h-3 mr-1 inline text-semantic-violet" /> Signal Heart Chromatic Aura
            </Badge>
          </div>
          <p className="font-body text-sm text-content-muted mb-6">
            Handcrafted standalone illustrations with volume-conserving squashing physics and a glowing Signal Heart anchor (<code className="text-semantic-violet text-xs">X=53.50%, Y=47.00%</code>).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {project.supportingAssets.slice(0, 6).map((asset) => (
              <div key={asset.path} className="surface-card p-4 flex flex-col items-center text-center">
                <picture>
                  <source srcSet={asset.path} type="image/webp" />
                  <img
                    src={asset.path.replace('.webp', '.png')}
                    alt={asset.alt}
                    className="w-24 h-24 object-contain filter drop-shadow-md my-2"
                  />
                </picture>
                <span className="font-display font-semibold text-xs text-content-primary mt-2">
                  {asset.alt}
                </span>
                <span className="font-body text-[10px] text-content-muted mt-1 leading-snug">
                  {asset.caption}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Adjacent Project Navigation */}
        <ProjectNavigation currentProjectId={project.id} />
      </PageContainer>
    </Section>
  );
};
