import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TierComparison from '@/components/home/TierComparison';
import AIChatbot from '@/components/chat/AIChatbot';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does the idea selling process work?',
    answer: 'Submit your idea, choose a tier, set your price. Once a buyer purchases, we facilitate the secure transfer of documentation and handle payment processing. You receive payment within 7 days.',
  },
  {
    question: 'Are my ideas protected before purchase?',
    answer: 'Yes! Standard and Premium listings keep your detailed documentation private until after purchase. We also offer NDA templates for additional protection.',
  },
  {
    question: 'What happens after someone buys my idea?',
    answer: 'The buyer receives full access to your documentation. You transfer all rights to the concept. We provide templates for transfer agreements.',
  },
  {
    question: 'Can I list the same idea multiple times?',
    answer: 'Each idea can only be sold once. Once purchased, it\'s exclusively owned by the buyer. Demo ideas remain visible but are clearly marked as concept showcases.',
  },
  {
    question: 'What fees does IdeaXchange charge?',
    answer: 'We charge a 15% commission on successful sales, plus the listing fee for Standard ($49) or Premium ($149) tiers. Demo listings are completely free.',
  },
  {
    question: 'How do I become a verified seller?',
    answer: 'Premium sellers with 3+ successful sales and positive reviews earn verified status. This badge increases buyer trust and visibility.',
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the right tier for your idea. From free demos to premium listings with maximum visibility.
            </p>
          </div>
        </section>

        {/* Tier Comparison */}
        <TierComparison />

        {/* FAQ Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-card rounded-xl border border-border p-6 shadow-soft"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="font-semibold pr-4">{faq.question}</h3>
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-open:rotate-45 transition-transform">
                      <span className="text-xl leading-none">+</span>
                    </div>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Pricing;
