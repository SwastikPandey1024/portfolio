import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '@/data/navigation';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef(location.pathname);

  // Close only on actual route change (navigation away)
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      prevPathnameRef.current = location.pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [location.pathname, isOpen, onClose]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 bg-canvas/95 backdrop-blur-lg flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 font-display font-bold text-lg tracking-wider text-content-primary focus-visible:outline-none"
        >
          <span className="w-2 h-2 rounded-full bg-semantic-cyan" />
          <span>SWASTIK</span>
        </Link>
        <IconButton
          aria-label="Close navigation menu"
          onClick={onClose}
          className="text-content-primary"
        >
          <X className="w-6 h-6" />
        </IconButton>
      </div>

      <nav className="flex flex-col gap-6 my-auto" aria-label="Mobile main navigation">
        {NAV_LINKS.map((link) => {
          const isAnchor = link.href.startsWith('/#');
          return isAnchor ? (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="font-display text-3xl font-semibold tracking-tight text-content-muted hover:text-semantic-cyan transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-5 h-5 text-content-subtle" />
            </a>
          ) : (
            <Link
              key={link.label}
              to={link.href}
              onClick={onClose}
              className={cn(
                'font-display text-3xl font-semibold tracking-tight transition-colors flex items-center justify-between',
                location.pathname === link.href
                  ? 'text-semantic-cyan'
                  : 'text-content-muted hover:text-content-primary'
              )}
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-5 h-5 text-content-subtle" />
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border pt-6 flex items-center justify-between">
        <span className="font-mono text-xs text-content-muted">
          AI Engineer · UTC+05:30
        </span>
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="text-content-muted hover:text-content-primary p-2 transition-colors rounded-md bg-surface border border-border"
            >
              {(item.name === 'GitHub' || item.name === 'Github') && <Github className="w-5 h-5" />}
              {(item.name === 'LinkedIn' || item.name === 'Linkedin') && <Linkedin className="w-5 h-5" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
