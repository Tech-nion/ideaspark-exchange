import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Send, DollarSign, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import AIChatbot from '@/components/chat/AIChatbot';

const GetQuote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    ideaType: '',
    description: '',
    timeline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Quote Request Submitted!',
      description: 'Our team will review your request and get back to you within 24 hours with a custom quote.',
    });
    setFormData({ name: '', email: '', company: '', budget: '', ideaType: '', description: '', timeline: '' });
  };

  const benefits = [
    'Custom pricing for bulk purchases',
    'Exclusive access to premium ideas',
    'Dedicated account manager',
    'Priority support and consultation',
    'Volume discounts available',
    'Flexible payment terms',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-40" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Custom Pricing</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Get a Custom Quote
              </h1>
              <p className="text-muted-foreground text-lg">
                Looking for bulk purchases or enterprise solutions? Get personalized pricing tailored to your needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Benefits */}
              <div>
                <h2 className="font-display text-2xl font-semibold mb-6">Why Request a Quote?</h2>
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-3 glass rounded-xl p-4 hover-lift"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-tier-demo/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-tier-demo" />
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Info */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-accent" />
                    <h3 className="font-semibold text-lg">Enterprise Pricing</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    For organizations looking to acquire multiple ideas or establish ongoing partnerships, we offer:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Up to 30% volume discounts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Annual subscription plans
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      White-label solutions
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quote Form */}
              <div>
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 shadow-medium">
                  <h2 className="font-display text-2xl font-semibold mb-6">Request Your Quote</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="mt-2 h-12 glass-subtle"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="mt-2 h-12 glass-subtle"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your Company"
                        className="mt-2 h-12 glass-subtle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Estimated Budget</Label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="mt-2 w-full h-12 px-4 rounded-lg glass-subtle border border-border/50 text-foreground"
                        required
                      >
                        <option value="">Select budget range</option>
                        <option value="1k-5k">$1,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="ideaType">Idea Category Interest</Label>
                      <select
                        id="ideaType"
                        value={formData.ideaType}
                        onChange={(e) => setFormData({ ...formData, ideaType: e.target.value })}
                        className="mt-2 w-full h-12 px-4 rounded-lg glass-subtle border border-border/50 text-foreground"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="fintech">FinTech</option>
                        <option value="healthtech">HealthTech</option>
                        <option value="saas">SaaS</option>
                        <option value="ecommerce">E-Commerce</option>
                        <option value="ai">AI / Machine Learning</option>
                        <option value="multiple">Multiple Categories</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Timeline</Label>
                      <select
                        id="timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="mt-2 w-full h-12 px-4 rounded-lg glass-subtle border border-border/50 text-foreground"
                        required
                      >
                        <option value="">When do you need this?</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1month">Within 1 month</option>
                        <option value="3months">Within 3 months</option>
                        <option value="exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="description">Tell Us About Your Needs</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what you're looking for, how many ideas you're interested in, and any specific requirements..."
                      rows={5}
                      className="mt-2 glass-subtle resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full hover-shine group">
                    <Send className="w-5 h-5 mr-2" />
                    Request Quote
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default GetQuote;
