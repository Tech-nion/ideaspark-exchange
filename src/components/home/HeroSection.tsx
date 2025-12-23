import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Users, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 orb orb-primary animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 orb orb-accent animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 orb orb-primary animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full mb-8 animate-blur-in hover-glow cursor-default">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">The #1 Marketplace for Startup Ideas</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Where{' '}
            <span className="text-gradient relative">
              Ideas
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" className="animate-draw" />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="hsl(var(--primary))" />
                    <stop offset="1" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />
            Meet Investors
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Monetize your innovative ideas or discover the next big startup to invest in. 
            From demo concepts to premium, validated business opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to="/marketplace">
              <Button variant="hero" size="xl" className="hover-shine group">
                Explore Ideas
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/submit">
              <Button variant="outline" size="xl" className="hover-glow">
                Sell Your Idea
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in stagger-children" style={{ animationDelay: '300ms' }}>
            <div className="glass rounded-2xl p-6 hover-lift cursor-default group">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                <span className="font-display text-3xl font-bold">5,000+</span>
              </div>
              <span className="text-sm text-muted-foreground">Ideas Listed</span>
            </div>
            <div className="glass rounded-2xl p-6 hover-lift cursor-default group" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-tier-demo transition-transform duration-300 group-hover:scale-110" />
                <span className="font-display text-3xl font-bold">12,000+</span>
              </div>
              <span className="text-sm text-muted-foreground">Active Users</span>
            </div>
            <div className="glass rounded-2xl p-6 hover-lift cursor-default group" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="font-display text-3xl font-bold">$2M+</span>
              </div>
              <span className="text-sm text-muted-foreground">Ideas Sold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2 animate-bounce">
          <div className="w-1.5 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
