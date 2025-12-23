import { Link } from 'react-router-dom';
import { Idea } from '@/types/idea';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, ArrowUpRight } from 'lucide-react';

interface IdeaCardProps {
  idea: Idea;
  index?: number;
}

const tierStyles = {
  demo: 'bg-tier-demo text-tier-demo-foreground',
  standard: 'bg-tier-standard text-tier-standard-foreground',
  premium: 'bg-tier-premium text-tier-premium-foreground shadow-premium',
};

const IdeaCard = ({ idea, index = 0 }: IdeaCardProps) => {
  return (
    <Link
      to={`/idea/${idea.id}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-card rounded-2xl border border-border p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Premium glow effect */}
        {idea.tier === 'premium' && (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={tierStyles[idea.tier]}>
                {idea.tier.charAt(0).toUpperCase() + idea.tier.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">{idea.category}</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {idea.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary rounded-md text-xs text-muted-foreground"
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
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Heart className="w-4 h-4" />
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
              <span className="font-display font-bold text-foreground">
                ${idea.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-semibold">
            {idea.author.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-sm text-muted-foreground">by {idea.author.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default IdeaCard;
