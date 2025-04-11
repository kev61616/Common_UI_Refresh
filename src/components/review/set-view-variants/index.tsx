'use client';

import { SetViewProps } from './types';

// Import views 5-15
import { CalendarView } from './CalendarView';
import { KanbanView } from './KanbanView';
import { ModernGridView } from './ModernGridView';
import { CardFlipView } from './CardFlipView';
import { HexagonalView } from './HexagonalView';
import { MoodBasedView } from './MoodBasedView';

// Import our new beautiful 3D-inspired views
import { FloatingIslandView } from './FloatingIslandView';
import { NeonArcadeView } from './NeonArcadeView';
import { GlassmorphismView } from './GlassmorphismView';
import { PaperCraftView } from './PaperCraftView';
import { IsometricGridView } from './IsometricGridView';

// Import our new glassmorphism-inspired views
import { FrostedCrystalView } from './FrostedCrystalView';
import { LayeredGlassView } from './LayeredGlassView';
import { BubbleGlassView } from './BubbleGlassView';
import { PrismaticGlassView } from './PrismaticGlassView';
import { FramedGlassView } from './FramedGlassView';

// Import our recently added special views
import { ZenGardenView } from './ZenGardenView';
import { AcousticFrequencyView } from './AcousticFrequencyView';
import { MedievalManuscriptView } from './MedievalManuscriptView';
import { ParticleFlowView } from './ParticleFlowView';
import { FractalDimensionView } from './FractalDimensionView';
import { TapestryWeaveView } from './TapestryWeaveView';
import { AntiqueMapView } from './AntiqueMapView';
import { ArtStudioGalleryView } from './ArtStudioGalleryView';
import { JazzCompositionView } from './JazzCompositionView';
import { AlchemyLaboratoryView } from './AlchemyLaboratoryView';
import { TimeCapsuleView } from './TimeCapsuleView';
import { PuzzleBoxView } from './PuzzleBoxView';
import { ZodiacConstellationView } from './ZodiacConstellationView';
import { DigitalBiomeView } from './DigitalBiomeView';
import { VirtualRealityGalleryView } from './VirtualRealityGalleryView';
import { CircuitSimulationView } from './CircuitSimulationView';
import { NeuralNetworkView } from './NeuralNetworkView';
import { DataDashboardView } from './DataDashboardView';
import { QuantumPhysicsView } from './QuantumPhysicsView';
import { CelestialObservatoryView } from './CelestialObservatoryView';
import { DeepOceanView } from './DeepOceanView';
import { AncientCivilizationView } from './AncientCivilizationView';

// Default view for higher numbers
function DefaultView({ variant, ...props }: SetViewProps & {variant: number;}) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="mocecjn">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="h2vnpcx">View {variant}</h3>
      <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl" data-oid="kfg0e:_">
        <p className="mb-4" data-oid="20.9h28">This view variant ({variant}) is coming soon!</p>
        <p data-oid="9--mhts">Please select another view variant from the dropdown.</p>
      </div>
    </div>);

}

