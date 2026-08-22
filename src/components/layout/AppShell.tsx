import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/footer/Footer';
import { SkipLink } from '@/components/ui/SkipLink';
import { MeliGuideBoundary } from '@/components/meli/MeliGuideBoundary';
import { useLenis } from '@/hooks/useLenis';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  // Initialize Lenis smooth scroll conservatively
  useLenis();

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-content-primary relative selection:bg-semantic-cyan/20 selection:text-semantic-cyan">
      {/* Accessibility Skip Link */}
      <SkipLink />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow pt-24 focus:outline-none">
        {children}
      </main>

      {/* Meli Guide Architectural Slot */}
      <MeliGuideBoundary />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
