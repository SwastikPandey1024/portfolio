import React from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { SelectedSystemsSection } from '@/components/projects/SelectedSystemsSection';
import { HowIBuildSection } from '@/components/workflow/HowIBuildSection';
import { LabSection } from '@/components/lab/LabSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { AboutSection } from '@/components/about/AboutSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { Metric } from '@/components/ui/Metric';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero & AI Signal Field Experience */}
      <HeroSection />

      {/* Selected Systems: 4 Flagship Engineering Case Studies */}
      <SelectedSystemsSection />

      {/* How I Build: AI-Augmented Engineering Workflow */}
      <HowIBuildSection />

      {/* Engineering Lab: Technical Archive & Open Source */}
      <LabSection />

      {/* Experience: Career & Leadership Timeline */}
      <ExperienceSection />

      {/* About: Philosophy, Perspective & Interests */}
      <AboutSection />

      {/* Contact: Direct Message Form & Verified Developer Profiles */}
      <ContactSection />

      {/* Cross-Project Verified Impact Evidence Metrics */}
      <Section spacing="compact" className="border-b border-border/50 bg-canvas-subtle">
        <PageContainer size="wide">
          <SectionHeader
            tag="VERIFIED EVIDENCE"
            tagVariant="emerald"
            title="System Scope & Verification"
            description="Empirical datasets, test suites, and operational benchmarks across projects."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Metric value="26,684" label="Chest X-Ray Images" context="MedVision AI Dataset" highlightColor="indigo" />
            <Metric value="9,994" label="Retail Transactions" context="SalesPulse Superstore Data" highlightColor="emerald" />
            <Metric value="2.57M" label="Network Records" context="AI CyberShield Logs" highlightColor="cyan" />
            <Metric value="132 / 132" label="Automated Tests Passed" context="Meli (80 UI + 52 API)" highlightColor="violet" />
          </div>
        </PageContainer>
      </Section>
    </>
  );
};
