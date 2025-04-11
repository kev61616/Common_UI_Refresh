'use client';

import { useState, useEffect, useMemo } from 'react';
import { mockPracticeSets } from '@/lib/mockData';
import { UpcomingTests } from './UpcomingTests';
import { SkillsRadarChart } from './SkillsRadarChart';
import { StudyStreak } from './StudyStreak';
import { RecommendedActions } from './RecommendedActions';
import { DashboardCard } from './DashboardCard';
import Link from 'next/link';

// Mock stats to avoid hydration mismatches
const mockStats = {
  overallProgress: 76,
  readingProgress: 82,
  writingProgress: 70,
  mathProgress: 78,
  practiceSets: 12,
  questions: 240,
  studyHours: 48
};

export function Dashboard() {
  const [animatedCount, setAnimatedCount] = useState({ sets: 0, questions: 0, hours: 0 });

  // Calculate test date
  const testDate = useMemo(() => {
    const today = new Date();
    // Set test date to be 45 days from now
    const testDay = new Date(today);
    testDay.setDate(today.getDate() + 45);
    return testDay;
  }, []);

  // Calculate days left
  const daysLeft = useMemo(() => {
    const today = new Date();
    const diffTime = Math.abs(testDate.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [testDate]);

  // Animate count up effect for stats
  useEffect(() => {
    const duration = 2000; // ms
    const steps = 30;
    const increment = {
      sets: Math.ceil(mockStats.practiceSets / steps),
      questions: Math.ceil(mockStats.questions / steps),
      hours: Math.ceil(mockStats.studyHours / steps)
    };

    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps) {
        setAnimatedCount({
          sets: mockStats.practiceSets,
          questions: mockStats.questions,
          hours: mockStats.studyHours
        });
        clearInterval(interval);
        return;
      }

      setAnimatedCount((prev) => ({
        sets: Math.min(prev.sets + increment.sets, mockStats.practiceSets),
        questions: Math.min(prev.questions + increment.questions, mockStats.questions),
        hours: Math.min(prev.hours + increment.hours, mockStats.studyHours)
      }));

      step++;
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  // Icons for dashboard cards
  const cardIcons = {
    studyStreak:
    <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="jegb.at">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-oid="ghs:p8f" />
      </svg>,

    skillsRadar:
    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="wnh-w_7">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-oid="o2ph:h5" />
      </svg>,

    focusAreas:
    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="znvfj:j">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" data-oid="w18w8qz" />
      </svg>,

    upcomingTests:
    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="-vzpaq-">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-oid="y6hire0" />
      </svg>,

    recommendedActions:
    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="6lsf67l">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" data-oid="r1r0to9" />
      </svg>,

    performanceInsights:
    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="sljei1k">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-oid="aipsnig" />
      </svg>

  };

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 dark:bg-slate-900" data-oid="i97o5uu">
      {/* Max width container */}
      <div className="max-w-[1600px] w-full mx-auto" data-oid="qef0lkc">
        {/* Welcome banner with card style */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm mb-6 overflow-hidden" data-oid="l5z.8yj">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between" data-oid="ma0j:.9">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white" data-oid="3j7bk3z">Welcome back, Student!</h2>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium" data-oid="r.g1mjh">
              {daysLeft} days until exam
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6" data-oid="zkc0jw2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6" data-oid="1am.puz">
              <div className="flex-1" data-oid="bxeu0u4">
                <div className="text-sm text-slate-600 dark:text-slate-300 mb-4" data-oid="w69i7e7">
                  {/* Per user request, removed the progress message and quick action buttons */}
                </div>
              </div>
              
              {/* Progress Circle */}
              <div className="flex-shrink-0 flex flex-col items-center" data-oid="mdx-ii3">
                <div className="relative w-24 h-24 md:w-32 md:h-32" data-oid="p.31j6p">
                  <svg className="w-full h-full" viewBox="0 0 120 120" data-oid="m7qly.0">
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                      className="dark:stroke-slate-700" data-oid="1u62e2i" />

                    {/* Progress circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="8"
                      strokeDasharray="339.3"
                      strokeDashoffset={339.3 * (1 - 0.65)} // 65% complete
                      transform="rotate(-90 60 60)"
                      className="dark:stroke-indigo-500" data-oid="x94mb1x" />

                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center" data-oid="jsrjc44">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400" data-oid="60fsaa-">65%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="t.jfm38">Ready</div>
                  </div>
                </div>
                <Link
                  href="/test/prep"
                  className="mt-2 py-1.5 px-3 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors" data-oid="2_s9a45">

                  View Test Plan
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-700 pt-6" data-oid="d9mc3xi">
              <div className="flex flex-col items-center" data-oid="owl:nkh">
                <div className="text-3xl font-bold text-slate-800 dark:text-white" data-oid="wi1.tl6">{animatedCount.sets}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="8gzm--n">Practice Sets</div>
              </div>
              
              <div className="flex flex-col items-center" data-oid="r_3i7r9">
                <div className="text-3xl font-bold text-slate-800 dark:text-white" data-oid="mvlijbv">{animatedCount.questions}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="q7-y_oo">Questions</div>
              </div>
              
              <div className="flex flex-col items-center" data-oid="edn.a35">
                <div className="text-3xl font-bold text-slate-800 dark:text-white" data-oid="f:ub7-q">{animatedCount.hours}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="0t8kdck">Study Hours</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Controls */}
        <div className="flex justify-between items-center mb-4" data-oid="36j-nr5">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white" data-oid=":p3rb88">Your Dashboard</h2>
          <button
            className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            onClick={() => {
              if (typeof window !== 'undefined') {
                // Reset layout
                localStorage.removeItem('dashboardLayout');
                window.location.reload();
              }
            }} data-oid="8i132za">

            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="as5fowq">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-oid="0y39z5f" />
            </svg>
            Reset Layout
          </button>
        </div>
        
        {/* Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto] gap-4 dashboard-cards" data-oid="p1huuje">
          <DashboardCard id="studyStreak" title="Study Streak" icon={cardIcons.studyStreak} className="h-full md:row-span-2" data-oid="kvsb45x">
            <StudyStreak currentStreak={5} longestStreak={14} data-oid="e0j7v6c" />
          </DashboardCard>
          
          <DashboardCard id="skillsRadar" title="Skills Breakdown" icon={cardIcons.skillsRadar} className="h-full md:row-span-2" data-oid="2n1w-d-">
            <SkillsRadarChart
              skills={[
              { name: 'Reading', value: 78, color: '#3b82f6' },
              { name: 'Writing', value: 65, color: '#8b5cf6' },
              { name: 'Algebra', value: 82, color: '#06b6d4' },
              { name: 'Geometry', value: 70, color: '#10b981' },
              { name: 'Data Analysis', value: 55, color: '#f59e0b' },
              { name: 'Critical Thinking', value: 75, color: '#ef4444' }]
              } data-oid="rofhjxf" />

          </DashboardCard>
          
          <DashboardCard id="upcomingTests" title="Upcoming Tests" icon={cardIcons.upcomingTests} className="h-full" data-oid="xd7k2fv">
            <div className="flex flex-col space-y-3" data-oid=":kmz-os">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800" data-oid="m55f_-6">
                <div className="flex justify-between items-start" data-oid="ukw1jeg">
                  <div data-oid="y3qvf8x">
                    <h3 className="font-semibold text-p3 text-indigo-700 dark:text-indigo-300" data-oid="xp76zxh">SAT Practice Test</h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1" data-oid="lm06wtz">Full-length practice exam</p>
                  </div>
                  <span className="bg-white dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded shadow-sm border border-indigo-200 dark:border-indigo-700" data-oid="vjgdn20">
                    In {daysLeft - 30} days
                  </span>
                </div>
                <div className="mt-3 flex items-center text-xs text-indigo-600 dark:text-indigo-400" data-oid="_:kdb:h">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="-vul3_:">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="u155ve." />
                  </svg>
                  3 hours 30 minutes
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700" data-oid="nz_mlt7">
                <div className="flex justify-between items-start" data-oid="yxdy979">
                  <div data-oid="18_d_dy">
                    <h3 className="font-semibold text-p3 text-slate-700 dark:text-slate-300" data-oid="8og59j6">Official SAT Exam</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1" data-oid="5n5r5up">College Board Testing Center</p>
                  </div>
                  <span className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700" data-oid="l0es_sq">
                    In {daysLeft} days
                  </span>
                </div>
                <div className="mt-3 flex items-center text-xs text-slate-600 dark:text-slate-400" data-oid=".yre5rk">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="n:za:gx">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="e8_0g9y" />
                  </svg>
                  4 hours 15 minutes
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard id="recommendedActions" title="Recommended Actions" icon={cardIcons.recommendedActions} className="h-full" data-oid="ej7icrw">
            <div className="space-y-3" data-oid="4sd4ed9">
              <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30" data-oid="386l_p8">
                <h3 className="font-medium text-blue-700 dark:text-blue-300 flex items-center" data-oid="d_ayphh">
                  <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="pk8au:9">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="cj7xywk" />
                  </svg>
                  Complete Algebra Review
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 pl-5.5" data-oid="k56rd6_">Finish practice questions in your strongest area</p>
                <div className="mt-2 pl-5.5" data-oid="652sq.o">
                  <Link href="/question-bank/subjects/math" className="text-xs font-medium text-blue-600 dark:text-blue-400 inline-flex items-center hover:underline" data-oid="lxhgeb3">
                    Start now
                    <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="xx6q.jk">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" data-oid="kte_0:9" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800/30" data-oid="4auh110">
                <h3 className="font-medium text-orange-700 dark:text-orange-300 flex items-center" data-oid="vq:.:05">
                  <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="lmk5e4g">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-oid="peld48k" />
                  </svg>
                  Improve Data Analysis
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 pl-5.5" data-oid="1of9xxn">Work on your lowest scoring area</p>
                <div className="mt-2 pl-5.5" data-oid="1b9ui2x">
                  <Link href="/question-bank/subjects/data" className="text-xs font-medium text-orange-600 dark:text-orange-400 inline-flex items-center hover:underline" data-oid="naybadu">
                    Start now
                    <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="yujw2-_">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" data-oid="g6v8_da" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-800/30" data-oid="ouf:sk.">
                <h3 className="font-medium text-teal-700 dark:text-teal-300 flex items-center" data-oid=":b9u1je">
                  <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="0oyxmzk">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" data-oid="2g.6lus" />
                  </svg>
                  Take Practice Test
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 pl-5.5" data-oid="jm_qekg">Scheduled for this weekend</p>
                <div className="mt-2 pl-5.5" data-oid="t.62u16">
                  <Link href="/test/mock" className="text-xs font-medium text-teal-600 dark:text-teal-400 inline-flex items-center hover:underline" data-oid="gg1vdyc">
                    Schedule now
                    <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="451y2p1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" data-oid="o_fa580" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard id="recentProgress" title="Recent Progress" icon={cardIcons.skillsRadar} className="h-full md:col-span-2" data-oid="k3ig1qq">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="6.kmkb:">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/30" data-oid="l333c98">
                <div className="flex items-center mb-3" data-oid="e7_q-06">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center mr-3" data-oid="aurv0iq">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="8brnkc-">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-oid=":7bf.r9" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300" data-oid="tu-yefc">Reading</h3>
                </div>
                <div className="flex items-center justify-between" data-oid="yufii6n">
                  <div data-oid="whja9z6">
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-300" data-oid="29zl_cu">82%</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 mt-1" data-oid="tnsu6.i">Mastery Level</div>
                  </div>
                  <div className="text-green-600 dark:text-green-400 text-sm font-medium" data-oid="ilc07pb">
                    <span className="flex items-center" data-oid="cm_wp6r">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="15644aj">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" data-oid="9yj8r4h" />
                      </svg>
                      +5%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/30" data-oid="md:45dz">
                <div className="flex items-center mb-3" data-oid="kz5wfk7">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center mr-3" data-oid="cof4ok1">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="oit_dup">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-oid="-eobvlg" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300" data-oid="g4ssluf">Writing</h3>
                </div>
                <div className="flex items-center justify-between" data-oid="sn1vhvj">
                  <div data-oid="k1d28lp">
                    <div className="text-3xl font-bold text-purple-700 dark:text-purple-300" data-oid="bp1a_99">70%</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400 mt-1" data-oid="fe1opj2">Mastery Level</div>
                  </div>
                  <div className="text-green-600 dark:text-green-400 text-sm font-medium" data-oid="hhl4:xb">
                    <span className="flex items-center" data-oid="2.6whwu">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="jq42d36">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" data-oid="60am0.p" />
                      </svg>
                      +8%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-xl p-4 border border-teal-100 dark:border-teal-800/30" data-oid="rsxan8g">
                <div className="flex items-center mb-3" data-oid="lvv2qse">
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800/30 flex items-center justify-center mr-3" data-oid="3k_rwi8">
                    <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="9hn2f.u">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-oid="d8_o1ft" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-teal-800 dark:text-teal-300" data-oid="wjna-_v">Math</h3>
                </div>
                <div className="flex items-center justify-between" data-oid="xuam:3g">
                  <div data-oid="mizul1u">
                    <div className="text-3xl font-bold text-teal-700 dark:text-teal-300" data-oid="okk-.6-">78%</div>
                    <div className="text-sm text-teal-600 dark:text-teal-400 mt-1" data-oid="9l5c08f">Mastery Level</div>
                  </div>
                  <div className="text-green-600 dark:text-green-400 text-sm font-medium" data-oid="0d7l916">
                    <span className="flex items-center" data-oid="67qd5vs">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="fv670hj">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" data-oid="361l63l" />
                      </svg>
                      +3%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>);

}