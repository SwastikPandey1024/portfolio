import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-mono font-medium rounded-md transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

    const variants = {
      primary:
        'bg-semantic-indigo hover:bg-semantic-indigo/90 text-white shadow-sm hover:shadow-glow-indigo border border-semantic-indigo/50',
      secondary:
        'bg-surface-raised hover:bg-surface-overlay text-content-primary border border-border hover:border-semantic-cyan/40',
      outline:
        'bg-transparent hover:bg-surface/50 text-content-primary border border-border hover:border-content-muted',
      ghost: 'bg-transparent hover:bg-surface-raised/60 text-content-muted hover:text-content-primary',
      link: 'bg-transparent text-semantic-cyan hover:underline p-0 h-auto font-body',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-3 gap-2.5 h-12',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
