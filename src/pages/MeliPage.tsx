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
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';

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
              Why Native Desktop + Hybrid Memory?
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

        {/* System Pipeline Architecture */}
        <div className="my-12">
          <h3 className="font-display font-bold text-xl text-content-primary mb-2">
            Perception & Execution Loop Architecture
          </h3>
          <p className="font-body text-sm text-content-muted mb-4">
            Continuous cycle connecting voice transcription, PostgreSQL memory, BM25 retrieval, LLM reasoning, and native desktop tool dispatch.
          </p>
          <SystemPipelineDiagram steps={project.pipelineSteps} colorTheme="violet" />
        </div>

        {/* Character State Showcase Matrix */}
        <div className="my-12">
          <h3 className="font-display font-bold text-xl text-content-primary mb-2">
            Visual State Machine Engine (Selected States)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
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
