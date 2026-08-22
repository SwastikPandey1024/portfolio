export interface WorkflowStep {
  number: string;
  stage: string;
  tagline: string;
  description: string;
  tool?: string;
  role: 'ideation' | 'research' | 'design' | 'architecture' | 'implementation' | 'verification' | 'deployment';
  engineeringOwnership: string;
}
