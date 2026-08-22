import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ContactForm } from '@/components/contact/ContactForm';
import { SITE_CONFIG } from '@/lib/constants';
import { Mail, Github, Linkedin, ArrowUpRight, MessageSquareCode } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 border-b border-border/60">
      <PageContainer size="wide">
        {/* Section Header */}
        <div className="mb-12">
          <SectionHeader
            tag="06 / CONTACT"
            tagVariant="cyan"
            title="Let's Build Something Useful"
            description="Have an interesting problem, AI experiment, collaboration idea, or engineering opportunity? Drop a direct note or connect via verified developer profiles."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact & Context */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
            <div className="surface-card p-6 sm:p-8 border border-border/80 bg-surface/70 shadow-surface-elevated">
              <span className="font-mono text-xs uppercase tracking-wider text-semantic-cyan font-semibold block mb-2">
                DIRECT CHANNELS
              </span>
              <h3 className="font-display text-2xl font-bold text-content-primary">
                Open for High-Leverage AI & Systems Engineering
              </h3>
              <p className="font-body text-xs sm:text-sm text-content-muted mt-3 leading-relaxed">
                I am particularly interested in full-stack AI applications, time-series forecasting, retrieval-augmented reasoning systems, and native AI software architectures.
              </p>

              {/* Direct Links List */}
              <div className="space-y-3 mt-6 pt-6 border-t border-border/60">
                {/* Primary Authoritative Email */}
                <a
                  href={`mailto:${SITE_CONFIG.primaryEmail}`}
                  className="p-3 rounded-lg bg-surface border border-border hover:border-semantic-cyan/60 transition-all flex items-center justify-between group"
                  aria-label={`Send direct email to primary address ${SITE_CONFIG.primaryEmail}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-semantic-cyan-dim text-semantic-cyan flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-content-subtle uppercase block">Primary Email</span>
                        <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-semantic-cyan/15 text-semantic-cyan font-semibold">MAIN</span>
                      </div>
                      <span className="font-mono text-xs text-content-primary font-semibold group-hover:text-semantic-cyan transition-colors">
                        {SITE_CONFIG.primaryEmail}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-content-subtle group-hover:text-semantic-cyan transition-colors" />
                </a>

                {/* Secondary Alternate Email */}
                <a
                  href={`mailto:${SITE_CONFIG.secondaryEmail}`}
                  className="p-3 rounded-lg bg-surface border border-border hover:border-semantic-cyan/60 transition-all flex items-center justify-between group"
                  aria-label={`Send direct email to alternate address ${SITE_CONFIG.secondaryEmail}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-raised text-content-muted flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-content-subtle uppercase block">Alternate Email</span>
                      <span className="font-mono text-xs text-content-primary font-semibold group-hover:text-semantic-cyan transition-colors">
                        {SITE_CONFIG.secondaryEmail}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-content-subtle group-hover:text-semantic-cyan transition-colors" />
                </a>

                {/* Verified GitHub Profile */}
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-surface border border-border hover:border-semantic-cyan/60 transition-all flex items-center justify-between group"
                  aria-label="View verified GitHub profile"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-semantic-cyan-dim text-semantic-cyan flex items-center justify-center">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-content-subtle uppercase block">Open Source / Code</span>
                      <span className="font-mono text-xs text-content-primary font-semibold group-hover:text-semantic-cyan transition-colors">
                        github.com/SwastikPandey1024
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-content-subtle group-hover:text-semantic-cyan transition-colors" />
                </a>

                {/* Verified LinkedIn Profile */}
                <a
                  href={SITE_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-surface border border-border hover:border-semantic-cyan/60 transition-all flex items-center justify-between group"
                  aria-label="View verified LinkedIn profile"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-semantic-cyan-dim text-semantic-cyan flex items-center justify-center">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-content-subtle uppercase block">Professional Network</span>
                      <span className="font-mono text-xs text-content-primary font-semibold group-hover:text-semantic-cyan transition-colors">
                        linkedin.com/in/swastik-pandey-a02719297
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-content-subtle group-hover:text-semantic-cyan transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="p-4 rounded-lg bg-surface-raised border border-border/80 flex items-center justify-between text-xs font-mono text-content-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-semantic-emerald animate-pulse" />
                Availability: Available for select projects & internships
              </span>
              <MessageSquareCode className="w-4 h-4 text-content-subtle" />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
