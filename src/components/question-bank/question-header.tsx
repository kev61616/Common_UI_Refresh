"use client";

import type { QuestionStats as QuestionStatsType } from "@/types/question";

interface QuestionStatsProps {
  stats: QuestionStatsType;
}

function QuestionStats({ stats }: QuestionStatsProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200" data-oid="8saili0">
      <div className="grid grid-cols-3 gap-6 mb-6" data-oid="tp8qpcz">
        <div className="text-center" data-oid="86e1iwk">
          <div className="text-2xl font-semibold text-green-600 mb-1" data-oid="gzcojpq">
            {stats.correct}
          </div>
          <div className="text-sm text-gray-500" data-oid="cqg25a0">
            Correct
          </div>
        </div>
        <div className="text-center" data-oid="45esg9f">
          <div className="text-2xl font-semibold text-red-600 mb-1" data-oid="6yra_3x">
            {stats.incorrect}
          </div>
          <div className="text-sm text-gray-500" data-oid="m_9ca1o">
            Incorrect
          </div>
        </div>
        <div className="text-center" data-oid="df01732">
          <div className="text-2xl font-semibold text-blue-600 mb-1" data-oid="esfl93g">
            {stats.remaining}
          </div>
          <div className="text-sm text-gray-500" data-oid="9yyvv2n">
            Remaining
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-1" data-oid="k2akcyn">
        {Array.from({ length: stats.totalQuestions }, (_, i) =>
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 
              ${i < stats.correct ? "bg-green-200" : ""}
              ${i >= stats.correct && i < stats.correct + stats.incorrect ? "bg-red-200" : ""}
              ${i >= stats.correct + stats.incorrect ? "bg-gray-200" : ""}
            `} data-oid="xlzd_3v" />

        )}
      </div>
    </div>);

}

export function QuestionHeader() {
  const stats: QuestionStatsType = {
    correct: 6,
    incorrect: 2,
    remaining: 78,
    totalQuestions: 86
  };

  return (
    <div className="flex flex-col mb-4" data-oid="cmjuhb.">
      <div className="flex items-center py-2" data-oid="89u_le-">
        <div className="font-semibold text-xl tracking-wide text-blue-600" data-oid="wfl7lb.">
          QUESTION <span className="text-2xl" data-oid="eh4e3es">16</span>
        </div>
      </div>
      
      {/* You can uncomment this if you want to display question stats */}
      {/* <QuestionStats stats={stats} /> */}
    </div>);

}