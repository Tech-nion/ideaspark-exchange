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
  createdAt: string;
  likes: number;
  views: number;
  tags: string[];
  thumbnail?: string;
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
