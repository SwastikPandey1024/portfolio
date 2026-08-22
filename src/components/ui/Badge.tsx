import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'cyan' | 'indigo' | 'emerald' | 'violet';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    neutral: 'bg-surface-raised/80 text-content-muted border-border',
    cyan: 'bg-semantic-cyan-dim text-semantic-cyan border-semantic-cyan/30',
    indigo: 'bg-semantic-indigo-dim text-indigo-300 border-semantic-indigo/30',
    emerald: 'bg-semantic-emerald-dim text-semantic-emerald border-semantic-emerald/30',
    violet: 'bg-semantic-violet-dim text-semantic-violet border-semantic-violet/30',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-medium rounded-full border transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
