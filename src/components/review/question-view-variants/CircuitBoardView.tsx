'use client';

import { useState, useMemo, useCallback } from 'react';
import { QuestionViewProps } from './types';

/**
 * CircuitBoardView - Questions displayed as components on a circuit board
 * Visualizes question relationships as a circuit with electronic components
 */
export function CircuitBoardView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all');
  const [highlightMode, setHighlightMode] = useState<'accuracy' | 'difficulty' | 'recent'>('accuracy');

  // Extract all questions with metadata
  const allQuestions = practiceSets.flatMap((set) =>
  set.questions.map((q) => ({
    ...q,
    setId: set.id,
    subject: set.subject,
    type: set.type,
    accuracy: set.accuracy,
    dateCompleted: set.dateCompleted
  }))
  );

  // Get all available subjects for filtering
  const subjects = Array.from(new Set(practiceSets.map((set) => set.subject)));

  // Filter questions by selected subject
  const filteredQuestions = allQuestions.
  filter((q) => selectedSubject === 'all' || q.subject === selectedSubject);

  // Group questions by topic
  const groupedByTopic = useMemo(() => {
    const result: Record<string, typeof filteredQuestions> = {};

    filteredQuestions.forEach((question) => {
      if (!result[question.topic]) {
        result[question.topic] = [];
      }
      result[question.topic].push(question);
    });

    return result;
  }, [filteredQuestions]);

  // Define connection type
  type Connection = {
    target: string;
    strength: number;
    type: string;
  };

  // Circuit board layout generation
  const circuitBoard = useMemo(() => {
    const topics = Object.keys(groupedByTopic);

    // Generate different component types based on the topic
    const topicComponents = topics.map((topic, index) => {
      const questions = groupedByTopic[topic];
      const correct = questions.filter((q) => q.correct).length;
      const accuracy = questions.length > 0 ? correct / questions.length * 100 : 0;
      const averageTime = questions.reduce((sum, q) => sum + q.timeSpent, 0) / questions.length;

      // Sort questions by different attributes based on the current highlight mode
      let sortedQuestions;
      if (highlightMode === 'accuracy') {
        sortedQuestions = [...questions].sort((a, b) => a.correct === b.correct ? 0 : a.correct ? -1 : 1);
      } else if (highlightMode === 'difficulty') {
        const difficultyRank = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };
        sortedQuestions = [...questions].sort((a, b) =>
        difficultyRank[b.difficulty as keyof typeof difficultyRank] -
        difficultyRank[a.difficulty as keyof typeof difficultyRank]
        );
      } else {// recent
        sortedQuestions = [...questions].sort((a, b) =>
        new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
        );
      }

      // Generate circuit component type based on topic characteristics
      let componentType = 'chip'; // default
      if (questions.length > 10) {
        componentType = 'processor';
      } else if (questions.length > 5) {
        componentType = 'memory';
      } else if (questions.some((q) => q.difficulty === 'Hard')) {
        componentType = 'capacitor';
      } else if (accuracy < 50) {
        componentType = 'resistor';
      } else {
        componentType = 'diode';
      }

      return {
        id: topic,
        name: topic,
        componentType,
        questions: sortedQuestions,
        metrics: {
          accuracy,
          averageTime,
          totalQuestions: questions.length,
          correctQuestions: correct
        },
        // Position will be calculated later in the render function to make it responsive
        connections: [] as Connection[] // Explicit typing
      };
    });

    // Create connections between related components
    // Two topics are related if they share subtopics
    topicComponents.forEach((component, i) => {
      topicComponents.forEach((otherComponent, j) => {
        if (i !== j) {
          // Check for shared subtopics
          const subtopics = new Set(component.questions.map((q) => q.subtopic));
          const otherSubtopics = new Set(otherComponent.questions.map((q) => q.subtopic));

          const sharedSubtopics = [...subtopics].filter((s) => otherSubtopics.has(s));

          if (sharedSubtopics.length > 0) {
            component.connections.push({
              target: otherComponent.id,
              strength: sharedSubtopics.length, // Stronger connection if more shared subtopics
              type: 'subtopic'
            });
          }
        }
      });
    });

    return topicComponents;
  }, [groupedByTopic, highlightMode]);

  // Helper to get component color based on accuracy
  const getComponentColor = useCallback((accuracy: number, componentType: string) => {
    // Base color depends on the highlight mode and component type
    const baseColorMap: Record<string, string> = {
      processor: 'from-sky-600 to-sky-400 dark:from-sky-800 dark:to-sky-600',
      memory: 'from-indigo-600 to-indigo-400 dark:from-indigo-800 dark:to-indigo-600',
      chip: 'from-violet-600 to-violet-400 dark:from-violet-800 dark:to-violet-600',
      capacitor: 'from-green-600 to-green-400 dark:from-green-800 dark:to-green-600',
      resistor: 'from-amber-600 to-amber-400 dark:from-amber-800 dark:to-amber-600',
      diode: 'from-rose-600 to-rose-400 dark:from-rose-800 dark:to-rose-600'
    };

    // Modify the color based on accuracy if in accuracy mode
    if (highlightMode === 'accuracy') {
      if (accuracy >= 80) return 'from-emerald-600 to-emerald-400 dark:from-emerald-800 dark:to-emerald-600';
      if (accuracy >= 60) return 'from-green-600 to-green-400 dark:from-green-800 dark:to-green-600';
      if (accuracy >= 40) return 'from-yellow-600 to-yellow-400 dark:from-yellow-800 dark:to-yellow-600';
      if (accuracy >= 20) return 'from-orange-600 to-orange-400 dark:from-orange-800 dark:to-orange-600';
      return 'from-red-600 to-red-400 dark:from-red-800 dark:to-red-600';
    }

    return baseColorMap[componentType] || 'from-slate-600 to-slate-400 dark:from-slate-800 dark:to-slate-600';
  }, [highlightMode]);

  // Get component shape based on type
  const getComponentShape = (componentType: string) => {
    switch (componentType) {
      case 'processor':
        return 'rounded-lg w-36 h-32';
      case 'memory':
        return 'rounded-md w-32 h-28';
      case 'chip':
        return 'rounded-md w-28 h-24';
      case 'capacitor':
        return 'rounded-full w-24 h-24';
      case 'resistor':
        return 'rounded-lg w-24 h-16';
      case 'diode':
        return 'rounded-md w-20 h-20';
      default:
        return 'rounded-md w-24 h-20';
    }
  };

  // Get pin count based on component type and connections
  const getPinCount = (componentType: string, connectionCount: number) => {
    switch (componentType) {
      case 'processor':return Math.min(16, Math.max(8, connectionCount * 2));
      case 'memory':return Math.min(12, Math.max(6, connectionCount * 2));
      case 'chip':return Math.min(8, Math.max(4, connectionCount * 2));
      case 'capacitor':return 2;
      case 'resistor':return 2;
      case 'diode':return 2;
      default:return 4;
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="8ix6.z1">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="232p-q:">22. Circuit Board View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center" data-oid="lno-hjq">
        {/* Subject filter */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="79yhhca">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="3n8o0g4">Subject</label>
          <select
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)} data-oid="tc-op4q">

            <option value="all" data-oid="iq_4zin">All Subjects</option>
            {subjects.map((subject, i) =>
            <option key={i} value={subject} data-oid="u2r6-te">{subject}</option>
            )}
          </select>
        </div>
        
        {/* Highlight Mode */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm" data-oid="zd2hpz:">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1" data-oid="4pdrhjj">Highlight Mode</label>
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden border border-slate-200 dark:border-slate-600" data-oid="pcd.nag">
            <button
              className={`px-3 py-1 text-xs font-medium transition-colors ${
              highlightMode === 'accuracy' ?
              'bg-indigo-500 text-white' :
              'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`
              }
              onClick={() => setHighlightMode('accuracy')} data-oid="ghic57a">

              Accuracy
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium transition-colors ${
              highlightMode === 'difficulty' ?
              'bg-indigo-500 text-white' :
              'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`
              }
              onClick={() => setHighlightMode('difficulty')} data-oid="4kb_jj_">

              Difficulty
            </button>
            <button
              className={`px-3 py-1 text-xs font-medium transition-colors ${
              highlightMode === 'recent' ?
              'bg-indigo-500 text-white' :
              'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`
              }
              onClick={() => setHighlightMode('recent')} data-oid="3qly_47">

              Recent
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-3 mb-6" data-oid="1om79nv">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full text-xs font-medium text-indigo-700 dark:text-indigo-300" data-oid="18aijns">
          Total Questions: {filteredQuestions.length}
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-300" data-oid="n7xqr:4">
          Topics: {circuitBoard.length}
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full text-xs font-medium text-amber-700 dark:text-amber-300" data-oid="eav:fnf">
          Connections: {circuitBoard.reduce((sum, component) => sum + component.connections.length, 0)}
        </div>
      </div>
      
      {/* Circuit board panel */}
      <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 mb-4 min-h-[500px] border border-slate-600 dark:border-slate-800 relative overflow-hidden" data-oid="_4m1zad">
        {/* Background pattern for circuit traces */}
        <div className="absolute inset-0 opacity-10" data-oid="p:n569q">
          {/* Simple grid pattern for circuit board */}
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(to right, rgba(30, 41, 59, 0.5) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} data-oid="qpit9wb"></div>
        </div>
        
        {/* Circuit components */}
        {circuitBoard.length > 0 ?
        <div className="flex flex-wrap gap-6 justify-center" data-oid="5fpt8sq">
            {circuitBoard.map((component, index) => {
            const pinCount = getPinCount(component.componentType, component.connections.length);
            const circuitClass = getComponentShape(component.componentType);
            const backgroundGradient = getComponentColor(component.metrics.accuracy, component.componentType);
            const isSelected = component.questions.some((q) => q.setId === selectedSetId);

            return (
              <div
                key={component.id}
                className={`relative select-none cursor-pointer ${isSelected ? 'z-10 ring-2 ring-white' : ''}`}
                onClick={() => {
                  // Find most recent question
                  const sortedQuestions = [...component.questions].sort(
                    (a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
                  );
                  if (sortedQuestions.length > 0) {
                    onSelectSet(sortedQuestions[0].setId);
                  }
                }} data-oid="rvhuq9j">

                  {/* Circuit board pins */}
                  <div className="absolute -top-1 left-0 right-0 flex justify-around" data-oid="db4eiap">
                    {Array.from({ length: Math.ceil(pinCount / 4) }).map((_, i) =>
                  <div key={`top-${i}`} className="w-1 h-2 bg-slate-300 dark:bg-slate-600" data-oid="f4vvwvb"></div>
                  )}
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 flex justify-around" data-oid="e3pa4yo">
                    {Array.from({ length: Math.ceil(pinCount / 4) }).map((_, i) =>
                  <div key={`bottom-${i}`} className="w-1 h-2 bg-slate-300 dark:bg-slate-600" data-oid="r.g2evf"></div>
                  )}
                  </div>
                  <div className="absolute top-0 bottom-0 -left-1 flex flex-col justify-around" data-oid="5x3jxt5">
                    {Array.from({ length: Math.ceil(pinCount / 4) }).map((_, i) =>
                  <div key={`left-${i}`} className="h-1 w-2 bg-slate-300 dark:bg-slate-600" data-oid="e5uh0xg"></div>
                  )}
                  </div>
                  <div className="absolute top-0 bottom-0 -right-1 flex flex-col justify-around" data-oid="i3dbklc">
                    {Array.from({ length: Math.ceil(pinCount / 4) }).map((_, i) =>
                  <div key={`right-${i}`} className="h-1 w-2 bg-slate-300 dark:bg-slate-600" data-oid="7birlx7"></div>
                  )}
                  </div>
                  
                  {/* Circuit component */}
                  <div className={`${circuitClass} bg-gradient-to-br ${backgroundGradient} shadow-lg flex flex-col justify-center items-center p-2 text-white relative overflow-hidden`} data-oid="ykh0eiu">
                    {/* Component markings */}
                    {component.componentType === 'processor' &&
                  <div className="absolute top-0 left-0 w-full h-full grid grid-cols-4 grid-rows-4 gap-1 p-1 pointer-events-none opacity-20" data-oid="ta1miu_">
                        {Array.from({ length: 16 }).map((_, i) =>
                    <div key={i} className="bg-white rounded-sm" data-oid="8fugn.0"></div>
                    )}
                      </div>
                  }
                    {component.componentType === 'chip' &&
                  <div className="absolute top-2 left-2 w-4 h-4 rounded-full border-2 border-white opacity-30" data-oid="7ea5mnd"></div>
                  }
                    {component.componentType === 'resistor' &&
                  <div className="absolute top-0 left-0 w-full h-full flex justify-around items-center pointer-events-none opacity-20" data-oid="s79z6pi">
                        {Array.from({ length: 4 }).map((_, i) =>
                    <div key={i} className="w-full h-2 bg-white" data-oid="-waz..3"></div>
                    )}
                      </div>
                  }
                    
                    {/* Component name */}
                    <div className="font-bold text-center text-sm mb-1 truncate max-w-full" data-oid="ug626kj">
                      {component.name}
                    </div>
                    
                    {/* Component metrics */}
                    <div className="text-xs opacity-90 flex gap-2" data-oid="1i3.hy7">
                      <span data-oid="d:n5tp4">{component.metrics.totalQuestions} Q</span>
                      <span data-oid="t_.y8-8">{component.metrics.accuracy.toFixed(0)}%</span>
                    </div>
                    
                    {/* Accuracy indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20" data-oid="p:bssc7">
                      <div
                      className="h-full bg-white"
                      style={{ width: `${component.metrics.accuracy}%` }} data-oid="995u.ya">
                    </div>
                    </div>
                  </div>
                </div>);

          })}
          </div> :

        <div className="h-full flex items-center justify-center text-slate-400" data-oid="slgkohv">
            <div className="text-center" data-oid="84xgndz">
              <div className="mb-2" data-oid="21lhmk6">No circuit components found</div>
              <div className="text-sm" data-oid="rnxde4s">Try selecting a different subject</div>
            </div>
          </div>
        }
      </div>
      
      {/* Legend */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 text-sm" data-oid="6e7xmil">
        <h4 className="font-medium mb-2 text-slate-700 dark:text-slate-300" data-oid="54qn48h">Component Types</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs" data-oid="1.5lu5u">
          <div className="flex items-center gap-2" data-oid="kxa_hv9">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-600 to-sky-400 dark:from-sky-800 dark:to-sky-600" data-oid="5nqrah_"></div>
            <span className="text-slate-600 dark:text-slate-400" data-oid="u9zt8l_">Processor (&gt;10 Questions)</span>
          </div>
          <div className="flex items-center gap-2" data-oid="5pi4f-o">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 dark:from-indigo-800 dark:to-indigo-600" data-oid="-hfu57n"></div>
            <span className="text-slate-600 dark:text-slate-400" data-oid="7kb.un2">Memory (5-10 Questions)</span>
          </div>
          <div className="flex items-center gap-2" data-oid="ckccewz">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-violet-400 dark:from-violet-800 dark:to-violet-600" data-oid="mj65wx:"></div>
            <span className="text-slate-600 dark:text-slate-400" data-oid="ay-9vf8">Chip (Few Questions)</span>
          </div>
          <div className="flex items-center gap-2" data-oid="wj:cobx">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-600 to-green-400 dark:from-green-800 dark:to-green-600" data-oid="e6bvo6."></div>
            <span className="text-slate-600 dark:text-slate-400" data-oid="0xvllau">Capacitor (Hard Questions)</span>
          </div>
          <div className="flex items-center gap-2" data-oid="_2hk2uc">
            <div className="w-6 h-4 rounded-lg bg-gradient-to-br from-amber-600 to-amber-400 dark:from-amber-800 dark:to-amber-600" data-oid="vrtt.m:"></div>
            <span className="text-slate-600 dark:text-slate-400" data-oid="n8fmeh8">Resistor (Low Accuracy)</span>
          </div>
          <div className="flex items-center gap-2" data-oid="f-zuk:-">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-rose-600 to-rose-400 dark:from-rose-800 dark:to-rose-600" data-oid="02ktyo8"></div>
            <span className="text-slate-600 dark:text-slate-400" data-oid="gs3r03l">Diode (Other)</span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400" data-oid="ngpw0ta">
          <p data-oid="4y7-4px">Click on any component to see details of the most recent question set for that topic.</p>
        </div>
      </div>
    </div>);

}