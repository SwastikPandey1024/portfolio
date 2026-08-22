import React from 'react';
import type { LabFilterCategory } from '@/types/project';
import { cn } from '@/lib/utils';

export interface LabFilterBarProps {
  activeFilter: LabFilterCategory;
  onSelectFilter: (filter: LabFilterCategory) => void;
  className?: string;
}

const FILTER_CATEGORIES: LabFilterCategory[] = [
  'ALL',
  'ML',
  'GENAI',
  'SECURITY',
  'FINTECH',
  'OPEN SOURCE',
  'AGENTIC AI',
];

export const LabFilterBar: React.FC<LabFilterBarProps> = ({
  activeFilter,
  onSelectFilter,
  className,
}) => {
  return (
    <div
      role="toolbar"
      aria-label="Filter engineering lab projects by category"
      className={cn('flex flex-wrap items-center gap-1.5 sm:gap-2', className)}
    >
      {FILTER_CATEGORIES.map((category) => {
        const isSelected = activeFilter === category;

        return (
          <button
            key={category}
            type="button"
            role="button"
            aria-pressed={isSelected}
            onClick={() => onSelectFilter(category)}
            className={cn(
              'font-mono text-xs px-3 py-1.5 rounded-md border transition-all cursor-pointer select-none',
              isSelected
                ? 'bg-semantic-indigo text-white border-semantic-indigo shadow-glow-indigo font-semibold'
                : 'bg-surface text-content-muted border-border hover:border-content-muted hover:text-content-primary'
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
