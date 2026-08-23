import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { SelectedSystemsSection } from '@/components/projects/SelectedSystemsSection';
import { ProjectNavigation } from '@/components/case-study/ProjectNavigation';

describe('Phase 3 Flagship Projects Showcase', () => {
  const renderSelectedSystems = () =>
    render(
      <BrowserRouter>
        <SelectedSystemsSection />
      </BrowserRouter>
    );

  it('renders all four flagship systems with their verified titles and numeric IDs', () => {
    renderSelectedSystems();
    expect(screen.getByText('SalesPulse AI')).toBeInTheDocument();
    expect(screen.getByText('DocuChat')).toBeInTheDocument();
    expect(screen.getByText('Meli AI Companion')).toBeInTheDocument();
    expect(screen.getByText('MedVision AI')).toBeInTheDocument();

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('renders the conceptual narrative for each flagship project', () => {
    renderSelectedSystems();
    expect(screen.getByText(/THE THESIS: "AI can predict."/i)).toBeInTheDocument();
    expect(screen.getByText(/THE THESIS: "AI can retrieve and reason."/i)).toBeInTheDocument();
    expect(screen.getByText(/THE THESIS: "AI can remember, reason, and act."/i)).toBeInTheDocument();
    expect(screen.getByText(/THE THESIS: "AI can interpret visual data."/i)).toBeInTheDocument();
  });

  it('verifies DocuChat naming compliance (no public DocMind headings)', () => {
    renderSelectedSystems();
    expect(screen.getByRole('heading', { name: 'DocuChat' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /DocMind/i })).not.toBeInTheDocument();
  });

  it('verifies MedVision educational research disclaimer is visible', () => {
    renderSelectedSystems();
    expect(
      screen.getByText(/AI Computer Vision Research & Educational Experiment/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Not certified as a clinical diagnostic medical device/i)
    ).toBeInTheDocument();
  });

  it('allows switching Meli character states interactively across the 16-state engine', () => {
    renderSelectedSystems();
    const thinkingTab = screen.getByRole('tab', { name: /^thinking$/i });
    expect(thinkingTab).toBeInTheDocument();

    fireEvent.click(thinkingTab);
    expect(screen.getByText(/04\. Thinking \(LLM Reasoning\)/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Deep dual-brain reasoning stream active across GPT-OSS 120B reasoning core/i)
    ).toBeInTheDocument();
  });

  it('renders verified repository and live links for flagship projects', () => {
    renderSelectedSystems();
    const repoLinks = screen.getAllByRole('link', { name: /Repository/i });
    expect(repoLinks.length).toBeGreaterThanOrEqual(4);

    const liveSalesPulseLink = screen.getByRole('link', { name: /Live Streamlit App/i });
    expect(liveSalesPulseLink).toHaveAttribute('href', 'https://salespulseai.streamlit.app');

    // Verify DocuChat repository URL specifically
    const docuChatArticle = screen.getByRole('article', { name: /DocuChat/i });
    const docuChatRepoLink = docuChatArticle.querySelector('a[href="https://github.com/SwastikPandey1024/DocMind"]');
    expect(docuChatRepoLink).toBeInTheDocument();
  });

  it('renders continuous adjacent case-study navigation', () => {
    render(
      <BrowserRouter>
        <ProjectNavigation currentProjectId="salespulse" />
      </BrowserRouter>
    );
    expect(screen.getByText('PREVIOUS SYSTEM')).toBeInTheDocument();
    expect(screen.getByText('MedVision AI')).toBeInTheDocument();
    expect(screen.getByText('NEXT SYSTEM')).toBeInTheDocument();
    expect(screen.getByText('DocuChat')).toBeInTheDocument();
  });
});
