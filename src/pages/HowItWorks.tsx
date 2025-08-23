import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Target, 
  CheckCircle, 
  TrendingUp, 
  FileText, 
  Upload,
  Search,
  Download,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  Clock,
  Shield,
  RefreshCw,
  Star
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Resume',
      description: 'Simply upload your existing resume in PDF or Word format. Our system accepts all major file types.',
      details: 'Supported formats: PDF, DOC, DOCX. Maximum file size: 10MB.'
    },
    {
      icon: Search,
      title: 'AI Analysis',
      description: 'Our advanced AI scans your resume against 50+ ATS criteria and job market requirements.',
      details: 'Analysis includes keyword optimization, formatting checks, and content structure evaluation.'
    },
    {
      icon: TrendingUp,
      title: 'Get Your Score',
      description: 'Receive an instant ATS compatibility score with detailed breakdown of strengths and weaknesses.',
      details: 'Scores range from 0-100, with recommendations to reach 85+ for optimal ATS performance.'
    },
    {
      icon: RefreshCw,
      title: 'Implement Changes',
      description: 'Follow our specific recommendations to optimize keywords, formatting, and content structure.',
      details: 'Get actionable insights on missing keywords, formatting issues, and content improvements.'
    },
    {
      icon: Download,
      title: 'Download Report',
      description: 'Get a comprehensive PDF report with all recommendations and before/after comparisons.',
      details: 'Includes detailed analysis, keyword suggestions, and formatting guidelines.'
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: '3x Higher Interview Rate',
      description: 'Optimized resumes get past ATS filters and reach human recruiters 3 times more often.',
      stat: '300% increase'
    },
    {
      icon: Clock,
      title: 'Save 20+ Hours',
      description: 'Avoid manual research and guesswork. Get professional-level optimization in minutes.',
      stat: '20+ hours saved'
    },
    {
      icon: Users,
      title: 'Beat 90% of Applicants',
      description: 'Most resumes score below 60%. Our optimizations help you reach the top 10%.',
      stat: '90% outperformed'
    },
    {
      icon: Award,
      title: '92% Success Rate',
      description: 'Users who implement our recommendations see significant improvement in job responses.',
      stat: '92% success'
    }
  ];

  const features = [
    'ATS-friendly formatting analysis',
    'Keyword optimization suggestions',
    'Industry-specific recommendations',
    'Real-time scoring system',
    'Comprehensive feedback reports',
    'Multiple format support',
    'Privacy-protected analysis',
    'Unlimited revisions'
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border/10 bg-card/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ResumeScore AI
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/checker">
                <Button variant="outline" size="sm">
                  Try Now
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            How ResumeScore AI Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our AI-powered platform transforms your resume into an ATS-optimized 
            document that gets you noticed by recruiters and hiring managers.
          </p>
        </div>

        {/* Steps Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Simple 5-Step Process
          </h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="bg-gradient-card border-border/20 shadow-card hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex items-center gap-4 md:flex-col md:text-center">
                      <div className="bg-primary/10 p-4 rounded-full">
                        <step.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
                      <p className="text-lg text-muted-foreground mb-2">{step.description}</p>
                      <p className="text-sm text-muted-foreground/80">{step.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why It Improves Your Job Prospects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gradient-card border-border/20 shadow-card">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                          {benefit.stat}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            What You Get
          </h2>
          <Card className="bg-gradient-card border-border/20 shadow-card">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Privacy & Security */}
        <section className="mb-20">
          <Card className="bg-gradient-card border-border/20 shadow-card">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Your Privacy is Protected</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your resume data is encrypted and never stored permanently. We analyze your document 
                in real-time and delete all data immediately after providing your results. 
                Your information remains completely confidential.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
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
                Ready to Boost Your Resume?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have improved their ATS scores and 
                landed interviews at top companies.
              </p>
              <Link to="/checker">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white font-semibold px-8 py-6 text-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Your Free Analysis
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;