import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedIdeas from '@/components/home/FeaturedIdeas';
import HowItWorks from '@/components/home/HowItWorks';
import TierComparison from '@/components/home/TierComparison';
import AIChatbot from '@/components/chat/AIChatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedIdeas />
        <HowItWorks />
        <TierComparison />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
