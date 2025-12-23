import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight, TrendingUp, Users, DollarSign, CheckCircle } from 'lucide-react';
import AIChatbot from '@/components/chat/AIChatbot';

const reviews = [
  {
    name: 'Michael Roberts',
    role: 'Serial Entrepreneur',
    company: 'TechVentures Inc.',
    rating: 5,
    review: 'IdeaXchange transformed how I find investment opportunities. I\'ve purchased 3 ideas and two are already generating revenue. The premium listings are worth every penny.',
    avatar: 'MR',
    type: 'buyer',
  },
  {
    name: 'Jennifer Liu',
    role: 'Startup Founder',
    company: 'GreenTech Solutions',
    rating: 5,
    review: 'Sold my sustainable packaging idea for $12,000. The platform made it incredibly easy to showcase my concept and connect with serious investors.',
    avatar: 'JL',
    type: 'seller',
  },
  {
    name: 'David Anderson',
    role: 'Angel Investor',
    company: 'Anderson Capital',
    rating: 5,
    review: 'The quality of ideas on this platform is exceptional. The verification process ensures you\'re investing in legitimate concepts. Highly recommend for serious investors.',
    avatar: 'DA',
    type: 'buyer',
  },
  {
    name: 'Sarah Martinez',
    role: 'Product Designer',
    company: 'Creative Labs',
    rating: 5,
    review: 'As a first-time idea seller, I was nervous. The support team guided me through everything. My AI productivity tool concept sold within 2 weeks!',
    avatar: 'SM',
    type: 'seller',
  },
  {
    name: 'Robert Kim',
    role: 'VC Partner',
    company: 'Innovation Ventures',
    rating: 5,
    review: 'We\'ve sourced 5 portfolio companies through IdeaXchange. The platform provides quality deal flow that you simply can\'t find elsewhere.',
    avatar: 'RK',
    type: 'buyer',
  },
  {
    name: 'Emma Thompson',
    role: 'Tech Consultant',
    company: 'Digital Strategies',
    rating: 5,
    review: 'The AI chatbot helped me refine my idea positioning. Sold my SaaS concept for $8,500. The 15% commission is fair for the exposure you get.',
    avatar: 'ET',
    type: 'seller',
  },
];

const stats = [
  { icon: TrendingUp, value: '$2M+', label: 'Ideas Sold' },
  { icon: Users, value: '12,000+', label: 'Happy Users' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
  { icon: DollarSign, value: '500+', label: 'Successful Deals' },
];

const Reviews = () => {
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
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-medium">Trusted by Thousands</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                What Our Users Say
              </h1>
              <p className="text-muted-foreground text-lg">
                Real stories from innovators and investors who've transformed their ideas into success.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-6 text-center hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <p className="font-display text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {reviews.map((review, index) => (
                <div
                  key={review.name}
                  className="glass rounded-2xl p-6 hover-lift relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                  
                  {/* Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    review.type === 'buyer' 
                      ? 'bg-tier-standard/10 text-tier-standard' 
                      : 'bg-tier-demo/10 text-tier-demo'
                  }`}>
                    {review.type === 'buyer' ? 'Buyer' : 'Seller'}
                  </span>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  
                  {/* Review */}
                  <p className="text-foreground mb-6 leading-relaxed">&quot;{review.review}&quot;</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.role}, {review.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Success Stories</h2>
              
              <div className="glass rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                      Featured Story
                    </span>
                    <h3 className="font-display text-2xl font-bold mb-4">
                      From Idea to $500K Valuation
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Jennifer Liu submitted her sustainable packaging idea as a Premium listing. Within 3 weeks, she connected with David Anderson who purchased the concept for $12,000. Together, they built a company now valued at over $500,000.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-tier-demo" />
                        <span>Listed as Premium tier</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-tier-demo" />
                        <span>Sold within 21 days</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-tier-demo" />
                        <span>Now a thriving business</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-48 h-48 rounded-3xl gradient-hero flex items-center justify-center shadow-premium animate-float">
                      <span className="text-6xl">🚀</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of innovators and investors on the premier marketplace for startup ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/submit">
                <Button variant="hero" size="lg" className="hover-shine group">
                  Submit Your Idea
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" size="lg">
                  Browse Ideas
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Reviews;
