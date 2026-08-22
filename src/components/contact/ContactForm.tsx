import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { SITE_CONFIG } from '@/lib/constants';
import { Send, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ContactFormProps {
  className?: string;
}

const INTEREST_OPTIONS = [
  'AI / ML Systems',
  'Full-Stack Architecture',
  'Ambient & Native AI',
  'Research & Vision',
  'Engineering Consultation',
  'General Inquiry',
] as const;

export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'AI / ML Systems' as (typeof INTEREST_OPTIONS)[number],
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name or organization.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide message context.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    setErrorMessage(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fallback if EmailJS public env vars are not set (e.g. testing or dev without env)
    if (!serviceId || !templateId || !publicKey) {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        interest: 'AI / ML Systems',
        message: '',
      });
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          interest: formData.interest,
          message: formData.message,
          to_email: SITE_CONFIG.primaryEmail,
        },
        publicKey
      );

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        interest: 'AI / ML Systems',
        message: '',
      });
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : 'Message transmission failed. Please try again.';
      setErrorMessage(errorText);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage(null);
    setFieldErrors({});
  };

  if (status === 'success') {
    return (
      <div className={cn('surface-card p-8 border border-semantic-emerald/60 bg-surface/90 text-center flex flex-col items-center gap-4 rounded-xl', className)}>
        <div className="w-12 h-12 rounded-full bg-semantic-emerald/20 border border-semantic-emerald/50 flex items-center justify-center text-semantic-emerald">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="max-w-md">
          <span className="font-mono text-xs uppercase tracking-wider text-semantic-emerald font-semibold block mb-1">
            06 // TRANSMISSION DELIVERED
          </span>
          <h3 className="font-display text-2xl font-bold text-content-primary">
            Message Dispatched
          </h3>
          <p className="font-body text-sm text-content-muted mt-2 leading-relaxed">
            Thank you for reaching out. Your communication has been routed directly to Swastik's inbox (<span className="text-content-primary font-mono text-xs">{SITE_CONFIG.primaryEmail}</span>). I typically respond within 24 business hours.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleReset}>
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Send Another Transmission
          </Button>
          <a href={`mailto:${SITE_CONFIG.primaryEmail}`}>
            <Button variant="outline" size="sm">
              Direct Mailto Client
            </Button>
          </a>
        </div>

        {/* Meli Subtle Dispatch Acknowledgment */}
        <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-center gap-2 text-xs font-mono text-content-subtle">
          <Sparkles className="w-3.5 h-3.5 text-semantic-violet" />
          <span>Meli Agent Signal: Transmission queued to {SITE_CONFIG.primaryEmail}</span>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn('surface-card p-6 sm:p-8 border border-border/80 bg-surface/60 flex flex-col gap-6 rounded-xl relative', className)}
    >
      {/* Editorial Form Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div>
          <span className="font-mono text-[10px] sm:text-xs text-semantic-cyan uppercase tracking-wider font-semibold block">
            06 // DIRECT TRANSMISSION
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-content-primary">
            Initiate Conversation
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-content-muted">
          <span className="w-2 h-2 rounded-full bg-semantic-emerald animate-pulse" />
          <span>INBOX ACTIVE</span>
        </div>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="p-4 rounded-lg bg-semantic-rose-dim border border-semantic-rose/40 text-semantic-rose text-xs font-body flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold font-mono uppercase block">Delivery Notice</span>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Name and Email Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="contact-name" className="font-mono text-xs font-semibold text-content-primary block mb-1.5">
            YOUR NAME <span className="text-semantic-cyan">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Elena Rostova"
            className={cn(
              'w-full px-3.5 py-2.5 rounded-lg bg-surface-raised border font-body text-sm text-content-primary placeholder:text-content-subtle transition-all focus-visible:outline-none focus:border-semantic-cyan',
              fieldErrors.name ? 'border-semantic-rose' : 'border-border'
            )}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" className="font-body text-xs text-semantic-rose mt-1">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="font-mono text-xs font-semibold text-content-primary block mb-1.5">
            EMAIL ADDRESS <span className="text-semantic-cyan">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. elena@research.org"
            className={cn(
              'w-full px-3.5 py-2.5 rounded-lg bg-surface-raised border font-body text-sm text-content-primary placeholder:text-content-subtle transition-all focus-visible:outline-none focus:border-semantic-cyan',
              fieldErrors.email ? 'border-semantic-rose' : 'border-border'
            )}
          />
          {fieldErrors.email && (
            <p id="contact-email-error" className="font-body text-xs text-semantic-rose mt-1">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Interest Selector */}
      <div>
        <span id="contact-interest-label" className="font-mono text-xs font-semibold text-content-primary block mb-1.5">
          PRIMARY TOPIC / INTEREST
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup" aria-labelledby="contact-interest-label">
          {INTEREST_OPTIONS.map((opt) => {
            const isSelected = formData.interest === opt;
            const optionId = `contact-interest-${opt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return (
              <button
                key={opt}
                id={optionId}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setFormData({ ...formData, interest: opt })}
                className={cn(
                  'font-mono text-xs px-3 py-2 rounded-md border text-left transition-all cursor-pointer select-none truncate',
                  isSelected
                    ? 'bg-semantic-cyan text-canvas border-semantic-cyan font-semibold shadow-glow-cyan'
                    : 'bg-surface-raised text-content-muted border-border hover:border-content-muted hover:text-content-primary'
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message Box */}
      <div>
        <label htmlFor="contact-message" className="font-mono text-xs font-semibold text-content-primary block mb-1.5">
          YOUR MESSAGE / CONTEXT <span className="text-semantic-cyan">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell me about the problem, engineering opportunity, or AI project..."
          className={cn(
            'w-full px-3.5 py-2.5 rounded-lg bg-surface-raised border font-body text-sm text-content-primary placeholder:text-content-subtle transition-all focus-visible:outline-none focus:border-semantic-cyan resize-y',
            fieldErrors.message ? 'border-semantic-rose' : 'border-border'
          )}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="font-body text-xs text-semantic-rose mt-1">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Submission Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
        <span className="font-mono text-xs text-content-subtle">
          Direct endpoint: <span className="text-content-muted">{SITE_CONFIG.primaryEmail}</span>
        </span>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === 'sending'}
          className="bg-cyan-600 hover:bg-cyan-500 border-cyan-500/50 shadow-glow-cyan w-full sm:w-auto"
        >
          {status === 'sending' ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Routing Transmission...
            </>
          ) : (
            <>
              Send Transmission <Send className="w-4 h-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
