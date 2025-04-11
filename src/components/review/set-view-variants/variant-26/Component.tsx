'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from '../types';

/**
 * Cognitive Load Analyzer
 * 
 * Primary Insight Objective: Identify when cognitive overload is occurring during 
 * practice sessions and determine optimal learning conditions to avoid it.
 * 
 * Data-to-Visual Mapping:
 * - Session duration mapped to horizontal axis (reveals temporal patterns)
 * - Performance decline mapped to slope steepness (indicates fatigue onset)
 * - Question difficulty mapped to point weight (shows impact of challenge level)
 * - Session pace mapped to background density (visualizes intensity)
 * - Subject mapped to color (enables subject-specific pattern recognition)
 * 
 * Analytical Value:
 * - Identify optimal session duration before cognitive fatigue
 * - Determine appropriate difficulty progression for different subjects
 * - Recognize personal cognitive load thresholds
 * - Support decisions about pacing and session structuring
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [cognitiveLoadData, setCognitiveLoadData] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(selectedSetId);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Calculate cognitive load metrics for each practice set
  useEffect(() => {
    // Process each practice set to extract cognitive load metrics
    const loadMetrics = practiceSets.map((set) => {
      // Get early vs late performance to measure fatigue
      const earlyAccuracy = set.sessionFatigue?.earlyAccuracy || 0;
      const lateAccuracy = set.sessionFatigue?.lateAccuracy || 0;
      const performanceDecline = Math.max(0, earlyAccuracy - lateAccuracy);

      // Calculate cognitive load score (higher = more cognitive load)
      // Factors: session duration, question count, difficulty, performance decline
      const durationFactor = set.timeUsed / 60; // convert to minutes
      const questionFactor = set.questions.length * (set.difficulty === 'Hard' ? 1.5 : set.difficulty === 'Medium' ? 1.0 : 0.7);
      const paceFactor = set.pace === 'Fast' ? 1.3 : set.pace === 'Slow' ? 0.7 : 1.0;
      const fatigueFactor = performanceDecline * 0.1;

      const cognitiveLoadScore = durationFactor * 0.3 +
      questionFactor * 0.3 +
      paceFactor * 0.2 +
      fatigueFactor * 0.2;

      // Determine if cognitive overload likely occurred
      const isOverloaded = performanceDecline > 15 ||
      performanceDecline > 10 && durationFactor > 30 ||
      cognitiveLoadScore > 20;

      // Calculate efficiency (performance relative to cognitive load)
      const efficiency = set.accuracy / (cognitiveLoadScore || 1);

      return {
        id: set.id,
        subject: set.subject,
        type: set.type,
        duration: set.timeUsed,
        questionCount: set.questions.length,
        difficulty: set.difficulty,
        pace: set.pace,
        earlyAccuracy,
        lateAccuracy,
        performanceDecline,
        cognitiveLoadScore,
        accuracy: set.accuracy,
        isOverloaded,
        efficiency,
        timeOfDay: set.timeOfDay,
        dateCompleted: set.dateCompleted
      };
    });

    // Sort by date
    loadMetrics.sort((a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime());

    setCognitiveLoadData(loadMetrics);

    // Generate recommendations based on the data
    if (loadMetrics.length > 0) {
      const recommendations: string[] = [];

      // Find most efficient sets
      const efficientSets = [...loadMetrics].sort((a, b) => b.efficiency - a.efficiency).slice(0, 3);
      if (efficientSets.length > 0) {
        const bestSubject = efficientSets[0].subject;
        const bestTimeOfDay = efficientSets[0].timeOfDay;
        const bestPace = efficientSets[0].pace;

        recommendations.push(`Your most efficient sessions tend to be ${bestSubject} practice with a ${bestPace.toLowerCase()} pace in the ${bestTimeOfDay.toLowerCase()}.`);
      }

      // Find overload patterns
      const overloadedSets = loadMetrics.filter((set) => set.isOverloaded);
      if (overloadedSets.length > 0) {
        const avgDuration = overloadedSets.reduce((sum, set) => sum + set.duration, 0) / overloadedSets.length / 60;
        recommendations.push(`Signs of cognitive fatigue typically appear after ${avgDuration.toFixed(0)} minutes of practice.`);

        // Check if specific subjects are more prone to overload
        const subjectCounts: {[key: string]: number;} = {};
        overloadedSets.forEach((set) => {
          subjectCounts[set.subject] = (subjectCounts[set.subject] || 0) + 1;
        });

        const mostOverloadedSubject = Object.entries(subjectCounts).
        sort((a, b) => b[1] - a[1])[0];

        if (mostOverloadedSubject && mostOverloadedSubject[1] > 1) {
          recommendations.push(`${mostOverloadedSubject[0]} sessions tend to create more cognitive load than other subjects.`);
        }
      }

      // Recommend optimal session duration
      const nonOverloadedSets = loadMetrics.filter((set) => !set.isOverloaded);
      if (nonOverloadedSets.length > 0) {
        const avgDuration = nonOverloadedSets.reduce((sum, set) => sum + set.duration, 0) / nonOverloadedSets.length / 60;
        recommendations.push(`Optimal session duration appears to be around ${avgDuration.toFixed(0)} minutes to maintain high performance.`);
      }

      setRecommendations(recommendations);
    }
  }, [practiceSets]);

  // Handle set selection
  useEffect(() => {
    setSelectedSessionId(selectedSetId);
  }, [selectedSetId]);

  // Get the selected session details
  const selectedSession = cognitiveLoadData.find((set) => set.id === selectedSessionId);

  // Get color based on subject
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':return {
          primary: 'bg-blue-500',
          light: 'bg-blue-100',
          text: 'text-blue-700',
          border: 'border-blue-300',
          gradient: 'from-blue-500 to-blue-700'
        };
      case 'Reading':return {
          primary: 'bg-purple-500',
          light: 'bg-purple-100',
          text: 'text-purple-700',
          border: 'border-purple-300',
          gradient: 'from-purple-500 to-purple-700'
        };
      case 'Writing':return {
          primary: 'bg-emerald-500',
          light: 'bg-emerald-100',
          text: 'text-emerald-700',
          border: 'border-emerald-300',
          gradient: 'from-emerald-500 to-emerald-700'
        };
      default:return {
          primary: 'bg-gray-500',
          light: 'bg-gray-100',
          text: 'text-gray-700',
          border: 'border-gray-300',
          gradient: 'from-gray-500 to-gray-700'
        };
    }
  };

  // Format minutes from seconds
  const formatMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg" data-oid=":9e5nkk">
      <h3 className="text-xl font-bold mb-2 text-center" data-oid="mkmid_8">Cognitive Load Analyzer</h3>
      
      <div className="text-sm text-center mb-6 text-gray-600 dark:text-gray-400" data-oid="_gxo.o.">
        Identify optimal learning conditions and patterns of cognitive fatigue
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-6" data-oid="l..i78h">
        {/* Left panel - load graph */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md" data-oid="o56fo9l">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4" data-oid="wuhood_">Cognitive Load Timeline</h4>
          
          {/* Load visualization - performance over time by session */}
          <div className="relative h-80 border-b border-l border-gray-300 dark:border-gray-700" data-oid="9g50xe8">
            {/* Y-axis labels */}
            <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400" data-oid="8wbu1c3">
              <div data-oid="-r81p:r">100%</div>
              <div data-oid="i:ffa6c">75%</div>
              <div data-oid="71zds8m">50%</div>
              <div data-oid="a4pwuer">25%</div>
              <div data-oid="7h:xfjt">0%</div>
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0" data-oid="_1jpf7.">
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 h-1/4" data-oid=".dycipk"></div>
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 h-1/4" data-oid="czl51-w"></div>
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 h-1/4" data-oid="ufhmffq"></div>
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 h-1/4" data-oid="1o-nfoq"></div>
            </div>
            
            {/* Data visualization */}
            <div className="absolute inset-0 pt-4 pb-2 px-2" data-oid=":16so8p">
              {cognitiveLoadData.map((session, index) => {
                const x1 = `${index / Math.max(1, cognitiveLoadData.length - 1) * 100}%`;
                const y1 = `${100 - session.earlyAccuracy}%`;
                const y2 = `${100 - session.lateAccuracy}%`;

                // Performance line - early to late
                const isSelected = selectedSessionId === session.id;
                const subjectColor = getSubjectColor(session.subject);

                return (
                  <div key={session.id} className="absolute" style={{ left: x1, top: y1 }} data-oid="o:zu1tn">
                    {/* Session point */}
                    <button
                      className={`
                        w-4 h-4 rounded-full -ml-2 -mt-2 transition-all duration-300
                        ${subjectColor.primary}
                        ${isSelected ? 'ring-2 ring-offset-2 ring-indigo-500 scale-125 z-10' : 'hover:scale-110'}
                      `}
                      onClick={() => {
                        setSelectedSessionId(session.id);
                        onSelectSet(session.id);
                      }} data-oid="hg:yoo.">
                    </button>
                    
                    {/* Decline line */}
                    {session.earlyAccuracy > session.lateAccuracy &&
                    <div className="absolute top-0 left-0 h-6 w-px bg-gray-400 dark:bg-gray-600 origin-top"
                    style={{
                      height: `${session.earlyAccuracy - session.lateAccuracy}%`,
                      transform: 'rotate(20deg)'
                    }} data-oid="mm82vp4">
                      </div>
                    }
                    
                    {/* Cognitive load indicator */}
                    <div className={`
                      absolute -mt-10 -ml-3 opacity-70
                      w-6 h-6 rounded-full
                      ${session.isOverloaded ? 'bg-red-500/20' : 'bg-emerald-500/20'}
                      transition-all duration-300
                      ${isSelected ? 'scale-125' : ''}
                    `}
                    style={{
                      width: `${Math.max(6, session.cognitiveLoadScore / 2)}px`,
                      height: `${Math.max(6, session.cognitiveLoadScore / 2)}px`
                    }} data-oid="ulyc1ur"></div>
                    
                    {/* Date label (only showing for a few points to avoid clutter) */}
                    {index % 3 === 0 &&
                    <div className="absolute -bottom-8 left-0 text-xs text-gray-500 dark:text-gray-400 transform -translate-x-1/2" data-oid="-_8k6fc">
                        {formatDate(session.dateCompleted)}
                      </div>
                    }
                  </div>);

              })}
            </div>
          </div>
          
          {/* Legends */}
          <div className="mt-10 flex items-center justify-between" data-oid="dlu-4f1">
            <div className="flex items-center space-x-4" data-oid="n:udmbz">
              <div className="flex items-center" data-oid="ifv0qnw">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" data-oid="re7h7q4"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400" data-oid="o:4-_e8">Math</span>
              </div>
              <div className="flex items-center" data-oid="--9o86k">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-1" data-oid="_q_y:62"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400" data-oid="te:ydu9">Reading</span>
              </div>
              <div className="flex items-center" data-oid="bst6wmx">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1" data-oid="n_ha5r6"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400" data-oid=".:mokjz">Writing</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4" data-oid="u6-4h-q">
              <div className="flex items-center" data-oid="5-djnxw">
                <div className="w-3 h-3 rounded-full bg-red-500/20 mr-1" data-oid="jh1f.ao"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400" data-oid="zpw3jja">Cognitive overload</span>
              </div>
              <div className="flex items-center" data-oid="86t90xy">
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 mr-1" data-oid="cwvuo7b"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400" data-oid="shlvpyz">Optimal load</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right panel - details and recommendations */}
        <div className="w-full md:w-80 space-y-4" data-oid="4co19rh">
          {/* Session details */}
          {selectedSession ?
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md" data-oid="4a6cmtl">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2" data-oid="f_9k:4y">
                Session Analysis
              </h4>
              
              <div className="flex items-center" data-oid="h7gw736">
                <span className={`w-4 h-4 rounded-full ${getSubjectColor(selectedSession.subject).primary} mr-2`} data-oid="9llm_lh"></span>
                <span className="font-medium" data-oid="n0-v71l">{selectedSession.subject}: {selectedSession.type}</span>
              </div>
              
              <div className="mt-3 space-y-2 text-sm" data-oid="l6_gcct">
                <div className="flex justify-between" data-oid="rc9_q7n">
                  <span className="text-gray-600 dark:text-gray-400" data-oid="sb08ivx">Date:</span>
                  <span data-oid="1vn_i0g">{new Date(selectedSession.dateCompleted).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between" data-oid="2_.auoh">
                  <span className="text-gray-600 dark:text-gray-400" data-oid="i0_mwxv">Difficulty:</span>
                  <span data-oid="0igczlq">{selectedSession.difficulty}</span>
                </div>
                <div className="flex justify-between" data-oid="w9kantp">
                  <span className="text-gray-600 dark:text-gray-400" data-oid="skvj7n1">Duration:</span>
                  <span data-oid="j1uhv13">{formatMinutes(selectedSession.duration)}</span>
                </div>
                <div className="flex justify-between" data-oid="cmrc7y9">
                  <span className="text-gray-600 dark:text-gray-400" data-oid="lcdvuyo">Questions:</span>
                  <span data-oid="pf42hdf">{selectedSession.questionCount}</span>
                </div>
                <div className="flex justify-between" data-oid="-dgi9dv">
                  <span className="text-gray-600 dark:text-gray-400" data-oid="dmsy5:k">Pace:</span>
                  <span data-oid="kjwr-pl">{selectedSession.pace}</span>
                </div>
                <div className="flex justify-between" data-oid="08n7ok_">
                  <span className="text-gray-600 dark:text-gray-400" data-oid="7dhwxg5">Time of Day:</span>
                  <span data-oid="ut.rzds">{selectedSession.timeOfDay}</span>
                </div>
              </div>
              
              {/* Cognitive load metrics */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800" data-oid="aa4ibfx">
                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-2" data-oid="1s-215p">
                  Cognitive Load Metrics
                </h5>
                
                <div className="space-y-3" data-oid=":9sllir">
                  {/* Performance decline */}
                  <div data-oid="17j25c6">
                    <div className="flex justify-between mb-1" data-oid="hvrnokx">
                      <span className="text-xs text-gray-600 dark:text-gray-400" data-oid="teig2i0">Performance Decline:</span>
                      <span className="text-xs font-medium" data-oid="c57w:u1">
                        {selectedSession.performanceDecline.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5" data-oid="bfgdb04">
                      <div
                      className={`h-1.5 rounded-full ${
                      selectedSession.performanceDecline > 15 ? 'bg-red-500' :
                      selectedSession.performanceDecline > 10 ? 'bg-amber-500' :
                      'bg-emerald-500'}`
                      }
                      style={{ width: `${Math.min(100, selectedSession.performanceDecline * 2)}%` }} data-oid="i:76--6">
                    </div>
                    </div>
                  </div>
                  
                  {/* Cognitive load score */}
                  <div data-oid="x_x607k">
                    <div className="flex justify-between mb-1" data-oid="xij7x02">
                      <span className="text-xs text-gray-600 dark:text-gray-400" data-oid="q-qugs3">Cognitive Load Score:</span>
                      <span className="text-xs font-medium" data-oid="a5_ksvt">
                        {selectedSession.cognitiveLoadScore.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5" data-oid="42isat:">
                      <div
                      className={`h-1.5 rounded-full ${
                      selectedSession.cognitiveLoadScore > 20 ? 'bg-red-500' :
                      selectedSession.cognitiveLoadScore > 15 ? 'bg-amber-500' :
                      'bg-emerald-500'}`
                      }
                      style={{ width: `${Math.min(100, selectedSession.cognitiveLoadScore * 2.5)}%` }} data-oid="96_987l">
                    </div>
                    </div>
                  </div>
                  
                  {/* Efficiency */}
                  <div data-oid="ar02b49">
                    <div className="flex justify-between mb-1" data-oid="2h7f_yp">
                      <span className="text-xs text-gray-600 dark:text-gray-400" data-oid="abd1-8_">Learning Efficiency:</span>
                      <span className="text-xs font-medium" data-oid="336q:g_">
                        {selectedSession.efficiency.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5" data-oid="y1j-0qe">
                      <div
                      className="h-1.5 rounded-full bg-indigo-500"
                      style={{ width: `${Math.min(100, selectedSession.efficiency * 20)}%` }} data-oid="5cxicq1">
                    </div>
                    </div>
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="mt-4" data-oid="k7s71_:">
                  <div className={`
                    px-3 py-2 rounded-md text-xs font-medium
                    ${selectedSession.isOverloaded ?
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'}
                  `
                } data-oid="o7ctb54">
                    {selectedSession.isOverloaded ?
                  'Signs of cognitive overload detected' :
                  'Cognitive load within optimal range'
                  }
                  </div>
                </div>
              </div>
            </div> :

          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md text-center" data-oid="kiuvf1k">
              <p className="text-gray-500 dark:text-gray-400 text-sm" data-oid="mnyn1ej">
                Select a session point to view detailed analysis
              </p>
            </div>
          }
          
          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md" data-oid="415h-e:">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3" data-oid="oai4cg1">
              Cognitive Load Recommendations
            </h4>
            
            {recommendations.length > 0 ?
            <ul className="space-y-2" data-oid="sd__ijo">
                {recommendations.map((rec, index) =>
              <li key={index} className="flex gap-2 text-sm" data-oid="3apc73v">
                    <div className="text-indigo-500 mt-1" data-oid="glviyw_">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-oid="wt8eo_a">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" data-oid="wdb0tbn" />
                      </svg>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300" data-oid="o5o5mwl">{rec}</div>
                  </li>
              )}
              </ul> :

            <p className="text-gray-500 dark:text-gray-400 text-sm" data-oid="_1qf-1p">
                More practice data needed for personalized recommendations
              </p>
            }
          </div>
        </div>
      </div>
      
      {/* Help text */}
      <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs text-gray-600 dark:text-gray-400" data-oid="oxlkknf">
        <p data-oid="bffaq6z">
          This view analyzes your cognitive load during practice sessions. Points show session performance, with larger halos 
          indicating higher cognitive load. Lines show performance decline within sessions. Use this analysis to optimize your 
          study schedule and avoid cognitive fatigue.
        </p>
      </div>
    </div>);

}