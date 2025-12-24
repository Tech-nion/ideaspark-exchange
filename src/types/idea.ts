export type IdeaTier = 'demo' | 'standard' | 'premium';

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: IdeaTier;
  price: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  created_at: string;
  likes: number | null;
  views: number;
  tags: string[] | null;
  thumbnail?: string;
  // AI Verification fields
  ai_verified?: boolean | null;
  ai_score?: number | null;
  ai_predicted_price?: number | null;
  ai_analysis?: string | null;
  verified_at?: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  ideas: Idea[];
  purchasedIdeas: Idea[];
  createdAt: string;
}
