export interface ProjectMetric {
  label: string;
  value: string;
  context?: string;
  source?: string;
}

export interface ProjectTechnology {
  name: string;
  category: 'ml' | 'backend' | 'frontend' | 'data' | 'infra' | 'evaluation';
}

export interface ProjectAsset {
  path: string;
  alt: string;
  caption?: string;
  role: 'hero' | 'flow' | 'detail' | 'evaluation' | 'benchmark' | 'ui';
  width?: number;
  height?: number;
}

export interface PipelineStep {
  number: string;
  title: string;
  description: string;
  tag?: string;
}

export interface FlagshipProject {
  id: 'salespulse' | 'docuchat' | 'meli' | 'medvision';
  numericId: string;
  title: string;
  domain: string;
  narrative: string;
  conceptualCore: string;
  tagline: string;
  problemStatement: string;
  whyAi: string;
  summary: string;
  status: 'Deployed' | 'Active Research' | 'Prototype';
  repositoryUrl: string;
  liveUrl?: string;
  colorTheme: 'cyan' | 'indigo' | 'emerald' | 'violet';
  metrics: ProjectMetric[];
  technologies: ProjectTechnology[];
  pipelineSteps: PipelineStep[];
  primaryAsset: ProjectAsset;
  supportingAssets: ProjectAsset[];
  prevProjectId: 'salespulse' | 'docuchat' | 'meli' | 'medvision';
  nextProjectId: 'salespulse' | 'docuchat' | 'meli' | 'medvision';
}

export type LabFilterCategory = 'ALL' | 'ML' | 'GENAI' | 'SECURITY' | 'FINTECH' | 'OPEN SOURCE' | 'AGENTIC AI';

export interface LabProject {
  id: string;
  numericId: string;
  title: string;
  domain: string;
  category: 'ML' | 'GENAI' | 'SECURITY' | 'FINTECH' | 'OPEN SOURCE' | 'AGENTIC AI';
  summary: string;
  proofTags: string[];
  technologies: string[];
  metrics: string[];
  repositoryUrl?: string | null;
  liveUrl?: string;
  status?: 'Deployed' | 'Open Source' | 'Exploration' | 'Prototype';
}
