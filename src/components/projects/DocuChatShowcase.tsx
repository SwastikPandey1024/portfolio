import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, FileText, Search, Sparkles, MessageSquare, Database, ShieldCheck } from 'lucide-react';
import type { FlagshipProject } from '@/types/project';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SystemPipelineDiagram } from '@/components/projects/SystemPipelineDiagram';
import { cn } from '@/lib/utils';

export interface DocuChatShowcaseProps {
  project: FlagshipProject;
}

export const DocuChatShowcase: React.FC<DocuChatShowcaseProps> = ({ project }) => {
  const [activeUiTab, setActiveUiTab] = useState<'dashboard' | 'chat' | 'processing' | 'upload' | 'swagger'>('dashboard');

  const uiTabs = [
    { id: 'dashboard', label: 'Workspace Dashboard', asset: project.primaryAsset },
    { id: 'chat', label: 'Retrieval & Streaming Answer', asset: project.supportingAssets[0] },
    { id: 'processing', label: 'Parsing & Chunking', asset: project.supportingAssets[1] },
    { id: 'upload', label: 'Document Ingestion', asset: project.supportingAssets[2] },
    { id: 'swagger', label: 'FastAPI Schemas', asset: project.supportingAssets[3] },
  ] as const;

  const currentUiAsset = uiTabs.find((t) => t.id === activeUiTab)?.asset || project.primaryAsset;

  return (
    <article
      id="docuchat"
      className="surface-card p-6 sm:p-10 lg:p-12 mb-16 border border-border/80 bg-surface/60 overflow-hidden relative"
      aria-labelledby="docuchat-heading"
    >
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-base font-bold text-semantic-cyan">
            {project.numericId}
          </span>
          <span className="text-border">/</span>
          <Badge variant="cyan">{project.domain}</Badge>
          <span className="text-border hidden sm:inline">/</span>
          <span className="font-mono text-xs text-content-muted hidden sm:inline">
            NARRATIVE: {project.narrative}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">
            <Database className="w-3 h-3 mr-1 text-semantic-cyan" /> RAG + Vector Retrieval
          </Badge>
          <Badge variant="cyan" size="sm">
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Split Architecture + UI Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start my-8">
        {/* Left Column: 4-Stage Architecture Breakdown */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-wider text-semantic-cyan font-semibold mb-2">
            THE THESIS: "{project.conceptualCore}"
          </span>
          <h3
            id="docuchat-heading"
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

          {/* 4 Architectural Pillars Grid */}
          <div className="space-y-3 w-full my-6">
            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-cyan-dim flex items-center justify-center text-semantic-cyan shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  1. INGESTION · Upload → Process
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Multi-format file parsing (PDF, DOCX, TXT), structural cleaning, and token-aware semantic chunking.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-cyan-dim flex items-center justify-center text-semantic-cyan shrink-0 mt-0.5">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  2. RETRIEVAL · Embed → Search
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Dense vector embeddings generated for chunks and indexed for low-latency cosine similarity querying.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-cyan-dim flex items-center justify-center text-semantic-cyan shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  3. REASONING · Context → LLM
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Retrieved passages are dynamically injected into system prompts with strict anti-hallucination guardrails.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-cyan-dim flex items-center justify-center text-semantic-cyan shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  4. RESULT · Answer → Citations
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Natural language response streaming with verifiable paragraph citations linking back to original sources.
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to={`/work/${project.id}`}>
              <Button variant="primary" className="bg-sky-600 hover:bg-sky-500 border-sky-500/50 shadow-glow-cyan">
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

        {/* Right Column: Tabbed UI Workspace Preview */}
        <div className="lg:col-span-7 flex flex-col">
          {/* UI Screen Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="DocuChat UI Views">
            {uiTabs.map((tab) => {
              const isSelected = activeUiTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveUiTab(tab.id as typeof activeUiTab)}
                  className={cn(
                    'font-mono text-xs px-3 py-1.5 rounded-md border transition-all cursor-pointer',
                    isSelected
                      ? 'bg-semantic-cyan/15 text-semantic-cyan border-semantic-cyan/50 font-semibold'
                      : 'bg-surface text-content-muted border-border hover:border-content-muted'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Screenshot Display */}
          <motion.div
            key={activeUiTab}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl overflow-hidden border border-border/80 bg-surface shadow-surface-elevated"
          >
            {currentUiAsset && (
              <picture>
                <source srcSet={currentUiAsset.path} type="image/webp" />
                <img
                  src={currentUiAsset.path.replace('.webp', '.png')}
                  alt={currentUiAsset.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover max-h-[560px]"
                />
              </picture>
            )}
            <div className="p-3 bg-surface-raised/90 border-t border-border flex items-center justify-between text-xs font-mono text-content-muted">
              <span>{currentUiAsset?.alt}</span>
              <span className="text-semantic-cyan font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Interface
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Architecture Pipeline Flow Component */}
      <div className="pt-6 border-t border-border/60">
        <span className="font-mono text-xs text-content-subtle font-semibold uppercase tracking-wider block mb-2">
          RETRIEVAL-AUGMENTED GENERATION FLOW
        </span>
        <SystemPipelineDiagram steps={project.pipelineSteps} colorTheme="cyan" />
      </div>
    </article>
  );
};
