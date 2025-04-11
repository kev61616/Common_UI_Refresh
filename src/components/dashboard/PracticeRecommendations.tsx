'use client';

import { useMemo } from 'react';
import { PracticeSet } from '@/lib/mockData';

interface PracticeRecommendationsProps {
  practiceSets: PracticeSet[];
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  type: 'Focused' | 'Mixed' | 'Quiz' | 'Test' | 'Review';
  subject: 'Reading' | 'Writing' | 'Math' | 'Mixed';
  link: string;
  icon: React.ReactNode;
}

export function PracticeRecommendations({ practiceSets }: PracticeRecommendationsProps) {
  // Generate personalized recommendations based on practice history
  const recommendations = useMemo(() => {
    // For empty state or insufficient data
    if (practiceSets.length < 2) {
      return [
      {
        id: 'rec-initial-1',
        title: 'Initial Reading Assessment',
        description: 'Start with this reading assessment to establish your baseline skills',
        difficulty: 'Medium' as const,
        estimatedTime: 20,
        type: 'Quiz' as const,
        subject: 'Reading' as const,
        link: '/practice/reading-assessment',
        icon:
        <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="-zkoiv7">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-oid="z4:1yaj" />
            </svg>

      },
      {
        id: 'rec-initial-2',
        title: 'Writing Skills Diagnostic',
        description: 'Complete this writing diagnostic to identify your strengths and weaknesses',
        difficulty: 'Medium' as const,
        estimatedTime: 25,
        type: 'Quiz' as const,
        subject: 'Writing' as const,
        link: '/practice/writing-diagnostic',
        icon:
        <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="-yak7x8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-oid="-wjlhg2" />
            </svg>

      },
      {
        id: 'rec-initial-3',
        title: 'Math Fundamentals Check',
        description: 'Test your math fundamentals to create your personalized study plan',
        difficulty: 'Medium' as const,
        estimatedTime: 30,
        type: 'Quiz' as const,
        subject: 'Math' as const,
        link: '/practice/math-fundamentals',
        icon:
        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="4zg3-5c">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-oid="1kj00ex" />
            </svg>

      }];

    }

    // Analyze practice history to determine recommendations

    // 1. Find weakest subject
    const subjectPerformance = {
      Reading: { sets: 0, totalAccuracy: 0 },
      Writing: { sets: 0, totalAccuracy: 0 },
      Math: { sets: 0, totalAccuracy: 0 }
    };

    practiceSets.forEach((set) => {
      subjectPerformance[set.subject].sets++;
      subjectPerformance[set.subject].totalAccuracy += set.accuracy;
    });

    // Calculate average accuracy for each subject
    const subjectAverages = Object.entries(subjectPerformance).map(([subject, data]) => ({
      subject: subject as 'Reading' | 'Writing' | 'Math',
      avgAccuracy: data.sets > 0 ? data.totalAccuracy / data.sets : 0,
      setCount: data.sets
    }));

    // Sort by accuracy (lowest first)
    subjectAverages.sort((a, b) => {
      // If one subject has no sets, prioritize it
      if (a.setCount === 0) return -1;
      if (b.setCount === 0) return 1;
      return a.avgAccuracy - b.avgAccuracy;
    });

    // 2. Find difficulty level appropriate for the user
    const overallAccuracy = practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length;
    let recommendedDifficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';

    if (overallAccuracy < 60) {
      recommendedDifficulty = 'Easy';
    } else if (overallAccuracy > 80) {
      recommendedDifficulty = 'Hard';
    }

    // 3. Determine practice type based on recent activity
    const recentSets = [...practiceSets].
    sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()).
    slice(0, 3);

    const needsMixedPractice = recentSets.every((set) => set.subject === recentSets[0]?.subject);
    const needsTestPrep = practiceSets.length >= 5 && overallAccuracy > 70;

    // 4. Generate recommendations
    const recommendations: Recommendation[] = [];

    // Recommendation for weakest subject
    const weakestSubject = subjectAverages[0].subject;

    // Icon components
    const subjectIcons = {
      Reading:
      <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="_95dzs4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-oid="m2og.::" />
        </svg>,

      Writing:
      <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="g00qp_m">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-oid="g3yn-9p" />
        </svg>,

      Math:
      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="6j4sf6.">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-oid="v7vjb:v" />
        </svg>,

      Mixed:
      <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid=":ctx5ww">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-oid="muqd1tu" />
        </svg>

    };

    // Add focused practice for weakest subject
    recommendations.push({
      id: `rec-focused-${weakestSubject.toLowerCase()}`,
      title: `${weakestSubject} Skills Builder`,
      description: `Focused practice session on core ${weakestSubject.toLowerCase()} concepts to improve your foundation`,
      difficulty: recommendedDifficulty,
      estimatedTime: weakestSubject === 'Math' ? 25 : 20,
      type: 'Focused',
      subject: weakestSubject,
      link: `/practice/${weakestSubject.toLowerCase()}-skills-builder`,
      icon: subjectIcons[weakestSubject]
    });

    // Add mixed practice if needed
    if (needsMixedPractice) {
      recommendations.push({
        id: 'rec-mixed-practice',
        title: 'Mixed Subject Review',
        description: 'Practice questions from all subjects to maintain balanced preparation',
        difficulty: recommendedDifficulty,
        estimatedTime: 35,
        type: 'Mixed',
        subject: 'Mixed',
        link: '/practice/mixed-review',
        icon: subjectIcons.Mixed
      });
    } else {
      // Otherwise, add a recommendation for the second weakest subject
      const secondWeakestSubject = subjectAverages[1].subject;
      recommendations.push({
        id: `rec-secondary-${secondWeakestSubject.toLowerCase()}`,
        title: `${secondWeakestSubject} Challenge`,
        description: `Build on your ${secondWeakestSubject.toLowerCase()} skills with targeted practice questions`,
        difficulty: recommendedDifficulty,
        estimatedTime: secondWeakestSubject === 'Reading' ? 25 : 20,
        type: 'Focused',
        subject: secondWeakestSubject,
        link: `/practice/${secondWeakestSubject.toLowerCase()}-challenge`,
        icon: subjectIcons[secondWeakestSubject]
      });
    }

    // Add test prep if needed
    if (needsTestPrep) {
      recommendations.push({
        id: 'rec-test-prep',
        title: 'Full SAT Practice Test',
        description: 'Take a timed full-length practice test to assess your overall readiness',
        difficulty: 'Hard',
        estimatedTime: 180,
        type: 'Test',
        subject: 'Mixed',
        link: '/practice/full-test',
        icon:
        <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ujdqmfn">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" data-oid="41z5-be" />
          </svg>

      });
    } else {
      // Otherwise, add a quick quiz
      recommendations.push({
        id: 'rec-quick-quiz',
        title: 'Quick Progress Check',
        description: '15-minute quiz covering recent topics to reinforce your learning',
        difficulty: recommendedDifficulty,
        estimatedTime: 15,
        type: 'Quiz',
        subject: 'Mixed',
        link: '/practice/quick-quiz',
        icon:
        <svg className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="-osne4j">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="8c:dpyn" />
          </svg>

      });
    }

    return recommendations;
  }, [practiceSets]);

  // Get difficulty badge color
  const getDifficultyBadgeClasses = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Hard':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden" data-oid="0_5jody">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700" data-oid="gect:m5">
        <h3 className="font-medium text-slate-800 dark:text-white text-lg" data-oid="8_ttfnb">Recommended Practice</h3>
      </div>
      
      <div className="divide-y divide-slate-200 dark:divide-slate-700" data-oid="-urepke">
        {recommendations.map((rec, index) =>
        <div key={rec.id} className={`p-4 ${index === 0 ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`} data-oid="hlrr45n">
            <div className="flex" data-oid="x:ne:gn">
              <div className="flex-shrink-0" data-oid="-rmms_c">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center" data-oid="rjatk.c">
                  {rec.icon}
                </div>
              </div>
              <div className="ml-4 flex-1 min-w-0" data-oid="omeamwy">
                <div className="flex justify-between items-start" data-oid="auqls_3">
                  <div data-oid="5g1n.2:">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate" data-oid="mjk.jmt">
                      {rec.title}
                    </h4>
                    <div className="flex items-center mt-1 space-x-2" data-oid="a8a7e_1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getDifficultyBadgeClasses(rec.difficulty)}`} data-oid="c1kim_r">
                        {rec.difficulty}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center" data-oid="t4_7t7s">
                        <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="i7t0kv0">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="76sc835" />
                        </svg>
                        {rec.estimatedTime} min
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="nv8w9ja">
                        {rec.type}
                      </span>
                    </div>
                  </div>
                  {index === 0 &&
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" data-oid="2t8j14i">
                      Best match
                    </span>
                }
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2" data-oid="o3wv1f4">
                  {rec.description}
                </p>
                <div className="mt-3" data-oid="s2f4atd">
                  <a
                  href={rec.link}
                  className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md ${
                  index === 0 ?
                  'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700' :
                  'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600'}`
                  } data-oid="zowoz45">

                    Start practice
                    <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="tc6a4xk">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" data-oid="9psbg3o" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-700/30 p-4" data-oid="54rwbmk">
        <a
          href="/practice"
          className="flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300" data-oid="vt-5kr8">

          View all practice sessions
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ua8-7_h">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" data-oid="psk_xrd" />
          </svg>
        </a>
      </div>
    </div>);

}