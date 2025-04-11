'use client';

import { QuestionViewProps } from './types';

export function WeatherMapView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Group sets by difficulty
  const setsByDifficulty = {
    'Easy': practiceSets.filter((set) => set.difficulty === 'Easy'),
    'Medium': practiceSets.filter((set) => set.difficulty === 'Medium'),
    'Hard': practiceSets.filter((set) => set.difficulty === 'Hard')
  };

  // Find max and min accuracies for temperature range
  const maxAccuracy = Math.max(...practiceSets.map((set) => set.accuracy));
  const minAccuracy = Math.min(...practiceSets.map((set) => set.accuracy));

  // Helper to get temperature color based on accuracy
  const getTemperatureColor = (accuracy: number) => {
    const normalized = (accuracy - minAccuracy) / (maxAccuracy - minAccuracy || 1);
    if (normalized > 0.8) return 'bg-red-500 dark:bg-red-600';
    if (normalized > 0.6) return 'bg-orange-500 dark:bg-orange-600';
    if (normalized > 0.4) return 'bg-yellow-500 dark:bg-yellow-600';
    if (normalized > 0.2) return 'bg-green-500 dark:bg-green-600';
    return 'bg-blue-500 dark:bg-blue-600';
  };

  // Helper to determine pressure pattern (circles) based on number of questions
  const getPressureCircles = (questions: number) => {
    const maxQuestions = Math.max(...practiceSets.map((set) => set.questions.length));
    const normalized = questions / maxQuestions;
    const count = Math.max(1, Math.ceil(normalized * 5));
    return Array(count).fill(0);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="ll6jwaq">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="-ld:pmm">34. Weather Map View</h3>
      
      <div className="min-h-[500px] bg-sky-100 dark:bg-slate-800 rounded-lg p-6 overflow-hidden relative" data-oid="ek3.o-.">
        {/* Background grid for the map */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjEiPjxyZWN0IHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iMzkiIGhlaWdodD0iMzkiLz48L2c+PC9zdmc+')] opacity-30 dark:opacity-20" data-oid="t6p3wcd"></div>
        
        {/* Weather map content */}
        <div className="relative z-10" data-oid="sinanxq">
          {/* Map header with legend */}
          <div className="mb-6 bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm" data-oid="jxko1s-">
            <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white" data-oid="75r3:pq">Weather Pattern Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4" data-oid="kqrzamf">
              <div className="flex items-center space-x-2" data-oid="tu--c:0">
                <div className="w-4 h-4 rounded-full bg-red-500" data-oid="8o9u7i7"></div>
                <span className="text-sm" data-oid="k7mg3he">High Accuracy (Hot)</span>
              </div>
              <div className="flex items-center space-x-2" data-oid=".t60dnm">
                <div className="w-4 h-4 rounded-full bg-yellow-500" data-oid="nk1qjdv"></div>
                <span className="text-sm" data-oid="h3b.90-">Medium Accuracy (Warm)</span>
              </div>
              <div className="flex items-center space-x-2" data-oid="na:x9y9">
                <div className="w-4 h-4 rounded-full bg-blue-500" data-oid="duafojx"></div>
                <span className="text-sm" data-oid="ztfb-i_">Low Accuracy (Cold)</span>
              </div>
              <div className="flex items-center space-x-2" data-oid="8m1.fsm">
                <div className="flex" data-oid="2hfjexa">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mx-0.5" data-oid="84tz.r-"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 mx-0.5" data-oid="wrqam2-"></div>
                </div>
                <span className="text-sm" data-oid="8a3qy58">Question Density</span>
              </div>
              <div className="flex items-center space-x-2" data-oid="5sctzj_">
                <div className="w-4 h-4 border border-dashed border-gray-500" data-oid="hvs0uh."></div>
                <span className="text-sm" data-oid=":d6h2y-">Difficulty Zones</span>
              </div>
            </div>
          </div>
          
          {/* Weather map with difficulty regions */}
          <div className="grid grid-cols-1 gap-6" data-oid="wihddaq">
            {/* Hard difficulty - High pressure system */}
            <div className="border-2 border-dashed border-red-500/40 dark:border-red-700/40 rounded-lg p-4 bg-red-50/30 dark:bg-red-900/10" data-oid="7jkx2lr">
              <div className="mb-3 flex justify-between items-center" data-oid="w44hy:k">
                <h5 className="font-bold text-red-700 dark:text-red-400" data-oid="57-n1c3">
                  High Pressure Zone (Hard Difficulty)
                </h5>
                <div className="text-sm text-gray-500 dark:text-gray-400" data-oid="u2x33b6">
                  {setsByDifficulty['Hard'].length} system{setsByDifficulty['Hard'].length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" data-oid="_k77ac3">
                {setsByDifficulty['Hard'].map((set) =>
                <div
                  key={set.id}
                  onClick={() => onSelectSet && onSelectSet(set.id)}
                  className={`
                      bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm
                      cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden
                      ${selectedSetId === set.id ? 'ring-2 ring-red-500 dark:ring-red-400' : ''}
                    `} data-oid=".bmrs5_">

                    {/* Temperature indicator */}
                    <div className={`h-1.5 w-full absolute top-0 left-0 ${getTemperatureColor(set.accuracy)}`} data-oid="xylgydl"></div>
                    
                    <div className="mt-1.5" data-oid="dgl35y9">
                      <div className="font-medium" data-oid="h428.ib">{set.subject}: {set.type}</div>
                      <div className="flex justify-between mt-1 text-sm" data-oid="9ye15nb">
                        <span data-oid="ej-6ox:">{set.accuracy}%</span>
                        <span data-oid="dnufji:">{new Date(set.dateCompleted).toLocaleDateString()}</span>
                      </div>
                      
                      {/* Pressure pattern (circles) */}
                      <div className="flex justify-center mt-2 space-x-1" data-oid="8.gv6y_">
                        {getPressureCircles(set.questions.length).map((_, i) =>
                      <div key={i} className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" data-oid="zz0cjnh"></div>
                      )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Medium difficulty - Moderate system */}
            <div className="border-2 border-dashed border-yellow-500/40 dark:border-yellow-700/40 rounded-lg p-4 bg-yellow-50/30 dark:bg-yellow-900/10" data-oid="hmbf9wq">
              <div className="mb-3 flex justify-between items-center" data-oid="o0mqoxq">
                <h5 className="font-bold text-yellow-700 dark:text-yellow-400" data-oid="b5qi_bp">
                  Temperate Zone (Medium Difficulty)
                </h5>
                <div className="text-sm text-gray-500 dark:text-gray-400" data-oid="xex6wm:">
                  {setsByDifficulty['Medium'].length} system{setsByDifficulty['Medium'].length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" data-oid="r_lwwtq">
                {setsByDifficulty['Medium'].map((set) =>
                <div
                  key={set.id}
                  onClick={() => onSelectSet && onSelectSet(set.id)}
                  className={`
                      bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm
                      cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden
                      ${selectedSetId === set.id ? 'ring-2 ring-yellow-500 dark:ring-yellow-400' : ''}
                    `} data-oid="w_kntxh">

                    {/* Temperature indicator */}
                    <div className={`h-1.5 w-full absolute top-0 left-0 ${getTemperatureColor(set.accuracy)}`} data-oid="a9xmsu5"></div>
                    
                    <div className="mt-1.5" data-oid="j36jbh6">
                      <div className="font-medium" data-oid="ll1sefa">{set.subject}: {set.type}</div>
                      <div className="flex justify-between mt-1 text-sm" data-oid="ampz_s8">
                        <span data-oid="z.j:v0t">{set.accuracy}%</span>
                        <span data-oid="82w94mc">{new Date(set.dateCompleted).toLocaleDateString()}</span>
                      </div>
                      
                      {/* Pressure pattern (circles) */}
                      <div className="flex justify-center mt-2 space-x-1" data-oid="345im8v">
                        {getPressureCircles(set.questions.length).map((_, i) =>
                      <div key={i} className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" data-oid="e5mg3w_"></div>
                      )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Easy difficulty - Low pressure system */}
            <div className="border-2 border-dashed border-blue-500/40 dark:border-blue-700/40 rounded-lg p-4 bg-blue-50/30 dark:bg-blue-900/10" data-oid="koth0a3">
              <div className="mb-3 flex justify-between items-center" data-oid="e.f_-ur">
                <h5 className="font-bold text-blue-700 dark:text-blue-400" data-oid="3zmc.5.">
                  Low Pressure Zone (Easy Difficulty)
                </h5>
                <div className="text-sm text-gray-500 dark:text-gray-400" data-oid="mc.ebt3">
                  {setsByDifficulty['Easy'].length} system{setsByDifficulty['Easy'].length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" data-oid="-hhx924">
                {setsByDifficulty['Easy'].map((set) =>
                <div
                  key={set.id}
                  onClick={() => onSelectSet && onSelectSet(set.id)}
                  className={`
                      bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm
                      cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden
                      ${selectedSetId === set.id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
                    `} data-oid="j4uczhh">

                    {/* Temperature indicator */}
                    <div className={`h-1.5 w-full absolute top-0 left-0 ${getTemperatureColor(set.accuracy)}`} data-oid="fjaswtu"></div>
                    
                    <div className="mt-1.5" data-oid="4tcm6yy">
                      <div className="font-medium" data-oid="zdexq0n">{set.subject}: {set.type}</div>
                      <div className="flex justify-between mt-1 text-sm" data-oid="w.:jycx">
                        <span data-oid="xbz6zc0">{set.accuracy}%</span>
                        <span data-oid="n3f.fk8">{new Date(set.dateCompleted).toLocaleDateString()}</span>
                      </div>
                      
                      {/* Pressure pattern (circles) */}
                      <div className="flex justify-center mt-2 space-x-1" data-oid="wh-i:07">
                        {getPressureCircles(set.questions.length).map((_, i) =>
                      <div key={i} className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" data-oid="3ek.q0z"></div>
                      )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}