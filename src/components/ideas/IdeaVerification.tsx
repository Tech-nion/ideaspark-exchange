import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  Loader2,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerificationAnalysis {
  score: number;
  predictedPrice: number;
  strengths: string[];
  challenges: string[];
  marketOpportunity: string;
  summary: string;
}

interface IdeaVerificationProps {
  ideaId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  existingAnalysis?: string | null;
  existingScore?: number | null;
  existingPredictedPrice?: number | null;
  isVerified?: boolean;
}

const IdeaVerification = ({
  ideaId,
  title,
  description,
  category,
  tags,
  existingAnalysis,
  existingScore,
  existingPredictedPrice,
  isVerified = false,
}: IdeaVerificationProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<VerificationAnalysis | null>(() => {
    if (existingAnalysis) {
      try {
        return JSON.parse(existingAnalysis);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [verified, setVerified] = useState(isVerified);

  const runVerification = async () => {
    setIsLoading(true);
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
            ideaId,
            title,
            description,
            category,
            tags,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Verification failed');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      setVerified(true);
      
      toast({
        title: 'Verification Complete',
        description: `This idea scored ${data.analysis.score}/100`,
      });
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: 'Verification Failed',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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

  if (!verified && !analysis) {
    return (
      <div className="glass rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">AI Verification</h3>
            <p className="text-sm text-muted-foreground">Get AI-powered analysis</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Our AI will analyze this idea's market viability, predict its value, and identify strengths and challenges.
        </p>
        <Button 
          onClick={runVerification} 
          disabled={isLoading}
          className="w-full"
          variant="hero"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 mr-2" />
              Verify & Predict Price
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 shadow-soft space-y-5">
      {/* Header with Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              AI Verified
              <Badge variant="secondary" className="text-xs">
                {new Date().toLocaleDateString()}
              </Badge>
            </h3>
          </div>
        </div>
      </div>

      {/* Score Display */}
      {analysis && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/50 rounded-xl text-center">
              <div className={`font-display text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Viability Score</p>
              <Badge variant="outline" className={`mt-2 ${getScoreColor(analysis.score)}`}>
                {getScoreLabel(analysis.score)}
              </Badge>
            </div>
            <div className="p-4 bg-secondary/50 rounded-xl text-center">
              <div className="font-display text-3xl font-bold text-primary flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
                {analysis.predictedPrice.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Predicted Value</p>
              <Badge variant="outline" className="mt-2 text-primary">
                AI Estimate
              </Badge>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-sm">{analysis.summary}</p>
          </div>

          {/* Strengths */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Strengths
            </h4>
            <ul className="space-y-2">
              {analysis.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-orange-500" />
              Challenges
            </h4>
            <ul className="space-y-2">
              {analysis.challenges.map((challenge, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          {/* Market Opportunity */}
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-medium mb-2">Market Opportunity</h4>
            <p className="text-sm text-muted-foreground">{analysis.marketOpportunity}</p>
          </div>

          {/* Re-verify button */}
          <Button 
            onClick={runVerification} 
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Re-analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Run New Analysis
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default IdeaVerification;
