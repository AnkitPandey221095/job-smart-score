// Utility to manage resume analysis statistics
export interface ResumeStats {
  resumesAnalyzed: number;
  averageScoreImprovement: number;
  successRate: number;
}

const STORAGE_KEY = 'resume-stats';

export const getResumeStats = (): ResumeStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading resume stats:', error);
  }
  
  // Default values - starting from zero
  return {
    resumesAnalyzed: 0,
    averageScoreImprovement: 0,
    successRate: 0,
  };
};

export const incrementResumeAnalyzed = (score: number): void => {
  const stats = getResumeStats();
  const newCount = stats.resumesAnalyzed + 1;
  
  // Calculate new averages (simplified logic for demo)
  const newAverageImprovement = Math.min(Math.round((stats.averageScoreImprovement * stats.resumesAnalyzed + Math.max(0, score - 50)) / newCount), 50);
  const newSuccessRate = Math.min(Math.round((stats.successRate * stats.resumesAnalyzed + (score >= 70 ? 100 : 0)) / newCount), 100);
  
  const updatedStats: ResumeStats = {
    resumesAnalyzed: newCount,
    averageScoreImprovement: newAverageImprovement,
    successRate: newSuccessRate,
  };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
  } catch (error) {
    console.error('Error saving resume stats:', error);
  }
};