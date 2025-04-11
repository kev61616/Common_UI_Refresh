'use client';

import { QuestionViewProps } from './types';

export function FilmStripView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Sort sets by date to create a chronological film strip
  const sortedSets = [...practiceSets].sort((a, b) =>
  new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="4k8qnlc">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="6rc6vjz">31. Film Strip View</h3>
      
      <div className="relative min-h-[500px] bg-black p-6 overflow-hidden rounded-lg" data-oid="clcbfnm">
        {/* Film frame perforations */}
        <div className="absolute top-0 left-0 bottom-0 w-12 flex flex-col justify-between pointer-events-none" data-oid="8wre4.p">
          {Array.from({ length: 20 }).map((_, i) =>
          <div key={i} className="w-8 h-8 border-4 border-gray-800 rounded-lg bg-transparent my-1" data-oid="antay:n"></div>
          )}
        </div>
        
        <div className="absolute top-0 right-0 bottom-0 w-12 flex flex-col justify-between pointer-events-none" data-oid="wx4yp99">
          {Array.from({ length: 20 }).map((_, i) =>
          <div key={i} className="w-8 h-8 border-4 border-gray-800 rounded-lg bg-transparent my-1" data-oid="tga_heo"></div>
          )}
        </div>
        
        {/* Film strip content */}
        <div className="ml-16 mr-16" data-oid="9ibd:hm">
          <div className="overflow-x-auto" data-oid="a99b-ok">
            <div className="w-full flex flex-col items-center" data-oid="g4-j.:m">
              {/* Film reel heading */}
              <div className="w-full flex items-center justify-center my-4 text-white" data-oid="n30nu4-">
                <div className="flex items-center" data-oid="vdl40:.">
                  <div className="w-8 h-8 rounded-full border-4 border-gray-700 mr-3" data-oid="c2gjnqn"></div>
                  <h4 className="text-xl font-bold italic tracking-wider" data-oid="w_q6-cj">PRACTICE SETS</h4>
                  <div className="w-8 h-8 rounded-full border-4 border-gray-700 ml-3" data-oid="d83ylq5"></div>
                </div>
              </div>
              
              {/* Film frames */}
              <div className="w-full flex overflow-x-auto pb-6 pt-2 space-x-4 filmstrip-container" data-oid="xif1sjm">
                {sortedSets.map((set, index) =>
                <div
                  key={set.id}
                  onClick={() => onSelectSet && onSelectSet(set.id)}
                  className={`
                      min-w-[260px] max-w-[260px] bg-gray-100 dark:bg-gray-800 
                      border-8 border-gray-900 p-4 rounded-sm shadow-md
                      transition-transform cursor-pointer
                      ${selectedSetId === set.id ? 'ring-4 ring-yellow-400 transform scale-105 relative z-10' : 'hover:scale-105 hover:z-10'}
                    `} data-oid="o._u7ly">

                    {/* Frame number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center" data-oid="8o4gb5i">
                      <span className="text-white text-xs font-mono" data-oid="i:oo.7-">{index + 1}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col" data-oid="s_gnr3i">
                      {/* Title card */}
                      <div className="text-center mb-2 pb-2 border-b border-gray-300 dark:border-gray-600" data-oid="vjry-q:">
                        <h5 className="font-serif font-bold text-lg" data-oid="5x9jt-t">{set.subject}: {set.type}</h5>
                        <p className="text-xs mt-1 font-mono" data-oid="23fofsf">
                          {new Date(set.dateCompleted).toLocaleDateString()}
                        </p>
                      </div>
                      
                      {/* Scene details */}
                      <div className="flex justify-between mb-3" data-oid="_zs2r8f">
                        <div className="text-xs" data-oid="90znm9f">
                          <div className="font-bold mb-1" data-oid="lxur-fo">Difficulty:</div>
                          <div className={`px-2 py-0.5 rounded-md text-white text-center ${
                        set.difficulty === 'Easy' ? 'bg-green-500 dark:bg-green-600' :
                        set.difficulty === 'Medium' ? 'bg-amber-500 dark:bg-amber-600' :
                        'bg-red-500 dark:bg-red-600'}`
                        } data-oid="epf:59-">
                            {set.difficulty}
                          </div>
                        </div>
                        
                        <div className="text-xs" data-oid="shcwjt9">
                          <div className="font-bold mb-1" data-oid="11xfgbl">Pace:</div>
                          <div className={`px-2 py-0.5 rounded-md text-white text-center ${
                        set.pace === 'Fast' ? 'bg-blue-500 dark:bg-blue-600' :
                        set.pace === 'Normal' ? 'bg-purple-500 dark:bg-purple-600' :
                        'bg-indigo-500 dark:bg-indigo-600'}`
                        } data-oid="dba:2la">
                            {set.pace}
                          </div>
                        </div>
                      </div>
                      
                      {/* Performance meter - styled like film exposure */}
                      <div className="mt-2" data-oid="3pqyn5b">
                        <div className="flex justify-between items-center mb-1" data-oid="2cx8a2n">
                          <span className="text-xs font-mono" data-oid="4gaix9j">ACCURACY</span>
                          <span className="text-xs font-mono" data-oid="lg:f0ks">{set.accuracy}%</span>
                        </div>
                        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-sm overflow-hidden border border-gray-400" data-oid="z2asf-_">
                          <div
                          className={`h-full ${
                          set.accuracy > 80 ? 'bg-green-500' :
                          set.accuracy > 60 ? 'bg-amber-500' :
                          'bg-red-500'}`
                          }
                          style={{ width: `${set.accuracy}%` }} data-oid="zhby0ap">
                        </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs font-mono text-center" data-oid="f859m7_">
                        QUESTIONS: {set.questions.length}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Film ending */}
        <div className="w-full mt-6 pt-4 border-t border-gray-800 text-center text-gray-600 dark:text-gray-400 text-xs tracking-widest" data-oid="_q1v7dc">
          END OF REEL
        </div>
      </div>
    </div>);

}