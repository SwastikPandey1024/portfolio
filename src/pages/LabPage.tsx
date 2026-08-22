import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { LabSection } from '@/components/lab/LabSection';
import { ArrowLeft, Sparkles, Terminal } from 'lucide-react';

export const LabPage: React.FC = () => {
  return (
    <Section spacing="default">
      <PageContainer size="wide">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-content-muted hover:text-semantic-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-4">
          <SectionHeader
            tag="EXPERIMENTAL ARCHIVE"
            tagVariant="violet"
            title="Engineering Lab & Open Source"
            description="A comprehensive technical index of exploratory machine learning systems, smart contracts, network security models, and autonomous agent architectures developed beyond the four flagship case studies."
          />
        </div>

        {/* Technical Context Bar */}
        <div className="my-6 p-4 rounded-lg bg-surface border border-border/80 flex items-center justify-between text-xs font-mono text-content-muted">
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-semantic-violet" /> Production baselines, prototypes, and open-source contributions
          </span>
          <span className="flex items-center gap-1 text-semantic-cyan">
            <Sparkles className="w-3.5 h-3.5" /> Empirical verification
          </span>
        </div>

        {/* Mount LabSection */}
        <LabSection isFullPage />
      </PageContainer>
    </Section>
  );
};
