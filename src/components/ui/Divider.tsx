import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  ...props
}) => {
  return (
    <hr
      className={cn(
        'border-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full my-8' : 'w-px h-full mx-4 inline-block',
        className
      )}
      {...props}
    />
  );
};
