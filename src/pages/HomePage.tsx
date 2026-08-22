import React from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { SelectedSystemsSection } from '@/components/projects/SelectedSystemsSection';
import { HowIBuildSection } from '@/components/workflow/HowIBuildSection';
import { LabSection } from '@/components/lab/LabSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { AboutSection } from '@/components/about/AboutSection';
import { ContactSection } from '@/components/contact/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero & AI Signal Field Experience */}
      <HeroSection />

      {/* Selected Systems: 4 Flagship Engineering Case Studies (SalesPulse, DocuChat, Meli, MedVision) */}
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
    </>
  );
};
