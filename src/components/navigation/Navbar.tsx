import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { NAV_LINKS } from '@/data/navigation';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { MobileNav } from '@/components/navigation/MobileNav';
import { IconButton } from '@/components/ui/IconButton';
import { PageContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isScrolled } = useScrollProgress();
  const location = useLocation();

  const handleOpenMobile = useCallback(() => {
    setIsMobileOpen(true);
  }, []);

  const handleCloseMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'py-3 bg-canvas/85 backdrop-blur-md border-b border-border/80 shadow-surface-subtle'
            : 'py-5 bg-transparent'
        )}
      >
        <PageContainer size="wide">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-display font-bold text-base tracking-wider text-content-primary hover:text-semantic-cyan transition-colors focus-visible:outline-none"
              aria-label="Swastik Pandey Portfolio Home"
            >
              <span className="w-2 h-2 rounded-full bg-semantic-cyan animate-pulse" />
              <span>SWASTIK</span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-surface/80 border border-border/80 backdrop-blur-sm"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isAnchor = link.href.startsWith('/#');
                const isActive = !isAnchor && location.pathname === link.href;

                return isAnchor ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-mono text-xs font-medium px-3 py-1 rounded-full text-content-muted hover:text-content-primary hover:bg-surface-raised transition-all"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      'font-mono text-xs font-medium px-3 py-1 rounded-full transition-all',
                      isActive
                        ? 'text-semantic-cyan bg-semantic-cyan-dim border border-semantic-cyan/30 font-semibold'
                        : 'text-content-muted hover:text-content-primary hover:bg-surface-raised'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center">
              <IconButton
                aria-label="Open mobile navigation menu"
                onClick={handleOpenMobile}
                className="text-content-primary"
              >
                <Menu className="w-6 h-6" />
              </IconButton>
            </div>
          </div>
        </PageContainer>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={isMobileOpen} onClose={handleCloseMobile} />
    </>
  );
};
