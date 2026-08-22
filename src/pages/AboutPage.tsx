import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { AboutSection } from '@/components/about/AboutSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { ArrowLeft } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <Section spacing="default">
      <PageContainer size="wide">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-content-muted hover:text-semantic-indigo transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Dedicated About & Philosophy Presentation */}
        <AboutSection />

        {/* Career & Leadership Timeline */}
        <ExperienceSection />
      </PageContainer>
    </Section>
  );
};
