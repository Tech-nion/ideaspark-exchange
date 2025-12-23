import { Check, X, Crown, Zap, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Demo',
    icon: Gift,
    description: 'Perfect for sharing early-stage concepts',
    price: 'Free',
    priceNote: 'Forever free',
    features: [
      { text: 'Basic idea listing', included: true },
      { text: 'Community feedback', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Protected details', included: false },
      { text: 'Direct buyer contact', included: false },
      { text: 'Featured placement', included: false },
    ],
    buttonVariant: 'outline' as const,
    highlight: false,
    gradient: 'from-tier-demo/20 to-tier-demo/5',
  },
  {
    name: 'Standard',
    icon: Zap,
    description: 'For validated ideas ready to sell',
    price: '$49',
    priceNote: 'per listing',
    features: [
      { text: 'Everything in Demo', included: true },
      { text: 'Protected details', included: true },
      { text: 'Direct buyer contact', included: true },
      { text: 'Priority support', included: true },
      { text: 'Featured placement', included: false },
      { text: 'Investor matching', included: false },
    ],
    buttonVariant: 'default' as const,
    highlight: false,
    gradient: 'from-tier-standard/20 to-tier-standard/5',
  },
  {
    name: 'Premium',
    icon: Crown,
    description: 'Maximum exposure for your best ideas',
    price: '$149',
    priceNote: 'per listing',
    features: [
      { text: 'Everything in Standard', included: true },
      { text: 'Featured placement', included: true },
      { text: 'Investor matching', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Verified badge', included: true },
      { text: 'Marketing boost', included: true },
    ],
    buttonVariant: 'premium' as const,
    highlight: true,
    gradient: 'from-accent/20 to-accent/5',
  },
];

const TierComparison = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] orb orb-primary opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-blur-in">
            Choose Your Listing Tier
          </h2>
          <p className="text-muted-foreground text-lg">
            From free demos to premium listings with maximum visibility
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-children">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-500 hover-lift ${
                tier.highlight
                  ? 'glass border-accent/30 shadow-premium'
                  : 'glass-subtle border-border/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${tier.gradient} opacity-50 pointer-events-none`} />
              
              {/* Highlight Badge */}
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 gradient-accent rounded-full text-sm font-semibold text-accent-foreground shadow-premium animate-glow-pulse">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto relative ${
                tier.highlight ? 'gradient-accent shadow-premium' : 'bg-secondary'
              }`}>
                <tier.icon className={`w-7 h-7 ${tier.highlight ? 'text-accent-foreground' : 'text-foreground'}`} />
              </div>

              {/* Header */}
              <div className="text-center mb-8 relative">
                <h3 className="font-display text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-4xl font-bold">{tier.price}</span>
                  {tier.price !== 'Free' && (
                    <span className="text-muted-foreground text-sm">/{tier.priceNote}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1 relative">
                {tier.features.map((feature, i) => (
                  <li key={feature.text} className="flex items-center gap-3 group" style={{ animationDelay: `${i * 50}ms` }}>
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-tier-demo/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Check className="w-3 h-3 text-tier-demo" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className={`transition-colors duration-300 ${feature.included ? 'text-foreground group-hover:text-primary' : 'text-muted-foreground'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/submit" className="relative">
                <Button variant={tier.buttonVariant} className={`w-full ${tier.highlight ? 'hover-shine' : ''}`} size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TierComparison;
