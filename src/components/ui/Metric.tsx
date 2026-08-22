import React from 'react';
import { cn } from '@/lib/utils';

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  context?: string;
  highlightColor?: 'cyan' | 'indigo' | 'emerald' | 'violet';
}

export const Metric: React.FC<MetricProps> = ({
  className,
  value,
  label,
  context,
  highlightColor,
  ...props
}) => {
  const colorMap = {
    cyan: 'text-semantic-cyan',
    indigo: 'text-indigo-400',
    emerald: 'text-semantic-emerald',
    violet: 'text-semantic-violet',
  };

  return (
    <div
      className={cn('flex flex-col p-4 rounded-lg bg-surface/80 border border-border', className)}
      {...props}
    >
      <span
        className={cn(
          'font-mono text-2xl lg:text-3xl font-semibold tracking-tight',
          highlightColor ? colorMap[highlightColor] : 'text-content-primary'
        )}
      >
        {value}
      </span>
      <span className="font-body text-sm font-medium text-content-primary mt-1">
        {label}
      </span>
      {context && (
        <span className="font-body text-xs text-content-muted mt-0.5">
          {context}
        </span>
      )}
    </div>
  );
};
