import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Mic, Database, Search, Wrench, Shield, Monitor } from 'lucide-react';
import type { FlagshipProject } from '@/types/project';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SystemPipelineDiagram } from '@/components/projects/SystemPipelineDiagram';
import { cn } from '@/lib/utils';

export interface MeliShowcaseProps {
  project: FlagshipProject;
}

interface StateSpriteItem {
  id: string;
  name: string;
  image: string;
  description: string;
  trigger: string;
}

const MELI_STATES: StateSpriteItem[] = [
  {
    id: 'idle',
    name: 'Idle (Neutral)',
    image: '/assets/projects/meli/idle.webp',
    description: 'Ambient resting state maintaining minimal GPU footprint and observing cursor proximity.',
    trigger: 'Default desktop state',
  },
  {
    id: 'thinking',
    name: 'Thinking / Reasoning',
    image: '/assets/projects/meli/thinking.webp',
    description: 'Activated during LLM inference, memory lookups, and context retrieval synthesis.',
    trigger: 'User query received',
  },
  {
    id: 'working',
    name: 'Working / Tool Exec',
    image: '/assets/projects/meli/working.webp',
    description: 'Triggered when executing native OS tools, executing commands, or fetching external data.',
    trigger: 'Tool dispatch event',
  },
  {
    id: 'complete',
    name: 'Task Complete',
    image: '/assets/projects/meli/complete.webp',
    description: 'Affirmative response indicating tool completion and result readiness.',
    trigger: 'Tool execution success',
  },
  {
    id: 'focused',
    name: 'Deep Focus Mode',
    image: '/assets/projects/meli/focused.webp',
    description: 'Calm ambient presence designed to eliminate visual distractions during deep work.',
    trigger: 'Focus mode toggled',
  },
  {
    id: 'happy',
    name: 'Happy / Celebration',
    image: '/assets/projects/meli/happy.webp',
    description: 'Delightful feedback state triggered by milestone completion or user interactions.',
    trigger: 'Positive confirmation',
  },
  {
    id: 'confused',
    name: 'Query Clarification',
    image: '/assets/projects/meli/confused.webp',
    description: 'Prompts user for disambiguation when prompt intent uncertainty exceeds tolerance.',
    trigger: 'Ambiguous prompt input',
  },
  {
    id: 'error',
    name: 'Error / Permission Denied',
    image: '/assets/projects/meli/error.webp',
    description: 'Transparent visual indicator when tool permissions are rejected or network timeout occurs.',
    trigger: 'Tool failure or timeout',
  },
];

export const MeliShowcase: React.FC<MeliShowcaseProps> = ({ project }) => {
  const [selectedState, setSelectedState] = useState<StateSpriteItem>(MELI_STATES[0]!);

  return (
    <article
      id="meli"
      className="surface-card p-6 sm:p-10 lg:p-12 mb-16 border border-border/80 bg-surface/60 overflow-hidden relative"
      aria-labelledby="meli-heading"
    >
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-base font-bold text-semantic-violet">
            {project.numericId}
          </span>
          <span className="text-border">/</span>
          <Badge variant="violet">{project.domain}</Badge>
          <span className="text-border hidden sm:inline">/</span>
          <span className="font-mono text-xs text-content-muted hidden sm:inline">
            NARRATIVE: {project.narrative}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">
            <Monitor className="w-3 h-3 mr-1 text-semantic-violet" /> Tauri + Rust + FastAPI
          </Badge>
          <Badge variant="violet" size="sm">
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Immersive Full-Width Visual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-8">
        {/* Left Column: Thesis & Problem */}
        <div className="lg:col-span-4 flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-wider text-semantic-violet font-semibold mb-2">
            THE THESIS: "{project.conceptualCore}"
          </span>
          <h3
            id="meli-heading"
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

          {/* Key Metric Badges */}
          <div className="grid grid-cols-2 gap-2 w-full my-6">
            <div className="p-3 rounded bg-surface border border-border/60 flex flex-col">
              <span className="font-mono text-lg font-bold text-semantic-violet">16 States</span>
              <span className="font-body text-[11px] text-content-muted mt-0.5">Visual State Engine</span>
            </div>
            <div className="p-3 rounded bg-surface border border-border/60 flex flex-col">
              <span className="font-mono text-lg font-bold text-semantic-violet">132 / 132</span>
              <span className="font-body text-[11px] text-content-muted mt-0.5">Automated Tests Passed</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to={`/work/${project.id}`}>
              <Button variant="primary" className="bg-purple-600 hover:bg-purple-500 border-purple-500/50 shadow-glow-violet">
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

        {/* Center Column: Interactive Sprite State Inspector */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] aspect-square rounded-2xl bg-canvas border border-border/80 p-6 flex flex-col items-center justify-center shadow-surface-elevated overflow-hidden group">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
            
            <motion.div
              key={selectedState.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-44 h-44 flex items-center justify-center"
            >
              <img
                src={selectedState.image}
                alt={`Meli companion state: ${selectedState.name}`}
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(167,139,250,0.25)]"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <div className="relative z-10 text-center mt-2">
              <span className="font-display font-bold text-sm text-content-primary block">
                {selectedState.name}
              </span>
              <span className="font-mono text-[10px] text-semantic-violet block mt-0.5">
                TRIGGER: {selectedState.trigger}
              </span>
            </div>
          </div>

          <p className="font-body text-xs text-content-muted text-center mt-3 max-w-xs leading-relaxed">
            {selectedState.description}
          </p>

          {/* State Selector Buttons Grid */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-4 max-w-sm" role="tablist" aria-label="Meli Character States">
            {MELI_STATES.map((state) => {
              const isSelected = selectedState.id === state.id;
              return (
                <button
                  key={state.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedState(state)}
                  className={cn(
                    'font-mono text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer uppercase',
                    isSelected
                      ? 'bg-semantic-violet text-canvas border-semantic-violet font-bold shadow-glow-violet'
                      : 'bg-surface text-content-muted border-border hover:border-content-muted'
                  )}
                >
                  {state.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: 6 Core Capability Modules Grid */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
          <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-display font-semibold text-xs text-content-primary">
                Voice Intelligence (Whisper STT / TTS)
              </h5>
              <p className="font-body text-[11px] text-content-muted mt-0.5">
                Push-to-talk speech recognition with streaming audio feedback.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-display font-semibold text-xs text-content-primary">
                Persistent Memory (PostgreSQL)
              </h5>
              <p className="font-body text-[11px] text-content-muted mt-0.5">
                Structured long-term storage preserving conversational context across restarts.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-display font-semibold text-xs text-content-primary">
                Hybrid Search (Elasticsearch BM25)
              </h5>
              <p className="font-body text-[11px] text-content-muted mt-0.5">
                Fast lexical and semantic retrieval over user notes and chat history.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-display font-semibold text-xs text-content-primary">
                Auditable Tool Execution
              </h5>
              <p className="font-body text-[11px] text-content-muted mt-0.5">
                Granular permission gates before executing local scripts or system commands.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
            <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-display font-semibold text-xs text-content-primary">
                132 Verified Automated Tests
              </h5>
              <p className="font-body text-[11px] text-content-muted mt-0.5">
                80/80 Vitest frontend tests + 52/52 Pytest backend tests passing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Pipeline Flow Component */}
      <div className="pt-6 border-t border-border/60">
        <span className="font-mono text-xs text-content-subtle font-semibold uppercase tracking-wider block mb-2">
          HUMAN-AI INTERACTION CYCLE
        </span>
        <SystemPipelineDiagram steps={project.pipelineSteps} colorTheme="violet" />
      </div>
    </article>
  );
};
