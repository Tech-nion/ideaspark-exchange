import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IdeaCard from '@/components/ideas/IdeaCard';
import IdeaFilters from '@/components/ideas/IdeaFilters';
import AIChatbot from '@/components/chat/AIChatbot';
import { useIdeas } from '@/hooks/useIdeas';
import { IdeaTier } from '@/types/idea';
import { Sparkles, Loader2 } from 'lucide-react';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTier, setSelectedTier] = useState<IdeaTier | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: ideas = [], isLoading } = useIdeas();

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
      const matchesTier = selectedTier === 'all' || idea.tier === selectedTier;
      const matchesSearch =
        searchQuery === '' ||
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTier && matchesSearch;
    });
  }, [ideas, selectedCategory, selectedTier, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Discover</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Idea Marketplace
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Browse thousands of innovative startup ideas. From free demos to premium, 
              validated concepts ready for investment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6 shadow-soft">
                <h2 className="font-display font-semibold text-lg mb-6">Filters</h2>
                <IdeaFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedTier={selectedTier}
                  setSelectedTier={setSelectedTier}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            </aside>

            {/* Ideas Grid */}
            <div className="lg:col-span-3">
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredIdeas.length}</span> ideas
                </p>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredIdeas.map((idea, index) => (
                    <IdeaCard key={idea.id} idea={idea} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">No ideas found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Marketplace;
