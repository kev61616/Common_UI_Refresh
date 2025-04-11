'use client';

import { useState } from 'react';
import { QuestionViewProps } from './types';

/**
 * DiagnosticDashboardView - A comprehensive dashboard showing performance metrics across question types
 * Displays statistics, charts, and trending data to give a complete picture of performance
 */
export function DiagnosticDashboardView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'time' | 'mistakes'>('accuracy');

  // Calculate aggregate statistics
  const totalQuestions = practiceSets.reduce((sum, set) => sum + set.questions.length, 0);
  const avgAccuracy = practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length;
  const avgTimePerQuestion = practiceSets.reduce((sum, set) => sum + set.timeUsed / set.questions.length, 0) / practiceSets.length;

  // Calculate per-subject metrics
  const subjectData = practiceSets.reduce((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = {
        count: 0,
        totalAccuracy: 0,
        totalTime: 0,
        totalQuestions: 0,
        conceptualMistakes: 0,
        carelessMistakes: 0,
        timeManagementMistakes: 0
      };
    }

    acc[set.subject].count++;
    acc[set.subject].totalAccuracy += set.accuracy;
    acc[set.subject].totalTime += set.timeUsed;
    acc[set.subject].totalQuestions += set.questions.length;
    acc[set.subject].conceptualMistakes += set.mistakeTypes.conceptual;
    acc[set.subject].carelessMistakes += set.mistakeTypes.careless;
    acc[set.subject].timeManagementMistakes += set.mistakeTypes.timeManagement;

    return acc;
  }, {} as Record<string, any>);

  // Create subject metrics
  const subjectMetrics = Object.entries(subjectData).map(([subject, data]: [string, any]) => ({
    subject,
    avgAccuracy: data.totalAccuracy / data.count,
    avgTimePerQuestion: data.totalTime / data.totalQuestions,
    conceptualMistakes: data.conceptualMistakes,
    carelessMistakes: data.carelessMistakes,
    timeManagementMistakes: data.timeManagementMistakes,
    totalQuestions: data.totalQuestions
  }));

  // Calculate difficulty breakdown
  const difficultyData = practiceSets.reduce((acc, set) => {
    if (!acc[set.difficulty]) {
      acc[set.difficulty] = {
        count: 0,
        totalAccuracy: 0
      };
    }

    acc[set.difficulty].count++;
    acc[set.difficulty].totalAccuracy += set.accuracy;

    return acc;
  }, {} as Record<string, any>);

  // Create difficulty metrics
  const difficultyMetrics = Object.entries(difficultyData).map(([difficulty, data]: [string, any]) => ({
    difficulty,
    avgAccuracy: data.totalAccuracy / data.count,
    count: data.count
  }));

  // Get trending data by sorting practice sets by date
  const trendingSets = [...practiceSets].
  sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()).
  slice(0, 5);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="yv-:ug0">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="9epgkw3">4. Diagnostic Dashboard View</h3>
      
      {/* Overall metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" data-oid="bmtf2e-">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm" data-oid="ogowh0q">
          <h4 className="text-lg font-semibold text-center text-sky-600 dark:text-sky-400 mb-2" data-oid="p43bs5n">Overall Accuracy</h4>
          <div className="flex items-center justify-center" data-oid="v35dnnq">
            <div className="relative w-32 h-32" data-oid="drej9_m">
              <svg className="w-32 h-32" viewBox="0 0 100 100" data-oid="o3bvfm7">
                <circle
                  className="text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent" data-oid="lh6-m66" />

                <circle
                  className="text-sky-500 dark:text-sky-400 stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${avgAccuracy * 2.51}, 251`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)" data-oid="0a_9lim" />

              </svg>
              <div className="absolute inset-0 flex items-center justify-center" data-oid="fvzq2e1">
                <span className="text-2xl font-bold" data-oid="foyg2-w">{avgAccuracy.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          <p className="text-center mt-2 text-sm text-slate-500 dark:text-slate-400" data-oid="nc_sapd">
            Across {totalQuestions} questions
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm" data-oid="lk7z1h5">
          <h4 className="text-lg font-semibold text-center text-emerald-600 dark:text-emerald-400 mb-2" data-oid="9e67jqu">Time Per Question</h4>
          <div className="flex items-center justify-center h-32" data-oid="6vpdwi4">
            <div className="text-center" data-oid="ki91590">
              <span className="text-3xl font-bold" data-oid="l78vtf8">{avgTimePerQuestion.toFixed(1)}</span>
              <span className="text-lg ml-1" data-oid="8sut.la">sec</span>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2" data-oid="7s_atqi">
                Average time spent per question
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm" data-oid="3fv65ic">
          <h4 className="text-lg font-semibold text-center text-amber-600 dark:text-amber-400 mb-2" data-oid="_.6au.3">Mistake Analysis</h4>
          <div className="flex items-center justify-center h-32" data-oid="hirfa0b">
            <div className="w-full" data-oid="t-55frq">
              {['Conceptual', 'Careless', 'Time Management'].map((type, index) => {
                const mistakeType = type.toLowerCase().replace(' ', '') as 'conceptual' | 'careless' | 'timeManagement';
                const total = practiceSets.reduce((sum, set) => sum + set.mistakeTypes[mistakeType], 0);
                const percentage = total / totalQuestions * 100;

                return (
                  <div key={index} className="mb-2" data-oid="7tyv7br">
                    <div className="flex justify-between text-sm mb-1" data-oid="vxw4s3l">
                      <span data-oid="kbwhf-h">{type}</span>
                      <span data-oid="eaed0d7">{total} mistakes</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2" data-oid="odtg09v">
                      <div
                        className={`h-2 rounded-full ${
                        index === 0 ? 'bg-red-500' :
                        index === 1 ? 'bg-yellow-500' :
                        'bg-orange-500'}`
                        }
                        style={{ width: `${Math.min(percentage * 5, 100)}%` }} data-oid="brdzfeo">
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Metric selector */}
      <div className="mb-6 flex justify-center" data-oid="9:yuars">
        <div className="inline-flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg" data-oid="k6u7kr9">
          {(
          [
          { id: 'accuracy', label: 'Accuracy' },
          { id: 'time', label: 'Time' },
          { id: 'mistakes', label: 'Mistakes' }] as
          const).
          map((metric) =>
          <button
            key={metric.id}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedMetric === metric.id ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            }
            onClick={() => setSelectedMetric(metric.id)} data-oid="q.t6yvb">

              {metric.label}
            </button>
          )}
        </div>
      </div>
      
      {/* Subject breakdown */}
      <div className="mb-8" data-oid="gpgbwqr">
        <h4 className="text-lg font-semibold mb-4" data-oid="lrg93ng">Subject Performance</h4>
        <div className="space-y-4" data-oid="zgs.rvi">
          {subjectMetrics.map((metric, index) =>
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              const setOfSubject = practiceSets.find((set) => set.subject === metric.subject);
              if (setOfSubject) onSelectSet(setOfSubject.id);
            }} data-oid="24tzfx_">

              <div className="flex items-center justify-between mb-2" data-oid="53cp-b6">
                <h5 className="font-medium" data-oid="jr16ir-">{metric.subject}</h5>
                <span className="text-sm text-slate-500 dark:text-slate-400" data-oid="u2kc46-">
                  {metric.totalQuestions} questions
                </span>
              </div>
              
              {selectedMetric === 'accuracy' &&
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-1" data-oid="-5u3nxa">
                  <div
                className="h-4 rounded-full bg-sky-500 dark:bg-sky-400 text-xs text-white flex items-center justify-end pr-2"
                style={{ width: `${metric.avgAccuracy}%` }} data-oid="rbxyarf">

                    {metric.avgAccuracy.toFixed(1)}%
                  </div>
                </div>
            }
              
              {selectedMetric === 'time' &&
            <div className="flex items-center" data-oid="hfwl_-a">
                  <div className="w-12 text-right pr-2" data-oid=".ogqlgx">
                    <span className="text-sm" data-oid="_5lod_z">{metric.avgTimePerQuestion.toFixed(1)}s</span>
                  </div>
                  <div className="flex-1" data-oid="z4i94nz">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4" data-oid="g58va05">
                      <div
                    className="h-4 rounded-full bg-emerald-500 dark:bg-emerald-400"
                    style={{ width: `${Math.min(metric.avgTimePerQuestion / 120 * 100, 100)}%` }} data-oid="4uaog9c">
                  </div>
                    </div>
                  </div>
                </div>
            }
              
              {selectedMetric === 'mistakes' &&
            <div className="flex justify-between text-sm" data-oid="ditdj5i">
                  <div className="space-y-1" data-oid="qkdp02l">
                    <div className="flex items-center" data-oid="ywsc0bn">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2" data-oid="3rb-yti"></span>
                      <span data-oid="rgtyqux">Conceptual: {metric.conceptualMistakes}</span>
                    </div>
                    <div className="flex items-center" data-oid="v.8iqwi">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" data-oid="xdw:pnl"></span>
                      <span data-oid="6q_1rzq">Careless: {metric.carelessMistakes}</span>
                    </div>
                    <div className="flex items-center" data-oid="j4clhsj">
                      <span className="w-3 h-3 rounded-full bg-orange-500 mr-2" data-oid="vzmfn8y"></span>
                      <span data-oid="rjb:2u-">Time Management: {metric.timeManagementMistakes}</span>
                    </div>
                  </div>
                  <div className="h-16 flex items-end space-x-1" data-oid="8rr0g:_">
                    {[
                { count: metric.conceptualMistakes, color: 'bg-red-500' },
                { count: metric.carelessMistakes, color: 'bg-yellow-500' },
                { count: metric.timeManagementMistakes, color: 'bg-orange-500' }].
                map((mistake, i) =>
                <div
                  key={i}
                  className={`w-6 ${mistake.color} rounded-t`}
                  style={{
                    height: `${Math.max(mistake.count / 5 * 100, 5)}%`
                  }} data-oid="._2d8ei">
                </div>
                )}
                  </div>
                </div>
            }
            </div>
          )}
        </div>
      </div>
      
      {/* Difficulty breakdown */}
      <div className="mb-8" data-oid="ej77kke">
        <h4 className="text-lg font-semibold mb-4" data-oid="ek:aqes">Difficulty Analysis</h4>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm" data-oid="33-0pfi">
          <div className="flex items-end h-40 space-x-2" data-oid="q:0_pb2">
            {difficultyMetrics.map((metric, index) =>
            <div key={index} className="flex-1 flex flex-col items-center" data-oid="v_qtw8s">
                <div
                className={`w-full rounded-t transition-all cursor-pointer hover:opacity-80 ${
                metric.difficulty === 'Easy' ? 'bg-green-500' :
                metric.difficulty === 'Medium' ? 'bg-blue-500' : 'bg-purple-500'}`
                }
                style={{ height: `${metric.avgAccuracy}%` }}
                onClick={() => {
                  const setOfDifficulty = practiceSets.find((set) => set.difficulty === metric.difficulty);
                  if (setOfDifficulty) onSelectSet(setOfDifficulty.id);
                }} data-oid="5d4mn.a">
              </div>
                <div className="mt-2 text-center" data-oid="9ch0:3p">
                  <div className="font-medium" data-oid="fe34tv8">{metric.difficulty}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="6xekj7j">{metric.avgAccuracy.toFixed(1)}%</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Recent trends */}
      <div data-oid="mqpkn8r">
        <h4 className="text-lg font-semibold mb-4" data-oid="_3jo.85">Recent Trends</h4>
        <div className="space-y-3" data-oid="c9kty75">
          {trendingSets.map((set, index) =>
          <div
            key={index}
            className={`bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border-l-4 cursor-pointer hover:shadow-md transition-shadow ${
            selectedSetId === set.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' :
            set.accuracy >= 90 ? 'border-green-500' :
            set.accuracy >= 70 ? 'border-blue-500' :
            'border-orange-500'}`
            }
            onClick={() => onSelectSet && onSelectSet(set.id)} data-oid="2.b7.l:">

              <div className="flex justify-between items-center" data-oid="9fuhcr3">
                <div data-oid="l4le_y0">
                  <h5 className="font-medium" data-oid="rv-66p_">{set.subject}: {set.type}</h5>
                  <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="4mv6xus">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right" data-oid="ab6-e2g">
                  <div className="font-bold text-lg" data-oid="l.fp76u">{set.accuracy}%</div>
                  <div className="text-sm" data-oid="bze_h0u">
                    {(set.timeUsed / 60).toFixed(1)} min
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}