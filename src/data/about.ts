export interface AboutTheme {
  title: string;
  category: string;
  description: string;
}

export interface PersonalInterest {
  name: string;
  tagline: string;
  description: string;
  symbol: string;
}

export const ABOUT_DATA = {
  primaryStatement: 'Curious mind. Structured thinking. Real-world impact.',
  supportingNarrative:
    'I enjoy moving between technical depth and broader context — understanding a problem, exploring the data, engineering the system, and thinking about how the result can actually be useful.',
  themes: [
    {
      title: 'AI & Deep Learning',
      category: 'MODELS & INFERENCE',
      description: 'Ensemble forecasting, medical computer vision, dense vector embeddings, and retrieval-augmented generation.',
    },
    {
      title: 'Software Architecture',
      category: 'SYSTEMS & CODE',
      description: 'Maintainable TypeScript, Python backends, FastAPI REST APIs, and native Tauri/Rust desktop shells.',
    },
    {
      title: 'Data & Methodology',
      category: 'VALIDATION DISCIPLINE',
      description: 'Strict patient-level and temporal leakage prevention, exploratory analytics, and empirical metric logging.',
    },
    {
      title: 'Business & Product',
      category: 'VALUE TRANSLATION',
      description: 'Connecting technical algorithmic capability to tangible business decisions, user experience, and measurable utility.',
    },
  ] as AboutTheme[],
  interests: [
    {
      name: 'Chess',
      tagline: 'Strategy & Pattern Recognition',
      description: 'Calculating tactical variations, positional discipline, and deep time management.',
      symbol: '♟',
    },
    {
      name: 'Travel',
      tagline: 'Exploration & Perspective',
      description: 'Discovering diverse regions, architectural cultures, and distinct ways of life.',
      symbol: '✈',
    },
    {
      name: 'Reading',
      tagline: 'Systems & Ideas',
      description: 'Engineering papers, mental models, technology histories, and economic systems.',
      symbol: '📖',
    },
    {
      name: 'Cars',
      tagline: 'Engineering & Telemetry',
      description: 'Motorsport data analysis, mechanical dynamics, and precision automotive engineering.',
      symbol: '🏎',
    },
  ] as PersonalInterest[],
};
