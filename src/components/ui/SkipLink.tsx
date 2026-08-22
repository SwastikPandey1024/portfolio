import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-semantic-indigo focus:text-white focus:rounded focus:shadow-surface-elevated focus:font-mono focus:text-sm"
    >
      Skip to main content
    </a>
  );
};
