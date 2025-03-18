'use client'

import { SetViewProps } from './types'

export function IsometricGridView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">25. Isometric Grid View</h3>
      
      <div className="relative min-h-[650px] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8 rounded-lg overflow-hidden">
        {/* Isometric grid background */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(30deg, #5c5c5c12 12%, transparent 12.5%, transparent 87%, #5c5c5c12 87.5%, #5c5c5c12), 
                               linear-gradient(150deg, #5c5c5c12 12%, transparent 12.5%, transparent 87%, #5c5c5c12 87.5%, #5c5c5c12), 
                               linear-gradient(30deg, #5c5c5c12 12%, transparent 12.5%, transparent 87%, #5c5c5c12 87.5%, #5c5c5c12), 
                               linear-gradient(150deg, #5c5c5c12 12%, transparent 12.5%, transparent 87%, #5c5c5c12 87.5%, #5c5c5c12), 
                               linear-gradient(60deg, #5c5c5c08 25%, transparent 25.5%, transparent 75%, #5c5c5c08 75%, #5c5c5c08), 
                               linear-gradient(60deg, #5c5c5c08 25%, transparent 25.5%, transparent 75%, #5c5c5c08 75%, #5c5c5c08)`,
               backgroundSize: '40px 70px',
               backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px'
             }}>
        </div>
        
        {/* 3D Stacked layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mt-10">
          {/* Left side stack */}
          <div className="relative">
            {practiceSets.slice(0, Math.ceil(practiceSets.length / 2)).map((set, index) => (
              <div 
                key={set.id}
                onClick={() => onSelectSet && onSelectSet(set.id)}
                style={{ 
                  position: 'absolute',
                  top: `${index * 50}px`, 
                  left: `${index * 40}px`,
                  transform: `
                    perspective(1000px) 
                    rotateX(60deg) 
                    rotateZ(-45deg) 
                    ${selectedSetId === set.id ? 'translateZ(20px)' : 'translateZ(0)'}
                  `,
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  zIndex: selectedSetId === set.id ? 20 : 10 - index,
                }}
                className={`w-[300px] h-[180px] cursor-pointer shadow-xl 
                           ${selectedSetId === set.id ? 'shadow-indigo-200 dark:shadow-indigo-950' : 'shadow-slate-200 dark:shadow-slate-900 hover:shadow-indigo-200 dark:hover:shadow-indigo-950'}
                           group`}
              >
                {/* Card front */}
                <div className="w-full h-full flex flex-col p-5 rounded-xl relative overflow-hidden backdrop-blur-sm border"
                     style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Card top face */}
                  <div 
                    className={`absolute inset-0 ${
                      set.subject === 'Reading' ? 'bg-gradient-to-br from-sky-500/80 to-blue-600/80' : 
                      set.subject === 'Math' ? 'bg-gradient-to-br from-violet-500/80 to-indigo-600/80' : 
                      'bg-gradient-to-br from-rose-500/80 to-pink-600/80'
                    }`}>
                    
                    {/* Geometric decorations */}
                    <div className="absolute top-[-30px] right-[-30px] w-[100px] h-[100px] rounded-full bg-white/20"></div>
                    <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full bg-white/10"></div>
                    
                    {/* Isometric cube decoration that floats on hover */}
                    <div 
                      className="absolute bottom-4 right-4 w-10 h-10 transition-transform duration-500 group-hover:translate-z-10 group-hover:scale-110"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: 'rotateX(-30deg) rotateY(45deg) rotateZ(0deg)',
                        opacity: selectedSetId === set.id ? 1 : 0.7,
                      }}
                    >
                      {/* Cube faces */}
                      <div className="absolute inset-0 transform-gpu bg-white/30 translate-z-[20px]"></div>
                      <div className="absolute inset-0 transform-gpu bg-black/10 translate-z-[-20px]"></div>
                      <div className="absolute inset-0 transform-gpu origin-left bg-white/20 rotate-y-[90deg] translate-x-[-20px]"></div>
                      <div className="absolute inset-0 transform-gpu origin-right bg-white/20 rotate-y-[-90deg] translate-x-[20px]"></div>
                      <div className="absolute inset-0 transform-gpu origin-top bg-white/20 rotate-x-[90deg] translate-y-[-20px]"></div>
                      <div className="absolute inset-0 transform-gpu origin-bottom bg-white/20 rotate-x-[-90deg] translate-y-[20px]"></div>
                    </div>
                  </div>
                  
                  {/* Content with "lifted" 3D effect */}
                  <div className="relative z-10 text-white h-full flex flex-col">
                    <div className="flex-none mb-3">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xl font-bold">{set.subject}</h4>
                        <div className="text-sm opacity-80">{set.type}</div>
                      </div>
                      <div className="mt-1 opacity-75 text-sm">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="flex-grow flex items-center">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg w-full px-4 py-2 flex items-center justify-between">
                        <div>
                          <div className="text-xs opacity-75">Accuracy</div>
                          <div className="text-2xl font-bold">{set.accuracy}%</div>
                        </div>
                        
                        <div className="h-10 w-[1px] bg-white/20"></div>
                        
                        <div>
                          <div className="text-xs opacity-75">Time</div>
                          <div className="font-medium">{set.timeUsed}</div>
                        </div>
                        
                        <div className="h-10 w-[1px] bg-white/20"></div>
                        
                        <div>
                          <div className="text-xs opacity-75">Pace</div>
                          <div className="font-medium">{set.pace}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-none mt-2">
                      {/* Subtle 3D button */}
                      <button 
                        className={`w-full py-1.5 text-sm font-medium text-center rounded transition-all duration-300 ${
                          selectedSetId === set.id 
                            ? 'bg-white/30 shadow-[0_3px_0_rgba(0,0,0,0.2)]' 
                            : 'bg-white/20 shadow-[0_3px_0_rgba(0,0,0,0.1)] hover:bg-white/30 hover:shadow-[0_3px_0_rgba(0,0,0,0.2)]'
                        }`}
                        style={{ transform: selectedSetId === set.id ? 'translateY(2px)' : 'translateY(0)' }}
                      >
                        {selectedSetId === set.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Card edge effects - only visible from isometric angle */}
                <div className="absolute left-0 top-full w-full h-[10px] bg-black/20 transform-gpu origin-top 
                             rotate-x-[-90deg] translate-y-[-5px]">
                </div>
                <div className="absolute top-0 left-full w-[10px] h-full bg-black/10 transform-gpu origin-left 
                             rotate-y-[90deg] translate-x-[-5px]">
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side stack - reversed order for visual effect */}
          <div className="relative">
            {practiceSets.slice(Math.ceil(practiceSets.length / 2)).map((set, index) => (
              <div 
                key={set.id}
                onClick={() => onSelectSet && onSelectSet(set.id)}
                style={{ 
                  position: 'absolute',
                  top: `${index * 50}px`, 
                  right: `${index * 40}px`,
                  transform: `
                    perspective(1000px) 
                    rotateX(60deg) 
                    rotateZ(-45deg) 
                    ${selectedSetId === set.id ? 'translateZ(20px)' : 'translateZ(0)'}
                  `,
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  zIndex: selectedSetId === set.id ? 20 : 10 - index,
                }}
                className={`w-[300px] h-[180px] cursor-pointer shadow-xl 
                          ${selectedSetId === set.id ? 'shadow-indigo-200 dark:shadow-indigo-950' : 'shadow-slate-200 dark:shadow-slate-900 hover:shadow-indigo-200 dark:hover:shadow-indigo-950'}
                          group`}
              >
                {/* Card front */}
                <div className="w-full h-full flex flex-col p-5 rounded-xl relative overflow-hidden backdrop-blur-sm border"
                     style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Card top face */}
                  <div 
                    className={`absolute inset-0 ${
                      set.subject === 'Reading' ? 'bg-gradient-to-bl from-sky-500/80 to-blue-600/80' : 
                      set.subject === 'Math' ? 'bg-gradient-to-bl from-violet-500/80 to-indigo-600/80' : 
                      'bg-gradient-to-bl from-rose-500/80 to-pink-600/80'
                    }`}>
                    
                    {/* Geometric decorations */}
                    <div className="absolute top-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/20"></div>
                    <div className="absolute bottom-[-20px] right-[-20px] w-[80px] h-[80px] rounded-full bg-white/10"></div>
                    
                    {/* Isometric cube decoration that floats on hover */}
                    <div 
                      className="absolute bottom-4 left-4 w-10 h-10 transition-transform duration-500 group-hover:translate-z-10 group-hover:scale-110"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: 'rotateX(-30deg) rotateY(45deg) rotateZ(0deg)',
                        opacity: selectedSetId === set.id ? 1 : 0.7,
                      }}
                    >
                      {/* Cube faces */}
                      <div className="absolute inset-0 transform-gpu bg-white/30 translate-z-[20px]"></div>
                      <div className="absolute inset-0 transform-gpu bg-black/10 translate-z-[-20px]"></div>
                      <div className="absolute inset-0 transform-gpu origin-left bg-white/20 rotate-y-[90deg] translate-x-[-20px]"></div>
                      <div className="absolute inset-0 transform-gpu origin-right bg-white/20 rotate-y-[-90deg] translate-x-[20px]"></div>
                      <div className="absolute inset-0 transform-gpu origin-top bg-white/20 rotate-x-[90deg] translate-y-[-20px]"></div>
                      <div className="absolute inset-0 transform-gpu origin-bottom bg-white/20 rotate-x-[-90deg] translate-y-[20px]"></div>
                    </div>
                  </div>
                  
                  {/* Content with "lifted" 3D effect */}
                  <div className="relative z-10 text-white h-full flex flex-col">
                    <div className="flex-none mb-3">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xl font-bold">{set.subject}</h4>
                        <div className="text-sm opacity-80">{set.type}</div>
                      </div>
                      <div className="mt-1 opacity-75 text-sm">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="flex-grow flex items-center">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg w-full px-4 py-2 flex items-center justify-between">
                        <div>
                          <div className="text-xs opacity-75">Accuracy</div>
                          <div className="text-2xl font-bold">{set.accuracy}%</div>
                        </div>
                        
                        <div className="h-10 w-[1px] bg-white/20"></div>
                        
                        <div>
                          <div className="text-xs opacity-75">Time</div>
                          <div className="font-medium">{set.timeUsed}</div>
                        </div>
                        
                        <div className="h-10 w-[1px] bg-white/20"></div>
                        
                        <div>
                          <div className="text-xs opacity-75">Pace</div>
                          <div className="font-medium">{set.pace}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-none mt-2">
                      {/* Subtle 3D button */}
                      <button 
                        className={`w-full py-1.5 text-sm font-medium text-center rounded transition-all duration-300 ${
                          selectedSetId === set.id 
                            ? 'bg-white/30 shadow-[0_3px_0_rgba(0,0,0,0.2)]' 
                            : 'bg-white/20 shadow-[0_3px_0_rgba(0,0,0,0.1)] hover:bg-white/30 hover:shadow-[0_3px_0_rgba(0,0,0,0.2)]'
                        }`}
                        style={{ transform: selectedSetId === set.id ? 'translateY(2px)' : 'translateY(0)' }}
                      >
                        {selectedSetId === set.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Card edge effects - only visible from isometric angle */}
                <div className="absolute left-0 top-full w-full h-[10px] bg-black/20 transform-gpu origin-top 
                             rotate-x-[-90deg] translate-y-[-5px]">
                </div>
                <div className="absolute top-0 left-full w-[10px] h-full bg-black/10 transform-gpu origin-left 
                             rotate-y-[90deg] translate-x-[-5px]">
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Control help text */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-slate-500 dark:text-slate-400">
          Click on a tile to select • Use mouse to navigate
        </div>
      </div>
    </div>
  )
}
