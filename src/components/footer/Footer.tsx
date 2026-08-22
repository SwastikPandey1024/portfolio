import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { SOCIAL_LINKS, NAV_LINKS } from '@/data/navigation';
import { SITE_CONFIG } from '@/lib/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-canvas-subtle py-12 mt-20">
      <PageContainer size="wide">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col">
            <Link
              to="/"
              className="font-display font-bold text-lg tracking-wider text-content-primary hover:text-semantic-cyan transition-colors"
            >
              SWASTIK<span className="text-semantic-cyan">.AI</span>
            </Link>
            <p className="font-body text-xs text-content-muted mt-1 max-w-sm">
              {SITE_CONFIG.role} · {SITE_CONFIG.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            {NAV_LINKS.map((link) => {
              const isAnchor = link.href.startsWith('/#');
              return isAnchor ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs text-content-muted hover:text-content-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-mono text-xs text-content-muted hover:text-content-primary transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-content-muted hover:text-semantic-cyan transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-content-subtle gap-4">
          <p>© {currentYear} Swastik Pandey. Engineered with React, TypeScript & Tailwind.</p>
          <p className="text-content-muted">Dark Intelligent Editorial System</p>
        </div>
      </PageContainer>
    </footer>
  );
};
