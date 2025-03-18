'use client'

import { SetViewProps } from './types'

// Import views 5-15
import { CalendarView } from './CalendarView'
import { KanbanView } from './KanbanView'
import { ModernGridView } from './ModernGridView'
import { CardFlipView } from './CardFlipView'
import { HexagonalView } from './HexagonalView'
import { MoodBasedView } from './MoodBasedView'

// Import our new beautiful 3D-inspired views
import { FloatingIslandView } from './FloatingIslandView'
import { NeonArcadeView } from './NeonArcadeView'
import { GlassmorphismView } from './GlassmorphismView'
import { PaperCraftView } from './PaperCraftView'
import { IsometricGridView } from './IsometricGridView'

// Import our new glassmorphism-inspired views
import { FrostedCrystalView } from './FrostedCrystalView'
import { LayeredGlassView } from './LayeredGlassView'
import { BubbleGlassView } from './BubbleGlassView'
import { PrismaticGlassView } from './PrismaticGlassView'
import { FramedGlassView } from './FramedGlassView'

// Import our recently added special views
import { ZenGardenView } from './ZenGardenView'
import { AcousticFrequencyView } from './AcousticFrequencyView'
import { MedievalManuscriptView } from './MedievalManuscriptView'
import { ParticleFlowView } from './ParticleFlowView'
import { FractalDimensionView } from './FractalDimensionView'
import { TapestryWeaveView } from './TapestryWeaveView'
import { AntiqueMapView } from './AntiqueMapView'
import { ArtStudioGalleryView } from './ArtStudioGalleryView'
import { JazzCompositionView } from './JazzCompositionView'
import { AlchemyLaboratoryView } from './AlchemyLaboratoryView'
import { TimeCapsuleView } from './TimeCapsuleView'
import { PuzzleBoxView } from './PuzzleBoxView'
import { ZodiacConstellationView } from './ZodiacConstellationView'
import { DigitalBiomeView } from './DigitalBiomeView'
import { VirtualRealityGalleryView } from './VirtualRealityGalleryView'
import { CircuitSimulationView } from './CircuitSimulationView'
import { NeuralNetworkView } from './NeuralNetworkView'
import { DataDashboardView } from './DataDashboardView'
import { QuantumPhysicsView } from './QuantumPhysicsView'
import { CelestialObservatoryView } from './CelestialObservatoryView'
import { DeepOceanView } from './DeepOceanView'
import { AncientCivilizationView } from './AncientCivilizationView'

// Default view for higher numbers
function DefaultView({ variant, ...props }: SetViewProps & { variant: number }) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">View {variant}</h3>
      <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <p className="mb-4">This view variant ({variant}) is coming soon!</p>
        <p>Please select another view variant from the dropdown.</p>
      </div>
    </div>
  )
}

