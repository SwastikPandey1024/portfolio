import React from 'react';
import { motion } from 'framer-motion';
import type { LabProject } from '@/types/project';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LabProjectRowProps {
  project: LabProject;
  className?: string;
}

export const LabProjectRow: React.FC<LabProjectRowProps> = ({ project, className }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'surface-card p-5 sm:p-6 border border-border/80 bg-surface/70 hover:bg-surface hover:border-border-highlight transition-all duration-200 group flex flex-col lg:flex-row lg:items-center justify-between gap-4',
        className
      )}
      aria-labelledby={`lab-project-${project.id}`}
    >
      {/* Left Column: Number, Domain, Title, Summary */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <span className="font-mono text-xs font-bold text-semantic-cyan">
            {project.numericId}
          </span>
          <span className="text-border">/</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-content-muted font-semibold">
            {project.domain}
          </span>
          {project.status && (
            <Badge variant="neutral" size="sm">
              {project.status}
            </Badge>
          )}
        </div>

        <h4
          id={`lab-project-${project.id}`}
          className="font-display text-lg sm:text-xl font-bold text-content-primary group-hover:text-semantic-cyan transition-colors"
        >
          {project.title}
        </h4>

        <p className="font-body text-xs sm:text-sm text-content-muted mt-1.5 leading-relaxed max-w-3xl">
          {project.summary}
        </p>

        {/* Verified Metrics / Proof Chips */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-raised border border-border/60 text-content-primary font-medium"
              >
                {metric}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Proof Tags + Actions */}
      <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-3 shrink-0 pt-3 sm:pt-0 border-t lg:border-t-0 border-border/60">
        {/* Proof Tags */}
        <div className="flex flex-wrap gap-1 lg:justify-end">
          {project.proofTags.slice(0, 3).map((tag) => (
            <span key={tag} className="tech-badge text-[10px]">
              {tag}
            </span>
          ))}
        </div>

        {/* Links / Action CTAs */}
        <div className="flex items-center gap-2 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded bg-semantic-cyan-dim text-semantic-cyan border border-semantic-cyan/40 hover:bg-semantic-cyan/20 transition-all font-semibold"
              aria-label={`View live application for ${project.title}`}
            >
              <ExternalLink className="w-3 h-3" /> Live Demo
            </a>
          )}
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded bg-surface border border-border text-content-muted hover:text-content-primary hover:border-content-muted transition-all"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <Github className="w-3.5 h-3.5" /> Code <ArrowUpRight className="w-3 h-3" />
            </a>
          ) : (
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-raised/80 border border-border/60 text-content-subtle">
              Profile / Archive
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};
