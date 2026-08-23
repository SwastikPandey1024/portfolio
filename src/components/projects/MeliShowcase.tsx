import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Mic,
  Database,
  Search,
  Wrench,
  Monitor,
  Sparkles,
  Cpu,
  ShieldCheck,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
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
  {
    id: 'greeting',
    name: 'Welcoming Wave',
    image: '/assets/projects/meli/greeting.webp',
    description: 'Greeting gesture activated on session launch or conversational start.',
    trigger: 'Session initial greeting',
  },
  {
    id: 'celebration',
    name: 'Milestone Celebration',
    image: '/assets/projects/meli/celebration.webp',
    description: 'High-energy celebration feedback triggered on major goal completion.',
    trigger: 'Milestone reached',
  },
  {
    id: 'curious',
    name: 'Curious Exploration',
    image: '/assets/projects/meli/curious.webp',
    description: 'Active orientation when exploring new documents, files, or user context.',
    trigger: 'New context detected',
  },
  {
    id: 'sleepy',
    name: 'Sleep / Inactive Mode',
    image: '/assets/projects/meli/sleepy.webp',
    description: 'Energy-saving quiescent state engaged during prolonged desktop inactivity.',
    trigger: 'Idle timeout exceeded',
  },
];

export const MeliShowcase: React.FC<MeliShowcaseProps> = ({ project }) => {
  const [activeStageTab, setActiveStageTab] = useState<'character' | 'architecture'>('character');
  const [selectedState, setSelectedState] = useState<StateSpriteItem>(MELI_STATES[0]!);

  const stageTabs = [
    { id: 'character', label: 'Character State Engine', icon: Sparkles },
    { id: 'architecture', label: 'Desktop Architecture', icon: Cpu },
  ] as const;

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

      {/* Main 5:7 Grid Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start my-8">
        {/* Left Column (5 cols): Thesis, Problem, 4 Engineering Pillars, Metrics, CTAs */}
        <div className="lg:col-span-5 flex flex-col items-start">
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

          {/* 4 Core Engineering Pillars */}
          <div className="space-y-2.5 w-full my-6">
            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  1. PERCEIVE · Whisper Voice
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Push-to-talk speech-to-text transcription, ambient audio cues, and streaming text-to-speech output.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  2. REMEMBER · PostgreSQL Memory
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Multi-session persistent conversational storage retaining structured context and user preference vectors.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  3. RETRIEVE · Elasticsearch BM25
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Low-latency hybrid lexical and semantic search over user notes, files, and historical conversation archives.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  4. ACT · Tauri / Rust Bridge
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Native operating system execution with granular, auditable permission gates before tool invocation.
                </p>
              </div>
            </div>
          </div>

          {/* Verified Evidence Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 w-full my-2">
            <div className="p-3 rounded bg-surface border border-border/60 flex flex-col">
              <span className="font-mono text-lg font-bold text-semantic-violet leading-none">
                16 States
              </span>
              <span className="font-body text-[11px] text-content-muted mt-1 leading-tight">
                Visual State Engine
              </span>
            </div>
            <div className="p-3 rounded bg-surface border border-border/60 flex flex-col">
              <span className="font-mono text-lg font-bold text-semantic-violet leading-none">
                132 / 132
              </span>
              <span className="font-body text-[11px] text-content-muted mt-1 leading-tight">
                Automated Unit Tests
              </span>
            </div>
            <div className="p-3 rounded bg-surface border border-border/60 flex flex-col">
              <span className="font-mono text-lg font-bold text-semantic-violet leading-none">
                Tauri + Rust
              </span>
              <span className="font-body text-[11px] text-content-muted mt-1 leading-tight">
                Native Desktop Shell
              </span>
            </div>
            <div className="p-3 rounded bg-surface border border-border/60 flex flex-col">
              <span className="font-mono text-lg font-bold text-semantic-violet leading-none">
                Whisper STT
              </span>
              <span className="font-body text-[11px] text-content-muted mt-1 leading-tight">
                Voice Intelligence
              </span>
            </div>
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

        {/* Right Column (7 cols): Evidence Stage (Character Engine vs Desktop Architecture Switcher) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="Meli Evidence Stage Views">
            {stageTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeStageTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveStageTab(tab.id as typeof activeStageTab)}
                  className={cn(
                    'flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-md border transition-all cursor-pointer',
                    isSelected
                      ? 'bg-semantic-violet/15 text-semantic-violet border-semantic-violet/50 font-semibold shadow-sm'
                      : 'bg-surface text-content-muted border-border hover:border-content-muted'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Evidence Viewport Container */}
          <div className="rounded-xl overflow-hidden border border-border/80 bg-surface shadow-surface-elevated flex flex-col">
            <AnimatePresence mode="wait">
              {activeStageTab === 'character' ? (
                /* TAB 1: 16-State Character State Engine Inspector */
                <motion.div
                  key="character-stage"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8 flex flex-col items-center justify-center relative min-h-[460px] bg-canvas/40"
                >
                  {/* Subtle Background Violet Radial Glow */}
                  <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

                  {/* Character Display Stage */}
                  <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
                    <motion.div
                      key={selectedState.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center my-2"
                    >
                      <picture>
                        <source srcSet={selectedState.image} type="image/webp" />
                        <img
                          src={selectedState.image.replace('.webp', '.png')}
                          alt={`Meli companion state: ${selectedState.name}`}
                          className="w-full h-full object-contain filter drop-shadow-[0_10px_24px_rgba(167,139,250,0.3)]"
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </motion.div>

                    <div className="mt-2">
                      <span className="font-display font-bold text-base sm:text-lg text-content-primary block">
                        {selectedState.name}
                      </span>
                      <span className="font-mono text-[11px] text-semantic-violet font-medium block mt-0.5">
                        TRIGGER: {selectedState.trigger}
                      </span>
                      <p className="font-body text-xs text-content-muted mt-2 max-w-xs leading-relaxed">
                        {selectedState.description}
                      </p>
                    </div>

                    {/* Interactive State Selector Grid */}
                    <div
                      className="flex flex-wrap justify-center gap-1.5 mt-6 max-w-md pt-4 border-t border-border/60"
                      role="tablist"
                      aria-label="Meli Character States"
                    >
                      {MELI_STATES.map((state) => {
                        const isSelected = selectedState.id === state.id;
                        return (
                          <button
                            key={state.id}
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setSelectedState(state)}
                            className={cn(
                              'font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer uppercase',
                              isSelected
                                ? 'bg-semantic-violet text-canvas border-semantic-violet font-bold shadow-glow-violet'
                                : 'bg-surface/90 text-content-muted border-border hover:border-content-muted'
                            )}
                          >
                            {state.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* TAB 2: Native Desktop System Architecture Diagram */
                <motion.div
                  key="architecture-stage"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8 flex flex-col justify-between min-h-[460px] bg-canvas/60"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-semantic-violet" />
                      <span className="font-mono text-xs font-semibold text-content-primary">
                        NATIVE DESKTOP RUNTIME TOPOLOGY
                      </span>
                    </div>
                    <Badge variant="violet" size="sm">
                      Rust IPC Bridge
                    </Badge>
                  </div>

                  {/* Architecture Diagram Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                    {/* Node 1 */}
                    <div className="p-3.5 rounded-lg bg-surface/90 border border-border/80 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-semantic-violet font-semibold flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5" /> 01 // PERCEPTION
                        </span>
                        <span className="text-[10px] text-content-subtle">LOCAL</span>
                      </div>
                      <span className="font-display font-semibold text-xs text-content-primary">
                        Whisper Voice Input & Synthesis
                      </span>
                      <p className="font-body text-[11px] text-content-muted leading-relaxed">
                        Push-to-talk audio capture transcribed locally into text tokens with streaming synthesis feedback.
                      </p>
                    </div>

                    {/* Node 2 */}
                    <div className="p-3.5 rounded-lg bg-surface/90 border border-border/80 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-semantic-violet font-semibold flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" /> 02 // REASONING CORE
                        </span>
                        <span className="text-[10px] text-content-subtle">FASTAPI</span>
                      </div>
                      <span className="font-display font-semibold text-xs text-content-primary">
                        LLM Intent & Tool Decision Engine
                      </span>
                      <p className="font-body text-[11px] text-content-muted leading-relaxed">
                        Evaluates user prompt, performs contextual intent classification, and selects optimal tool path.
                      </p>
                    </div>

                    {/* Node 3 */}
                    <div className="p-3.5 rounded-lg bg-surface/90 border border-border/80 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-semantic-violet font-semibold flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5" /> 03 // DUAL-TIER STORAGE
                        </span>
                        <span className="text-[10px] text-content-subtle">PERSISTENCE</span>
                      </div>
                      <span className="font-display font-semibold text-xs text-content-primary">
                        PostgreSQL + Elasticsearch BM25
                      </span>
                      <p className="font-body text-[11px] text-content-muted leading-relaxed">
                        PostgreSQL holds structured multi-session history while Elasticsearch delivers sub-second hybrid retrieval.
                      </p>
                    </div>

                    {/* Node 4 */}
                    <div className="p-3.5 rounded-lg bg-surface/90 border border-border/80 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-semantic-violet font-semibold flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5" /> 04 // TAURI / RUST BRIDGE
                        </span>
                        <span className="text-[10px] text-content-subtle">SANDBOXED</span>
                      </div>
                      <span className="font-display font-semibold text-xs text-content-primary">
                        Auditable Native Tool Execution
                      </span>
                      <p className="font-body text-[11px] text-content-muted leading-relaxed">
                        Granular permission verification gates before dispatching local shell, file, or system commands.
                      </p>
                    </div>
                  </div>

                  {/* Architecture Quality Callout */}
                  <div className="p-3 rounded-lg bg-surface-raised/80 border border-border flex items-center justify-between text-xs font-mono text-content-muted">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-semantic-emerald" />
                      <span>132 Automated Tests: 80 Vitest Frontend + 52 Pytest Backend</span>
                    </div>
                    <span className="text-semantic-violet font-semibold text-[10px] uppercase">
                      VERIFIED PASS
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Evidence Bottom Bar */}
            <div className="p-3 bg-surface-raised/90 border-t border-border flex items-center justify-between text-xs font-mono text-content-muted">
              <span>Ambient desktop intelligence connecting perception, persistent memory, retrieval and controlled action.</span>
              <span className="text-semantic-violet font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified System
              </span>
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

