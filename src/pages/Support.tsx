import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, MessageCircle, FileText, Zap, Shield, CreditCard, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AIChatbot from '@/components/chat/AIChatbot';

const categories = [
  { icon: Zap, title: 'Getting Started', count: 12, color: 'bg-primary/10 text-primary' },
  { icon: CreditCard, title: 'Payments & Billing', count: 8, color: 'bg-accent/10 text-accent' },
  { icon: Shield, title: 'Security & Privacy', count: 6, color: 'bg-tier-demo/10 text-tier-demo' },
  { icon: Users, title: 'Account Management', count: 10, color: 'bg-tier-standard/10 text-tier-standard' },
  { icon: FileText, title: 'Selling Ideas', count: 15, color: 'bg-primary/10 text-primary' },
  { icon: MessageCircle, title: 'Buying & Investing', count: 9, color: 'bg-accent/10 text-accent' },
];

const faqs = [
  {
    question: 'How do I submit an idea?',
    answer: 'Navigate to the Submit Idea page, fill in the details about your concept, choose your pricing tier, and submit for review. Your idea will be live within 24 hours after approval.',
  },
  {
    question: 'How are payments processed?',
    answer: 'We use secure payment processing with Stripe. Buyers can pay with credit cards, debit cards, or bank transfers. Sellers receive payments within 7 business days after a successful sale.',
  },
  {
    question: 'Is my idea protected before purchase?',
    answer: 'Yes! Standard and Premium listings keep your detailed documentation private until after purchase. We also provide NDA templates and legal protection guidelines.',
  },
  {
    question: 'What fees does IdeaXchange charge?',
    answer: 'We charge a 15% commission on successful sales. Listing fees are: Demo (Free), Standard ($49), Premium ($149). No hidden fees.',
  },
  {
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'We offer a 7-day satisfaction guarantee. If the idea doesn\'t match the description, contact our support team for a full refund.',
  },
  {
    question: 'How do I become a verified seller?',
    answer: 'Sellers with 3+ successful sales and positive reviews automatically earn verified status. Premium sellers get priority verification.',
  },
];

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Help Center</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                How Can We Help?
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Search our knowledge base or browse categories below
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 glass text-lg rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {categories.map((cat, index) => (
                <div
                  key={cat.title}
                  className="glass rounded-2xl p-6 hover-lift cursor-pointer group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{cat.title}</h3>
                      <p className="text-sm text-muted-foreground">{cat.count} articles</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group glass rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 list-none">
                    <h3 className="font-semibold pr-4 group-hover:text-primary transition-colors">{faq.question}</h3>
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-open:rotate-45 transition-transform duration-300">
                      <span className="text-xl leading-none">+</span>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Still Need Help?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our support team is available 24/7 to assist you with any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="hover-shine">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Schedule a Call
                </Button>
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

export default Support;
