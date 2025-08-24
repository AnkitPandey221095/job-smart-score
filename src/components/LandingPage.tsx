import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getResumeStats } from '@/lib/resumeStats';
import { 
  Target, 
  CheckCircle, 
  TrendingUp, 
  FileText, 
  Sparkles, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Award
} from 'lucide-react';

const LandingPage = () => {
  const [resumeStats, setResumeStats] = useState(getResumeStats());

  useEffect(() => {
    // Update stats on component mount and when localStorage changes
    const handleStorageChange = () => {
      setResumeStats(getResumeStats());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for updates periodically in case of same-tab changes
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { 
      icon: Users, 
      label: 'Resumes Analyzed', 
      value: resumeStats.resumesAnalyzed.toString()
    },
    { 
      icon: TrendingUp, 
      label: 'Average Score Improvement', 
      value: resumeStats.averageScoreImprovement > 0 ? `${resumeStats.averageScoreImprovement}%` : '0%'
    },
    { 
      icon: Award, 
      label: 'Success Rate', 
      value: resumeStats.successRate > 0 ? `${resumeStats.successRate}%` : '0%'
    },
  ];

  const features = [
    {
      icon: Target,
      title: 'ATS Optimization',
      description: 'Advanced algorithms analyze your resume against ATS requirements and provide detailed optimization suggestions.'
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get comprehensive feedback in seconds. No waiting, no delays - just instant, actionable insights.'
    },
    {
      icon: CheckCircle,
      title: 'Detailed Feedback',
      description: 'Receive specific recommendations for keywords, formatting, and content structure improvements.'
    },
    {
      icon: TrendingUp,
      title: 'Score Tracking',
      description: 'Track your ATS score improvements over time and see how changes impact your success rate.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border/10 bg-card/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ResumeScore AI
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Beat the ATS,
              <br />
              Land Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our AI-powered resume checker analyzes your resume against Applicant Tracking Systems 
              and provides personalized optimization recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checker">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white font-semibold px-8 py-6 text-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Check My Resume
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-border bg-card/50 backdrop-blur-sm">
                  <FileText className="h-5 w-5 mr-2" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-border/20 shadow-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center">
                  <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Why Choose ResumeScore AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI technology provides comprehensive resume analysis 
              to help you stand out in today's competitive job market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border/20 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-card border-border/20 shadow-elevated">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Ready to Optimize Your Resume?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of job seekers who have improved their ATS scores and landed their dream jobs.
              </p>
              <Link to="/checker">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white font-semibold px-8 py-6 text-lg">
                  <Target className="h-5 w-5 mr-2" />
                  Start Free Analysis
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">ResumeScore AI</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 ResumeScore AI. Helping job seekers optimize their resumes for ATS success.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;