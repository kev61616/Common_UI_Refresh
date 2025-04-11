'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from './types';
import { QuestionWithMetadata } from '../question-view/types';
import { extractQuestionsWithMetadata } from '../question-view/utils';

/**
 * Gradient Flow View - Inspired by Heatmap
 * Visualizes data flow between categories with smooth gradients and color intensity showing accuracy
 */
export function GradientFlowView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State variables
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);
  const [flowMode, setFlowMode] = useState<'subjects-to-difficulty' | 'difficulty-to-topics'>('subjects-to-difficulty');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<{from: string;to: string;} | null>(null);

  // Load questions on component mount
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets);
    setAllQuestions(questions);
  }, [practiceSets]);

  // Simplified component with placeholder content
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="a4d6ij9">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="4fjtsa_">35. Gradient Flow View</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8" data-oid="vwzag4h">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg" data-oid="sc8._8p">
          <button
            onClick={() => setFlowMode('subjects-to-difficulty')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            flowMode === 'subjects-to-difficulty' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="jy-8:k7">

            Subjects → Difficulty
          </button>
          <button
            onClick={() => setFlowMode('difficulty-to-topics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            flowMode === 'difficulty-to-topics' ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            } data-oid="8vhsset">

            Difficulty → Topics
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto" data-oid="3kjwoex">
        {/* Flow visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 flex items-center justify-center min-h-[500px]" data-oid="k-w0j._">
          <div className="text-center text-slate-500 dark:text-slate-400" data-oid="9:.8n0t">
            <p data-oid="pesi5y4">Visualization view currently being implemented.</p>
            <p data-oid="_z7qvzj">Please select from the view toggle buttons above.</p>
          </div>
        </div>
        
        {/* Details panel */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 flex items-center justify-center min-h-[500px]" data-oid="prk12u.">
          <div className="text-center text-slate-500 dark:text-slate-400" data-oid="jkd0tv.">
            <p data-oid="2rmeguy">Click on a flow or node to view details.</p>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center mt-8 gap-4 text-xs" data-oid="ybkm7-z">
        <div className="font-medium text-slate-600 dark:text-slate-300" data-oid="fgidbsq">Flow Color: Accuracy</div>
        <div className="flex items-center" data-oid="yjeou06">
          <div className="w-4 h-4 bg-red-500/30 rounded-sm" data-oid=":oc1.xl"></div>
          <span className="ml-1" data-oid="eht3qon">0-40%</span>
        </div>
        <div className="flex items-center" data-oid="5v6v5p7">
          <div className="w-4 h-4 bg-amber-400/30 rounded-sm" data-oid="xcbun38"></div>
          <span className="ml-1" data-oid="l-9vb.v">40-70%</span>
        </div>
        <div className="flex items-center" data-oid="l550kr-">
          <div className="w-4 h-4 bg-green-500/30 rounded-sm" data-oid="o1i3_-4"></div>
          <span className="ml-1" data-oid="cqe74xk">70-100%</span>
        </div>
        <div className="font-medium text-slate-600 dark:text-slate-300 ml-4" data-oid="mzxtob3">Flow Width: Question Count</div>
      </div>
    </div>);

}