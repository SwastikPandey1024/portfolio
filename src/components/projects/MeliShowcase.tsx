import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Mic,
  Database,
  Eye,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  Heart,
  Lock,
  CameraOff,
  Terminal,
  ShieldAlert,
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
  aura: {
    name: string;
    hex: string;
  };
}

const MELI_STATES: StateSpriteItem[] = [
  {
    id: 'idle',
    name: '01. Idle (Ambient Resting)',
    image: '/assets/projects/meli/idle.webp',
    description: 'Ambient resting state with gentle floating motion and subtle breath cycle.',
    trigger: 'Default desktop presence',
    aura: { name: 'Soft Pink', hex: '#FFB6C1' },
  },
  {
    id: 'curious',
    name: '02. Curious (Memory Recall)',
    image: '/assets/projects/meli/curious.webp',
    description: 'Recalling past conversational context or formulating a clarifying question.',
    trigger: 'Memory recalled / clarifying question',
    aura: { name: 'Warm Peach', hex: '#FFAB91' },
  },
  {
    id: 'happy',
    name: '03. Happy (Positive Feedback)',
    image: '/assets/projects/meli/happy.webp',
    description: 'Affirmative response to positive user sentiment and collaborative flow.',
    trigger: 'User praise / positive sentiment',
    aura: { name: 'Warm Pink', hex: '#FF80AB' },
  },
  {
    id: 'thinking',
    name: '04. Thinking (LLM Reasoning)',
    image: '/assets/projects/meli/thinking.webp',
    description: 'Deep dual-brain reasoning stream active across GPT-OSS 120B reasoning core.',
    trigger: 'Active prompt reasoning stream',
    aura: { name: 'Soft Violet', hex: '#B388FF' },
  },
  {
    id: 'working',
    name: '05. Working (Tool Execution)',
    image: '/assets/projects/meli/working.webp',
    description: 'Executing sandboxed OS tools or querying local knowledge base.',
    trigger: 'Tool dispatch / file indexing',
    aura: { name: 'Golden Amber', hex: '#FFD54F' },
  },
  {
    id: 'focused',
    name: '06. Focused (Enterprise RAG)',
    image: '/assets/projects/meli/focused.webp',
    description: 'Deep enterprise RAG retrieval and multi-step execution mode.',
    trigger: 'Multi-step retrieval & synthesis',
    aura: { name: 'Deep Indigo', hex: '#7C4DFF' },
  },
  {
    id: 'sleepy',
    name: '07. Sleepy (Inactivity Sleep)',
    image: '/assets/projects/meli/sleepy.webp',
    description: 'Quiescent power-saving presence engaged during prolonged desktop inactivity (>45s).',
    trigger: 'Extended desktop inactivity (>45s)',
    aura: { name: 'Lavender', hex: '#9FA8DA' },
  },
  {
    id: 'confused',
    name: '08. Confused (Disambiguation)',
    image: '/assets/projects/meli/confused.webp',
    description: 'Prompts user for disambiguation when prompt intent uncertainty exceeds threshold.',
    trigger: 'Ambiguous query / missing parameters',
    aura: { name: 'Warning Orange', hex: '#FF9800' },
  },
  {
    id: 'surprised',
    name: '09. Surprised (Context Discovery)',
    image: '/assets/projects/meli/surprised.webp',
    description: 'Reacts to sudden external environment events or newly discovered workspace data.',
    trigger: 'Unexpected context / system event',
    aura: { name: 'Radiant Sun', hex: '#FFE082' },
  },
  {
    id: 'error',
    name: '10. Error (Permission Denied)',
    image: '/assets/projects/meli/error.webp',
    description: 'Transparent warning indicator when tool action fails or unauthorized access is blocked.',
    trigger: 'Blocked command / tool failure',
    aura: { name: 'Crimson Red', hex: '#FF5252' },
  },
  {
    id: 'complete',
    name: '11. Complete (Task Finished)',
    image: '/assets/projects/meli/complete.webp',
    description: 'Task executed successfully with validated output readiness.',
    trigger: 'Successful task / action resolution',
    aura: { name: 'Spring Green', hex: '#69F0AE' },
  },
  {
    id: 'greeting',
    name: '12. Greeting (Session Launch)',
    image: '/assets/projects/meli/greeting.webp',
    description: 'Warm welcome gesture on application boot or user return after absence.',
    trigger: 'Application launch / user return',
    aura: { name: 'Sunny Rose', hex: '#FF80AB' },
  },
  {
    id: 'click_pet',
    name: '13. Click Pet (Tactile Bounce)',
    image: '/assets/projects/meli/click_pet.webp',
    description: 'Tactile petting bounce physics triggered by single direct mouse click.',
    trigger: 'Single-click tactile interaction',
    aura: { name: 'Radiant Magenta', hex: '#FF4D88' },
  },
  {
    id: 'sink_pop',
    name: '14. Sink / Pop (Portal Dive)',
    image: '/assets/projects/meli/hover.webp',
    description: '1800ms double-click diving physics with elastic overshoot on return.',
    trigger: 'Double-click portal trigger',
    aura: { name: 'Pulsing Rose', hex: '#FF7AA2' },
  },
  {
    id: 'proximity',
    name: '15. Proximity (Cursor Tracking)',
    image: '/assets/projects/meli/proximity.webp',
    description: 'Subtle attention shift and orientation tracking when cursor hovers in proximity envelope.',
    trigger: 'Cursor within proximity threshold',
    aura: { name: 'Soft Pink', hex: '#FFB6C1' },
  },
  {
    id: 'celebration',
    name: '16. Celebration (Milestone)',
    image: '/assets/projects/meli/celebration.webp',
    description: 'High-energy celebration particles triggered on milestone completion.',
    trigger: 'Major project milestone achieved',
    aura: { name: 'Brilliant Gold', hex: '#FFD700' },
  },
];

