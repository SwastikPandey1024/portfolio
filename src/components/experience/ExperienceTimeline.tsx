import React from 'react';
import { motion } from 'framer-motion';
import type { ExperienceItem } from '@/types/experience';
import { EXPERIENCES } from '@/data/experience';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, Calendar, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ExperienceTimelineProps {
  experiences?: ExperienceItem[];
  className?: string;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences = EXPERIENCES,
  className,
}) => {
  return (
    <div className={cn('relative w-full max-w-4xl mx-auto py-4', className)} aria-label="Career and Leadership Timeline">
      {/* Central / Left Connecting Vertical Line */}
      <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-[2px] bg-border/80" aria-hidden="true" />

      <div className="flex flex-col gap-8 sm:gap-10 relative">
        {experiences.map((exp, idx) => {
          return (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative flex items-start gap-4 sm:gap-8 group"
              aria-labelledby={`exp-heading-${exp.id}`}
            >
              {/* Timeline Node Icon Indicator */}
              <div className="shrink-0 w-8 sm:w-16 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-surface border-2 border-semantic-cyan/60 group-hover:border-semantic-cyan group-hover:bg-semantic-cyan-dim flex items-center justify-center text-semantic-cyan transition-all shadow-sm z-10">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Experience Card Body */}
              <div className="flex-1 surface-card p-5 sm:p-6 border border-border/80 bg-surface/70 hover:bg-surface hover:border-border-highlight transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-semantic-cyan">
                      {exp.numericId}
                    </span>
                    <span className="text-border">/</span>
                    <Badge variant="neutral" size="sm">
                      {exp.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-content-muted">
                    <Calendar className="w-3.5 h-3.5 text-content-subtle" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <h4
                  id={`exp-heading-${exp.id}`}
                  className="font-display text-lg sm:text-xl font-bold text-content-primary group-hover:text-semantic-cyan transition-colors"
                >
                  {exp.role}
                </h4>

                <div className="flex items-center gap-1.5 text-xs font-mono text-content-muted mt-1 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-semantic-cyan" />
                  <span className="font-semibold text-content-primary">{exp.organization}</span>
                </div>

                <p className="font-body text-xs sm:text-sm text-content-muted leading-relaxed">
                  {exp.description}
                </p>

                {/* Focus / Capability Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/60">
                  {exp.focusTags.map((tag) => (
                    <span key={tag} className="tech-badge text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};
