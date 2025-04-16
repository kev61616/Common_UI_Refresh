"use client";

import React, { useState, useEffect } from 'react';
import MathSkillsChart from '../charts/math/MathSkillsChart';
import ProblemSolvingMatrix from '../charts/math/ProblemSolvingMatrix';
import ProgressMetricCard from '../charts/base/ProgressMetricCard';
import ChartSkeleton from '../charts/ui/ChartSkeleton';
import ChartErrorState from '../charts/ui/ChartErrorState';
import { ProblemDataPoint } from '../charts/math/ProblemSolvingMatrix';

interface MathData {
  score: {
    current: number;
    previous: number;
    change: number;
  };
  skills: {
    id: string;
    name: string;
    value: number;
    previousValue?: number;
  }[];
  problemData: ProblemDataPoint[];
}

export interface MathChartsContainerProps {
  studentId: string;
  className?: string;
}

// This data would typically come from an API
const MOCK_MATH_DATA: MathData = {
  score: {
    current: 770,
    previous: 740,
    change: 30
  },
  skills: [
    { id: 'algebra', name: 'Algebra', value: 82, previousValue: 78 },
    { id: 'geometry', name: 'Geometry', value: 70, previousValue: 65 },
    { id: 'dataAnalysis', name: 'Data Analysis', value: 85, previousValue: 80 }
  ],
  problemData: Array.from({ length: 40 }).map((_, i) => {
    // Distribute problems across domains
    const domainIndex = i % 4;
    const domain = ['algebra', 'geometry', 'dataAnalysis', 'algebra'][domainIndex];
    
    // Create some realistic-looking data
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // Last 90 days
    
    // Randomize difficulty from 1-5
    const difficulty = Math.floor(Math.random() * 5) + 1;
    
    // Base time spent increases with difficulty
    const baseTime = 30 + (difficulty * 15);
    const timeVariation = Math.random() * 30 - 15; // +/- 15 seconds
    const timeSpent = Math.max(10, baseTime + timeVariation);
    
    // Accuracy decreases with difficulty but with some variation
    let baseAccuracy = 95 - (difficulty * 10);
    const accuracyVariation = Math.random() * 20 - 10; // +/- 10%
    const accuracy = Math.min(100, Math.max(0, baseAccuracy + accuracyVariation));
    
    // Determine if correct based on accuracy
    const correctAnswer = Math.random() * 100 < accuracy;
    
    // Generate a problem ID
    const problemId = `problem-${i + 1}`;
    
    // Add subdomain for some problems
    const subdomains = {
      algebra: ['Equations', 'Functions', 'Expressions', 'Inequalities'],
      geometry: ['Triangles', 'Circles', 'Angles', 'Transformations'],
      dataAnalysis: ['Statistics', 'Probability', 'Data Representation', 'Correlation']
    };
    
    const subdomain = Math.random() > 0.3 
      ? subdomains[domain as keyof typeof subdomains][Math.floor(Math.random() * 4)]
      : undefined;
    
    return {
      problemId,
      domain,
      subdomain,
      difficulty,
      timeSpent,
      accuracy,
      attemptDate: date.toISOString().split('T')[0],
      correctAnswer,
      partialCredit: correctAnswer ? undefined : Math.floor(Math.random() * 70)
    };
  })
};

const MathChartsContainer: React.FC<MathChartsContainerProps> = ({
  studentId,
  className = ''
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<MathData | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [quadrantView, setQuadrantView] = useState(true);
  const [filteredProblemTypes, setFilteredProblemTypes] = useState<string[]>(['algebra', 'geometry', 'dataAnalysis']);

  useEffect(() => {
    // This would be an API call in a real implementation
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for now
        setData(MOCK_MATH_DATA);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch math data'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [studentId]);

  // Handle skill selection
  const handleSkillSelect = (skill: { id: string }) => {
    setSelectedSkill(prev => prev === skill.id ? null : skill.id);
    
    // Filter problem types to show only the selected skill, or show all if deselecting
    if (selectedSkill !== skill.id) {
      setFilteredProblemTypes([skill.id]);
    } else {
      setFilteredProblemTypes(['algebra', 'geometry', 'dataAnalysis']);
    }
  };

  // Handle problem type toggling
  const toggleProblemType = (type: string) => {
    setFilteredProblemTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton type="line" height={240} />
          <ChartSkeleton type="bar" height={240} />
          <ChartSkeleton type="line" height={360} className="lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <ChartErrorState 
        error={error || 'No data available'} 
        onRetry={() => window.location.reload()}
        className={className}
      />
    );
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Math Score Card */}
        <ProgressMetricCard 
          current={data.score.current}
          previous={data.score.previous}
          change={data.score.change}
          trend={data.score.change >= 0 ? 'up' : 'down'}
          color="var(--color-cyan-500)" // Use cyan for math
          enableAnimation={true}
          comparisonPeriod="last month"
          title="Current Math Score"
          maxValue={800}
        />
        
        {/* Math Skills Chart */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Math Skills</h3>
          <MathSkillsChart 
            skills={data.skills}
            type="bar"
            showPercentages={true}
            enableComparison={true}
            height={240}
            onSkillSelect={handleSkillSelect}
          />
        </div>
        
        {/* Problem Solving Matrix */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-foreground mb-4">Problem Solving Efficiency</h3>
          <ProblemSolvingMatrix 
            data={data.problemData}
            problemTypes={filteredProblemTypes}
            quadrantView={quadrantView}
            height={350}
          />
          <div className="mt-4 flex justify-between">
            <div className="flex flex-wrap gap-2">
              {['algebra', 'geometry', 'dataAnalysis'].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleProblemType(type)}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${
                    filteredProblemTypes.includes(type)
                      ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    type === 'algebra' 
                      ? 'bg-cyan-500' 
                      : type === 'geometry' 
                        ? 'bg-blue-500' 
                        : 'bg-indigo-500'
                  }`}></span>
                  {type === 'algebra' ? 'Algebra' : 
                   type === 'geometry' ? 'Geometry' : 
                   'Data Analysis'}
                </button>
              ))}
            </div>
            <button
              onClick={() => setQuadrantView(!quadrantView)}
              className={`px-3 py-1 text-sm rounded-md ${
                quadrantView
                  ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Quadrant View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathChartsContainer;
