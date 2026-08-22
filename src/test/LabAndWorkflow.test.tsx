import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HowIBuildSection } from '@/components/workflow/HowIBuildSection';
import { LabSection } from '@/components/lab/LabSection';

describe('Phase 4: How I Build & Engineering Lab', () => {
  describe('How I Build (AI-Augmented Engineering Workflow)', () => {
    const renderHowIBuild = () =>
      render(
        <BrowserRouter>
          <HowIBuildSection />
        </BrowserRouter>
      );

    it('renders the section title and core anchor philosophy', () => {
      renderHowIBuild();
      expect(screen.getByRole('heading', { name: 'How I Build' })).toBeInTheDocument();
      expect(
        screen.getByText(/AI accelerates the workflow\. Engineering judgment owns the result\./i)
      ).toBeInTheDocument();
    });

    it('renders all 9 lifecycle stages', () => {
      renderHowIBuild();
      const expectedStages = [
        'QUESTION',
        'RESEARCH',
        'VISUALISE',
        'ARCHITECT',
        'IMPLEMENT',
        'DEBUG / REVIEW',
        'TEST / REFINE',
        'MODEL / DEMO',
        'SHIP',
      ];

      expectedStages.forEach((stage) => {
        const matches = screen.getAllByText(new RegExp(stage, 'i'));
        expect(matches.length).toBeGreaterThan(0);
      });
    });

    it('allows interactive workflow navigation between stages', () => {
      renderHowIBuild();
      const researchButtons = screen.getAllByRole('button', { name: /RESEARCH/i });
      expect(researchButtons.length).toBeGreaterThan(0);
      fireEvent.click(researchButtons[0]!);

      expect(
        screen.getByText(/Understand domain context and evidence\./i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Empirical benchmarking, literature vetting, and data feasibility\./i)
      ).toBeInTheDocument();
    });
  });

  describe('Engineering Lab (Technical Archive & Open Source)', () => {
    const renderLab = () =>
      render(
        <BrowserRouter>
          <LabSection />
        </BrowserRouter>
      );

    it('renders all five lab projects in default ALL state', () => {
      renderLab();
      expect(screen.getByRole('heading', { name: 'Engineering Lab' })).toBeInTheDocument();
      expect(screen.getByText('GridCast AI')).toBeInTheDocument();
      expect(screen.getByText('AI CyberShield')).toBeInTheDocument();
      expect(screen.getByText('TriviaPay')).toBeInTheDocument();
      expect(screen.getByText('F1 Race Replay')).toBeInTheDocument();
      expect(screen.getByText('AgenticOS')).toBeInTheDocument();
    });

    it('verifies verified live and repository links for GridCast and CyberShield', () => {
      renderLab();
      const gridCastLive = screen.getByRole('link', { name: /View live application for GridCast AI/i });
      expect(gridCastLive).toHaveAttribute('href', 'https://gridcastai.streamlit.app');

      const cyberShieldLive = screen.getByRole('link', { name: /View live application for AI CyberShield/i });
      expect(cyberShieldLive).toHaveAttribute('href', 'https://ai-cybershield-zkw3.onrender.com');

      const cyberShieldRepo = screen.getByRole('link', { name: /View GitHub repository for AI CyberShield/i });
      expect(cyberShieldRepo).toHaveAttribute('href', 'https://github.com/SwastikPandey1024/AI-CyberShield');

      const triviaPayRepo = screen.getByRole('link', { name: /View GitHub repository for TriviaPay/i });
      expect(triviaPayRepo).toHaveAttribute('href', 'https://github.com/SwastikPandey1024/TriviaPay_Project');

      // F1 Race Replay and AgenticOS should have Profile / Archive badges and no generic profile repo link
      const archiveBadges = screen.getAllByText('Profile / Archive');
      expect(archiveBadges.length).toBe(2);
      expect(screen.queryByRole('link', { name: /View GitHub repository for F1 Race Replay/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /View GitHub repository for AgenticOS/i })).not.toBeInTheDocument();
    });

    it('filters projects interactively when selecting category buttons', async () => {
      renderLab();
      const securityFilter = screen.getByRole('button', { name: /^SECURITY$/i });
      expect(securityFilter).toHaveAttribute('aria-pressed', 'false');

      fireEvent.click(securityFilter);
      expect(securityFilter).toHaveAttribute('aria-pressed', 'true');

      // AI CyberShield should remain visible
      expect(screen.getByText('AI CyberShield')).toBeInTheDocument();
      // GridCast and TriviaPay should be filtered out
      await waitFor(() => {
        expect(screen.queryByText('GridCast AI')).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.queryByText('TriviaPay')).not.toBeInTheDocument();
      });

      // Reset to ALL
      const allFilter = screen.getByRole('button', { name: /^ALL$/i });
      fireEvent.click(allFilter);
      await waitFor(() => {
        expect(screen.getByText('GridCast AI')).toBeInTheDocument();
        expect(screen.getByText('TriviaPay')).toBeInTheDocument();
      });
    });
  });
});
