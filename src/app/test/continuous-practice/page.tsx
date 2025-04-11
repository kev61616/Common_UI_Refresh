import { Suspense } from "react";
import ContinuousPracticeClient from "./client-page";

// Loading component for the Continuous Practice page
function ContinuousPracticeLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12" data-oid="8_6bq3l">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="qqjoslk">
        <div className="mb-8" data-oid="zsu.zth">
          <div className="bg-slate-200 dark:bg-slate-700 h-10 w-72 rounded-md animate-pulse" data-oid="n2a9s.t"></div>
          <div className="mt-3 bg-slate-200 dark:bg-slate-700 h-5 w-full max-w-2xl rounded-md animate-pulse" data-oid="kikuc5r"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8" data-oid="s.n93vd">
          {/* First card skeleton */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse" data-oid="vb:cno2">
            <div className="bg-indigo-200 dark:bg-indigo-800 h-2" data-oid="8vgwnbb"></div>
            <div className="p-8" data-oid="pe1lbbo">
              <div className="flex flex-col items-center" data-oid="y0.8v1n">
                <div className="bg-slate-200 dark:bg-slate-700 h-16 w-16 rounded-full mb-4" data-oid="fldfahm"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-6 w-48 rounded-md mb-3" data-oid="nj.srr_"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-2" data-oid="nqk5gl7"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-5/6 rounded-md mb-2" data-oid="8filc.1"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-2/3 rounded-md mb-6" data-oid="y7la_5j"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md" data-oid="amk7:14"></div>
              </div>
            </div>
          </div>
          
          {/* Second card skeleton */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse" data-oid="t.bfpae">
            <div className="bg-emerald-200 dark:bg-emerald-800 h-2" data-oid="dr19d30"></div>
            <div className="p-8" data-oid="xn0m2jt">
              <div className="flex flex-col items-center" data-oid="7jjq86y">
                <div className="bg-slate-200 dark:bg-slate-700 h-16 w-16 rounded-full mb-4" data-oid="oiepmog"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-6 w-48 rounded-md mb-3" data-oid="ss6_wpv"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-2" data-oid="cvg7idk"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-5/6 rounded-md mb-2" data-oid="548glm:"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-2/3 rounded-md mb-6" data-oid="6:wezdw"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md" data-oid="3hhdapq"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

export default function ContinuousPracticePage() {
  return (
    <Suspense fallback={<ContinuousPracticeLoading data-oid="1.o10to" />} data-oid="hosg3_v">
      <ContinuousPracticeClient data-oid="s8so4tz" />
    </Suspense>);

}