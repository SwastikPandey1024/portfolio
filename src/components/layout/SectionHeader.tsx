import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  tag?: string;
  tagVariant?: 'neutral' | 'cyan' | 'indigo' | 'emerald' | 'violet';
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  className,
  tag,
  tagVariant = 'neutral',
  title,
  description,
  align = 'left',
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col mb-12',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
      {...props}
    >
      {tag && (
        <Badge variant={tagVariant} className="mb-3">
          {tag}
        </Badge>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-content-primary">
        {title}
      </h2>
      {description && (
        <p className="font-body text-base text-content-muted mt-3 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
