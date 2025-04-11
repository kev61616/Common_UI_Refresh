'use client';

import { QuestionViewProps } from './types';
import React from 'react';

/**
 * Helper function for rendering placeholder components with numbered titles
 */
function renderPlaceholder(props: QuestionViewProps, variant: number, title: string, description: string = "This view is coming soon!") {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="jq:8wnp">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="vi8:iym">{variant}. {title}</h3>
      <div className="min-h-[500px] flex justify-center items-center" data-oid="3v5hq4.">
        <div className="text-center p-8 max-w-xl" data-oid="5cmak-s">
          <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg mb-8" data-oid="qepn8zf">
            <div className="text-lg font-bold text-sky-700 dark:text-sky-300 mb-2" data-oid="wtktrx4">
              {title}
            </div>
            <p className="text-sky-600 dark:text-sky-400 text-sm" data-oid="r88dl3l">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-oid="u7mvepp">
            {props.practiceSets.slice(0, 4).map((set) =>
            <div
              key={set.id}
              onClick={() => props.onSelectSet(set.id)}
              className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow" data-oid="ht4_5n4">

                <div className="font-medium" data-oid="jwrg73b">{set.subject}: {set.type}</div>
                <div className="flex justify-between mt-2" data-oid="dyrflq9">
                  <div className="text-sm" data-oid="a-p6t7n">{set.accuracy}% accuracy</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400" data-oid=":81f95b">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}

/**
 * Gets a specific question view variant component based on the variant number
 */
export function getQuestionViewVariant(variant: number, props: QuestionViewProps) {
  // Map variant numbers to placeholder implementations for those that need it
  const placeholders: Record<number, {title: string;description?: string;}> = {
    35: {
      title: "Gradient Flow View",
      description: "Visualizes questions with gradient-based flow patterns between related concepts and categories."
    },
    36: {
      title: "Tree Map View",
      description: "Organizes questions hierarchically by subject area and difficulty in a treemap layout."
    },
    37: {
      title: "Waffle Chart View",
      description: "Displays question performance in a grid-based waffle chart for quick pattern recognition."
    },
    38: {
      title: "Bubble Grid View",
      description: "Shows questions as interactive bubbles organized by category and performance."
    },
    39: {
      title: "Polar Grid View",
      description: "Arranges questions in a circular grid pattern centered around key subject areas."
    },
    40: {
      title: "Radial Bar View",
      description: "Visualizes questions with radial bars showing performance metrics in a circular layout."
    },
    41: {
      title: "Hexagonal Heatmap View",
      description: "Represents questions in a hexagonal grid with color coding for performance metrics."
    }
  };

  if (placeholders[variant]) {
    const { title, description } = placeholders[variant];
    return renderPlaceholder(props, variant, title, description);
  }

  // For variants not specifically handled, return a generic placeholder
  return renderPlaceholder(props, variant, `Question View ${variant}`);
}