export interface ExperienceItem {
  id: string;
  numericId: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  focusTags: string[];
  category: 'AI / ML' | 'Engineering' | 'Leadership' | 'Consulting';
}
