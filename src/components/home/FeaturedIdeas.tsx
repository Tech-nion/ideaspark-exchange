import { Link } from 'react-router-dom';
import { mockIdeas } from '@/data/mockIdeas';
import IdeaCard from '@/components/ideas/IdeaCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

const FeaturedIdeas = () => {
  const featuredIdeas = mockIdeas.slice(0, 6);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Trending Now</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Featured Ideas
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover the most promising startup ideas from our community
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="outline" size="lg">
              View All Ideas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredIdeas.map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIdeas;
