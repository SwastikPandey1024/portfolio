import { describe, it, expect } from 'vitest';
import { MOTION_TIMING, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

describe('Motion and Utilities Foundation', () => {
  it('conforms to Constitution motion timings', () => {
    expect(MOTION_TIMING.micro).toBe(0.2); // 200ms
    expect(MOTION_TIMING.component).toBe(0.4); // 400ms
    expect(MOTION_TIMING.section).toBe(0.7); // 700ms
  });

  it('defines valid fadeUp variants', () => {
    expect(fadeUpVariants.hidden).toBeDefined();
    expect(fadeUpVariants.visible).toBeDefined();
  });

  it('merges Tailwind classes correctly with conflict resolution', () => {
    const merged = cn('p-4 text-content-primary', 'p-6', { 'bg-canvas': true, 'bg-surface': false });
    expect(merged).toContain('p-6');
    expect(merged).not.toContain('p-4');
    expect(merged).toContain('bg-canvas');
  });
});
