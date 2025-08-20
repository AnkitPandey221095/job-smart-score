import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Target, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ATSResult {
  score: number;
  feedback: string[];
  strengths: string[];
  improvements: string[];
}

const ATSChecker = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [document, setDocument] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setDocument(file);
    toast({
      title: "File uploaded",
      description: `${file.name} uploaded successfully.`,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const calculateATSScore = async (): Promise<ATSResult> => {
    // Mock ATS analysis - in real app, this would use AI/ML APIs
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    
    const jobTitleWords = jobTitle.toLowerCase().split(' ');
    const expYears = parseInt(experience) || 0;
    
    // Basic scoring algorithm
    let score = 65; // Base score
    
    // Job title relevance (mock analysis)
    if (jobTitleWords.some(word => ['developer', 'engineer', 'manager', 'analyst'].includes(word))) {
      score += 10;
    }
    
    // Experience alignment
    if (expYears >= 3 && expYears <= 8) {
      score += 15;
    } else if (expYears > 8) {
      score += 10;
    }
    
    // Document format bonus
    if (document?.type === 'application/pdf') {
      score += 5;
    }
    
    // Add some randomness for demo
    score += Math.floor(Math.random() * 10) - 5;
    score = Math.min(100, Math.max(0, score));
    
    const feedback = [
      `Resume analyzed for ${jobTitle} position`,
      `Experience level: ${expYears} years`,
      `Document format: ${document?.type.split('/')[1]?.toUpperCase() || 'Unknown'}`
    ];
    
    const strengths = [
      'Professional document structure detected',
      'Keywords aligned with job requirements',
      'Appropriate experience level for role'
    ];
    
    const improvements = [
      'Consider adding more industry-specific keywords',
      'Include quantifiable achievements',
      'Optimize section headers for ATS parsing'
    ];
    
    return { score, feedback, strengths, improvements };
  };

  const handleAnalyze = async () => {
    if (!jobTitle.trim() || !experience.trim() || !document) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and upload a document.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const analysisResult = await calculateATSScore();
      setResult(analysisResult);
      toast({
        title: "Analysis complete",
        description: `Your ATS score is ${analysisResult.score}%`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center text-white py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-8 w-8" />
            <h1 className="text-4xl font-bold">ATS Resume Checker</h1>
          </div>
          <p className="text-xl opacity-90">
            Optimize your resume for Applicant Tracking Systems
          </p>
        </div>

        {/* Input Form */}
        <Card className="bg-gradient-card shadow-elevated border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Resume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Software Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g. 5"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Resume/CV Document</Label>
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/30"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
                {document ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <FileText className="h-6 w-6" />
                    <span className="font-medium">{document.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Click to upload or drag and drop your resume
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PDF, DOC, DOCX, or TXT (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white font-semibold py-6 text-lg"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing Resume...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Check ATS Score
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="bg-gradient-card shadow-elevated border-0 animate-in slide-in-from-bottom duration-500">
            <CardHeader>
              <CardTitle>ATS Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Display */}
              <div className="text-center py-8">
                <div className={`text-6xl font-bold ${getScoreColor(result.score)} mb-2`}>
                  {result.score}%
                </div>
                <div className={`text-xl font-semibold ${getScoreColor(result.score)} mb-4`}>
                  {getScoreLabel(result.score)}
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      result.score >= 80 ? 'bg-success' : 
                      result.score >= 60 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              {/* Feedback Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-success flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-warning flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    Improvements
                  </h3>
                  <ul className="space-y-2">
                    {result.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-warning rounded-full mt-2 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Analysis Summary */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Analysis Summary</h3>
                <div className="space-y-1">
                  {result.feedback.map((item, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ATSChecker;