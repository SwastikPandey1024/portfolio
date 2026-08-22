import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  spacing?: 'compact' | 'default' | 'spacious';
}

export const Section: React.FC<SectionProps> = ({
  id,
  className,
  spacing = 'default',
  children,
  ...props
}) => {
  const spacings = {
    compact: 'py-12 md:py-16',
    default: 'py-16 md:py-24',
    spacious: 'py-24 md:py-32',
  };

  return (
    <section
      id={id}
      className={cn('relative w-full overflow-hidden', spacings[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
};
