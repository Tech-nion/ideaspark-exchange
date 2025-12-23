import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Idea } from '@/types/idea';

export const useIdeas = () => {
  return useQuery({
    queryKey: ['ideas'],
    queryFn: async (): Promise<Idea[]> => {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ideas:', error);
        throw error;
      }

      return (data || []).map((idea) => ({
        id: idea.id,
        title: idea.title,
        description: idea.short_description,
        category: idea.category,
        tier: idea.tier as Idea['tier'],
        price: Number(idea.price),
        thumbnail: idea.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        tags: idea.tags || [],
        likes: idea.likes || 0,
        views: Math.floor(Math.random() * 500) + 100,
        createdAt: idea.created_at,
        author: {
          id: idea.creator_id || 'system',
          name: 'IdeaXchange Team',
        },
      }));
    },
  });
};

export const useIdea = (id: string) => {
  return useQuery({
    queryKey: ['idea', id],
    queryFn: async (): Promise<Idea | null> => {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching idea:', error);
        throw error;
      }

      if (!data) return null;

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        tier: data.tier as Idea['tier'],
        price: Number(data.price),
        thumbnail: data.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        tags: data.tags || [],
        likes: data.likes || 0,
        views: Math.floor(Math.random() * 500) + 100,
        createdAt: data.created_at,
        author: {
          id: data.creator_id || 'system',
          name: 'IdeaXchange Team',
        },
      };
    },
    enabled: !!id,
  });
};
