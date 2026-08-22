import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Terminal } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { HeroPortrait } from '@/components/hero/HeroPortrait';
import { SITE_CONFIG } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const HeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Mathematical Framer Motion Timing Presets (Master Prompt §8 / §22)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-10 pb-16 overflow-hidden border-b border-border/60 bg-radial-gradient">
      {/* Background Subtle Grid Texture Layer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <PageContainer size="wide" className="relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Technical Metadata, Name, Role, Manifesto, CTAs */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Small Technical Telemetry Metadata */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-raised/80 border border-border text-xs font-mono text-content-muted">
                <span className="w-2 h-2 rounded-full bg-semantic-cyan animate-pulse" />
                <span>ENGINEERING · DATA · INTELLIGENCE · IMPACT</span>
              </div>
              <span className="font-mono text-xs text-content-subtle hidden sm:inline-block">
                {SITE_CONFIG.location}
              </span>
            </motion.div>

            {/* Large Name */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-content-primary leading-[1.02]">
                SWASTIK <br />
                <span className="text-content-muted hover:text-content-primary transition-colors">
                  PANDEY
                </span>
              </h1>
            </motion.div>

            {/* Role / Positioning */}
            <motion.div variants={itemVariants} className="mt-3.5">
              <p className="font-mono text-xs sm:text-sm text-semantic-cyan font-medium flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>AI Engineer · ML Systems · Generative AI · Software</span>
              </p>
            </motion.div>

            {/* Manifesto Statement without Quotes */}
            <motion.div variants={itemVariants} className="mt-5 max-w-2xl">
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-content-primary leading-snug tracking-tight">
                I build intelligent systems that turn AI capabilities into useful products across real-world domains.
              </p>
              <p className="font-body text-sm sm:text-base text-content-muted mt-3.5 leading-relaxed max-w-xl">
                From problem framing to deployed intelligence — I build the systems in between.
              </p>
            </motion.div>

            {/* CTA Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 mt-7 pt-2"
            >
              <a href="#work">
                <Button variant="primary" size="lg" className="shadow-glow-indigo">
                  View Systems <ArrowDown className="w-4 h-4 ml-1" />
                </Button>
              </a>

              <a href="#build">
                <Button variant="secondary" size="lg">
                  How I Build
                </Button>
              </a>

              <div className="flex items-center gap-2 pl-1 sm:pl-2">
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-lg border border-border/80 bg-surface/80 text-content-muted hover:text-content-primary hover:border-semantic-cyan/50 hover:bg-surface-raised transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-lg border border-border/80 bg-surface/80 text-content-muted hover:text-content-primary hover:border-semantic-cyan/50 hover:bg-surface-raised transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Natural Portrait & AI Signal Field */}
          <motion.div
            className="lg:col-span-5 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPortrait />
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
};
