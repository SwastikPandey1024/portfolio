import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MeliGuideProvider } from '@/context/MeliGuideContext';
import { useMeliGuide } from '@/hooks/useMeliGuide';
import { MeliGuideWidget } from '@/components/meli/MeliGuideWidget';
import { MeliSprite } from '@/components/meli/MeliSprite';
import { SECTION_GUIDANCE_MAP } from '@/data/meliGuide';

// Test consumer to inspect and trigger state changes
const TestGuideConsumer: React.FC = () => {
  const {
    guideEnabled,
    guideExpanded,
    guideMuted,
    isFirstVisitPrompt,
    activeSectionId,
    currentGuidance,
    spriteState,
    openGuide,
    closeGuide,
    enableGuide,
    disableGuide,
    toggleMute,
    setActiveSectionId,
  } = useMeliGuide();

  return (
    <div>
      <div data-testid="guide-enabled">{String(guideEnabled)}</div>
      <div data-testid="guide-expanded">{String(guideExpanded)}</div>
      <div data-testid="guide-muted">{String(guideMuted)}</div>
      <div data-testid="first-visit-prompt">{String(isFirstVisitPrompt)}</div>
      <div data-testid="active-section">{activeSectionId}</div>
      <div data-testid="sprite-state">{spriteState}</div>
      <div data-testid="guidance-message">{currentGuidance?.message}</div>

      <button onClick={openGuide}>Open Guide</button>
      <button onClick={closeGuide}>Close Guide</button>
      <button onClick={enableGuide}>Enable Guide</button>
      <button onClick={disableGuide}>Disable Guide</button>
      <button onClick={toggleMute}>Toggle Mute</button>
      <button onClick={() => setActiveSectionId('salespulse')}>Go to SalesPulse</button>
      <button onClick={() => setActiveSectionId('docuchat')}>Go to DocuChat</button>
      <button onClick={() => setActiveSectionId('meli')}>Go to Meli</button>
      <button onClick={() => setActiveSectionId('medvision')}>Go to MedVision</button>
      <button onClick={() => setActiveSectionId('build')}>Go to How I Build</button>
      <button onClick={() => setActiveSectionId('contact')}>Go to Contact</button>
    </div>
  );
};

