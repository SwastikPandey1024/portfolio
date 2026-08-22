import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Phase 7.1: Mobile Navigation Drawer Stability', () => {
  it('opens drawer on hamburger tap and remains open stably', () => {
    renderNavbar();

    const openBtn = screen.getByRole('button', { name: /Open mobile navigation menu/i });
    expect(openBtn).toBeInTheDocument();

    // Drawer should not be present initially
    expect(screen.queryByRole('dialog', { name: /Mobile Navigation Menu/i })).not.toBeInTheDocument();

    // Tap hamburger
    fireEvent.click(openBtn);

    // Drawer opens and remains open
    const drawer = screen.getByRole('dialog', { name: /Mobile Navigation Menu/i });
    expect(drawer).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /Mobile main navigation/i })).toBeInTheDocument();
  });

  it('closes drawer on explicit close button click', () => {
    renderNavbar();

    const openBtn = screen.getByRole('button', { name: /Open mobile navigation menu/i });
    fireEvent.click(openBtn);

    expect(screen.getByRole('dialog', { name: /Mobile Navigation Menu/i })).toBeInTheDocument();

    // Click close icon button
    const closeBtn = screen.getByRole('button', { name: /Close navigation menu/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog', { name: /Mobile Navigation Menu/i })).not.toBeInTheDocument();
  });

  it('closes drawer on Escape key press', () => {
    renderNavbar();

    const openBtn = screen.getByRole('button', { name: /Open mobile navigation menu/i });
    fireEvent.click(openBtn);

    expect(screen.getByRole('dialog', { name: /Mobile Navigation Menu/i })).toBeInTheDocument();

    // Dispatch Escape key
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: /Mobile Navigation Menu/i })).not.toBeInTheDocument();
  });

  it('closes drawer when tapping a navigation link', () => {
    renderNavbar();

    const openBtn = screen.getByRole('button', { name: /Open mobile navigation menu/i });
    fireEvent.click(openBtn);

    const drawer = screen.getByRole('dialog', { name: /Mobile Navigation Menu/i });
    expect(drawer).toBeInTheDocument();

    const workLinks = screen.getAllByRole('link', { name: /WORK/i });
    const mobileWorkLink = workLinks[workLinks.length - 1];
    expect(mobileWorkLink).toBeDefined();
    if (mobileWorkLink) {
      fireEvent.click(mobileWorkLink);
    }

    expect(screen.queryByRole('dialog', { name: /Mobile Navigation Menu/i })).not.toBeInTheDocument();
  });
});
