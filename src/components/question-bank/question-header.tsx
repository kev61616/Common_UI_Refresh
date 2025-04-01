"use client";

import type { QuestionStats as QuestionStatsType } from "@/types/question";

interface QuestionStatsProps {
  stats: QuestionStatsType;
}

function QuestionStats({ stats }: QuestionStatsProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-2xl font-semibold text-green-600 mb-1">
            {stats.correct}
          </div>
          <div className="text-sm text-gray-500">
            Correct
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-red-600 mb-1">
            {stats.incorrect}
          </div>
          <div className="text-sm text-gray-500">
            Incorrect
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-blue-600 mb-1">
            {stats.remaining}
          </div>
          <div className="text-sm text-gray-500">
            Remaining
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-1">
        {Array.from({ length: stats.totalQuestions }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 
              ${i < stats.correct ? "bg-green-200" : ""}
              ${i >= stats.correct && i < stats.correct + stats.incorrect ? "bg-red-200" : ""}
              ${i >= stats.correct + stats.incorrect ? "bg-gray-200" : ""}
            `}
          />
        ))}
      </div>
    </div>
  );
}

export function QuestionHeader() {
  const stats: QuestionStatsType = {
    correct: 6,
    incorrect: 2,
    remaining: 78,
    totalQuestions: 86,
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center py-2">
        <div className="font-semibold text-xl tracking-wide text-blue-600">
          QUESTION <span className="text-2xl">16</span>
        </div>
      </div>
      
      {/* You can uncomment this if you want to display question stats */}
      {/* <QuestionStats stats={stats} /> */}
    </div>
  );
}
