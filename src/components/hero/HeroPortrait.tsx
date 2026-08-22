import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AISignalField } from '@/components/hero/AISignalField';

export const HeroPortrait: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Restrained micro-parallax: max 6px shift
      const x = ((e.clientX / innerWidth) - 0.5) * 8;
      const y = ((e.clientY / innerHeight) - 0.5) * 8;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] mx-auto aspect-[4/5] flex items-center justify-center">
      {/* Ambient Radial Backlight Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.18)_0%,rgba(6,182,212,0.12)_45%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Background Three.js AI Signal Field Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AISignalField />
      </div>

      {/* Editorial Portrait Container with Responsive Mobile Scale & Natural Edge Mask */}
      <div
        className="relative z-10 w-[72%] sm:w-[84%] lg:w-[88%] aspect-[4/5] overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%, black 60%, transparent 100%)',
        }}
      >
        <picture>
          <source srcSet="/assets/brand/swastik-profile.webp" type="image/webp" />
          <source srcSet="/assets/brand/swastik-profile1.png" type="image/png" />
          <img
            src="/assets/brand/swastik-profile.png"
            alt="Swastik Pandey — AI Engineer & Software Builder"
            width={800}
            height={1000}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover grayscale contrast-[1.12] brightness-[0.98] hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </picture>

        {/* Seamless Lower Shadow Blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Minimal Editorial Telemetry Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-canvas/70 backdrop-blur-md border border-border/60 text-[9px] sm:text-[10px] font-mono text-content-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-semantic-cyan animate-pulse" />
            <span>AI / ML / SYSTEMS</span>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] text-content-subtle bg-canvas/50 px-1.5 py-0.5 rounded border border-border/30">
            UTC+05:30
          </span>
        </div>
      </div>
    </div>
  );
};
