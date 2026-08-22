import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <Section spacing="spacious">
      <PageContainer size="narrow">
        <div className="surface-card p-12 text-center flex flex-col items-center">
          <span className="font-mono text-sm text-semantic-cyan font-semibold mb-2">404 // NOT FOUND</span>
          <h1 className="font-display text-4xl font-bold text-content-primary mb-4">
            System route does not exist.
          </h1>
          <p className="font-body text-base text-content-muted max-w-md mb-8">
            The requested portfolio path was not found in the routing table.
          </p>
          <Link to="/">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Button>
          </Link>
        </div>
      </PageContainer>
    </Section>
  );
};
