import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import AIChatbot from '@/components/chat/AIChatbot';

const teamMembers = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & CEO',
    bio: 'Former venture capitalist with 15+ years of experience in tech startups. Passionate about democratizing access to innovative ideas.',
    image: 'AC',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Marcus Thompson',
    role: 'Co-Founder & CTO',
    bio: 'Ex-Google engineer with a vision for building platforms that connect innovators with capital.',
    image: 'MT',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Sarah Williams',
    role: 'Chief Operating Officer',
    bio: 'Operations expert who scaled multiple startups from seed to Series C. Ensures seamless platform experience.',
    image: 'SW',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'David Park',
    role: 'Head of Product',
    bio: 'Product visionary focused on creating intuitive experiences for idea creators and investors alike.',
    image: 'DP',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Emily Foster',
    role: 'Head of Growth',
    bio: 'Growth hacker extraordinaire who has helped onboard thousands of innovators to the platform.',
    image: 'EF',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'James Rodriguez',
    role: 'Lead Engineer',
    bio: 'Full-stack wizard ensuring the platform runs smoothly, securely, and scales globally.',
    image: 'JR',
    linkedin: '#',
    twitter: '#',
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-40" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Meet Our Team
              </h1>
              <p className="text-muted-foreground text-lg">
                The passionate individuals behind IdeaXchange, dedicated to connecting innovators with investors worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {teamMembers.slice(0, 2).map((member, index) => (
                <div
                  key={member.name}
                  className="glass rounded-2xl p-8 text-center hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-24 h-24 rounded-full gradient-hero flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary-foreground shadow-glow">
                    {member.image}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-6">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a href={member.linkedin} className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.twitter} className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Grid */}
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {teamMembers.slice(2).map((member, index) => (
                <div
                  key={member.name}
                  className="glass rounded-2xl p-6 text-center hover-lift group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-lg font-semibold text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    {member.image}
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💡</span>
                  </div>
                  <h3 className="font-semibold mb-2">Innovation First</h3>
                  <p className="text-sm text-muted-foreground">We believe every idea has potential to change the world.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <h3 className="font-semibold mb-2">Trust & Transparency</h3>
                  <p className="text-sm text-muted-foreground">Building trust between creators and investors is our priority.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-tier-demo/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="font-semibold mb-2">Growth Mindset</h3>
                  <p className="text-sm text-muted-foreground">Empowering dreamers to become entrepreneurs.</p>
                </div>
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

export default Team;
