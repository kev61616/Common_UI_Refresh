import { Suspense } from "react";
import FullTestClient from "./client-page";

// Loading component for the Full Test page
function FullTestLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12" data-oid="cteggen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="k8zt-dp">
        <div className="mb-8" data-oid="_:3rjb:">
          <div className="bg-slate-200 dark:bg-slate-700 h-10 w-56 rounded-md animate-pulse" data-oid="kpm-y2m"></div>
          <div className="mt-3 bg-slate-200 dark:bg-slate-700 h-5 w-full max-w-2xl rounded-md animate-pulse" data-oid="9cbo.md"></div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse mb-8" data-oid="-8hz-om">
          <div className="p-6" data-oid="-2flz3.">
            <div className="flex flex-col" data-oid="f3s58ao">
              <div className="bg-slate-200 dark:bg-slate-700 h-7 w-48 rounded-md mb-4" data-oid="qqkd-v1"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-2" data-oid="h1kkpyg"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-4 w-5/6 rounded-md mb-6" data-oid="lzy51.3"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-10 w-36 rounded-md mx-auto" data-oid="5vfa:z1"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-oid="yx0v1:p">
          {[...Array(3)].map((_, i) =>
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse" data-oid="yj21k:v">
              <div className="p-5" data-oid="1-.98o9">
                <div className="bg-slate-200 dark:bg-slate-700 h-6 w-2/3 rounded-md mb-3" data-oid="no26vxx"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-2" data-oid="oseu_jh"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-4" data-oid="io9h0sa"></div>
                <div className="flex justify-between items-center" data-oid=":-691t4">
                  <div className="bg-slate-200 dark:bg-slate-700 h-4 w-20 rounded-md" data-oid="035iwzp"></div>
                  <div className="bg-slate-200 dark:bg-slate-700 h-8 w-20 rounded-md" data-oid="1o6jr44"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}

export default function FullTestPage() {
  return (
    <Suspense fallback={<FullTestLoading data-oid="p5.q9el" />} data-oid="3ht8any">
      <FullTestClient data-oid="-oq4jqm" />
    </Suspense>);

}