'use client';

import { SetViewProps } from './types';

export function KanbanView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="d_pi66s">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="-cq.9y4">6. Kanban Board</h3>
      <div className="flex gap-4 overflow-x-auto pb-2" data-oid="7yok4ql">
        {/* Reading Column */}
        <div className="flex-shrink-0 w-72 border border-slate-200 dark:border-slate-700 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 p-3" data-oid="ukjuj2z">
          <div className="flex items-center mb-3" data-oid="6rznevl">
            <div className="w-3 h-3 rounded-full bg-sky-500 mr-2" data-oid="tqashh-"></div>
            <h4 className="font-semibold" data-oid="7cjub:k">Reading</h4>
            <span className="ml-auto text-xs bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300 rounded-full px-2 py-0.5" data-oid="86in8mo">
              {practiceSets.filter((s) => s.subject === 'Reading').length}
            </span>
          </div>
          <div className="space-y-2" data-oid="9xmfut:">
            {practiceSets.filter((s) => s.subject === 'Reading').slice(0, 3).map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all bg-white dark:bg-slate-800
                          ${selectedSetId === set.id ?
              'border-sky-400 shadow-sm dark:border-sky-600' :
              'border-slate-200 hover:border-sky-300 dark:border-slate-700 dark:hover:border-sky-700'}`} data-oid="234y-lp">

                <div className="text-sm font-medium mb-2" data-oid="t5e0vfv">{set.subject} - {set.type}</div>
                <div className="flex justify-between items-center" data-oid="kpk3yv1">
                  <div className="flex space-x-1" data-oid="1mf10rn">
                    <span className="px-1.5 py-0.5 text-xs rounded-md bg-sky-100 text-sky-600 dark:bg-sky-900/70 dark:text-sky-300" data-oid="k1nk2n9">
                      {set.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="91jg6:z">{set.pace}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Math Column */}
        <div className="flex-shrink-0 w-72 border border-slate-200 dark:border-slate-700 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 p-3" data-oid="swf4ahj">
          <div className="flex items-center mb-3" data-oid="svcc5is">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2" data-oid="40ln9em"></div>
            <h4 className="font-semibold" data-oid="0spl7y4">Math</h4>
            <span className="ml-auto text-xs bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full px-2 py-0.5" data-oid="j21rla0">
              {practiceSets.filter((s) => s.subject === 'Math').length}
            </span>
          </div>
          <div className="space-y-2" data-oid="i1sj0fp">
            {practiceSets.filter((s) => s.subject === 'Math').slice(0, 2).map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all bg-white dark:bg-slate-800
                          ${selectedSetId === set.id ?
              'border-indigo-400 shadow-sm dark:border-indigo-600' :
              'border-slate-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-700'}`} data-oid="xh5kfvv">

                <div className="text-sm font-medium mb-2" data-oid="l5gdayx">{set.subject} - {set.type}</div>
                <div className="flex justify-between items-center" data-oid="yhbb_zy">
                  <div className="flex space-x-1" data-oid="qbxr1f0">
                    <span className="px-1.5 py-0.5 text-xs rounded-md bg-indigo-100 text-indigo-600 dark:bg-indigo-900/70 dark:text-indigo-300" data-oid="45repo1">
                      {set.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="k0rt14d">{set.pace}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Writing Column */}
        <div className="flex-shrink-0 w-72 border border-slate-200 dark:border-slate-700 rounded-xl bg-violet-50/50 dark:bg-violet-950/30 p-3" data-oid="vvd7fv8">
          <div className="flex items-center mb-3" data-oid="ctu8ynx">
            <div className="w-3 h-3 rounded-full bg-violet-500 mr-2" data-oid="helgvro"></div>
            <h4 className="font-semibold" data-oid="vgoaddz">Writing</h4>
            <span className="ml-auto text-xs bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300 rounded-full px-2 py-0.5" data-oid="wv06vuy">
              {practiceSets.filter((s) => s.subject === 'Writing').length}
            </span>
          </div>
          <div className="space-y-2" data-oid="kbu9o:s">
            {practiceSets.filter((s) => s.subject === 'Writing').slice(0, 2).map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all bg-white dark:bg-slate-800
                          ${selectedSetId === set.id ?
              'border-violet-400 shadow-sm dark:border-violet-600' :
              'border-slate-200 hover:border-violet-300 dark:border-slate-700 dark:hover:border-violet-700'}`} data-oid="8mcqou4">

                <div className="text-sm font-medium mb-2" data-oid="gh_f61x">{set.subject} - {set.type}</div>
                <div className="flex justify-between items-center" data-oid="mfbhhhw">
                  <div className="flex space-x-1" data-oid="_p606j_">
                    <span className="px-1.5 py-0.5 text-xs rounded-md bg-violet-100 text-violet-600 dark:bg-violet-900/70 dark:text-violet-300" data-oid="q9w1_2n">
                      {set.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="6dxpw7y">{set.pace}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}