export const MeliShowcase: React.FC<MeliShowcaseProps> = ({ project }) => {
  const [activeStageTab, setActiveStageTab] = useState<'character' | 'architecture'>('character');
  const [selectedState, setSelectedState] = useState<StateSpriteItem>(MELI_STATES[0]!);

  const stageTabs = [
    { id: 'character', label: '16-State Character Engine', icon: Sparkles },
    { id: 'architecture', label: 'Dual-Brain Architecture', icon: Cpu },
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
            <Layers className="w-3 h-3 mr-1 text-semantic-violet" /> Dual-Brain · GPT-OSS 120B + Qwen 27B
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
                  1. PERCEIVE · Multimodal Vision + Voice
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Push-to-talk Whisper Large v3 Turbo handles speech while Qwen 3.6 27B provides visual understanding and OCR for deliberate desktop context capture.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  2. REMEMBER · Persistent Memory
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  PostgreSQL stores multi-session conversational context and user preferences, giving Meli continuity beyond a single interaction.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  3. REASON · Dual-Brain Intelligence
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  GPT-OSS 120B handles dialogue, policy, reasoning and orchestration while Qwen 3.6 27B specializes in multimodal visual understanding and OCR.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-semantic-violet-dim flex items-center justify-center text-semantic-violet shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-display font-semibold text-xs text-content-primary">
                  4. ACT · Deterministic Native Sandbox
                </h5>
                <p className="font-body text-[11px] text-content-muted mt-0.5">
                  Tauri/Rust executes allowlisted desktop actions through explicit confirmation gates with <code className="text-semantic-violet text-[10px]">shell=False</code> and no arbitrary shell execution.
                </p>
              </div>
            </div>
          </div>

          {/* Verified Evidence Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 w-full my-2">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-3 rounded bg-surface border border-border/60 flex flex-col">
                <span className="font-mono text-lg font-bold text-semantic-violet leading-none">
                  {m.value}
                </span>
                <span className="font-body text-[11px] text-content-muted mt-1 leading-tight">
                  {m.context || m.label}
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

        {/* Right Column (7 cols): Evidence Stage (Character Engine vs Dual-Brain Architecture Switcher) */}
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
                /* TAB 1: 16-State Living Character Engine Inspector */
                <motion.div
                  key="character-stage"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 sm:p-7 flex flex-col items-center justify-center relative min-h-[500px] bg-canvas/40"
                >
                  {/* Subtle Background Violet Radial Glow */}
                  <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

                  {/* Character Display Stage */}
                  <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="violet" size="sm" className="font-mono text-[10px]">
                        <Heart className="w-3 h-3 mr-1 inline" style={{ color: selectedState.aura.hex }} />
                        Signal Heart: {selectedState.aura.name}
                      </Badge>
                      <span className="font-mono text-[10px] text-content-subtle">
                        (X=53.50%, Y=47.00%)
                      </span>
                    </div>

                    <motion.div
                      key={selectedState.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center my-1 relative"
                    >
                      {/* Dynamic Chromatic Aura Glow based on Signal Heart color */}
                      <div
                        className="absolute inset-0 rounded-full filter blur-xl opacity-30 pointer-events-none transition-colors duration-500"
                        style={{ backgroundColor: selectedState.aura.hex }}
                      />
                      <picture className="relative z-10">
                        <source srcSet={selectedState.image} type="image/webp" />
                        <img
                          src={selectedState.image.replace('.webp', '.png')}
                          alt={`Meli companion state: ${selectedState.name}`}
                          className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(167,139,250,0.3)]"
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </motion.div>

                    <div className="mt-1">
                      <span className="font-display font-bold text-base sm:text-lg text-content-primary block">
                        {selectedState.name}
                      </span>
                      <span className="font-mono text-[11px] text-semantic-violet font-medium block mt-0.5">
                        TRIGGER: {selectedState.trigger}
                      </span>
                      <p className="font-body text-xs text-content-muted mt-1.5 max-w-md leading-relaxed">
                        {selectedState.description}
                      </p>
                    </div>

                    {/* Interactive 16-State Selector Grid */}
                    <div
                      className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mt-5 w-full pt-4 border-t border-border/60"
                      role="tablist"
                      aria-label="Meli 16 Character States"
                    >
                      {MELI_STATES.map((state) => {
                        const isSelected = selectedState.id === state.id;
                        return (
                          <button
                            key={state.id}
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setSelectedState(state)}
                            title={`${state.name} (${state.aura.name})`}
                            className={cn(
                              'font-mono text-[10px] py-1 px-1.5 rounded border transition-all cursor-pointer truncate text-center',
                              isSelected
                                ? 'bg-semantic-violet text-canvas border-semantic-violet font-bold shadow-glow-violet'
                                : 'bg-surface/90 text-content-muted border-border hover:border-content-muted hover:text-content-primary'
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
                /* TAB 2: Dual-Brain Desktop Architecture Diagram */
                <motion.div
                  key="architecture-stage"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 sm:p-6 flex flex-col justify-between min-h-[500px] bg-canvas/60"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-semantic-violet" />
                      <span className="font-mono text-xs font-semibold text-content-primary">
                        DUAL-BRAIN MULTIMODAL TOPOLOGY
                      </span>
                    </div>
                    <Badge variant="violet" size="sm">
                      v1.0.0 Stable
                    </Badge>
                  </div>

                  {/* Architecture Hierarchy Nodes */}
                  <div className="flex flex-col gap-2.5 my-3">
                    {/* Layer 1: Client Runtime */}
                    <div className="p-2.5 rounded-lg bg-surface/90 border border-border/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-semantic-violet shrink-0" />
                        <div>
                          <span className="font-mono text-[11px] font-bold text-content-primary block">
                            TAURI NATIVE DESKTOP SHELL
                          </span>
                          <span className="font-body text-[10px] text-content-muted">
                            Transparent Window · High-DPI React Viewport · Zero-Latency Push-to-Talk (<code className="text-semantic-violet">Ctrl+Shift+V</code>)
                          </span>
                        </div>
                      </div>
                      <Badge variant="neutral" size="sm" className="font-mono text-[9px] shrink-0">
                        Rust IPC
                      </Badge>
                    </div>

                    {/* Layer 2: Gateway */}
                    <div className="p-2 rounded-lg bg-surface/60 border border-border/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-content-muted text-[11px]">
                        FastAPI Enterprise Gateway (:8000) ➔ Multimodal Intent Router
                      </span>
                      <span className="text-[10px] text-semantic-violet font-semibold">ASYNC IO</span>
                    </div>

                    {/* Layer 3: Dual-Brain Core 4-Model Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Submodel 1: Reasoning Brain */}
                      <div className="p-2.5 rounded-lg bg-surface/90 border border-semantic-violet/40 flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-semantic-violet font-bold flex items-center gap-1">
                            <Cpu className="w-3.5 h-3.5" /> GPT-OSS 120B
                          </span>
                          <span className="text-[9px] text-content-subtle">REASONING CORE</span>
                        </div>
                        <p className="font-body text-[10px] text-content-muted leading-tight">
                          Orchestration, multi-step policy evaluation, context injection, and dialogue synthesis.
                        </p>
                      </div>

                      {/* Submodel 2: Vision Specialist */}
                      <div className="p-2.5 rounded-lg bg-surface/90 border border-semantic-violet/40 flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-semantic-violet font-bold flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> Qwen 3.6 27B
                          </span>
                          <span className="text-[9px] text-content-subtle">VISION & OCR</span>
                        </div>
                        <p className="font-body text-[10px] text-content-muted leading-tight">
                          Region selection, active window inspection, and full-screen visual OCR context.
                        </p>
                      </div>

                      {/* Submodel 3: Speech to Text */}
                      <div className="p-2.5 rounded-lg bg-surface/90 border border-border/80 flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-content-primary font-bold flex items-center gap-1">
                            <Mic className="w-3.5 h-3.5 text-semantic-violet" /> Whisper Large v3 Turbo
                          </span>
                          <span className="text-[9px] text-content-subtle">SPEECH → TEXT</span>
                        </div>
                        <p className="font-body text-[10px] text-content-muted leading-tight">
                          Low-latency push-to-talk audio transcription with continuous acoustic tokenization.
                        </p>
                      </div>

                      {/* Submodel 4: Voice Synthesis */}
                      <div className="p-2.5 rounded-lg bg-surface/90 border border-border/80 flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-content-primary font-bold flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-semantic-violet" /> CanopyLabs Orpheus
                          </span>
                          <span className="text-[9px] text-content-subtle">EXPRESSIVE TTS</span>
                        </div>
                        <p className="font-body text-[10px] text-content-muted leading-tight">
                          Natural voice feedback streaming with immediate conversational barge-in interruption.
                        </p>
                      </div>
                    </div>

                    {/* Layer 4: Dual Persistence + Action Sandbox */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2 rounded bg-surface border border-border/70 flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-semantic-violet shrink-0" />
                        <span className="font-mono text-[10px] text-content-muted truncate">
                          PostgreSQL Memory + Elasticsearch BM25
                        </span>
                      </div>
                      <div className="p-2 rounded bg-surface border border-border/70 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-semantic-emerald shrink-0" />
                        <span className="font-mono text-[10px] text-content-muted truncate">
                          Deterministic Sandbox (<code className="text-semantic-emerald">shell=False</code>)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Quality Callout */}
                  <div className="p-2.5 rounded-lg bg-surface-raised/80 border border-border flex items-center justify-between text-xs font-mono text-content-muted">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-semantic-emerald" />
                      <span className="font-semibold text-content-primary">295 / 295 Automated Checks Passing (100%)</span>
                    </div>
                    <span className="text-semantic-violet font-bold text-[10px] uppercase">
                      16 TEST SUITES PASS
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Evidence Bottom Bar */}
            <div className="p-3 bg-surface-raised/90 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-content-muted">
              <span>Meli is an interaction layer between intelligence and the desktop.</span>
              <span className="text-semantic-violet font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Runtime
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Security & Trust Strip */}
      <div className="my-6 p-4 rounded-xl bg-surface border border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="font-mono text-[11px] font-bold text-semantic-violet uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> SECURITY & PRIVACY SANDBOX
          </span>
          <span className="font-body text-xs text-content-muted mt-0.5">
            Powerful enough to act. Constrained enough to trust.
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-content-primary">
            <CameraOff className="w-3.5 h-3.5 text-semantic-violet shrink-0" />
            <span>NO BACKGROUND SURVEILLANCE</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-content-primary">
            <Database className="w-3.5 h-3.5 text-semantic-violet shrink-0" />
            <span>NO RAW IMAGE RETENTION</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-content-primary">
            <Terminal className="w-3.5 h-3.5 text-semantic-violet shrink-0" />
            <span>NO ARBITRARY SHELL EXEC</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-content-primary">
            <ShieldAlert className="w-3.5 h-3.5 text-semantic-emerald shrink-0" />
            <span>EXPLICIT CONFIRMATION GATES</span>
          </div>
        </div>
      </div>

      {/* Architecture Pipeline Flow Component (6-Stage Canonical Lifecycle) */}
      <div className="pt-6 border-t border-border/60">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-content-subtle font-semibold uppercase tracking-wider">
            CANONICAL COGNITIVE LIFECYCLE (6 STAGES)
          </span>
          <span className="font-mono text-[10px] text-semantic-violet font-semibold">
            UNDERSTAND ➔ REMEMBER ➔ RETRIEVE ➔ PERCEIVE ➔ REASON ➔ ACT
          </span>
        </div>
        <SystemPipelineDiagram steps={project.pipelineSteps} colorTheme="violet" />
      </div>
    </article>
  );
};
