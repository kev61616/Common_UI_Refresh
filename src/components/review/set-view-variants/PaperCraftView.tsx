'use client';

import { SetViewProps } from './types';

export function PaperCraftView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid=":xxx9xf">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="xv_w7y3">24. Paper Craft View</h3>
      
      <div className="relative bg-[#f5f3ee] dark:bg-slate-900 p-8 rounded-lg overflow-hidden" data-oid="1h2tee7">
        {/* Subtle paper texture overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDIwIEw0MCAyMCBNMjAgMCBMMjAgNDAiIHN0cm9rZT0iI2FhYWFhYSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMC41Ij48L3BhdGg+PHBhdGggZD0iTTAgMCBMNDAgNDAgTTQwIDAgTDAgNDAiIHN0cm9rZT0iI2FhYWFhYSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMC41Ij48L3BhdGg+PC9nPjwvc3ZnPg==')]" data-oid="5i-ck.1"></div>
        
        {/* Notebook binding and paper details */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-800/10 to-transparent dark:from-amber-950/20 flex flex-col justify-center items-center gap-4" data-oid="fgl92_v">
          {[...Array(10)].map((_, i) =>
          <div key={i} className="w-2 h-2 rounded-full bg-amber-900/20 dark:bg-amber-700/30" data-oid="iqw9bac"></div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-4" data-oid="mx2n96l">
          {practiceSets.map((set, index) =>
          <div
            key={set.id}
            onClick={() => onSelectSet && onSelectSet(set.id)}
            className={`group relative cursor-pointer transition-all duration-300 ${
            selectedSetId === set.id ? 'translate-y-[-5px]' : 'hover:translate-y-[-5px]'}`
            } data-oid="itzta9n">

              {/* Main paper with shadow */}
              <div className={`relative bg-white dark:bg-slate-800 rounded-md overflow-hidden 
                              transition-all duration-300 transform-gpu ${
            selectedSetId === set.id ?
            'shadow-[2px_4px_16px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]' :
            'shadow-[2px_3px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.08)] group-hover:shadow-[2px_4px_16px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]'}`
            } data-oid="ctsep1o">
                {/* Paper texture */}
                <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNMCAwIGwyMCAwIG0wIDAgbDAgMjAgbS0yMCAwIGwyMCAwIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ij48L3BhdGg+PC9zdmc+')]" data-oid="wovq2a-"></div>
                
                {/* Folded corner */}
                <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-700 dark:via-slate-600 dark:to-slate-500 shadow-[-2px_2px_3px_rgba(0,0,0,0.05)]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} data-oid="a9fq0r2"></div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-white dark:bg-slate-800" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} data-oid="5b39w02"></div>
                
                {/* Top colorful banner */}
                <div
                className={`h-2 w-full ${
                set.subject === 'Reading' ? 'bg-sky-400 dark:bg-sky-600' :
                set.subject === 'Math' ? 'bg-violet-400 dark:bg-violet-600' :
                'bg-rose-400 dark:bg-rose-600'}`
                } data-oid="na2nx-6">
              </div>
                
                <div className="p-5" data-oid="2sln0t7">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-5" data-oid="ej6fx17">
                    <div data-oid="4ozn00m">
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400" data-oid=":0y.jl:">{set.type}</div>
                      <h4 className="text-xl font-bold mt-1 text-slate-800 dark:text-white" data-oid="hll55--">{set.subject}</h4>
                    </div>
                    
                    {/* Hand-drawn style circle */}
                    <div
                    className={`relative w-14 h-14 flex items-center justify-center ${
                    set.accuracy > 85 ?
                    'text-emerald-600 dark:text-emerald-400' :
                    set.accuracy > 70 ?
                    'text-amber-600 dark:text-amber-400' :
                    'text-rose-600 dark:text-rose-400'}`
                    } data-oid=".yl2kwe">

                      {/* SVG circle with hand-drawn style */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 50 50" data-oid="qyq6q37">
                        <circle
                        cx="25" cy="25" r="20"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="2 1.5"
                        className="opacity-30" data-oid="-z8n04y" />

                        <path
                        d={`M 25 5 A 20 20 0 1 1 25 45 A 20 20 0 1 1 25 5`}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={`${set.accuracy / 100 * 125} 125`} data-oid=":mlzi09" />

                      </svg>
                      <span className="text-lg font-bold" data-oid="95woyk5">{set.accuracy}<span className="text-xs" data-oid="byxbwni">%</span></span>
                    </div>
                  </div>
                  
                  {/* Paper note lines */}
                  {[...Array(3)].map((_, i) =>
                <div key={i} className="flex items-center mb-3 gap-2" data-oid="59co7mj">
                      <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700" data-oid="y3fcz3d"></div>
                      {i === 0 &&
                  <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap" data-oid="0gvyq:v">
                          {new Date(set.dateCompleted).toLocaleDateString()}
                        </div>
                  }
                      {i === 1 &&
                  <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap" data-oid="citntco">
                          {set.timeUsed} · {set.pace}
                        </div>
                  }
                      <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700" data-oid="kcm_owt"></div>
                    </div>
                )}
                  
                  {/* Tags at bottom */}
                  <div className="mt-6 flex flex-wrap gap-2" data-oid="00j84.x">
                    <div
                    className={`px-2.5 py-1 rounded-full border text-xs ${
                    set.subject === 'Reading' ?
                    'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-900/20 dark:text-sky-400' :
                    set.subject === 'Math' ?
                    'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-900/20 dark:text-violet-400' :
                    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-900/20 dark:text-rose-400'}`
                    } data-oid="9ek7ndi">

                      {set.subject}
                    </div>
                    
                    <div className="px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400" data-oid="jjvs12i">
                      {Math.floor(Math.random() * 10) + 1} concepts
                    </div>
                    
                    <div className="px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400" data-oid="9ebx:64">
                      {Math.floor(Math.random() * 10) + 5} questions
                    </div>
                  </div>
                </div>
                
                {/* Paperclip decoration for selected item */}
                {selectedSetId === set.id &&
              <div className="absolute -top-2 -left-2 transform -rotate-12 w-8 h-14 pointer-events-none" data-oid="ei.f-8e">
                    <svg viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="dpbbxoc">
                      <path d="M5,8 C2.5,10.5 2.5,14.5 5,17 L16,28 C18.5,30.5 22.5,30.5 25,28 C27.5,25.5 27.5,21.5 25,19 L14,8 C12.5,6.5 10,6.5 8.5,8 C7,9.5 7,12 8.5,13.5 L18,23"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="dark:stroke-slate-600" data-oid="hp5y6-r" />

                    </svg>
                  </div>
              }
              </div>
              
              {/* Paper shadow - separate element */}
              <div className="absolute inset-x-0 h-2 bottom-[-4px] bg-gradient-to-b from-black/5 to-transparent rounded-b-lg" data-oid="t4of4_j"></div>
            </div>
          )}
        </div>
      </div>
    </div>);

}