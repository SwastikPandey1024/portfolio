import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative w-full py-16 sm:py-24 border-b border-border/60">
      <PageContainer size="wide">
        <div className="mb-12">
          <SectionHeader
            tag="04 / TIMELINE"
            tagVariant="cyan"
            title="Experience"
            description="Professional software engineering internships, technical leadership, and data consulting engagements."
          />
        </div>

        <ExperienceTimeline />
      </PageContainer>
    </section>
  );
};