describe('Phase 6 & 7.1: Meli as Optional Portfolio Guide', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useRealTimers();
  });

  it('renders MeliSprite with explicit asset map starting at WebP', () => {
    render(<MeliSprite state="greeting" size="md" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/assets/projects/meli/greeting.webp');
    expect(img).toHaveAttribute('alt', 'Meli AI Companion (greeting state)');
  });

  it('falls back through multi-tier fallback (PNG -> idle.webp -> idle.png) on image load error', () => {
    render(<MeliSprite state="curious" size="sm" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/assets/projects/meli/curious.webp');

    // 1. Error on webp -> fallback to curious.png
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/assets/projects/meli/curious.png');

    // 2. Error on png -> fallback to idle.webp
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/assets/projects/meli/idle.webp');

    // 3. Error on idle.webp -> fallback to idle.png
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/assets/projects/meli/idle.png');
  });

  it('shows first-visit prompt after initial timer when sessionStorage is empty', async () => {
    vi.useFakeTimers();

    render(
      <MeliGuideProvider>
        <TestGuideConsumer />
        <MeliGuideWidget />
      </MeliGuideProvider>
    );

    expect(screen.getByTestId('first-visit-prompt')).toHaveTextContent('false');

    // Advance timer past 1200ms
    act(() => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.getByTestId('first-visit-prompt')).toHaveTextContent('true');
    expect(screen.getByText("Hi. I'm Meli.")).toBeInTheDocument();
    expect(screen.getByText('Want a quick tour?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /GUIDE ME/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /EXPLORE FREELY/i })).toBeInTheDocument();
  });

  it('enables guidance and expands card when GUIDE ME is clicked', async () => {
    vi.useFakeTimers();

    render(
      <MeliGuideProvider>
        <TestGuideConsumer />
        <MeliGuideWidget />
      </MeliGuideProvider>
    );

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    const guideMeBtn = screen.getByRole('button', { name: /GUIDE ME/i });
    act(() => {
      fireEvent.click(guideMeBtn);
    });

    expect(screen.getByTestId('guide-enabled')).toHaveTextContent('true');
    expect(screen.getByTestId('guide-expanded')).toHaveTextContent('true');
    expect(sessionStorage.getItem('meliGuideEnabled')).toBe('true');
    expect(sessionStorage.getItem('meliGuideSeen')).toBe('true');
  });

  it('dismisses guide and stays disabled when EXPLORE FREELY is clicked', async () => {
    vi.useFakeTimers();

    render(
      <MeliGuideProvider>
        <TestGuideConsumer />
        <MeliGuideWidget />
      </MeliGuideProvider>
    );

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    const exploreBtn = screen.getByRole('button', { name: /EXPLORE FREELY/i });
    act(() => {
      fireEvent.click(exploreBtn);
    });

    expect(screen.getByTestId('guide-enabled')).toHaveTextContent('false');
    expect(screen.getByTestId('guide-expanded')).toHaveTextContent('false');
    expect(sessionStorage.getItem('meliGuideEnabled')).toBe('false');
  });

  it('expands contextual card and renders sprite when minimized pill is clicked', () => {
    sessionStorage.setItem('meliGuideSeen', 'true');
    sessionStorage.setItem('meliGuideEnabled', 'true');

    render(
      <MeliGuideProvider>
        <TestGuideConsumer />
        <MeliGuideWidget />
      </MeliGuideProvider>
    );

    // Initial state from persisted session is enabled and expanded
    expect(screen.getByTestId('guide-enabled')).toHaveTextContent('true');
    expect(screen.getByTestId('guide-expanded')).toHaveTextContent('true');

    // Close the guide using the close button
    const closeBtn = screen.getByRole('button', { name: /Close Meli guide/i });
    fireEvent.click(closeBtn);

    expect(screen.getByTestId('guide-expanded')).toHaveTextContent('false');

    // Minimized pill is visible
    const togglePill = screen.getByRole('button', { name: /Meli Guide is minimized/i });
    expect(togglePill).toBeInTheDocument();

    // Click minimized pill to expand
    fireEvent.click(togglePill);

    expect(screen.getByTestId('guide-expanded')).toHaveTextContent('true');
    expect(screen.getByRole('region', { name: /Contextual Guide Note/i })).toBeInTheDocument();

    // Character sprite is visible inside expanded card
    const sprites = screen.getAllByRole('img', { name: /Meli AI Companion/i });
    expect(sprites.length).toBeGreaterThanOrEqual(1);
  });

  it('updates contextual message and character sprite across section transitions', async () => {
    render(
      <MeliGuideProvider>
        <TestGuideConsumer />
        <MeliGuideWidget />
      </MeliGuideProvider>
    );

    // Manually enable guide
    fireEvent.click(screen.getByRole('button', { name: 'Enable Guide' }));

    // Verify SalesPulse transition
    fireEvent.click(screen.getByRole('button', { name: 'Go to SalesPulse' }));
    expect(screen.getByTestId('active-section')).toHaveTextContent('salespulse');
    expect(screen.getByTestId('sprite-state')).toHaveTextContent('curious');
    expect(screen.getByTestId('guidance-message')).toHaveTextContent(
      SECTION_GUIDANCE_MAP.salespulse?.message || ''
    );

    // Verify DocuChat transition
    fireEvent.click(screen.getByRole('button', { name: 'Go to DocuChat' }));
    expect(screen.getByTestId('sprite-state')).toHaveTextContent('thinking');
    expect(screen.getByTestId('guidance-message')).toHaveTextContent(
      SECTION_GUIDANCE_MAP.docuchat?.message || ''
    );

    // Verify Meli project transition
    fireEvent.click(screen.getByRole('button', { name: 'Go to Meli' }));
    expect(screen.getByTestId('sprite-state')).toHaveTextContent('happy');
    expect(screen.getByTestId('guidance-message')).toHaveTextContent(
      SECTION_GUIDANCE_MAP.meli?.message || ''
    );

    // Verify MedVision transition
    fireEvent.click(screen.getByRole('button', { name: 'Go to MedVision' }));
    expect(screen.getByTestId('sprite-state')).toHaveTextContent('focused');

    // Verify Contact transition
    fireEvent.click(screen.getByRole('button', { name: 'Go to Contact' }));
    expect(screen.getByTestId('sprite-state')).toHaveTextContent('celebration');
    expect(screen.getByTestId('guidance-message')).toHaveTextContent(
      SECTION_GUIDANCE_MAP.contact?.message || ''
    );
  });

  it('supports muting and unmuting guide notifications with session persistence', () => {
    render(
      <MeliGuideProvider>
        <TestGuideConsumer />
        <MeliGuideWidget />
      </MeliGuideProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Toggle Mute' }));
    expect(screen.getByTestId('guide-muted')).toHaveTextContent('true');
    expect(sessionStorage.getItem('meliGuideMuted')).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: 'Toggle Mute' }));
    expect(screen.getByTestId('guide-muted')).toHaveTextContent('false');
    expect(sessionStorage.getItem('meliGuideMuted')).toBe('false');
  });

  it('dismisses guide prompt on Escape key press', () => {
    vi.useFakeTimers();

    render(
      <MeliGuideProvider>
        <TestGuideConsumer />
        <MeliGuideWidget />
      </MeliGuideProvider>
    );

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.getByTestId('first-visit-prompt')).toHaveTextContent('true');

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(screen.getByTestId('first-visit-prompt')).toHaveTextContent('false');
  });
});
