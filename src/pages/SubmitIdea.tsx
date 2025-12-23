import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { categories } from '@/data/mockIdeas';
import { IdeaTier } from '@/types/idea';
import { Lightbulb, ArrowRight, Check, Crown, Zap, Gift, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIChatbot from '@/components/chat/AIChatbot';

const tierOptions: { value: IdeaTier; label: string; description: string; price: string; icon: typeof Gift }[] = [
  {
    value: 'demo',
    label: 'Demo',
    description: 'Share your concept for free',
    price: 'Free',
    icon: Gift,
  },
  {
    value: 'standard',
    label: 'Standard',
    description: 'Sell your validated idea',
    price: '$49',
    icon: Zap,
  },
  {
    value: 'premium',
    label: 'Premium',
    description: 'Maximum exposure & features',
    price: '$149',
    icon: Crown,
  },
];

const SubmitIdea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tier: 'standard' as IdeaTier,
    price: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Idea Submitted!',
      description: 'Your idea has been submitted for review. You will be notified once it\'s live.',
    });
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decoration */}
      <div className="fixed inset-0 gradient-mesh opacity-40 pointer-events-none" />
      <div className="fixed top-1/4 right-1/4 w-96 h-96 orb orb-primary opacity-20 pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/4 w-80 h-80 orb orb-accent opacity-15 pointer-events-none" />
      
      <Navbar />
      
      <main className="pt-24 pb-16 relative">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12 animate-blur-in">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow animate-float">
                <Lightbulb className="w-8 h-8 text-primary-foreground" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-accent animate-pulse" />
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">Submit Your Idea</h1>
            <p className="text-muted-foreground text-lg">
              Share your innovative concept with the world and find investors
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                    step >= s
                      ? 'gradient-primary text-primary-foreground shadow-glow scale-110'
                      : 'glass text-muted-foreground'
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 rounded transition-all duration-500 ${step > s ? 'gradient-primary' : 'bg-secondary'}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="glass rounded-2xl p-8 shadow-medium animate-scale-in">
                <h2 className="font-display text-2xl font-semibold mb-6">Basic Information</h2>
                
                <div className="space-y-6">
                  <div className="group">
                    <Label htmlFor="title">Idea Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="E.g., AI-Powered Personal Finance Assistant"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-2 h-12 glass-subtle border-border/50 focus:border-primary/50 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="group">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your idea in detail. What problem does it solve? Who is the target audience?"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="mt-2 glass-subtle border-border/50 focus:border-primary/50 transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-2 w-full h-12 px-4 rounded-lg glass-subtle border border-border/50 text-foreground focus:border-primary/50 transition-all duration-300"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="AI, Mobile App, B2B"
                      value={formData.tags}
                      onChange={handleChange}
                      className="mt-2 h-12 glass-subtle border-border/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full mt-8 hover-shine group"
                  variant="hero"
                  size="lg"
                  disabled={!formData.title || !formData.description || !formData.category}
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            )}

            {/* Step 2: Tier Selection */}
            {step === 2 && (
              <div className="glass rounded-2xl p-8 shadow-medium animate-scale-in">
                <h2 className="font-display text-2xl font-semibold mb-6">Choose Your Listing Tier</h2>
                
                <div className="grid gap-4 stagger-children">
                  {tierOptions.map((tier, index) => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, tier: tier.value })}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover-lift ${
                        formData.tier === tier.value
                          ? tier.value === 'premium'
                            ? 'border-accent glass shadow-premium'
                            : 'border-primary glass'
                          : 'border-border/50 glass-subtle hover:border-primary/30'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            formData.tier === tier.value
                              ? tier.value === 'premium'
                                ? 'gradient-accent shadow-premium'
                                : tier.value === 'standard'
                                ? 'bg-tier-standard'
                                : 'bg-tier-demo'
                              : 'bg-secondary'
                          }`}>
                            <tier.icon className={`w-6 h-6 ${formData.tier === tier.value ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{tier.label}</h3>
                            <p className="text-muted-foreground text-sm">{tier.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-display text-2xl font-bold">{tier.price}</span>
                          {tier.value !== 'demo' && (
                            <span className="text-muted-foreground text-sm block">per listing</span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {formData.tier !== 'demo' && (
                  <div className="mt-6 animate-slide-up">
                    <Label htmlFor="price">Your Asking Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Enter your price"
                      value={formData.price}
                      onChange={handleChange}
                      className="mt-2 h-12 glass-subtle border-border/50 focus:border-primary/50 transition-all duration-300"
                      required
                    />
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} size="lg" className="flex-1">
                    Back
                  </Button>
                  <Button type="button" onClick={() => setStep(3)} size="lg" className="flex-1 hover-shine group" variant="hero">
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="glass rounded-2xl p-8 shadow-medium animate-scale-in">
                <h2 className="font-display text-2xl font-semibold mb-6">Review & Submit</h2>
                
                <div className="space-y-4 stagger-children">
                  <div className="p-4 glass-subtle rounded-xl">
                    <span className="text-sm text-muted-foreground">Title</span>
                    <p className="font-semibold">{formData.title}</p>
                  </div>

                  <div className="p-4 glass-subtle rounded-xl">
                    <span className="text-sm text-muted-foreground">Description</span>
                    <p className="mt-1">{formData.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 glass-subtle rounded-xl">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <p className="font-semibold">{formData.category}</p>
                    </div>
                    <div className="p-4 glass-subtle rounded-xl">
                      <span className="text-sm text-muted-foreground">Tier</span>
                      <p className="font-semibold capitalize">{formData.tier}</p>
                    </div>
                  </div>

                  {formData.tier !== 'demo' && (
                    <div className="p-4 glass-subtle rounded-xl">
                      <span className="text-sm text-muted-foreground">Your Asking Price</span>
                      <p className="font-display text-2xl font-bold text-gradient">${formData.price}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} size="lg" className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" variant="hero" size="lg" className="flex-1 hover-shine group">
                    Submit Idea
                    <Check className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:scale-110" />
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default SubmitIdea;
