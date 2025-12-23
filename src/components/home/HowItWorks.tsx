import { Lightbulb, Upload, DollarSign, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Have an Idea',
    description: 'Got a brilliant startup concept? Whether it\'s fully validated or just a spark of inspiration, we want to hear it.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Upload,
    title: 'Submit & Price',
    description: 'Create a detailed listing with your idea. Choose your tier: Demo (free), Standard, or Premium for maximum exposure.',
    color: 'bg-tier-demo/20 text-tier-demo',
  },
  {
    icon: DollarSign,
    title: 'Get Discovered',
    description: 'Investors and entrepreneurs browse our marketplace. Your idea gets visibility from people ready to invest.',
    color: 'bg-accent/20 text-accent',
  },
  {
    icon: Rocket,
    title: 'Close the Deal',
    description: 'Negotiate, finalize, and transfer ownership. We handle secure payments and documentation.',
    color: 'bg-tier-standard/20 text-tier-standard',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From idea to investment in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-border" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="relative inline-flex">
                  <div className={`w-24 h-24 rounded-2xl ${step.color} flex items-center justify-center mb-6 mx-auto`}>
                    <step.icon className="w-10 h-10" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-display font-bold text-sm">
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
