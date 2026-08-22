import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { AboutSection } from '@/components/about/AboutSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { ContactForm } from '@/components/contact/ContactForm';
import { SITE_CONFIG } from '@/lib/constants';

describe('Phase 5: Experience, About, and Contact', () => {
  describe('Experience Timeline', () => {
    const renderExperience = () =>
      render(
        <BrowserRouter>
          <ExperienceSection />
        </BrowserRouter>
      );

    it('renders the Experience section header and all 6 verified career items', () => {
      renderExperience();
      expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();

      expect(screen.getByText('Capital Business Systems Pvt. Ltd. (CBSL Group)')).toBeInTheDocument();
      expect(screen.getByText('Indian Railways — Signal & Telecom Training Centre')).toBeInTheDocument();
      expect(screen.getByText('TechSphere — DDU Gorakhpur University')).toBeInTheDocument();
      expect(screen.getByText('Brand Scalar')).toBeInTheDocument();
      expect(screen.getByText('Cognizance — IIT Roorkee')).toBeInTheDocument();
      expect(screen.getByText('Smart India Hackathon')).toBeInTheDocument();
    });

    it('renders verified capability tags for CBSL internship', () => {
      renderExperience();
      expect(screen.getByText('Document Intelligence')).toBeInTheDocument();
      expect(screen.getByText('RAG')).toBeInTheDocument();
      expect(screen.getByText('Embeddings')).toBeInTheDocument();
      expect(screen.getByText('Semantic Search')).toBeInTheDocument();
      expect(screen.getByText('Vector Databases')).toBeInTheDocument();
      expect(screen.getByText('Prompt Engineering')).toBeInTheDocument();
    });
  });

  describe('About Section', () => {
    const renderAbout = () =>
      render(
        <BrowserRouter>
          <AboutSection />
        </BrowserRouter>
      );

    it('renders the About section with primary statement and supporting narrative', () => {
      renderAbout();
      expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
      expect(
        screen.getByText(/"Curious mind\. Structured thinking\. Real-world impact\."/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/I enjoy moving between technical depth and broader context/i)
      ).toBeInTheDocument();
    });

    it('renders all personal interests', () => {
      renderAbout();
      expect(screen.getByText('Chess')).toBeInTheDocument();
      expect(screen.getByText('Travel')).toBeInTheDocument();
      expect(screen.getByText('Reading')).toBeInTheDocument();
      expect(screen.getByText('Cars')).toBeInTheDocument();
    });
  });

  describe('Contact Section & EmailJS Form', () => {
    const renderContact = () =>
      render(
        <BrowserRouter>
          <ContactSection />
        </BrowserRouter>
      );

    it('renders the Contact section header and authoritative contact channels', () => {
      renderContact();
      expect(screen.getByRole('heading', { name: "Let's Build Something Useful" })).toBeInTheDocument();
      
      // Authoritative primary and secondary emails
      expect(screen.getAllByText('swastikpandey1024@gmail.com').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('buildwithswastik9@gmail.com')).toBeInTheDocument();

      // Guardrail against incorrect placeholder email
      expect(screen.queryByText(/swastikpandey\.work@gmail\.com/i)).not.toBeInTheDocument();

      // Verified developer profiles
      expect(screen.getByText('github.com/SwastikPandey1024')).toBeInTheDocument();
      expect(screen.getByText('linkedin.com/in/swastik-pandey-a02719297')).toBeInTheDocument();

      // Verified mailto links
      const primaryMailto = screen.getByRole('link', { name: /Send direct email to primary address swastikpandey1024@gmail.com/i });
      expect(primaryMailto).toHaveAttribute('href', 'mailto:swastikpandey1024@gmail.com');

      const secondaryMailto = screen.getByRole('link', { name: /Send direct email to alternate address buildwithswastik9@gmail.com/i });
      expect(secondaryMailto).toHaveAttribute('href', 'mailto:buildwithswastik9@gmail.com');

      const linkedInLink = screen.getByRole('link', { name: /View verified LinkedIn profile/i });
      expect(linkedInLink).toHaveAttribute('href', SITE_CONFIG.linkedinUrl);
    });

    it('has complete accessible form field attributes and matching labels', () => {
      render(<ContactForm />);

      // Name input
      const nameInput = screen.getByLabelText(/YOUR NAME/i);
      expect(nameInput).toHaveAttribute('id', 'contact-name');
      expect(nameInput).toHaveAttribute('name', 'name');
      expect(nameInput).toHaveAttribute('autocomplete', 'name');

      // Email input
      const emailInput = screen.getByLabelText(/EMAIL ADDRESS/i);
      expect(emailInput).toHaveAttribute('id', 'contact-email');
      expect(emailInput).toHaveAttribute('name', 'email');
      expect(emailInput).toHaveAttribute('autocomplete', 'email');

      // Message textarea
      const messageInput = screen.getByLabelText(/YOUR MESSAGE/i);
      expect(messageInput).toHaveAttribute('id', 'contact-message');
      expect(messageInput).toHaveAttribute('name', 'message');

      // Radiogroup with aria-labelledby
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('aria-labelledby', 'contact-interest-label');
    });

    it('validates required fields on submit', async () => {
      render(<ContactForm />);
      const submitBtn = screen.getByRole('button', { name: /Send Transmission/i });
      fireEvent.click(submitBtn);

      expect(await screen.findByText('Please provide your name or organization.')).toBeInTheDocument();
      expect(screen.getByText('Please provide your email address.')).toBeInTheDocument();
      expect(screen.getByText('Please provide message context.')).toBeInTheDocument();
    });

    it('allows topic / interest selection', () => {
      render(<ContactForm />);
      const aiMlOption = screen.getByRole('radio', { name: 'AI / ML Systems' });
      expect(aiMlOption).toHaveAttribute('aria-checked', 'true');

      const fullStackOption = screen.getByRole('radio', { name: 'Full-Stack Architecture' });
      expect(fullStackOption).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(fullStackOption);
      expect(fullStackOption).toHaveAttribute('aria-checked', 'true');
    });

    it('submits successfully and displays Meli dispatch signal and reset button', async () => {
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/YOUR NAME/i), {
        target: { value: 'Dr. John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/EMAIL ADDRESS/i), {
        target: { value: 'john.doe@enterprise.org' },
      });
      fireEvent.change(screen.getByLabelText(/YOUR MESSAGE/i), {
        target: { value: 'We would love to discuss an AI forecasting and RAG collaboration.' },
      });

      const submitBtn = screen.getByRole('button', { name: /Send Transmission/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText('Message Dispatched')).toBeInTheDocument();
      });

      expect(
        screen.getByText(/Meli Agent Signal: Transmission queued/i)
      ).toBeInTheDocument();

      const resetBtn = screen.getByRole('button', { name: /Send Another Transmission/i });
      fireEvent.click(resetBtn);

      expect(screen.getByRole('button', { name: /Send Transmission/i })).toBeInTheDocument();
    });
  });
});
