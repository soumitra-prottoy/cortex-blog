export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  trending: boolean;
  image?: string;
  content: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  pricing: 'free' | 'freemium' | 'paid';
  priceNote?: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  link: string;
  image?: string;
  featured: boolean;
}

export interface Comparison {
  slug: string;
  title: string;
  subtitle: string;
  itemA: ComparisonItem;
  itemB: ComparisonItem;
  verdict: string;
  category: string;
  tags: string[];
  date: string;
}

export interface ComparisonItem {
  name: string;
  logo?: string;
  tagline: string;
  pros: string[];
  cons: string[];
  rating: number;
  bestFor: string;
}

export interface Roadmap {
  slug: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  steps: RoadmapStep[];
  tags: string[];
}

export interface RoadmapStep {
  title: string;
  description: string;
  resources?: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
}
