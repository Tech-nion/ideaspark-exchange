import { Link } from 'react-router-dom';
import { Idea } from '@/types/idea';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, ArrowUpRight, Sparkles } from 'lucide-react';

interface IdeaCardProps {
  idea: Idea;
  index?: number;
}

const tierStyles = {
  demo: 'bg-tier-demo text-tier-demo-foreground',
  standard: 'bg-tier-standard text-tier-standard-foreground',
  premium: 'bg-tier-premium text-tier-premium-foreground',
};

const IdeaCard = ({ idea, index = 0 }: IdeaCardProps) => {
  return (
    <Link
      to={`/idea/${idea.id}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`relative rounded-2xl p-6 transition-all duration-500 hover-lift overflow-hidden ${
        idea.tier === 'premium' 
          ? 'glass border-accent/20 hover:border-accent/40' 
          : 'glass-subtle border-border/50 hover:border-primary/30'
      }`}>
        {/* Premium shimmer effect */}
        {idea.tier === 'premium' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 pointer-events-none" />
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center animate-glow-pulse">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
              </div>
            </div>
          </>
        )}

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4 relative">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${tierStyles[idea.tier]} transition-transform duration-300 group-hover:scale-105`}>
                {idea.tier.charAt(0).toUpperCase() + idea.tier.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">{idea.category}</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {idea.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 relative">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 relative">
          {idea.tags.slice(0, 3).map((tag, i) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-secondary/60 backdrop-blur-sm rounded-lg text-xs text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {tag}
            </span>
          ))}
          {idea.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{idea.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50 relative">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors duration-300">
              <Heart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm">{idea.likes}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{idea.views}</span>
            </div>
          </div>
          <div className="text-right">
            {idea.tier === 'demo' ? (
              <span className="text-tier-demo font-semibold">Free</span>
            ) : (
              <span className="font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                ${idea.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50 relative">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold ring-2 ring-background shadow-soft transition-transform duration-300 group-hover:scale-110">
            {idea.author.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-sm text-muted-foreground">by {idea.author.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default IdeaCard;
