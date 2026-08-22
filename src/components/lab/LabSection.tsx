import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { LabFilterBar } from '@/components/lab/LabFilterBar';
import { LabProjectRow } from '@/components/lab/LabProjectRow';
import { LAB_PROJECTS } from '@/data/projects';
import type { LabFilterCategory } from '@/types/project';
import { AnimatePresence } from 'framer-motion';
import { FlaskConical } from 'lucide-react';

export interface LabSectionProps {
  initialFilter?: LabFilterCategory;
  isFullPage?: boolean;
}

export const LabSection: React.FC<LabSectionProps> = ({
  initialFilter = 'ALL',
  isFullPage: _isFullPage = false,
}) => {
  const [activeFilter, setActiveFilter] = useState<LabFilterCategory>(initialFilter);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') {
      return LAB_PROJECTS;
    }
    return LAB_PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="lab" className="relative w-full py-16 sm:py-24 border-b border-border/60">
      <PageContainer size="wide">
        {/* Section Header */}
        <div className="mb-10">
          <SectionHeader
            tag="03 / ARCHIVE"
            tagVariant="violet"
            title="Engineering Lab"
            description="Experiments, systems and open-source work beyond the flagship case studies. Focused proofs-of-concept, time-series engines, cybersecurity models, and agent architectures."
          />

          {/* Subheader / Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4 border-t border-border/60">
            <LabFilterBar
              activeFilter={activeFilter}
              onSelectFilter={setActiveFilter}
            />

            <div className="flex items-center gap-2 text-xs font-mono text-content-subtle">
              <FlaskConical className="w-3.5 h-3.5 text-semantic-violet" />
              <span>
                SHOWING {filteredProjects.length} OF {LAB_PROJECTS.length} LAB SYSTEMS
              </span>
            </div>
          </div>
        </div>

        {/* Project Archive Rows List */}
        <div className="flex flex-col gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <LabProjectRow key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </PageContainer>
    </section>
  );
};