// Metro/Tile Design View for variant 16
function MetroTileView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="q1:fg3n">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="rrf.d54">16. Metro/Tile Design View</h3>
      
      <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[600px]" data-oid="lpjek_:">
        {/* Large tile for overall stats */}
        <div className="col-span-2 row-span-2 bg-indigo-600 text-white rounded-xl p-6 flex flex-col justify-between shadow-lg" data-oid="c46mq1u">
          <div data-oid="5r33f7w">
            <h4 className="text-2xl font-bold mb-2" data-oid="9jyw:5z">Overall Progress</h4>
            <p className="opacity-80" data-oid="1pptfyl">Your learning journey at a glance</p>
          </div>
          
          <div className="flex gap-6 mt-6" data-oid="9-:bs8y">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm" data-oid="cyq5vm2">
              <div className="text-xs font-medium uppercase opacity-80" data-oid="-ar2wyz">Average Score</div>
              <div className="text-4xl font-bold" data-oid="budw_:d">
                {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)}%
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm" data-oid="s3phel5">
              <div className="text-xs font-medium uppercase opacity-80" data-oid="74bxv5y">Sets Completed</div>
              <div className="text-4xl font-bold" data-oid="2245t0_">{practiceSets.length}</div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6" data-oid="vcup:e5">
            <div className="h-2 rounded-full bg-white/30 flex-grow" data-oid="r.ebr6g">
              <div className="h-2 rounded-full bg-white" style={{ width: '65%' }} data-oid="gnus:4p"></div>
            </div>
            <div className="text-sm font-medium" data-oid="i58brfz">65%</div>
          </div>
        </div>
        
        {/* Reading tile */}
        <div className="bg-sky-500 text-white rounded-xl p-4 flex flex-col justify-between shadow-md" data-oid="kcpbnq7">
          <div className="flex justify-between items-start" data-oid="9846m_f">
            <h4 className="text-lg font-bold" data-oid="tj7:miu">Reading</h4>
            <div className="bg-white/20 rounded-full p-1" data-oid="18_k-of">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid=":3vqtgw">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-oid="bvyc6_." />
              </svg>
            </div>
          </div>
          
          <div className="text-3xl font-bold mt-2" data-oid=".6okd:2">
            {Math.round(practiceSets.
            filter((set) => set.subject === 'Reading').
            reduce((sum, set) => sum + set.accuracy, 0) /
            Math.max(1, practiceSets.filter((set) => set.subject === 'Reading').length))}%
          </div>
          
          <div
            onClick={() => onSelectSet(practiceSets.find((s) => s.subject === 'Reading')?.id || '')}
            className="bg-white/20 mt-4 rounded-lg p-2 text-center text-sm cursor-pointer hover:bg-white/30 transition-colors" data-oid="fsmqhfu">

            View Details
          </div>
        </div>
        
        {/* Math tile */}
        <div className="bg-indigo-500 text-white rounded-xl p-4 flex flex-col justify-between shadow-md" data-oid="a:2ae1.">
          <div className="flex justify-between items-start" data-oid="rrfo8ob">
            <h4 className="text-lg font-bold" data-oid="o6-i5lz">Math</h4>
            <div className="bg-white/20 rounded-full p-1" data-oid="5zmacpn">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="rgm4b9_">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-oid="zmpw2gk" />
              </svg>
            </div>
          </div>
          
          <div className="text-3xl font-bold mt-2" data-oid="eqk3nwd">
            {Math.round(practiceSets.
            filter((set) => set.subject === 'Math').
            reduce((sum, set) => sum + set.accuracy, 0) /
            Math.max(1, practiceSets.filter((set) => set.subject === 'Math').length))}%
          </div>
          
          <div
            onClick={() => onSelectSet(practiceSets.find((s) => s.subject === 'Math')?.id || '')}
            className="bg-white/20 mt-4 rounded-lg p-2 text-center text-sm cursor-pointer hover:bg-white/30 transition-colors" data-oid="cu-v_k5">

            View Details
          </div>
        </div>
        
        {/* Writing tile */}
        <div className="bg-purple-500 text-white rounded-xl p-4 flex flex-col justify-between shadow-md" data-oid="xfj7pll">
          <div className="flex justify-between items-start" data-oid="jodp6pl">
            <h4 className="text-lg font-bold" data-oid="4g4r628">Writing</h4>
            <div className="bg-white/20 rounded-full p-1" data-oid="_f:e7rl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="305:ctu">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-oid="9quraht" />
              </svg>
            </div>
          </div>
          
          <div className="text-3xl font-bold mt-2" data-oid="c5w6i-c">
            {Math.round(practiceSets.
            filter((set) => set.subject === 'Writing').
            reduce((sum, set) => sum + set.accuracy, 0) /
            Math.max(1, practiceSets.filter((set) => set.subject === 'Writing').length))}%
          </div>
          
          <div
            onClick={() => onSelectSet(practiceSets.find((s) => s.subject === 'Writing')?.id || '')}
            className="bg-white/20 mt-4 rounded-lg p-2 text-center text-sm cursor-pointer hover:bg-white/30 transition-colors" data-oid="-fog_h:">

            View Details
          </div>
        </div>
        
        {/* Recent activity tile */}
        <div className="col-span-3 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 shadow-sm" data-oid="2twpmco">
          <h4 className="font-bold mb-3" data-oid="jf4alln">Recent Activity</h4>
          <div className="flex justify-between items-center" data-oid="y-q_p87">
            <div className="flex space-x-2" data-oid="femf6t-">
              {practiceSets.slice(0, 5).map((set, i) =>
              <div
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className={`h-1.5 rounded-full flex-grow cursor-pointer ${
                selectedSetId === set.id ?
                'bg-indigo-500 w-16' :
                `${
                set.subject === 'Reading' ?
                'bg-sky-500' :
                set.subject === 'Math' ?
                'bg-indigo-500' :
                'bg-purple-500'} w-8 hover:w-12 transition-all`}`

                } data-oid="8x9-1q-">
              </div>
              )}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="fv1px7v">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// Mind Map View for variant 15
