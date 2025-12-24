import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockIdeas } from '@/data/mockIdeas';
import { CreditCard, Lock, Shield, CheckCircle, ArrowLeft, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const paymentMethods = [
  { id: 'card', name: 'Credit / Debit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', description: 'Pay with PayPal balance' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦', description: 'Direct bank payment' },
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿', description: 'Bitcoin, Ethereum, USDC' },
];

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const idea = mockIdeas.find((i) => i.id === id);

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Auth guard - require login to purchase
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
                Please sign in or create an account to purchase ideas.
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/auth">
                  <Button variant="hero" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In / Sign Up
                  </Button>
                </Link>
                <Link to={`/idea/${id}`}>
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Idea
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

  if (!idea || idea.tier === 'demo') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Idea not available for purchase</h1>
            <Link to="/marketplace">
              <Button>Back to Marketplace</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Payment Successful!',
      description: 'Congratulations! You now have access to the full idea documentation.',
    });
    navigate('/marketplace');
  };

  const platformFee = idea.price * 0.05;
  const total = idea.price + platformFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back link */}
          <Link
            to={`/idea/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Idea
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="order-2 lg:order-1">
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="border-b border-border/50 pb-4 mb-4">
                  <h3 className="font-semibold mb-2">{idea.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{idea.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                    idea.tier === 'premium' ? 'bg-accent/10 text-accent' : 'bg-tier-standard/10 text-tier-standard'
                  }`}>
                    {idea.tier.charAt(0).toUpperCase() + idea.tier.slice(1)} Listing
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Idea Price</span>
                    <span className="font-medium">${idea.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee (5%)</span>
                    <span className="font-medium">${platformFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-border/50 pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-display text-2xl font-bold text-gradient">${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-secondary/50 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">What's Included</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-tier-demo" />
                      Full idea documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-tier-demo" />
                      Market research & analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-tier-demo" />
                      Direct creator contact
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-tier-demo" />
                      Transfer of all rights
                    </li>
                  </ul>
                </div>

                {/* Security */}
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="order-1 lg:order-2">
              <div className="glass rounded-2xl p-6 shadow-medium">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Secure Payment</h2>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <Label className="mb-3 block">Select Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPayment(method.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          selectedPayment === method.id
                            ? 'border-primary glass'
                            : 'border-border/50 glass-subtle hover:border-primary/30'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{method.icon}</span>
                        <span className="font-medium text-sm block">{method.name}</span>
                        <span className="text-xs text-muted-foreground">{method.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Form */}
                {selectedPayment === 'card' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative mt-2">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                          className="pl-12 h-12 glass-subtle"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="mt-2 h-12 glass-subtle"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="mt-2 h-12 glass-subtle"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          className="mt-2 h-12 glass-subtle"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full mt-6 hover-shine">
                      <Lock className="w-5 h-5 mr-2" />
                      Pay ${total.toLocaleString()}
                    </Button>
                  </form>
                )}

                {selectedPayment !== 'card' && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You'll be redirected to complete payment via {paymentMethods.find(m => m.id === selectedPayment)?.name}.
                    </p>
                    <Button variant="hero" size="lg" className="hover-shine" onClick={handleSubmit}>
                      Continue to {paymentMethods.find(m => m.id === selectedPayment)?.name}
                    </Button>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-border/50">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-1">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">SSL Secure</span>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-1">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">Encrypted</span>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-1">
                      <CheckCircle className="w-5 h-5 text-tier-demo" />
                    </div>
                    <span className="text-xs text-muted-foreground">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
