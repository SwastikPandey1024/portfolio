import React from 'react';
import { cn } from '@/lib/utils';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'ghost' | 'secondary';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'md', variant = 'ghost', children, ...props }, ref) => {
    const sizes = {
      sm: 'w-8 h-8 p-1.5',
      md: 'w-10 h-10 p-2',
      lg: 'w-12 h-12 p-3',
    };

    const variants = {
      outline: 'border border-border bg-surface hover:border-content-muted text-content-muted hover:text-content-primary',
      ghost: 'bg-transparent hover:bg-surface-raised text-content-muted hover:text-content-primary',
      secondary: 'bg-surface-raised border border-border text-content-primary hover:border-semantic-cyan/40',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md transition-all duration-200 focus-visible:outline-none cursor-pointer',
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