// Metro/Tile Design View for variant 16
function MetroTileView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">16. Metro/Tile Design View</h3>
      
      <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[600px]">
        {/* Large tile for overall stats */}
        <div className="col-span-2 row-span-2 bg-indigo-600 text-white rounded-xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h4 className="text-2xl font-bold mb-2">Overall Progress</h4>
            <p className="opacity-80">Your learning journey at a glance</p>
          </div>
          
          <div className="flex gap-6 mt-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-xs font-medium uppercase opacity-80">Average Score</div>
              <div className="text-4xl font-bold">
                {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)}%
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-xs font-medium uppercase opacity-80">Sets Completed</div>
              <div className="text-4xl font-bold">{practiceSets.length}</div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <div className="h-2 rounded-full bg-white/30 flex-grow">
              <div className="h-2 rounded-full bg-white" style={{ width: '65%' }}></div>
            </div>
            <div className="text-sm font-medium">65%</div>
          </div>
        </div>
        
        {/* Reading tile */}
        <div className="bg-sky-500 text-white rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold">Reading</h4>
            <div className="bg-white/20 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          
          <div className="text-3xl font-bold mt-2">
            {Math.round(practiceSets
              .filter(set => set.subject === 'Reading')
              .reduce((sum, set) => sum + set.accuracy, 0) / 
              Math.max(1, practiceSets.filter(set => set.subject === 'Reading').length))}%
          </div>
          
          <div 
            onClick={() => onSelectSet(practiceSets.find(s => s.subject === 'Reading')?.id || '')}
            className="bg-white/20 mt-4 rounded-lg p-2 text-center text-sm cursor-pointer hover:bg-white/30 transition-colors"
          >
            View Details
          </div>
        </div>
        
        {/* Math tile */}
        <div className="bg-indigo-500 text-white rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold">Math</h4>
            <div className="bg-white/20 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <div className="text-3xl font-bold mt-2">
            {Math.round(practiceSets
              .filter(set => set.subject === 'Math')
              .reduce((sum, set) => sum + set.accuracy, 0) / 
              Math.max(1, practiceSets.filter(set => set.subject === 'Math').length))}%
          </div>
          
          <div 
            onClick={() => onSelectSet(practiceSets.find(s => s.subject === 'Math')?.id || '')}
            className="bg-white/20 mt-4 rounded-lg p-2 text-center text-sm cursor-pointer hover:bg-white/30 transition-colors"
          >
            View Details
          </div>
        </div>
        
        {/* Writing tile */}
        <div className="bg-purple-500 text-white rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold">Writing</h4>
            <div className="bg-white/20 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
          
          <div className="text-3xl font-bold mt-2">
            {Math.round(practiceSets
              .filter(set => set.subject === 'Writing')
              .reduce((sum, set) => sum + set.accuracy, 0) / 
              Math.max(1, practiceSets.filter(set => set.subject === 'Writing').length))}%
          </div>
          
          <div 
            onClick={() => onSelectSet(practiceSets.find(s => s.subject === 'Writing')?.id || '')}
            className="bg-white/20 mt-4 rounded-lg p-2 text-center text-sm cursor-pointer hover:bg-white/30 transition-colors"
          >
            View Details
          </div>
        </div>
        
        {/* Recent activity tile */}
        <div className="col-span-3 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <h4 className="font-bold mb-3">Recent Activity</h4>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {practiceSets.slice(0, 5).map((set, i) => (
                <div
                  key={set.id}
                  onClick={() => onSelectSet(set.id)}
                  className={`h-1.5 rounded-full flex-grow cursor-pointer ${
                    selectedSetId === set.id
                      ? 'bg-indigo-500 w-16'
                      : `${
                          set.subject === 'Reading'
                            ? 'bg-sky-500'
                            : set.subject === 'Math'
                            ? 'bg-indigo-500'
                            : 'bg-purple-500'
                        } w-8 hover:w-12 transition-all`
                  }`}
                ></div>
              ))}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mind Map View for variant 15
