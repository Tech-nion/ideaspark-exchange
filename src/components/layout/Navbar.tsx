import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lightbulb, Menu, X, Search, User, Plus, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const mainLinks = [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/pricing', label: 'Pricing' },
  ];

  const moreLinks = [
    { href: '/reviews', label: 'Reviews' },
    { href: '/team', label: 'Our Team' },
    { href: '/support', label: 'Support' },
    { href: '/contact', label: 'Contact' },
    { href: '/get-quote', label: 'Get a Quote' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass shadow-soft py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-all duration-300 group-hover:rotate-3">
              <Lightbulb className="w-5 h-5 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Idea<span className="text-gradient">Xchange</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden group ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  isActive(link.href) 
                    ? 'bg-primary/10' 
                    : 'bg-transparent group-hover:bg-secondary'
                }`} />
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}

            {/* More Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300">
                More
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 glass rounded-xl shadow-medium border border-border/50 py-2 animate-scale-in">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`block px-4 py-2.5 text-sm transition-all duration-300 ${
                        isActive(link.href)
                          ? 'text-primary bg-primary/5'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-secondary/80 transition-all duration-300 hover:scale-105">
              <Search className="w-5 h-5" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hover-glow">
                    <User className="w-4 h-4 mr-2" />
                    {user.email?.split('@')[0] || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-muted-foreground text-xs">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/my-ideas')}>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    My Ideas
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="hover-glow">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            
            <Link to="/submit">
              <Button variant="hero" size="sm" className="hover-shine">
                <Plus className="w-4 h-4 mr-2" />
                Submit Idea
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-all duration-300 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up glass-subtle rounded-b-2xl mt-2">
            <div className="flex flex-col gap-1">
              {[...mainLinks, ...moreLinks].map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                {user ? (
                  <>
                    <Link to="/my-ideas" className="w-full" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        My Ideas
                      </Button>
                    </Link>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                      <Link to="/submit" className="flex-1" onClick={() => setIsOpen(false)}>
                        <Button variant="hero" className="w-full">Submit</Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/submit" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" className="w-full">Submit</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
