import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/mockIdeas';
import { IdeaTier } from '@/types/idea';
import { 
  Lightbulb, ArrowRight, Check, Crown, Zap, Gift, Sparkles, 
  Loader2, ShieldCheck, DollarSign, TrendingUp, AlertTriangle,
  CheckCircle, XCircle, RefreshCw, LogIn
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIChatbot from '@/components/chat/AIChatbot';
import { useAuth } from '@/contexts/AuthContext';

interface VerificationAnalysis {
  score: number;
  predictedPrice: number;
  strengths: string[];
  challenges: string[];
  marketOpportunity: string;
  summary: string;
}

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
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verification, setVerification] = useState<VerificationAnalysis | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tier: 'standard' as IdeaTier,
    price: '',
    tags: '',
  });

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Auth guard - require login to submit ideas
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center max-w-md">
            <div className="glass rounded-2xl p-8">
              <LogIn className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="font-display text-2xl font-bold mb-2">Sign In Required</h1>
              <p className="text-muted-foreground mb-6">
                Please sign in or create an account to submit your innovative ideas.
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/auth">
                  <Button variant="hero" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In / Sign Up
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const runVerification = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-idea`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            ideaId: 'preview',
            title: formData.title,
            description: formData.description,
            category: formData.category,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Verification failed');
      }

      const data = await response.json();
      setVerification(data.analysis);
      // Auto-suggest the predicted price
      if (data.analysis.predictedPrice && !formData.price) {
        setFormData(prev => ({ ...prev, price: String(data.analysis.predictedPrice) }));
      }
      
      toast({
        title: 'Verification Complete',
        description: `Your idea scored ${data.analysis.score}/100`,
      });
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: 'Verification Failed',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Idea Submitted!',
      description: 'Your idea has been submitted for review. You will be notified once it\'s live.',
    });
    navigate('/marketplace');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  const getScoreRecommendation = (score: number) => {
    if (score >= 80) return 'Your idea has strong market potential! Consider the Premium tier for maximum visibility.';
    if (score >= 60) return 'Your idea shows promise. The Standard tier would be a good fit.';
    if (score >= 40) return 'Consider refining your idea based on the challenges identified before listing.';
    return 'We recommend improving your idea before submitting. Focus on the challenges mentioned.';
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
            {[1, 2, 3, 4].map((s) => (
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
                {s < 4 && (
                  <div className={`w-12 h-1 rounded transition-all duration-500 ${step > s ? 'gradient-primary' : 'bg-secondary'}`} />
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
                  Continue to AI Verification
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            )}

            {/* Step 2: AI Verification */}
            {step === 2 && (
              <div className="glass rounded-2xl p-8 shadow-medium animate-scale-in">
                <h2 className="font-display text-2xl font-semibold mb-2">AI Verification & Price Prediction</h2>
                <p className="text-muted-foreground mb-6">
                  Get AI-powered insights on your idea's market viability and recommended pricing
                </p>

                {!verification ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Ready to Analyze Your Idea</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Our AI will evaluate your idea's market potential, identify strengths and challenges, and suggest an optimal price point.
                    </p>
                    <Button
                      type="button"
                      onClick={runVerification}
                      disabled={isVerifying}
                      variant="hero"
                      size="lg"
                      className="hover-shine"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing Your Idea...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Verify & Get Price Prediction
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Score and Price */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-secondary/50 rounded-xl text-center">
                        <div className={`font-display text-4xl font-bold ${getScoreColor(verification.score)}`}>
                          {verification.score}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Viability Score</p>
                        <Badge variant="outline" className={`mt-2 ${getScoreColor(verification.score)}`}>
                          {getScoreLabel(verification.score)}
                        </Badge>
                      </div>
                      <div className="p-6 bg-secondary/50 rounded-xl text-center">
                        <div className="font-display text-4xl font-bold text-primary flex items-center justify-center">
                          <DollarSign className="w-8 h-8" />
                          {verification.predictedPrice.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Suggested Price</p>
                        <Badge variant="outline" className="mt-2 text-primary">
                          AI Recommended
                        </Badge>
                      </div>
                    </div>

                    {/* Recommendation Banner */}
                    <div className={`p-4 rounded-xl border ${
                      verification.score >= 60 
                        ? 'bg-green-500/5 border-green-500/20' 
                        : 'bg-orange-500/5 border-orange-500/20'
                    }`}>
                      <p className="text-sm font-medium">{getScoreRecommendation(verification.score)}</p>
                    </div>

                    {/* Summary */}
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-sm">{verification.summary}</p>
                    </div>

                    {/* Strengths & Challenges */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 glass-subtle rounded-xl">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {verification.strengths.map((s, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 glass-subtle rounded-xl">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-orange-500" />
                          Challenges
                        </h4>
                        <ul className="space-y-2">
                          {verification.challenges.map((c, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Market Opportunity */}
                    <div className="p-4 glass-subtle rounded-xl">
                      <h4 className="text-sm font-medium mb-2">Market Opportunity</h4>
                      <p className="text-sm text-muted-foreground">{verification.marketOpportunity}</p>
                    </div>

                    {/* Re-verify */}
                    <Button
                      type="button"
                      onClick={runVerification}
                      disabled={isVerifying}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {isVerifying ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      Run New Analysis
                    </Button>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} size="lg" className="flex-1">
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setStep(3)} 
                    size="lg" 
                    className="flex-1 hover-shine group" 
                    variant="hero"
                    disabled={!verification}
                  >
                    Continue to Pricing
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Tier Selection */}
            {step === 3 && (
              <div className="glass rounded-2xl p-8 shadow-medium animate-scale-in">
                <h2 className="font-display text-2xl font-semibold mb-6">Choose Your Listing Tier</h2>
                
                {verification && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">AI Verified</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>Score: <strong className={getScoreColor(verification.score)}>{verification.score}</strong></span>
                        <span>Suggested: <strong className="text-primary">${verification.predictedPrice.toLocaleString()}</strong></span>
                      </div>
                    </div>
                  </div>
                )}
                
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
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="price">Your Asking Price ($)</Label>
                      {verification && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, price: String(verification.predictedPrice) }))}
                          className="text-xs text-primary"
                        >
                          Use AI Suggested (${verification.predictedPrice.toLocaleString()})
                        </Button>
                      )}
                    </div>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Enter your price"
                      value={formData.price}
                      onChange={handleChange}
                      className="h-12 glass-subtle border-border/50 focus:border-primary/50 transition-all duration-300"
                      required
                    />
                    {verification && formData.price && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {Number(formData.price) > verification.predictedPrice * 1.5 
                          ? '⚠️ Your price is significantly higher than the AI suggestion'
                          : Number(formData.price) < verification.predictedPrice * 0.5
                          ? '💡 Your price is below the AI suggestion - you could potentially charge more'
                          : '✓ Your price aligns with the AI recommendation'}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} size="lg" className="flex-1">
                    Back
                  </Button>
                  <Button type="button" onClick={() => setStep(4)} size="lg" className="flex-1 hover-shine group" variant="hero">
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="glass rounded-2xl p-8 shadow-medium animate-scale-in">
                <h2 className="font-display text-2xl font-semibold mb-6">Review & Submit</h2>
                
                <div className="space-y-4 stagger-children">
                  {/* AI Verification Status */}
                  {verification && (
                    <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        <div>
                          <span className="font-medium text-green-600">AI Verified</span>
                          <span className="text-muted-foreground text-sm ml-2">
                            Score: {verification.score}/100 • Suggested: ${verification.predictedPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

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
                  <Button type="button" variant="outline" onClick={() => setStep(3)} size="lg" className="flex-1">
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