function MindMapView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">15. Mind Map View</h3>
      
      <div className="relative min-h-[600px] overflow-x-auto">
        <div className="flex justify-center items-center min-w-[1200px]">
          {/* Central node */}
          <div className="relative">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg w-44 text-center z-20 relative">
              <div className="font-bold text-lg">Study Progress</div>
              <div className="text-xs mt-1">
                Overall: {Math.round(practiceSets.reduce((a, b) => a + b.accuracy, 0) / practiceSets.length)}%
              </div>
            </div>
          
            {/* Branches to subject nodes */}
            <div className="absolute top-full left-1/2 w-0.5 h-16 -translate-x-1/2 bg-slate-300 dark:bg-slate-600 z-10"></div>
            
            {/* Subject nodes in a row */}
            <div className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 flex gap-32 z-20">
              {['Reading', 'Math', 'Writing'].map((subject, index) => {
                const subjectSets = practiceSets.filter(s => s.subject === subject);
                const avgAccuracy = Math.round(subjectSets.reduce((a, b) => a + b.accuracy, 0) / (subjectSets.length || 1));
                
                const connectionHeight = 120 + index * 20; // Varying heights
                
                return (
                  <div key={subject} className="relative">
                    {/* Connection to parent */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2">
                      <div className="w-0.5 h-16 bg-slate-300 dark:bg-slate-600 absolute bottom-0 left-1/2 -translate-x-1/2"></div>
                      <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 absolute bottom-16 left-1/2 -translate-x-1/2"></div>
                    </div>
                    
                    {/* Subject node */}
                    <div className={`p-3 rounded-xl shadow-md relative z-20 w-36 text-center ${
                      subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' :
                      subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' :
                      'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
                    }`}>
                      <div className="font-bold">{subject}</div>
                      <div className="text-xs">
                        {subjectSets.length} sets • {avgAccuracy}% avg
                      </div>
                    </div>
                    
                    {/* Connection to children */}
                    <div className="absolute top-full left-1/2 w-0.5 h-16 -translate-x-1/2 bg-slate-300 dark:bg-slate-600"></div>
                    
                    {/* Test type nodes */}
                    <div className="absolute top-[calc(100%+16px)] w-64 left-1/2 -translate-x-1/2">
                      <div className="grid grid-cols-2 gap-4">
                        {subjectSets.slice(0, 4).map((set, i) => (
                          <div 
                            key={set.id} 
                            onClick={() => onSelectSet(set.id)}
                            className={`p-2 rounded-lg shadow text-center z-20 relative cursor-pointer transition-all
                                      ${selectedSetId === set.id 
                                        ? 'ring-2 ring-offset-1 bg-white dark:bg-slate-800 shadow-md' 
                                        : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800'}
                                      ${subject === 'Reading' ? 'ring-sky-400 dark:ring-sky-600' :
                                        subject === 'Math' ? 'ring-indigo-400 dark:ring-indigo-600' :
                                        'ring-violet-400 dark:ring-violet-600'}`}
                          >
                            <div className="text-xs font-medium">{set.type}</div>
                            <div className="text-sm font-bold">{set.accuracy}%</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {new Date(set.dateCompleted).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Timeline Spiral View for variant 17
function TimelineSpiralView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">17. Timeline Spiral View</h3>
      
      <div className="flex justify-center">
        <div className="relative w-[600px] h-[600px]">
          {/* Spiral background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-20"></div>
            <div className="absolute w-[400px] h-[400px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-30"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-40"></div>
            <div className="absolute w-[200px] h-[200px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-50"></div>
            <div className="absolute w-[100px] h-[100px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-60"></div>
          </div>
          
          {/* Month labels */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-xs font-bold">JAN</div>
          <div className="absolute top-1/4 right-0 translate-x-4 text-xs font-bold">APR</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-xs font-bold">JUL</div>
          <div className="absolute top-1/4 left-0 -translate-x-4 text-xs font-bold">OCT</div>
          
          {/* Sets positioned along spiral */}
          {practiceSets.map((set, index) => {
            // Calculate position along spiral
            const angle = (index / practiceSets.length) * Math.PI * 2;
            const radius = 150 + (index / practiceSets.length) * 120;
            const x = Math.cos(angle) * radius + 300;
            const y = Math.sin(angle) * radius + 300;
            
            return (
              <div 
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center cursor-pointer
                          ${selectedSetId === set.id 
                            ? 'ring-2 ring-offset-2 ring-indigo-500 z-20' 
                            : 'hover:z-10'}
                          ${set.subject === 'Reading' 
                            ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' 
                            : set.subject === 'Math' 
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' 
                              : 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'}`}
                style={{ 
                  left: `${x}px`, 
                  top: `${y}px`,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="text-center">
                  <div className="text-xs font-bold">{set.accuracy}%</div>
                  <div className="text-[8px] opacity-80">{set.subject}</div>
                </div>
                
                {/* Line connecting to center */}
                <div 
                  className="absolute pointer-events-none opacity-30 dark:opacity-20"
                  style={{
                    width: '1px',
                    height: `${radius}px`,
                    background: 'currentColor',
                    transform: `rotate(${angle + Math.PI}rad)`,
                    transformOrigin: 'center top'
                  }}
                ></div>
              </div>
            );
          })}
          
          {/* Center point */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg z-30"></div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-sky-400 mr-1"></div>
          <span className="text-xs">Reading</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-400 mr-1"></div>
          <span className="text-xs">Math</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-violet-400 mr-1"></div>
          <span className="text-xs">Writing</span>
        </div>
      </div>
    </div>
  );
}

// Magazine Layout View for variant 19
function MagazineLayoutView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">19. Magazine Layout View</h3>
      
      <div className="grid grid-cols-6 gap-4 min-h-[600px]">
        {/* Header/Lead story - featured set (highest score) */}
        {(() => {
          const featuredSet = [...practiceSets].sort((a, b) => b.accuracy - a.accuracy)[0];
          if (!featuredSet) return null;
          
          return (
            <div 
              className={`col-span-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 overflow-hidden relative cursor-pointer
                         ${selectedSetId === featuredSet.id ? 'ring-4 ring-indigo-300 dark:ring-indigo-700' : 'hover:ring-2 hover:ring-indigo-400'}`}
              onClick={() => onSelectSet(featuredSet.id)}
            >
              <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-indigo-700/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-sm uppercase tracking-wider opacity-80 mb-2">Featured Progress</div>
                <h4 className="text-3xl font-bold mb-2">{featuredSet.subject} Excellence</h4>
                <p className="max-w-xl opacity-90 mb-4">
                  Your outstanding performance in {featuredSet.subject} ({featuredSet.type}) demonstrates exceptional mastery at {featuredSet.accuracy}% accuracy.
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm">{featuredSet.type}</div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm">{new Date(featuredSet.dateCompleted).toLocaleDateString()}</div>
                  <div className="bg-white px-3 py-1 rounded-full text-sm font-bold text-indigo-700">{featuredSet.accuracy}%</div>
                </div>
              </div>
            </div>
          );
        })()}
        
        {/* Main column - Recent high performers */}
        <div className="col-span-4 space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-2">
            <h4 className="font-bold text-lg">Recent High Performers</h4>
          </div>
          
          {practiceSets
            .filter(set => set.accuracy >= 75)
            .slice(0, 3)
            .map((set, index) => (
              <div 
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className={`flex gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-colors
                           ${selectedSetId === set.id ? 'bg-slate-50 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-center">
                  <div className={`font-bold text-xl
                      ${set.subject === 'Reading' ? 'text-sky-600 dark:text-sky-400' : 
                        set.subject === 'Math' ? 'text-indigo-600 dark:text-indigo-400' : 
                        'text-violet-600 dark:text-violet-400'}`}
                  >
                    {set.accuracy}%
                  </div>
                </div>
                
                <div className="flex-1">
                  <h5 className="font-bold text-lg">{set.subject} - {set.type}</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                    Completed on {new Date(set.dateCompleted).toLocaleDateString()} with impressive results. Your pace was {set.pace.toLowerCase()}.
                  </p>
                </div>
              </div>
            ))}
            
          <div className="border-t border-b border-slate-200 dark:border-slate-700 py-2 my-6">
            <h4 className="font-bold text-lg">Areas for Improvement</h4>
          </div>
          
          {practiceSets
            .filter(set => set.accuracy < 75)
            .slice(0, 2)
            .map((set, index) => (
              <div 
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className={`flex gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-colors
                           ${selectedSetId === set.id ? 'bg-slate-50 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-center">
                  <div className="font-bold text-xl text-rose-600 dark:text-rose-400">
                    {set.accuracy}%
                  </div>
                </div>
                
                <div className="flex-1">
                  <h5 className="font-bold text-lg">{set.subject} - {set.type}</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                    This area needs additional focus. Completed on {new Date(set.dateCompleted).toLocaleDateString()}.
                  </p>
                </div>
              </div>
            ))}
        </div>
        
        {/* Sidebar - Stats and subject breakdown */}
        <div className="col-span-2 space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-2">
            <h4 className="font-bold text-lg">Quick Stats</h4>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">
                {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)}%
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Overall Accuracy</div>
            </div>
            
            <div className="space-y-2">
              {['Reading', 'Math', 'Writing'].map(subject => {
                const subjectSets = practiceSets.filter(s => s.subject === subject);
                const avgAccuracy = Math.round(subjectSets.reduce((sum, set) => sum + set.accuracy, 0) / 
                                          Math.max(1, subjectSets.length));
                
                return (
                  <div key={subject}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject}</span>
                      <span className="font-medium">{avgAccuracy}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          subject === 'Reading' ? 'bg-sky-500' : 
                          subject === 'Math' ? 'bg-indigo-500' : 
                          'bg-violet-500'
                        }`}
                        style={{ width: `${avgAccuracy}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="border-b border-slate-200 dark:border-slate-700 pb-2 pt-4">
            <h4 className="font-bold text-lg">Latest Activity</h4>
          </div>
          
          <div className="space-y-2">
            {practiceSets.slice(0, 3).map(set => (
              <div 
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className="text-sm border-l-2 border-slate-300 dark:border-slate-600 pl-3 py-1 cursor-pointer hover:border-l-indigo-500 dark:hover:border-l-indigo-400"
              >
                <div className="font-medium">{set.subject}</div>
                <div className="text-slate-500 dark:text-slate-400">{new Date(set.dateCompleted).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Global Map View for variant 20
function GlobalMapView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">20. Knowledge World Map</h3>
      
      <div className="relative min-h-[600px] rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {/* World map background with continents */}
        <div className="absolute inset-0">
          {/* North America */}
          <div className="absolute top-[20%] left-[15%] w-[25%] h-[25%] bg-indigo-200 dark:bg-indigo-900/30 rounded-xl"></div>
          {/* South America */}
          <div className="absolute top-[45%] left-[25%] w-[15%] h-[30%] bg-sky-200 dark:bg-sky-900/30 rounded-xl"></div>
          {/* Europe */}
          <div className="absolute top-[15%] left-[45%] w-[15%] h-[15%] bg-emerald-200 dark:bg-emerald-900/30 rounded-xl"></div>
          {/* Africa */}
          <div className="absolute top-[35%] left-[45%] w-[20%] h-[30%] bg-amber-200 dark:bg-amber-900/30 rounded-xl"></div>
          {/* Asia */}
          <div className="absolute top-[15%] left-[60%] w-[25%] h-[35%] bg-violet-200 dark:bg-violet-900/30 rounded-xl"></div>
          {/* Australia */}
          <div className="absolute top-[55%] left-[75%] w-[15%] h-[15%] bg-rose-200 dark:bg-rose-900/30 rounded-xl"></div>
        </div>
        
        {/* Oceans */}
        <div className="absolute inset-0 bg-blue-100/30 dark:bg-blue-900/10 -z-10"></div>
        
        {/* Interconnecting paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-40" viewBox="0 0 100 100" fill="none">
          <path d="M25 30 L45 22" stroke="currentColor" strokeWidth="0.2" />
          <path d="M45 22 L55 40" stroke="currentColor" strokeWidth="0.2" />
          <path d="M55 40 L30 50" stroke="currentColor" strokeWidth="0.2" />
          <path d="M30 50 L70 50" stroke="currentColor" strokeWidth="0.2" />
          <path d="M70 50 L80 60" stroke="currentColor" strokeWidth="0.2" />
          <path d="M50 22 L70 30" stroke="currentColor" strokeWidth="0.2" />
          <path d="M70 30 L80 60" stroke="currentColor" strokeWidth="0.2" />
        </svg>
        
        {/* Place pins for each practice set */}
        {practiceSets.map((set, index) => {
          // Assign sets to continents based on subject
          let position: { x: number, y: number } = { x: 0, y: 0 };
          
          if (set.subject === 'Math') {
            // Math sets on North America
            position = { 
              x: 15 + (index % 3) * 8, 
              y: 20 + (Math.floor(index / 3) % 3) * 8  
            };
          } else if (set.subject === 'Reading') {
            // Reading sets on Asia
            position = { 
              x: 60 + (index % 3) * 7, 
              y: 15 + (Math.floor(index / 3) % 3) * 10  
            };
          } else {
            // Writing sets on Europe
            position = { 
              x: 45 + (index % 2) * 7, 
              y: 15 + (Math.floor(index / 2) % 2) * 7  
            };
          }
          
          return (
            <div 
              key={set.id}
              onClick={() => onSelectSet(set.id)}
              className={`absolute cursor-pointer z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all
                        ${selectedSetId === set.id 
                          ? 'scale-125 z-40' 
                          : 'hover:scale-110'}`}
              style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%`,
              }}
            >
              {/* Pin */}
              <div className="relative">
                <div className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center
                                ${set.subject === 'Reading' 
                                  ? 'bg-sky-500 text-white' 
                                  : set.subject === 'Math' 
                                    ? 'bg-indigo-500 text-white' 
                                    : 'bg-violet-500 text-white'}`}
                >
                  <span className="text-xs font-bold">{set.accuracy}%</span>
                </div>
                <div className={`absolute -bottom-[3px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                                border-l-[5px] border-l-transparent
                                border-r-[5px] border-r-transparent
                                ${set.subject === 'Reading' 
                                  ? 'border-t-[8px] border-t-sky-500' 
                                  : set.subject === 'Math' 
                                    ? 'border-t-[8px] border-t-indigo-500' 
                                    : 'border-t-[8px] border-t-violet-500'}`}
                ></div>
                
                {/* Tooltip on hover/selection */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                                 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2 w-max max-w-[200px] text-center
                                 transition-opacity pointer-events-none
                                 ${selectedSetId === set.id 
                                   ? 'opacity-100' 
                                   : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <div className="font-medium text-sm">{set.subject}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{set.type}</div>
                  <div className="text-xs">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 shadow-md z-40">
          <h4 className="text-sm font-bold mb-2">Knowledge Regions</h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs">Math</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sky-500"></div>
              <span className="text-xs">Reading</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500"></div>
              <span className="text-xs">Writing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Accordion Panels View for variant 18
function AccordionPanelsView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">18. Accordion Panels View</h3>
      
      <div className="space-y-3">
        {['Reading', 'Math', 'Writing'].map(subject => {
          const subjectSets = practiceSets.filter(s => s.subject === subject);
          
          return (
            <div key={subject} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              {/* Header */}
              <div className={`p-4 cursor-pointer ${
                subject === 'Reading' ? 'bg-sky-50 dark:bg-sky-900/20' : 
                subject === 'Math' ? 'bg-indigo-50 dark:bg-indigo-900/20' : 
                'bg-violet-50 dark:bg-violet-900/20'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="font-bold">{subject}</div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Avg: </span>
                      <span className="font-semibold">
                        {Math.round(subjectSets.reduce((sum, set) => sum + set.accuracy, 0) / Math.max(1, subjectSets.length))}%
                      </span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {subjectSets.map(set => (
                  <div 
                    key={set.id}
                    onClick={() => onSelectSet(set.id)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedSetId === set.id 
                        ? subject === 'Reading' ? 'bg-sky-50 dark:bg-sky-900/10' : 
                          subject === 'Math' ? 'bg-indigo-50 dark:bg-indigo-900/10' : 
                          'bg-violet-50 dark:bg-violet-900/10'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{set.type}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(set.dateCompleted).toLocaleDateString()} • {set.pace}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="font-semibold">{set.accuracy}%</span>
                        </div>
                        <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              set.accuracy >= 90 ? 'bg-emerald-500' : 
                              set.accuracy >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${set.accuracy}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Gallery View for variant 14
function ArtisticGalleryView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">14. Artistic Gallery View</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practiceSets.slice(0, 4).map((set, index) => {
          // Different artistic styles for each card
          const styles = [
            "bg-gradient-to-br from-pink-500 to-orange-400 text-white",
            "bg-gradient-to-br from-violet-600 to-indigo-500 text-white",
            "bg-gradient-to-br from-emerald-500 to-teal-400 text-white",
            "bg-gradient-to-br from-amber-500 to-yellow-400 text-white"
          ];
          
          return (
            <div 
              key={set.id}
              onClick={() => onSelectSet(set.id)}
              className={`relative overflow-hidden rounded-xl shadow-lg h-64 card-transition cursor-pointer ${
                selectedSetId === set.id 
                  ? 'ring-4 ring-offset-2 ring-slate-400 dark:ring-slate-600' 
                  : 'hover:shadow-xl'
              }`}
            >
              <div className={`absolute inset-0 ${styles[index % styles.length]}`}>
                {/* Decorative elements */}
                <div className="absolute top-[-20px] left-[-20px] w-40 h-40 rounded-full bg-white/20"></div>
                <div className="absolute bottom-[-30px] right-[-20px] w-60 h-60 rounded-full bg-black/10"></div>
              </div>
              
              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <div>
                  <div className="text-sm font-medium opacity-80">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                  <h4 className="text-2xl font-bold mt-1">{set.subject}</h4>
                  <div className="mt-2 text-lg">{set.type}</div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Accuracy</div>
                    <div className="text-lg font-bold">{set.accuracy}%</div>
                  </div>
                  <div className="h-1 bg-black/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white"
                      style={{ width: `${set.accuracy}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-4 text-sm italic opacity-80">
                    {set.accuracy > 80 
                      ? "Masterful performance!"
                      : set.accuracy > 60
                        ? "Solid understanding"
                        : "A canvas for improvement"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

// Main function that returns the right view based on variant
export function getSetViewVariant(variant: number, props: SetViewProps) {
  // First 4 variants (1-4) are handled directly by importing ListView components
  // Variants 5-25 are handled here
  switch (variant) {
    case 5:
      return <CalendarView {...props} />;
    case 6:
      return <KanbanView {...props} />;
    case 7:
      return <ModernGridView {...props} />;
    case 11:
      return <CardFlipView {...props} />;
    case 12:
      return <HexagonalView {...props} />;
    case 13:
      return <MoodBasedView {...props} />;
    case 14:
      return <ArtisticGalleryView {...props} />;
    case 15:
      return <MindMapView {...props} />;
    case 16:
      return <MetroTileView {...props} />;
    case 17:
      return <TimelineSpiralView {...props} />;
    case 18:
      return <AccordionPanelsView {...props} />;
    case 19:
      return <MagazineLayoutView {...props} />;
    case 20:
      return <GlobalMapView {...props} />;
    case 21:
      return <FloatingIslandView {...props} />;
    case 22:
      return <NeonArcadeView {...props} />;
    case 23:
      return <GlassmorphismView {...props} />;
    case 24:
      return <PaperCraftView {...props} />;
    case 25:
      return <IsometricGridView {...props} />;
    case 26:
      return <FrostedCrystalView {...props} />;
    case 27:
      return <LayeredGlassView {...props} />;
    case 28:
      return <BubbleGlassView {...props} />;
    case 29:
      return <PrismaticGlassView {...props} />;
    case 30:
      return <FramedGlassView {...props} />;
    case 47:
      return <ZenGardenView {...props} />;
    case 48:
      return <AcousticFrequencyView {...props} />;
    case 49:
      return <MedievalManuscriptView {...props} />;
    case 31:
      return <ParticleFlowView {...props} />;
    case 32:
      return <FractalDimensionView {...props} />;
    case 33:
      return <TapestryWeaveView {...props} />;
    case 34:
      return <AntiqueMapView {...props} />;
    case 35:
      return <ArtStudioGalleryView {...props} />;
    case 36:
      return <JazzCompositionView {...props} />;
    case 37:
      return <AlchemyLaboratoryView {...props} />;
    case 38:
      return <TimeCapsuleView {...props} />;
    case 39:
      return <PuzzleBoxView {...props} />;
    case 40:
      return <ZodiacConstellationView {...props} />;
    case 50:
      return <DigitalBiomeView {...props} />;
    case 51:
      return <VirtualRealityGalleryView {...props} />;
    case 52:
      return <CircuitSimulationView {...props} />;
    case 53:
      return <NeuralNetworkView {...props} />;
    case 54:
      return <DataDashboardView {...props} />;
    case 55:
      return <QuantumPhysicsView {...props} />;
    case 56:
      return <CelestialObservatoryView {...props} />;
    case 57:
      return <DeepOceanView {...props} />;
    case 58:
      return <AncientCivilizationView {...props} />;
    default:
      return <DefaultView variant={variant} {...props} />;
  }
}

// Export all individual views for direct access
export {
  CalendarView,
  KanbanView,
  ModernGridView,
  CardFlipView,
  HexagonalView,
  MoodBasedView,
  MetroTileView,
  ArtisticGalleryView,
  MindMapView,
  TimelineSpiralView,
  AccordionPanelsView,
  MagazineLayoutView,
  GlobalMapView,
  ZenGardenView,
  AcousticFrequencyView,
  MedievalManuscriptView,
  ParticleFlowView,
  FractalDimensionView,
  TapestryWeaveView,
  AntiqueMapView,
  ArtStudioGalleryView,
  JazzCompositionView,
  AlchemyLaboratoryView,
  TimeCapsuleView,
  PuzzleBoxView,
  ZodiacConstellationView,
  DigitalBiomeView,
  VirtualRealityGalleryView,
  CircuitSimulationView,
  NeuralNetworkView,
  DataDashboardView,
  QuantumPhysicsView,
  CelestialObservatoryView,
  DeepOceanView,
  AncientCivilizationView,
  DefaultView
}
