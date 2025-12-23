import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Demo',
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
  },
  {
    name: 'Standard',
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
  },
  {
    name: 'Premium',
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
  },
];

const TierComparison = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your Listing Tier
          </h2>
          <p className="text-muted-foreground text-lg">
            From free demos to premium listings with maximum visibility
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-card rounded-2xl border ${
                tier.highlight
                  ? 'border-accent shadow-premium'
                  : 'border-border shadow-soft'
              } p-8 flex flex-col`}
            >
              {/* Highlight Badge */}
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-accent rounded-full text-sm font-semibold text-accent-foreground">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
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
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-tier-demo/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-tier-demo" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/submit">
                <Button variant={tier.buttonVariant} className="w-full" size="lg">
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
