'use client';

import { useMemo } from 'react';
import { PracticeSet } from '@/lib/mockData';

interface ScoreProjectionProps {
  practiceSets: PracticeSet[];
  targetScore: number;
  testDate: string;
}

interface ScoreData {
  date: string;
  score: number;
  subject: 'Reading' | 'Writing' | 'Math' | 'Overall';
}

export function ScoreProjection({ practiceSets, targetScore, testDate }: ScoreProjectionProps) {
  // Calculate score data and projections
  const { scoreData, projections, improvementRate } = useMemo(() => {
    // Process practice sets to get historical scores
    const historicalData: ScoreData[] = practiceSets.map((set) => ({
      date: set.dateCompleted,
      score: set.accuracy * 100,
      subject: set.subject
    }));

    // Calculate overall scores for each date
    const dates = [...new Set(historicalData.map((d) => d.date))];
    const overallScores = dates.map((date) => {
      const daySets = historicalData.filter((d) => d.date === date);
      const avgScore = daySets.reduce((sum, set) => sum + set.score, 0) / daySets.length;
      return {
        date,
        score: avgScore,
        subject: 'Overall' as const
      };
    });

    // Combine subject-specific and overall scores
    const allScoreData = [...historicalData, ...overallScores].
    sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate improvement rate
    const recentScores = overallScores.slice(-3);
    const improvementRate = recentScores.length >= 2 ?
    (recentScores[recentScores.length - 1].score - recentScores[0].score) / (recentScores.length - 1) :
    0;

    // Calculate days until test
    const daysUntilTest = Math.ceil(
      (new Date(testDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    // Generate projections
    const currentScore = overallScores[overallScores.length - 1]?.score || 0;
    const projectedScores = Array.from({ length: 7 }, (_, i) => {
      const daysAhead = i + 1;
      const projectedScore = Math.min(
        currentScore + improvementRate * daysAhead,
        targetScore
      );
      return {
        date: new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: projectedScore,
        subject: 'Projected' as const
      };
    });

    return {
      scoreData: allScoreData,
      projections: projectedScores,
      improvementRate
    };
  }, [practiceSets, targetScore, testDate]);

  // Calculate score ranges for the chart
  const { minScore, maxScore, scoreRange } = useMemo(() => {
    const allScores = [...scoreData, ...projections].map((d) => d.score);
    const minScore = Math.floor(Math.min(...allScores) / 10) * 10;
    const maxScore = Math.ceil(Math.max(...allScores, targetScore) / 10) * 10;
    const scoreRange = maxScore - minScore;

    return { minScore, maxScore, scoreRange };
  }, [scoreData, projections, targetScore]);

  // Get color classes for different score ranges
  const getScoreColor = (score: number) => {
    if (score >= targetScore * 0.9) return 'text-emerald-500 dark:text-emerald-400';
    if (score >= targetScore * 0.8) return 'text-amber-500 dark:text-amber-400';
    return 'text-rose-500 dark:text-rose-400';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden" data-oid="-yb.0ai">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700" data-oid="sh66sxt">
        <div className="flex items-center justify-between" data-oid="x2zkzo6">
          <h3 className="font-medium text-slate-800 dark:text-white text-lg" data-oid="2an:1yz">Score Projection</h3>
          <div className="flex items-center space-x-2" data-oid="9o962.y">
            <span className="text-sm text-slate-500 dark:text-slate-400" data-oid="a6urquf">Target:</span>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400" data-oid="p:3n9hv">
              {targetScore}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-5" data-oid="qhhbhhq">
        {/* Score Chart */}
        <div className="relative h-64" data-oid="t2jxj1t">
          {/* Background Grid */}
          <div className="absolute inset-0 flex flex-col justify-between" data-oid="tp_vkj:">
            {Array.from({ length: 5 }).map((_, i) =>
            <div
              key={i}
              className="border-t border-slate-200 dark:border-slate-700" data-oid="17f07mv" />

            )}
          </div>
          
          {/* Score Lines */}
          <div className="absolute inset-0 flex items-end" data-oid="8tolgrf">
            {/* Target Line */}
            <div
              className="absolute left-0 right-0 border-t-2 border-dashed border-indigo-500 dark:border-indigo-400"
              style={{
                bottom: `${(targetScore - minScore) / scoreRange * 100}%`
              }} data-oid="glxdmc_">

              <div className="absolute -top-6 left-0 text-xs text-indigo-600 dark:text-indigo-400" data-oid="paufee5">
                Target
              </div>
            </div>
            
            {/* Historical Scores */}
            {scoreData.map((data, i) =>
            <div
              key={`${data.date}-${data.subject}`}
              className="absolute bottom-0 w-1 bg-slate-300 dark:bg-slate-600 rounded-full"
              style={{
                left: `${i / scoreData.length * 100}%`,
                height: `${(data.score - minScore) / scoreRange * 100}%`
              }} data-oid="i-om7oh" />

            )}
            
            {/* Projections */}
            {projections.map((data, i) =>
            <div
              key={`${data.date}-projected`}
              className="absolute bottom-0 w-1 bg-indigo-500 dark:bg-indigo-400 rounded-full"
              style={{
                left: `${(scoreData.length + i) / (scoreData.length + projections.length) * 100}%`,
                height: `${(data.score - minScore) / scoreRange * 100}%`
              }} data-oid="9najlvw" />

            )}
          </div>
        </div>
        
        {/* Score Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4" data-oid="fibpfoo">
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4" data-oid="gv4s5ie">
            <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="flhy3t0">Current Score</div>
            <div className={`mt-1 text-2xl font-semibold ${getScoreColor(scoreData[scoreData.length - 1]?.score || 0)}`} data-oid="r5ewaxb">
              {Math.round(scoreData[scoreData.length - 1]?.score || 0)}%
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4" data-oid="6sietk4">
            <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="l36cjo2">Improvement Rate</div>
            <div className={`mt-1 text-2xl font-semibold ${improvementRate >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`} data-oid="ea_06n5">
              {improvementRate >= 0 ? '+' : ''}{Math.round(improvementRate * 10) / 10}%
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400" data-oid="9x7_9f.">/day</span>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4" data-oid="tquyo_3">
            <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="ax-qnhq">Projected Score</div>
            <div className={`mt-1 text-2xl font-semibold ${getScoreColor(projections[projections.length - 1].score)}`} data-oid="3stmkfu">
              {Math.round(projections[projections.length - 1].score)}%
            </div>
          </div>
        </div>
        
        {/* Improvement Tips */}
        <div className="mt-6" data-oid="imgh82t">
          <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3" data-oid="_zgvd31">
            Improvement Tips
          </h4>
          <ul className="space-y-2" data-oid="nixhqy:">
            {improvementRate < 0 &&
            <li className="flex items-start text-sm text-slate-600 dark:text-slate-400" data-oid="bge6o:9">
                <svg className="h-5 w-5 text-rose-500 dark:text-rose-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="pigmoxw">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-oid="4z2foul" />
                </svg>
                Your scores have been declining. Focus on reviewing fundamental concepts and taking shorter, more frequent practice sessions.
              </li>
            }
            {scoreData[scoreData.length - 1]?.score < targetScore * 0.8 &&
            <li className="flex items-start text-sm text-slate-600 dark:text-slate-400" data-oid="jnzztzi">
                <svg className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="j1uboi6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="kokhvc8" />
                </svg>
                You're below 80% of your target score. Consider increasing your daily practice time and focusing on your weakest areas.
              </li>
            }
            {improvementRate > 0 && improvementRate < 1 &&
            <li className="flex items-start text-sm text-slate-600 dark:text-slate-400" data-oid="vky8srj">
                <svg className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="gfku4md">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="7h:o32." />
                </svg>
                You're making steady progress. Keep up the good work and maintain your current study schedule.
              </li>
            }
            {improvementRate >= 1 &&
            <li className="flex items-start text-sm text-slate-600 dark:text-slate-400" data-oid="-6m9:5w">
                <svg className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="tr8ze9b">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" data-oid="44e17si" />
                </svg>
                Excellent improvement rate! Consider challenging yourself with more difficult practice questions to maintain this momentum.
              </li>
            }
          </ul>
        </div>
      </div>
    </div>);

}