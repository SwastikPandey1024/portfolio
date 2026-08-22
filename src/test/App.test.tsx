import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('Portfolio Foundation App', () => {
  it('renders the main heading on homepage', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/SWASTIK/i);
    expect(heading).toHaveTextContent(/PANDEY/i);
  });

  it('renders the global navigation and brand logo with no ghost controls', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /Swastik Pandey Portfolio Home/i })).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: /Main Navigation/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getAllByText('WORK').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('LAB').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('ABOUT').length).toBeGreaterThanOrEqual(1);

    // Mobile menu trigger button is accessible
    const mobileMenuBtn = screen.getByRole('button', { name: /Open mobile navigation menu/i });
    expect(mobileMenuBtn).toBeInTheDocument();
  });

  it('renders the Selected Systems section header', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Selected Systems' })).toBeInTheDocument();
    expect(screen.getByText('01 / SYSTEMS')).toBeInTheDocument();
  });

  it('includes an accessible skip link', () => {
    render(<App />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});
