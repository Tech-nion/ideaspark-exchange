import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Lightbulb,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import type { Idea } from '@/types/idea';

const MyIdeas = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: ideas, isLoading } = useQuery({
    queryKey: ['my-ideas', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map((idea): Idea => ({
        id: idea.id,
        title: idea.title,
        description: idea.description,
        category: idea.category,
        tier: idea.tier as Idea['tier'],
        price: Number(idea.price),
        author: {
          id: idea.creator_id || '',
          name: 'You',
        },
        created_at: idea.created_at,
        likes: idea.likes,
        views: 0,
        tags: idea.tags,
        thumbnail: idea.image_url || undefined,
        ai_verified: idea.ai_verified,
        ai_score: idea.ai_score,
        ai_predicted_price: idea.ai_predicted_price ? Number(idea.ai_predicted_price) : undefined,
        ai_analysis: idea.ai_analysis,
        verified_at: idea.verified_at,
      }));
    },
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (ideaId: string) => {
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', ideaId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-ideas'] });
      toast.success('Idea deleted successfully');
      setDeletingId(null);
    },
    onError: (error) => {
      toast.error('Failed to delete idea: ' + error.message);
      setDeletingId(null);
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold mb-4">Sign in to view your ideas</h1>
            <p className="text-muted-foreground mb-6">You need to be logged in to manage your ideas.</p>
            <Link to="/auth">
              <Button variant="hero" size="lg">Sign In</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'standard': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                My Ideas
              </h1>
              <p className="text-muted-foreground">
                Manage and track all your submitted ideas
              </p>
            </div>
            <Link to="/submit">
              <Button variant="hero" className="hover-shine">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Idea
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-subtle border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{ideas?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Total Ideas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-subtle border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{ideas?.filter(i => i.ai_verified).length || 0}</p>
                    <p className="text-xs text-muted-foreground">Verified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-subtle border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {ideas?.reduce((sum, i) => sum + (i.ai_score || 0), 0) 
                        ? Math.round((ideas?.reduce((sum, i) => sum + (i.ai_score || 0), 0) || 0) / (ideas?.filter(i => i.ai_score).length || 1))
                        : 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-subtle border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      ${ideas?.reduce((sum, i) => sum + i.price, 0).toLocaleString() || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ideas List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : ideas && ideas.length > 0 ? (
            <div className="space-y-4">
              {ideas.map((idea) => (
                <Card key={idea.id} className="glass-subtle border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Thumbnail */}
                      {idea.thumbnail && (
                        <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={idea.thumbnail} 
                            alt={idea.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-display text-lg font-semibold">{idea.title}</h3>
                          <Badge variant="outline" className={getTierColor(idea.tier)}>
                            {idea.tier}
                          </Badge>
                          {idea.ai_verified && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              AI Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {idea.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${idea.price.toLocaleString()}
                          </span>
                          {idea.ai_score && (
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              Score: {idea.ai_score}/100
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(idea.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col gap-2 flex-shrink-0">
                        <Link to={`/idea/${idea.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/edit-idea/${idea.id}`)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Idea?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{idea.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(idea.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-subtle border-border/50">
              <CardContent className="p-12 text-center">
                <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">No ideas yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start sharing your innovative ideas with the world!
                </p>
                <Link to="/submit">
                  <Button variant="hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Your First Idea
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyIdeas;
