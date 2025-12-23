import { useParams, Link } from 'react-router-dom';
import { mockIdeas } from '@/data/mockIdeas';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, ArrowLeft, Share2, Flag, ShoppingCart, Lock, CheckCircle } from 'lucide-react';
import AIChatbot from '@/components/chat/AIChatbot';

const tierStyles = {
  demo: 'bg-tier-demo text-tier-demo-foreground',
  standard: 'bg-tier-standard text-tier-standard-foreground',
  premium: 'bg-tier-premium text-tier-premium-foreground',
};

const IdeaDetail = () => {
  const { id } = useParams();
  const idea = mockIdeas.find((i) => i.id === id);

  if (!idea) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Idea not found</h1>
            <Link to="/marketplace">
              <Button>Back to Marketplace</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
                <div className="flex items-start gap-4 mb-6">
                  <Badge className={`${tierStyles[idea.tier]} text-sm`}>
                    {idea.tier.charAt(0).toUpperCase() + idea.tier.slice(1)}
                  </Badge>
                  <span className="text-muted-foreground">{idea.category}</span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {idea.title}
                </h1>

                <div className="flex items-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span>{idea.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>{idea.views} views</span>
                  </div>
                  <span>Posted {new Date(idea.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold mb-4">About This Idea</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {idea.description}
                </p>

                {idea.tier !== 'demo' && (
                  <div className="p-4 bg-secondary/50 rounded-xl border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock className="w-5 h-5" />
                      <span>Full details available after purchase</span>
                    </div>
                  </div>
                )}
              </div>

              {/* What's Included */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
                <h2 className="font-display text-xl font-semibold mb-6">What's Included</h2>
                <ul className="space-y-4">
                  {[
                    'Complete business concept documentation',
                    'Market research and analysis',
                    'Competitive landscape overview',
                    idea.tier === 'premium' && 'Financial projections',
                    idea.tier === 'premium' && 'Implementation roadmap',
                    idea.tier !== 'demo' && 'Direct contact with idea creator',
                  ]
                    .filter(Boolean)
                    .map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-tier-demo" />
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Purchase Card */}
                <div className={`bg-card rounded-2xl border p-6 ${idea.tier === 'premium' ? 'border-accent shadow-premium' : 'border-border shadow-soft'}`}>
                  <div className="text-center mb-6">
                    {idea.tier === 'demo' ? (
                      <span className="font-display text-4xl font-bold text-tier-demo">Free</span>
                    ) : (
                      <div>
                        <span className="font-display text-4xl font-bold">${idea.price.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-2">one-time</span>
                      </div>
                    )}
                  </div>

                  {idea.tier === 'demo' ? (
                    <Button variant="default" size="lg" className="w-full mb-3">
                      View Full Details
                    </Button>
                  ) : (
                    <Link to="/auth">
                      <Button variant={idea.tier === 'premium' ? 'premium' : 'hero'} size="lg" className="w-full mb-3">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Purchase Idea
                      </Button>
                    </Link>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Author Card */}
                <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                  <h3 className="font-semibold mb-4">About the Creator</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {idea.author.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{idea.author.name}</p>
                      <p className="text-sm text-muted-foreground">Idea Creator</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>

                {/* Report */}
                <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm w-full py-2 transition-colors">
                  <Flag className="w-4 h-4" />
                  Report this listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default IdeaDetail;
