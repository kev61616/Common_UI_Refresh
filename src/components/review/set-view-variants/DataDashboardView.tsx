'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const DataDashboardView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'stats'>('grid');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center" data-oid="t:_q:.a">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="y_7bkn."></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid="48bnaa_">
        <p className="text-slate-500 dark:text-slate-400" data-oid="az5r7qr">No practice sets available</p>
      </div>);

  }

  // Calculate overall performance metrics
  const calculateMetrics = () => {
    // Group by subject
    const subjectGroups: Record<string, any[]> = {};
    sets.forEach((set) => {
      const subject = set.subject || 'Other';
      if (!subjectGroups[subject]) subjectGroups[subject] = [];
      subjectGroups[subject].push(set);
    });

    // Calculate average accuracy by subject
    const subjectAccuracy: Record<string, number> = {};
    Object.entries(subjectGroups).forEach(([subject, subjectSets]) => {
      const totalAccuracy = subjectSets.reduce((sum, set) => sum + (set.accuracy || 0), 0);
      subjectAccuracy[subject] = Math.round(totalAccuracy / subjectSets.length);
    });

    // Find top performer and area for improvement
    const topSubject = Object.entries(subjectAccuracy).sort(([, a], [, b]) => b - a)[0]?.[0] || '';
    const improvementSubject = Object.entries(subjectAccuracy).sort(([, a], [, b]) => a - b)[0]?.[0] || '';

    // Calculate trends
    const timeBasedSets = [...sets].sort((a, b) =>
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    );

    const trendData = [];
    if (timeBasedSets.length >= 2) {
      const firstAccuracy = timeBasedSets[0].accuracy || 0;
      const lastAccuracy = timeBasedSets[timeBasedSets.length - 1].accuracy || 0;
      const trend = lastAccuracy - firstAccuracy;
      trendData.push({
        name: 'Overall Trend',
        change: trend,
        direction: trend >= 0 ? 'positive' : 'negative',
        value: `${trend >= 0 ? '+' : ''}${trend}%`
      });
    }

    return {
      overallAccuracy: Math.round(sets.reduce((sum, set) => sum + (set.accuracy || 0), 0) / sets.length),
      subjectAccuracy,
      topSubject,
      improvementSubject,
      totalSets: sets.length,
      totalQuestions: sets.reduce((sum, set) => sum + (set.questions?.length || 0), 0),
      trendData,
      subjectGroups
    };
  };

  const metrics = calculateMetrics();

  // Get colors for a subject
  const getSubjectColors = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-200 dark:bg-blue-800',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-500',
          graph: 'text-blue-500'
        };
      case 'Reading':
        return {
          primary: 'bg-emerald-500',
          secondary: 'bg-emerald-200 dark:bg-emerald-800',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-500',
          graph: 'text-emerald-500'
        };
      case 'Writing':
        return {
          primary: 'bg-amber-500',
          secondary: 'bg-amber-200 dark:bg-amber-800',
          text: 'text-amber-600 dark:text-amber-400',
          border: 'border-amber-500',
          graph: 'text-amber-500'
        };
      default:
        return {
          primary: 'bg-purple-500',
          secondary: 'bg-purple-200 dark:bg-purple-800',
          text: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-500',
          graph: 'text-purple-500'
        };
    }
  };

  // Render a miniature bar chart for a set
  const renderMiniBarChart = (set: any) => {
    const colors = getSubjectColors(set.subject);

    return (
      <div className="flex items-end h-10 space-x-0.5" data-oid="nrum4i2">
        {Array.from({ length: 5 }).map((_, i) => {
          const height = 20 + Math.random() * 80;
          const isHighlighted = i / 4 * 100 <= set.accuracy;

          return (
            <div
              key={i}
              className={`w-1 ${isHighlighted ? colors.primary : 'bg-gray-300 dark:bg-gray-700'}`}
              style={{ height: `${height}%` }} data-oid="rat59el">
            </div>);

        })}
      </div>);

  };

  // Render a data card for a set
  const renderSetCard = (set: any) => {
    const isSelected = set.id === selectedSetId;
    const colors = getSubjectColors(set.subject);
    const date = new Date(set.dateCompleted);

    return (
      <div
        className={`
          relative border rounded-lg overflow-hidden transition-all duration-300
          ${isSelected ? 'shadow-lg ring-2 ring-blue-500 dark:ring-blue-400 scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}
          cursor-pointer bg-white dark:bg-gray-800
        `}
        onClick={() => onSelectSet(set.id)} data-oid=":fpjmpl">

        {/* Header with type/subject */}
        <div className={`${colors.secondary} px-3 py-2 flex justify-between items-center`} data-oid="sbjpvh3">
          <div className="font-medium text-sm" data-oid="l:unuw2">{set.subject}</div>
          <div className={`${colors.primary} text-white px-2 py-0.5 rounded-full text-xs`} data-oid="2yx612p">
            {set.accuracy}%
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3" data-oid="_e5sy_v">
          <div className="mb-2" data-oid="m1ql1du">
            <h3 className="font-bold text-sm line-clamp-1" data-oid="qt1093:">{set.type}</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400" data-oid="f2mf8li">
              {date.toLocaleDateString()}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3" data-oid="dhin7a3">
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded p-1.5" data-oid="9owk1b_">
              <div className="text-xs text-gray-500 dark:text-gray-400" data-oid="y323viv">Questions</div>
              <div className="font-medium" data-oid="19r6xth">{set.questions?.length || 0}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded p-1.5" data-oid="0130sft">
              <div className="text-xs text-gray-500 dark:text-gray-400" data-oid="w.09vcr">Difficulty</div>
              <div className="font-medium" data-oid="ff729n6">{set.difficulty || 'Medium'}</div>
            </div>
          </div>
          
          {/* Mini visualization */}
          <div className="mt-2" data-oid="istvj6v">
            {renderMiniBarChart(set)}
          </div>
        </div>
      </div>);

  };

  // Render the main stats dashboard view
  const renderStatsDashboard = () => {
    return (
      <div className="space-y-6" data-oid="sjm43em">
        {/* Overall metrics row */}
        <div className="grid grid-cols-3 gap-4" data-oid="do0j10:">
          {/* Overall accuracy */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg p-4" data-oid="4jw-2_f">
            <div className="text-sm font-medium" data-oid="38dk7g5">Overall Accuracy</div>
            <div className="text-3xl font-bold mt-1" data-oid="we2y._y">{metrics.overallAccuracy}%</div>
            
            <div className="flex items-center mt-3 text-xs" data-oid="ivj3icc">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" data-oid="g7anir6">
                <path d="M12 8L18 14H6L12 8Z" fill="currentColor" data-oid="ntgi1fd" />
              </svg>
              <span data-oid="a0h5_bg">Across {metrics.totalSets} sets</span>
            </div>
          </div>
          
          {/* Sets completed */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow" data-oid="3.m9fmf">
            <div className="text-sm font-medium" data-oid="bkto8mq">Sets Completed</div>
            <div className="text-3xl font-bold mt-1" data-oid="ztyvb4p">{metrics.totalSets}</div>
            
            <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400" data-oid="owuaonx">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-oid="7amk2pu">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-oid="sb._wj_" />
              </svg>
              <span data-oid="thbxf4s">Total sets tracked</span>
            </div>
          </div>
          
          {/* Total questions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow" data-oid="7f62cf4">
            <div className="text-sm font-medium" data-oid="c:gs-vh">Total Questions</div>
            <div className="text-3xl font-bold mt-1" data-oid="jhy93fx">{metrics.totalQuestions}</div>
            
            <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400" data-oid="u.2bn::">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-oid="51zf_s8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid=".nak0h9" />
              </svg>
              <span data-oid="-3cf87w">Across all practice sets</span>
            </div>
          </div>
        </div>
        
        {/* Subject breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow" data-oid="040:zn6">
          <h3 className="font-bold text-lg mb-4" data-oid="2wkgevk">Subject Performance</h3>
          
          <div className="space-y-4" data-oid="l0f8i2z">
            {Object.entries(metrics.subjectAccuracy).map(([subject, accuracy]) => {
              const colors = getSubjectColors(subject);
              const subjectSets = metrics.subjectGroups[subject] || [];

              return (
                <div key={subject} data-oid="h_ipl14">
                  <div className="flex justify-between mb-1" data-oid="qci4:p5">
                    <div className="flex items-center" data-oid="ag.ki67">
                      <div className={`w-3 h-3 rounded-full ${colors.primary} mr-2`} data-oid="9q6mrw0"></div>
                      <span className="font-medium" data-oid="7grna4n">{subject}</span>
                    </div>
                    <div className="text-sm" data-oid="98im1dl">{accuracy}%</div>
                  </div>
                  
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" data-oid="dgyr9o4">
                    <div
                      className={`absolute top-0 left-0 h-full ${colors.primary}`}
                      style={{ width: `${accuracy}%` }} data-oid="mtlbeig">
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1" data-oid="hops2eo">
                    {subjectSets.length} {subjectSets.length === 1 ? 'set' : 'sets'} • 
                    {subjectSets.reduce((sum, set) => sum + (set.questions?.length || 0), 0)} questions
                  </div>
                </div>);

            })}
          </div>
        </div>
        
        {/* Insights */}
        <div className="grid grid-cols-2 gap-4" data-oid="c29nbac">
          {/* Strengths */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow" data-oid="_1tr908">
            <h3 className="font-bold mb-3" data-oid="_cla44t">Top Performer</h3>
            {metrics.topSubject &&
            <div data-oid="85f00ls">
                <div className="flex items-center" data-oid="o4qvq3d">
                  <div className={`w-3 h-3 rounded-full ${getSubjectColors(metrics.topSubject).primary} mr-2`} data-oid="0g8g9uy"></div>
                  <span className="font-medium" data-oid="dlhkm-x">{metrics.topSubject}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1" data-oid="93x43zg">
                  Your strongest performance is in {metrics.topSubject} with an average accuracy of 
                  {metrics.subjectAccuracy[metrics.topSubject]}%.
                </div>
              </div>
            }
          </div>
          
          {/* Areas for improvement */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow" data-oid=":8r3mjl">
            <h3 className="font-bold mb-3" data-oid="2rlhysg">Room for Improvement</h3>
            {metrics.improvementSubject &&
            <div data-oid="ww:bgxf">
                <div className="flex items-center" data-oid="toomfyc">
                  <div className={`w-3 h-3 rounded-full ${getSubjectColors(metrics.improvementSubject).primary} mr-2`} data-oid="t6.5e5r"></div>
                  <span className="font-medium" data-oid="v1c92i_">{metrics.improvementSubject}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1" data-oid="9j2vqmi">
                  Focus more practice on {metrics.improvementSubject} to improve your current 
                  {metrics.subjectAccuracy[metrics.improvementSubject]}% accuracy.
                </div>
              </div>
            }
          </div>
        </div>
        
        {/* Recent sets */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow" data-oid="venr:vv">
          <div className="flex justify-between items-center mb-4" data-oid="d-sfel1">
            <h3 className="font-bold text-lg" data-oid="40elk2v">Recent Sets</h3>
            <button
              onClick={() => setActiveView('grid')}
              className="text-sm text-blue-500 dark:text-blue-400" data-oid="h1yy5k:">

              View All
            </button>
          </div>
          
          <div className="space-y-2" data-oid="g2j_618">
            {sets.slice(0, 3).map((set) => {
              const colors = getSubjectColors(set.subject);

              return (
                <div
                  key={set.id}
                  className={`flex items-center border-l-4 ${colors.border} p-2 bg-gray-50 dark:bg-gray-700/30 rounded-r cursor-pointer ${
                  set.id === selectedSetId ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`
                  }
                  onClick={() => onSelectSet(set.id)} data-oid="wcbneyq">

                  <div className="flex-1" data-oid="lxqdzr:">
                    <div className="font-medium" data-oid="35fjg68">{set.type}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400" data-oid="cy96:3d">
                      {set.subject} • {new Date(set.dateCompleted).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`${colors.text} font-bold`} data-oid="7fgy.pi">
                    {set.accuracy}%
                  </div>
                </div>);

            })}
          </div>
        </div>
      </div>);

  };

  // Render the grid view of all sets
  const renderGridView = () => {
    return (
      <div data-oid="6bo_877">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-oid="fd:i_hz">
          {sets.map((set) => renderSetCard(set))}
        </div>
      </div>);

  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow" data-oid="5.ylllr">
      {/* Header with view toggles */}
      <div className="flex justify-between items-center mb-6" data-oid="5j6f3vz">
        <h2 className="text-xl font-bold" data-oid="6nk_xd8">Data Dashboard</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-full p-0.5 shadow flex" data-oid="0oc3l48">
          <button
            onClick={() => setActiveView('grid')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
            activeView === 'grid' ?
            'bg-blue-500 text-white' :
            'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
            } data-oid="da5q.1q">

            Grid View
          </button>
          <button
            onClick={() => setActiveView('stats')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
            activeView === 'stats' ?
            'bg-blue-500 text-white' :
            'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
            } data-oid="bo43rv8">

            Stats View
          </button>
        </div>
      </div>
      
      {/* Main content area that changes based on selected view */}
      {activeView === 'grid' ? renderGridView() : renderStatsDashboard()}
    </div>);

};