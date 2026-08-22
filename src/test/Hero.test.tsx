import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HeroSection } from '@/components/hero/HeroSection';
import { AISignalField } from '@/components/hero/AISignalField';

describe('Hero Section Component', () => {
  const renderHero = () =>
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

  it('renders the primary name heading with tight typography', () => {
    renderHero();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/SWASTIK/i);
    expect(heading).toHaveTextContent(/PANDEY/i);
  });

  it('renders the technical telemetry metadata badge and location', () => {
    renderHero();
    expect(
      screen.getByText(/ENGINEERING · DATA · INTELLIGENCE · IMPACT/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/INDIA \/ UTC\+05:30/i)).toBeInTheDocument();
  });

  it('renders the core manifesto statement without quotes and supporting line', () => {
    renderHero();
    expect(
      screen.getByText(
        /I build intelligent systems that turn AI capabilities into useful products across real-world domains\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /From problem framing to deployed intelligence — I build the systems in between\./i
      )
    ).toBeInTheDocument();
  });

  it('renders the primary CTA and secondary action links', () => {
    renderHero();
    const viewSystemsBtn = screen.getByRole('button', { name: /View Systems/i });
    expect(viewSystemsBtn).toBeInTheDocument();

    const howIBuildBtn = screen.getByRole('button', { name: /How I Build/i });
    expect(howIBuildBtn).toBeInTheDocument();

    const githubLink = screen.getByLabelText(/GitHub Profile/i);
    expect(githubLink).toBeInTheDocument();

    const linkedinLink = screen.getByLabelText(/LinkedIn Profile/i);
    expect(linkedinLink).toBeInTheDocument();
  });

  it('renders the editorial portrait with high priority loading attributes', () => {
    renderHero();
    const img = screen.getByAltText(/Swastik Pandey — AI Engineer & Software Builder/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });

  it('renders the AISignalField without crashing', () => {
    const { container } = render(<AISignalField />);
    expect(container).toBeInTheDocument();
  });
});
