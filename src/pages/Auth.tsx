import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const { toast } = useToast();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          let message = error.message;
          if (error.message.includes('Invalid login credentials')) {
            message = 'Invalid email or password. Please try again.';
          }
          toast({
            title: 'Sign in failed',
            description: message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully signed in.',
          });
          navigate('/');
        }
      } else {
        if (formData.password.length < 6) {
          toast({
            title: 'Invalid password',
            description: 'Password must be at least 6 characters long.',
            variant: 'destructive',
          });
          setIsSubmitting(false);
          return;
        }
        
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          let message = error.message;
          if (error.message.includes('User already registered')) {
            message = 'This email is already registered. Please sign in instead.';
          }
          toast({
            title: 'Sign up failed',
            description: message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Account created!',
            description: 'You have been signed in automatically.',
          });
          navigate('/');
        }
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="w-full max-w-md relative animate-scale-in">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Lightbulb className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">IdeaXchange</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? 'Sign in to access your ideas and purchases'
                : 'Join the marketplace for innovative startup ideas'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="animate-slide-up">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-2 group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-12 h-12 glass-subtle border-border/50 focus:border-primary/50 transition-all duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            )}

            <div className="animate-slide-up" style={{ animationDelay: '50ms' }}>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2 group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-12 h-12 glass-subtle border-border/50 focus:border-primary/50 transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2 group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-12 pr-12 h-12 glass-subtle border-border/50 focus:border-primary/50 transition-all duration-300"
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters</p>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-end animate-fade-in">
                <button type="button" className="text-sm text-primary hover:underline transition-all duration-300 hover:text-primary/80">
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full hover-shine group animate-slide-up" 
              style={{ animationDelay: '150ms' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center mt-8 text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium hover:underline transition-all duration-300"
              disabled={isSubmitting}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 gradient-mesh relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <div className="absolute top-20 right-20 w-72 h-72 orb orb-primary animate-float" />
        <div className="absolute bottom-20 left-20 w-56 h-56 orb orb-accent animate-float" style={{ animationDelay: '3s' }} />
        
        <div className="relative z-10 text-center max-w-md animate-blur-in">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center shadow-glow animate-float">
              <Lightbulb className="w-12 h-12 text-primary-foreground" />
            </div>
            {/* Floating sparkles */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-3 w-4 h-4 text-primary animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <h2 className="font-display text-3xl font-bold mb-4">
            Turn Ideas Into Reality
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of innovators and investors on the premier marketplace for startup ideas.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 stagger-children">
            <div className="glass p-4 rounded-xl hover-lift cursor-default">
              <span className="font-display text-2xl font-bold block">5K+</span>
              <span className="text-sm text-muted-foreground">Ideas</span>
            </div>
            <div className="glass p-4 rounded-xl hover-lift cursor-default">
              <span className="font-display text-2xl font-bold block">12K+</span>
              <span className="text-sm text-muted-foreground">Users</span>
            </div>
            <div className="glass p-4 rounded-xl hover-lift cursor-default">
              <span className="font-display text-2xl font-bold block">$2M+</span>
              <span className="text-sm text-muted-foreground">Sold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
