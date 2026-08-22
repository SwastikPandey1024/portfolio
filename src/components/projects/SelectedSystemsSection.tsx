import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { FLAGSHIP_PROJECTS } from '@/data/projects';
import { SalesPulseShowcase } from '@/components/projects/SalesPulseShowcase';
import { DocuChatShowcase } from '@/components/projects/DocuChatShowcase';
import { MeliShowcase } from '@/components/projects/MeliShowcase';
import { MedVisionShowcase } from '@/components/projects/MedVisionShowcase';

export const SelectedSystemsSection: React.FC = () => {
  const salesPulseProject = FLAGSHIP_PROJECTS.find((p) => p.id === 'salespulse')!;
  const docuChatProject = FLAGSHIP_PROJECTS.find((p) => p.id === 'docuchat')!;
  const meliProject = FLAGSHIP_PROJECTS.find((p) => p.id === 'meli')!;
  const medVisionProject = FLAGSHIP_PROJECTS.find((p) => p.id === 'medvision')!;

  return (
    <section id="work" className="relative w-full py-16 sm:py-24 border-b border-border/60">
      <PageContainer size="wide">
        {/* Editorial Section Introduction */}
        <div className="mb-14">
          <SectionHeader
            tag="01 / SYSTEMS"
            tagVariant="indigo"
            title="Selected Systems"
            description="Four domains. One engineering mindset."
          />
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-display font-medium text-content-muted border-t border-b border-border/60 py-3.5 mt-6">
            <span className="text-semantic-emerald font-semibold">Predict.</span>
            <span className="text-border">/</span>
            <span className="text-semantic-cyan font-semibold">Retrieve.</span>
            <span className="text-border">/</span>
            <span className="text-semantic-violet font-semibold">Remember.</span>
            <span className="text-border">/</span>
            <span className="text-indigo-400 font-semibold">Interpret.</span>
          </div>
        </div>

        {/* 01 SalesPulse AI */}
        {salesPulseProject && <SalesPulseShowcase project={salesPulseProject} />}

        {/* 02 DocuChat */}
        {docuChatProject && <DocuChatShowcase project={docuChatProject} />}

        {/* 03 Meli AI Companion */}
        {meliProject && <MeliShowcase project={meliProject} />}

        {/* 04 MedVision AI */}
        {medVisionProject && <MedVisionShowcase project={medVisionProject} />}
      </PageContainer>
    </section>
  );
};