function MindMapView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="oekib2:">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="uvbn5h6">15. Mind Map View</h3>
      
      <div className="relative min-h-[600px] overflow-x-auto" data-oid="fzfnb6k">
        <div className="flex justify-center items-center min-w-[1200px]" data-oid="6ud89z7">
          {/* Central node */}
          <div className="relative" data-oid="j0fhz00">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg w-44 text-center z-20 relative" data-oid="rfrlf03">
              <div className="font-bold text-lg" data-oid="65sdoqw">Study Progress</div>
              <div className="text-xs mt-1" data-oid="32g7915">
                Overall: {Math.round(practiceSets.reduce((a, b) => a + b.accuracy, 0) / practiceSets.length)}%
              </div>
            </div>
          
            {/* Branches to subject nodes */}
            <div className="absolute top-full left-1/2 w-0.5 h-16 -translate-x-1/2 bg-slate-300 dark:bg-slate-600 z-10" data-oid="0wc1-af"></div>
            
            {/* Subject nodes in a row */}
            <div className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 flex gap-32 z-20" data-oid="c5tylui">
              {['Reading', 'Math', 'Writing'].map((subject, index) => {
                const subjectSets = practiceSets.filter((s) => s.subject === subject);
                const avgAccuracy = Math.round(subjectSets.reduce((a, b) => a + b.accuracy, 0) / (subjectSets.length || 1));

                const connectionHeight = 120 + index * 20; // Varying heights

                return (
                  <div key={subject} className="relative" data-oid="f0bt7ir">
                    {/* Connection to parent */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2" data-oid="kryoau_">
                      <div className="w-0.5 h-16 bg-slate-300 dark:bg-slate-600 absolute bottom-0 left-1/2 -translate-x-1/2" data-oid="p1nr96p"></div>
                      <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 absolute bottom-16 left-1/2 -translate-x-1/2" data-oid="la:_d1a"></div>
                    </div>
                    
                    {/* Subject node */}
                    <div className={`p-3 rounded-xl shadow-md relative z-20 w-36 text-center ${
                    subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' :
                    subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' :
                    'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'}`
                    } data-oid="k2q1maz">
                      <div className="font-bold" data-oid="44f3699">{subject}</div>
                      <div className="text-xs" data-oid="lc_:_j9">
                        {subjectSets.length} sets • {avgAccuracy}% avg
                      </div>
                    </div>
                    
                    {/* Connection to children */}
                    <div className="absolute top-full left-1/2 w-0.5 h-16 -translate-x-1/2 bg-slate-300 dark:bg-slate-600" data-oid="tx66nlm"></div>
                    
                    {/* Test type nodes */}
                    <div className="absolute top-[calc(100%+16px)] w-64 left-1/2 -translate-x-1/2" data-oid="gavmaq7">
                      <div className="grid grid-cols-2 gap-4" data-oid="zg.x2v.">
                        {subjectSets.slice(0, 4).map((set, i) =>
                        <div
                          key={set.id}
                          onClick={() => onSelectSet(set.id)}
                          className={`p-2 rounded-lg shadow text-center z-20 relative cursor-pointer transition-all
                                      ${selectedSetId === set.id ?
                          'ring-2 ring-offset-1 bg-white dark:bg-slate-800 shadow-md' :
                          'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800'}
                                      ${subject === 'Reading' ? 'ring-sky-400 dark:ring-sky-600' :
                          subject === 'Math' ? 'ring-indigo-400 dark:ring-indigo-600' :
                          'ring-violet-400 dark:ring-violet-600'}`} data-oid="o34vdd5">

                            <div className="text-xs font-medium" data-oid="grvp2hg">{set.type}</div>
                            <div className="text-sm font-bold" data-oid="isxkgv5">{set.accuracy}%</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate" data-oid="emig52c">
                              {new Date(set.dateCompleted).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// Timeline Spiral View for variant 17
function TimelineSpiralView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="huilu6f">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="h7nnaca">17. Timeline Spiral View</h3>
      
      <div className="flex justify-center" data-oid="4c5g5rc">
        <div className="relative w-[600px] h-[600px]" data-oid="fwo:j2j">
          {/* Spiral background */}
          <div className="absolute inset-0 flex items-center justify-center" data-oid="leu:wwz">
            <div className="w-[500px] h-[500px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-20" data-oid="l2_:azx"></div>
            <div className="absolute w-[400px] h-[400px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-30" data-oid="_3g6myo"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-40" data-oid="d4jopv3"></div>
            <div className="absolute w-[200px] h-[200px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-50" data-oid="_no:11r"></div>
            <div className="absolute w-[100px] h-[100px] rounded-full border-4 border-dashed border-slate-200 dark:border-slate-700 opacity-60" data-oid="sc:rg4x"></div>
          </div>
          
          {/* Month labels */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-xs font-bold" data-oid="rn:4.25">JAN</div>
          <div className="absolute top-1/4 right-0 translate-x-4 text-xs font-bold" data-oid="zjy:w2k">APR</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-xs font-bold" data-oid="s0gtlwa">JUL</div>
          <div className="absolute top-1/4 left-0 -translate-x-4 text-xs font-bold" data-oid="ae4_lbt">OCT</div>
          
          {/* Sets positioned along spiral */}
          {practiceSets.map((set, index) => {
            // Calculate position along spiral
            const angle = index / practiceSets.length * Math.PI * 2;
            const radius = 150 + index / practiceSets.length * 120;
            const x = Math.cos(angle) * radius + 300;
            const y = Math.sin(angle) * radius + 300;

            return (
              <div
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center cursor-pointer
                          ${selectedSetId === set.id ?
                'ring-2 ring-offset-2 ring-indigo-500 z-20' :
                'hover:z-10'}
                          ${set.subject === 'Reading' ?
                'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' :
                set.subject === 'Math' ?
                'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' :
                'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'}`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} data-oid="2bldu4m">

                <div className="text-center" data-oid="3z3q6tr">
                  <div className="text-xs font-bold" data-oid="8i5m4g0">{set.accuracy}%</div>
                  <div className="text-[8px] opacity-80" data-oid="9108s:l">{set.subject}</div>
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
                  }} data-oid="9g3tych">
                </div>
              </div>);

          })}
          
          {/* Center point */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg z-30" data-oid="6c:ftcf"></div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6" data-oid="mp4.-._">
        <div className="flex items-center" data-oid="c192s3i">
          <div className="w-3 h-3 rounded-full bg-sky-400 mr-1" data-oid="wja8mf5"></div>
          <span className="text-xs" data-oid="tn1_hj2">Reading</span>
        </div>
        <div className="flex items-center" data-oid="0oepzqn">
          <div className="w-3 h-3 rounded-full bg-indigo-400 mr-1" data-oid="70tmifp"></div>
          <span className="text-xs" data-oid="0cd1nlb">Math</span>
        </div>
        <div className="flex items-center" data-oid="rfyr40r">
          <div className="w-3 h-3 rounded-full bg-violet-400 mr-1" data-oid="qb1mizr"></div>
          <span className="text-xs" data-oid="ndcj487">Writing</span>
        </div>
      </div>
    </div>);

}

// Magazine Layout View for variant 19
function MagazineLayoutView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="d47ap-7">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid=":_94s.9">19. Magazine Layout View</h3>
      
      <div className="grid grid-cols-6 gap-4 min-h-[600px]" data-oid="hvridr3">
        {/* Header/Lead story - featured set (highest score) */}
        {(() => {
          const featuredSet = [...practiceSets].sort((a, b) => b.accuracy - a.accuracy)[0];
          if (!featuredSet) return null;

          return (
            <div
              className={`col-span-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 overflow-hidden relative cursor-pointer
                         ${selectedSetId === featuredSet.id ? 'ring-4 ring-indigo-300 dark:ring-indigo-700' : 'hover:ring-2 hover:ring-indigo-400'}`}
              onClick={() => onSelectSet(featuredSet.id)} data-oid="k_9zoij">

              <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-indigo-700/20 to-transparent" data-oid="s39y7ts"></div>
              <div className="relative z-10" data-oid="gf5el_y">
                <div className="text-sm uppercase tracking-wider opacity-80 mb-2" data-oid="aio5s.c">Featured Progress</div>
                <h4 className="text-3xl font-bold mb-2" data-oid="k:c1a1z">{featuredSet.subject} Excellence</h4>
                <p className="max-w-xl opacity-90 mb-4" data-oid="mwjc6w9">
                  Your outstanding performance in {featuredSet.subject} ({featuredSet.type}) demonstrates exceptional mastery at {featuredSet.accuracy}% accuracy.
                </p>
                <div className="flex items-center gap-4" data-oid=":czl580">
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm" data-oid="7o9ihd-">{featuredSet.type}</div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm" data-oid="e5:j9w_">{new Date(featuredSet.dateCompleted).toLocaleDateString()}</div>
                  <div className="bg-white px-3 py-1 rounded-full text-sm font-bold text-indigo-700" data-oid="42sv.fk">{featuredSet.accuracy}%</div>
                </div>
              </div>
            </div>);

        })()}
        
        {/* Main column - Recent high performers */}
        <div className="col-span-4 space-y-4" data-oid="x002r5-">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-2" data-oid="qsyv0qx">
            <h4 className="font-bold text-lg" data-oid="fjd8_93">Recent High Performers</h4>
          </div>
          
          {practiceSets.
          filter((set) => set.accuracy >= 75).
          slice(0, 3).
          map((set, index) =>
          <div
            key={set.id}
            onClick={() => onSelectSet(set.id)}
            className={`flex gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-colors
                           ${selectedSetId === set.id ? 'bg-slate-50 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`} data-oid="m.c.91l">

                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-center" data-oid="xxxnx58">
                  <div className={`font-bold text-xl
                      ${set.subject === 'Reading' ? 'text-sky-600 dark:text-sky-400' :
              set.subject === 'Math' ? 'text-indigo-600 dark:text-indigo-400' :
              'text-violet-600 dark:text-violet-400'}`} data-oid="mkcgwmq">

                    {set.accuracy}%
                  </div>
                </div>
                
                <div className="flex-1" data-oid="mm-j-fz">
                  <h5 className="font-bold text-lg" data-oid="lepbgwf">{set.subject} - {set.type}</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2" data-oid="0wscocp">
                    Completed on {new Date(set.dateCompleted).toLocaleDateString()} with impressive results. Your pace was {set.pace.toLowerCase()}.
                  </p>
                </div>
              </div>
          )}
            
          <div className="border-t border-b border-slate-200 dark:border-slate-700 py-2 my-6" data-oid="l-tfpd:">
            <h4 className="font-bold text-lg" data-oid="4ufwbfb">Areas for Improvement</h4>
          </div>
          
          {practiceSets.
          filter((set) => set.accuracy < 75).
          slice(0, 2).
          map((set, index) =>
          <div
            key={set.id}
            onClick={() => onSelectSet(set.id)}
            className={`flex gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-colors
                           ${selectedSetId === set.id ? 'bg-slate-50 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`} data-oid="9tpo:56">

                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-center" data-oid="akbkmq-">
                  <div className="font-bold text-xl text-rose-600 dark:text-rose-400" data-oid="j7bocxs">
                    {set.accuracy}%
                  </div>
                </div>
                
                <div className="flex-1" data-oid="zsh0-cp">
                  <h5 className="font-bold text-lg" data-oid="218fgxh">{set.subject} - {set.type}</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2" data-oid="si:vd.w">
                    This area needs additional focus. Completed on {new Date(set.dateCompleted).toLocaleDateString()}.
                  </p>
                </div>
              </div>
          )}
        </div>
        
        {/* Sidebar - Stats and subject breakdown */}
        <div className="col-span-2 space-y-4" data-oid="v29nfdc">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-2" data-oid="ah9a4st">
            <h4 className="font-bold text-lg" data-oid="0d_h1eu">Quick Stats</h4>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl" data-oid=":lie0pj">
            <div className="text-center mb-4" data-oid=":9997ur">
              <div className="text-3xl font-bold" data-oid="6i-0snr">
                {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)}%
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="2.m-8-n">Overall Accuracy</div>
            </div>
            
            <div className="space-y-2" data-oid="yqey38g">
              {['Reading', 'Math', 'Writing'].map((subject) => {
                const subjectSets = practiceSets.filter((s) => s.subject === subject);
                const avgAccuracy = Math.round(subjectSets.reduce((sum, set) => sum + set.accuracy, 0) /
                Math.max(1, subjectSets.length));

                return (
                  <div key={subject} data-oid="rq-ch26">
                    <div className="flex justify-between text-sm mb-1" data-oid=":eex5y5">
                      <span data-oid="m4n4jl4">{subject}</span>
                      <span className="font-medium" data-oid="mo:u.97">{avgAccuracy}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="fu1mxx5">
                      <div
                        className={`h-full rounded-full ${
                        subject === 'Reading' ? 'bg-sky-500' :
                        subject === 'Math' ? 'bg-indigo-500' :
                        'bg-violet-500'}`
                        }
                        style={{ width: `${avgAccuracy}%` }} data-oid="c6jt:7-">
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </div>
          
          <div className="border-b border-slate-200 dark:border-slate-700 pb-2 pt-4" data-oid="j6q4mup">
            <h4 className="font-bold text-lg" data-oid="keyum:7">Latest Activity</h4>
          </div>
          
          <div className="space-y-2" data-oid="6l.0otp">
            {practiceSets.slice(0, 3).map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet(set.id)}
              className="text-sm border-l-2 border-slate-300 dark:border-slate-600 pl-3 py-1 cursor-pointer hover:border-l-indigo-500 dark:hover:border-l-indigo-400" data-oid="rv619bh">

                <div className="font-medium" data-oid="u_f9lcg">{set.subject}</div>
                <div className="text-slate-500 dark:text-slate-400" data-oid="-grvpng">{new Date(set.dateCompleted).toLocaleDateString()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}

// Global Map View for variant 20
function GlobalMapView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="ebultps">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid=".yuazn3">20. Knowledge World Map</h3>
      
      <div className="relative min-h-[600px] rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden" data-oid="13kmh_w">
        {/* World map background with continents */}
        <div className="absolute inset-0" data-oid="m5xo4qd">
          {/* North America */}
          <div className="absolute top-[20%] left-[15%] w-[25%] h-[25%] bg-indigo-200 dark:bg-indigo-900/30 rounded-xl" data-oid="e2g2g1n"></div>
          {/* South America */}
          <div className="absolute top-[45%] left-[25%] w-[15%] h-[30%] bg-sky-200 dark:bg-sky-900/30 rounded-xl" data-oid="6shcq11"></div>
          {/* Europe */}
          <div className="absolute top-[15%] left-[45%] w-[15%] h-[15%] bg-emerald-200 dark:bg-emerald-900/30 rounded-xl" data-oid="z8_3fs4"></div>
          {/* Africa */}
          <div className="absolute top-[35%] left-[45%] w-[20%] h-[30%] bg-amber-200 dark:bg-amber-900/30 rounded-xl" data-oid="k6.:p5b"></div>
          {/* Asia */}
          <div className="absolute top-[15%] left-[60%] w-[25%] h-[35%] bg-violet-200 dark:bg-violet-900/30 rounded-xl" data-oid="pzjxedj"></div>
          {/* Australia */}
          <div className="absolute top-[55%] left-[75%] w-[15%] h-[15%] bg-rose-200 dark:bg-rose-900/30 rounded-xl" data-oid="15i:y:l"></div>
        </div>
        
        {/* Oceans */}
        <div className="absolute inset-0 bg-blue-100/30 dark:bg-blue-900/10 -z-10" data-oid="e0xyi71"></div>
        
        {/* Interconnecting paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-40" viewBox="0 0 100 100" fill="none" data-oid="9n31if:">
          <path d="M25 30 L45 22" stroke="currentColor" strokeWidth="0.2" data-oid="sslj7.w" />
          <path d="M45 22 L55 40" stroke="currentColor" strokeWidth="0.2" data-oid="2wuzgig" />
          <path d="M55 40 L30 50" stroke="currentColor" strokeWidth="0.2" data-oid="c92:blt" />
          <path d="M30 50 L70 50" stroke="currentColor" strokeWidth="0.2" data-oid="tk1cox4" />
          <path d="M70 50 L80 60" stroke="currentColor" strokeWidth="0.2" data-oid="_b6x3:n" />
          <path d="M50 22 L70 30" stroke="currentColor" strokeWidth="0.2" data-oid="ysiy2mt" />
          <path d="M70 30 L80 60" stroke="currentColor" strokeWidth="0.2" data-oid="877hp2f" />
        </svg>
        
        {/* Place pins for each practice set */}
        {practiceSets.map((set, index) => {
          // Assign sets to continents based on subject
          let position: {x: number;y: number;} = { x: 0, y: 0 };

          if (set.subject === 'Math') {
            // Math sets on North America
            position = {
              x: 15 + index % 3 * 8,
              y: 20 + Math.floor(index / 3) % 3 * 8
            };
          } else if (set.subject === 'Reading') {
            // Reading sets on Asia
            position = {
              x: 60 + index % 3 * 7,
              y: 15 + Math.floor(index / 3) % 3 * 10
            };
          } else {
            // Writing sets on Europe
            position = {
              x: 45 + index % 2 * 7,
              y: 15 + Math.floor(index / 2) % 2 * 7
            };
          }

          return (
            <div
              key={set.id}
              onClick={() => onSelectSet(set.id)}
              className={`absolute cursor-pointer z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all
                        ${selectedSetId === set.id ?
              'scale-125 z-40' :
              'hover:scale-110'}`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }} data-oid="wk-i8gg">

              {/* Pin */}
              <div className="relative" data-oid="a63o:fy">
                <div className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center
                                ${set.subject === 'Reading' ?
                'bg-sky-500 text-white' :
                set.subject === 'Math' ?
                'bg-indigo-500 text-white' :
                'bg-violet-500 text-white'}`} data-oid="d2hy17z">

                  <span className="text-xs font-bold" data-oid="_ez_5lo">{set.accuracy}%</span>
                </div>
                <div className={`absolute -bottom-[3px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                                border-l-[5px] border-l-transparent
                                border-r-[5px] border-r-transparent
                                ${set.subject === 'Reading' ?
                'border-t-[8px] border-t-sky-500' :
                set.subject === 'Math' ?
                'border-t-[8px] border-t-indigo-500' :
                'border-t-[8px] border-t-violet-500'}`} data-oid="5.l.px5">
                </div>
                
                {/* Tooltip on hover/selection */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                                 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2 w-max max-w-[200px] text-center
                                 transition-opacity pointer-events-none
                                 ${selectedSetId === set.id ?
                'opacity-100' :
                'opacity-0 group-hover:opacity-100'}`} data-oid="j15xkdf">

                  <div className="font-medium text-sm" data-oid="yc3-2fy">{set.subject}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400" data-oid="244yqis">{set.type}</div>
                  <div className="text-xs" data-oid="22mnk0r">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                </div>
              </div>
            </div>);

        })}
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 shadow-md z-40" data-oid=".ts7l9y">
          <h4 className="text-sm font-bold mb-2" data-oid="m4c6k5q">Knowledge Regions</h4>
          <div className="space-y-1.5" data-oid="qs6anhh">
            <div className="flex items-center gap-2" data-oid="dk5ihld">
              <div className="w-3 h-3 rounded-full bg-indigo-500" data-oid=".6amc3x"></div>
              <span className="text-xs" data-oid="3gi0d:s">Math</span>
            </div>
            <div className="flex items-center gap-2" data-oid=":ogqrrd">
              <div className="w-3 h-3 rounded-full bg-sky-500" data-oid="k09zw5q"></div>
              <span className="text-xs" data-oid="d-2d7mr">Reading</span>
            </div>
            <div className="flex items-center gap-2" data-oid=":eck2fg">
              <div className="w-3 h-3 rounded-full bg-violet-500" data-oid="0mthzad"></div>
              <span className="text-xs" data-oid="93bbbq7">Writing</span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// Accordion Panels View for variant 18
function AccordionPanelsView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="i-g82ai">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="ijgnlwn">18. Accordion Panels View</h3>
      
      <div className="space-y-3" data-oid="rpwzv0y">
        {['Reading', 'Math', 'Writing'].map((subject) => {
          const subjectSets = practiceSets.filter((s) => s.subject === subject);

          return (
            <div key={subject} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden" data-oid="5t_3_tw">
              {/* Header */}
              <div className={`p-4 cursor-pointer ${
              subject === 'Reading' ? 'bg-sky-50 dark:bg-sky-900/20' :
              subject === 'Math' ? 'bg-indigo-50 dark:bg-indigo-900/20' :
              'bg-violet-50 dark:bg-violet-900/20'}`
              } data-oid="j7pukm0">
                <div className="flex justify-between items-center" data-oid="dbi.3k6">
                  <div className="font-bold" data-oid="4670l.l">{subject}</div>
                  <div className="flex items-center gap-4" data-oid="-ncn_1h">
                    <div className="text-sm" data-oid="objstb-">
                      <span className="text-slate-500 dark:text-slate-400" data-oid="c1v6e6d">Avg: </span>
                      <span className="font-semibold" data-oid="snl4ywj">
                        {Math.round(subjectSets.reduce((sum, set) => sum + set.accuracy, 0) / Math.max(1, subjectSets.length))}%
                      </span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="qd8-jpf">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" data-oid="i.4l2-f" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700" data-oid="th6lzel">
                {subjectSets.map((set) =>
                <div
                  key={set.id}
                  onClick={() => onSelectSet(set.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                  selectedSetId === set.id ?
                  subject === 'Reading' ? 'bg-sky-50 dark:bg-sky-900/10' :
                  subject === 'Math' ? 'bg-indigo-50 dark:bg-indigo-900/10' :
                  'bg-violet-50 dark:bg-violet-900/10' :
                  'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`
                  } data-oid="0-t9m59">

                    <div className="flex justify-between items-center" data-oid="8zvlph4">
                      <div data-oid="-3el67w">
                        <div className="font-medium" data-oid="336t:r1">{set.type}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="q0sa090">
                          {new Date(set.dateCompleted).toLocaleDateString()} • {set.pace}
                        </div>
                      </div>
                      <div className="flex items-center gap-4" data-oid="kwxyudc">
                        <div className="text-sm" data-oid="7chygvi">
                          <span className="font-semibold" data-oid="_9_as1.">{set.accuracy}%</span>
                        </div>
                        <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5" data-oid="yuplb-1">
                          <div
                          className={`h-1.5 rounded-full ${
                          set.accuracy >= 90 ? 'bg-emerald-500' :
                          set.accuracy >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`
                          }
                          style={{ width: `${set.accuracy}%` }} data-oid="su_cwu-">
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>);

        })}
      </div>
    </div>);

}

// Gallery View for variant 14
function ArtisticGalleryView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="c0b.i-7">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="0l0og8_">14. Artistic Gallery View</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="9omgd6j">
        {practiceSets.slice(0, 4).map((set, index) => {
          // Different artistic styles for each card
          const styles = [
          "bg-gradient-to-br from-pink-500 to-orange-400 text-white",
          "bg-gradient-to-br from-violet-600 to-indigo-500 text-white",
          "bg-gradient-to-br from-emerald-500 to-teal-400 text-white",
          "bg-gradient-to-br from-amber-500 to-yellow-400 text-white"];


          return (
            <div
              key={set.id}
              onClick={() => onSelectSet(set.id)}
              className={`relative overflow-hidden rounded-xl shadow-lg h-64 card-transition cursor-pointer ${
              selectedSetId === set.id ?
              'ring-4 ring-offset-2 ring-slate-400 dark:ring-slate-600' :
              'hover:shadow-xl'}`
              } data-oid="jh-20le">

              <div className={`absolute inset-0 ${styles[index % styles.length]}`} data-oid="jyk.l0z">
                {/* Decorative elements */}
                <div className="absolute top-[-20px] left-[-20px] w-40 h-40 rounded-full bg-white/20" data-oid="ba_m2pl"></div>
                <div className="absolute bottom-[-30px] right-[-20px] w-60 h-60 rounded-full bg-black/10" data-oid="4izb4q2"></div>
              </div>
              
              <div className="relative h-full p-6 flex flex-col justify-between z-10" data-oid="o8g6k3b">
                <div data-oid="ans6g3k">
                  <div className="text-sm font-medium opacity-80" data-oid="-nmx2fi">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                  <h4 className="text-2xl font-bold mt-1" data-oid="2errx_l">{set.subject}</h4>
                  <div className="mt-2 text-lg" data-oid="o:w974s">{set.type}</div>
                </div>
                
                <div className="mt-4" data-oid="ic6fhhl">
                  <div className="flex items-center justify-between mb-2" data-oid="r:7_g8w">
                    <div className="text-sm font-medium" data-oid="s5w6qx-">Accuracy</div>
                    <div className="text-lg font-bold" data-oid="9h6d:9g">{set.accuracy}%</div>
                  </div>
                  <div className="h-1 bg-black/20 rounded-full overflow-hidden" data-oid="8:t7udg">
                    <div
                      className="h-full bg-white"
                      style={{ width: `${set.accuracy}%` }} data-oid="x5lxnqk">
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm italic opacity-80" data-oid=":i-4ai_">
                    {set.accuracy > 80 ?
                    "Masterful performance!" :
                    set.accuracy > 60 ?
                    "Solid understanding" :
                    "A canvas for improvement"}
                  </div>
                </div>
              </div>
            </div>);

        })}
      </div>
    </div>);

}

// Main function that returns the right view based on variant
export function getSetViewVariant(variant: number, props: SetViewProps) {
  // First 4 variants (1-4) are handled directly by importing ListView components
  // Variants 5-25 are handled here
  switch (variant) {
    case 5:
      return <CalendarView {...props} data-oid="t8q6anx" />;
    case 6:
      return <KanbanView {...props} data-oid="m5nwji1" />;
    case 7:
      return <ModernGridView {...props} data-oid="_kzy0le" />;
    case 11:
      return <CardFlipView {...props} data-oid="61n.t-j" />;
    case 12:
      return <HexagonalView {...props} data-oid="sy51jvf" />;
    case 13:
      return <MoodBasedView {...props} data-oid="q5p-gj-" />;
    case 14:
      return <ArtisticGalleryView {...props} data-oid="49dek:q" />;
    case 15:
      return <MindMapView {...props} data-oid="dvz5qze" />;
    case 16:
      return <MetroTileView {...props} data-oid="gvcq6ph" />;
    case 17:
      return <TimelineSpiralView {...props} data-oid="hqs9t28" />;
    case 18:
      return <AccordionPanelsView {...props} data-oid="df65l_:" />;
    case 19:
      return <MagazineLayoutView {...props} data-oid="su-damk" />;
    case 20:
      return <GlobalMapView {...props} data-oid="hpv8he8" />;
    case 21:
      return <FloatingIslandView {...props} data-oid="53f1_hr" />;
    case 22:
      return <NeonArcadeView {...props} data-oid="kpbu2es" />;
    case 23:
      return <GlassmorphismView {...props} data-oid="srvqcc3" />;
    case 24:
      return <PaperCraftView {...props} data-oid="9m1wl.g" />;
    case 25:
      return <IsometricGridView {...props} data-oid="np87_lr" />;
    case 26:
      return <FrostedCrystalView {...props} data-oid="nt_ayoz" />;
    case 27:
      return <LayeredGlassView {...props} data-oid="8to.ut3" />;
    case 28:
      return <BubbleGlassView {...props} data-oid="jd1hok5" />;
    case 29:
      return <PrismaticGlassView {...props} data-oid="7qjexne" />;
    case 30:
      return <FramedGlassView {...props} data-oid="0yhly96" />;
    case 47:
      return <ZenGardenView {...props} data-oid="zdz6d2p" />;
    case 48:
      return <AcousticFrequencyView {...props} data-oid="jjswqov" />;
    case 49:
      return <MedievalManuscriptView {...props} data-oid="xle07a7" />;
    case 31:
      return <ParticleFlowView {...props} data-oid="ui2vlw." />;
    case 32:
      return <FractalDimensionView {...props} data-oid="q:2yg.2" />;
    case 33:
      return <TapestryWeaveView {...props} data-oid="rp:.jux" />;
    case 34:
      return <AntiqueMapView {...props} data-oid="w821gc:" />;
    case 35:
      return <ArtStudioGalleryView {...props} data-oid="c3sjowz" />;
    case 36:
      return <JazzCompositionView {...props} data-oid="_213o71" />;
    case 37:
      return <AlchemyLaboratoryView {...props} data-oid="1onuno7" />;
    case 38:
      return <TimeCapsuleView {...props} data-oid="gnw6wvh" />;
    case 39:
      return <PuzzleBoxView {...props} data-oid="oqstw-z" />;
    case 40:
      return <ZodiacConstellationView {...props} data-oid="ambwxmh" />;
    case 50:
      return <DigitalBiomeView {...props} data-oid="wrbgvr9" />;
    case 51:
      return <VirtualRealityGalleryView {...props} data-oid="z209w-b" />;
    case 52:
      return <CircuitSimulationView {...props} data-oid="dcvkc4." />;
    case 53:
      return <NeuralNetworkView {...props} data-oid="16t_qw4" />;
    case 54:
      return <DataDashboardView {...props} data-oid="1xwjhfh" />;
    case 55:
      return <QuantumPhysicsView {...props} data-oid=":cvje-1" />;
    case 56:
      return <CelestialObservatoryView {...props} data-oid="t7dzc6c" />;
    case 57:
      return <DeepOceanView {...props} data-oid="4x4va2i" />;
    case 58:
      return <AncientCivilizationView {...props} data-oid="qlt-13-" />;
    default:
      return <DefaultView variant={variant} {...props} data-oid="2a0lgup" />;
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
  DefaultView };