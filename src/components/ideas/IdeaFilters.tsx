import { categories } from '@/data/mockIdeas';
import { IdeaTier } from '@/types/idea';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface IdeaFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTier: IdeaTier | 'all';
  setSelectedTier: (tier: IdeaTier | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const IdeaFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedTier,
  setSelectedTier,
  searchQuery,
  setSearchQuery,
}: IdeaFiltersProps) => {
  const tiers: { value: IdeaTier | 'all'; label: string }[] = [
    { value: 'all', label: 'All Tiers' },
    { value: 'demo', label: 'Demo (Free)' },
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search ideas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 bg-card border-border rounded-xl"
        />
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Categories</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tier Filter */}
      <div>
        <span className="text-sm font-medium mb-3 block">Idea Tier</span>
        <div className="flex flex-wrap gap-2">
          {tiers.map((tier) => (
            <button
              key={tier.value}
              onClick={() => setSelectedTier(tier.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTier === tier.value
                  ? tier.value === 'premium'
                    ? 'gradient-accent text-accent-foreground shadow-premium'
                    : tier.value === 'demo'
                    ? 'bg-tier-demo text-tier-demo-foreground'
                    : tier.value === 'standard'
                    ? 'bg-tier-standard text-tier-standard-foreground'
                    : 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaFilters;
