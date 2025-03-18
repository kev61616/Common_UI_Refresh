'use client'

// Define view types
export type ViewType = 'list' | 'timeline' | 'question'
export type SetViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
export type TimelineViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
export type QuestionViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35

interface ViewControlsProps {
  viewType: ViewType
  setViewVariant: SetViewVariant
  timelineViewVariant: TimelineViewVariant
  questionViewVariant: QuestionViewVariant
  onViewTypeChange: (type: ViewType) => void
  onSetViewVariantChange: (variant: SetViewVariant) => void
  onTimelineViewVariantChange: (variant: TimelineViewVariant) => void
  onQuestionViewVariantChange: (variant: QuestionViewVariant) => void
}

/**
 * Component for switching between different view types and their variants
 * Extracted from ReviewTestPage for better organization
 */
export function ViewControls({
  viewType,
  setViewVariant,
  timelineViewVariant,
  questionViewVariant,
  onViewTypeChange,
  onSetViewVariantChange,
  onTimelineViewVariantChange,
  onQuestionViewVariantChange
}: ViewControlsProps) {
  return (
    <div className="flex justify-end items-center mb-8">
      <div className="flex space-x-4">
        {/* View Type Selector - Beautified tabs */}
        <div className="relative bg-gradient-to-r from-indigo-50 to-sky-50 p-1 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
          {/* Animated background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 animate-pulse-slow"></div>
          
          {/* Tabs container */}
          <div className="relative flex">
            <button 
              onClick={() => onViewTypeChange('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewType === 'list' 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transform -translate-y-0.5 scale-105' 
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-indigo-500 dark:bg-slate-800/70 dark:hover:bg-slate-700/90 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span>By Set</span>
              </div>
            </button>
            <button 
              onClick={() => onViewTypeChange('timeline')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewType === 'timeline' 
                  ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg transform -translate-y-0.5 scale-105' 
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-purple-500 dark:bg-slate-800/70 dark:hover:bg-slate-700/90 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Timeline</span>
              </div>
            </button>
            <button 
              onClick={() => onViewTypeChange('question')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewType === 'question' 
                  ? 'bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-lg transform -translate-y-0.5 scale-105' 
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-sky-500 dark:bg-slate-800/70 dark:hover:bg-slate-700/90 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>By Question</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Variant Selector */}
        {viewType === 'list' && (
          <select 
            value={setViewVariant} 
            onChange={e => onSetViewVariantChange(Number(e.target.value) as SetViewVariant)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm px-3 py-1.5 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-200"
          >
            {/* By Set Views - 30 distinct styles */}
            <option value={1}>1. Standard Cards View</option>
            <option value={2}>2. Compact Table/Grid View</option>
            <option value={3}>3. Timeline-Inspired View</option>
            <option value={4}>4. Masonry Grid View</option>
            <option value={5}>5. Calendar View</option>
            <option value={6}>6. Kanban Board View</option>
            <option value={7}>7. Modern Grid View</option>
            <option value={11}>11. 3D Card Flip View</option>
            <option value={12}>12. Hexagonal View</option>
            <option value={13}>13. Mood-Based View</option>
            <option value={14}>14. Artistic Gallery View</option>
            <option value={15}>15. Mind Map View</option>
            <option value={16}>16. Metro/Tile Design View</option>
            <option value={17}>17. Timeline Spiral View</option>
            <option value={18}>18. Accordion Panels View</option>
            <option value={19}>19. Magazine Layout View</option>
            <option value={20}>20. Knowledge World Map</option>
            <option value={21}>21. Floating Islands View</option>
            <option value={22}>22. Neon Arcade View</option>
            <option value={23}>23. Glassmorphism View</option>
            <option value={24}>24. Paper Craft View</option>
            <option value={25}>25. Isometric Grid View</option>
            <option value={26}>26. Frosted Crystal View</option>
            <option value={27}>27. Layered Glass View</option>
            <option value={28}>28. Bubble Glass View</option>
            <option value={29}>29. Prismatic Glass View</option>
            <option value={30}>30. Framed Glass View</option>
          </select>
        )}
        
        {viewType === 'timeline' && (
          <select 
            value={timelineViewVariant} 
            onChange={e => onTimelineViewVariantChange(Number(e.target.value) as TimelineViewVariant)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm px-3 py-1.5 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-200"
          >
            {/* Timeline Views - 20 distinct styles */}
            <option value={1}>1. Standard Timeline View</option>
            <option value={2}>2. Compact Timeline View</option>
            <option value={3}>3. Detailed Timeline View</option>
            <option value={4}>4. Vertical Scrolling Timeline</option>
            <option value={5}>5. Branching Timeline</option>
            <option value={6}>6. Circular Timeline</option>
            <option value={7}>7. 3D Timeline</option>
            <option value={8}>8. Storytelling Timeline</option>
            <option value={9}>9. Interactive Timeline Slider</option>
            <option value={10}>10. Metro Timeline</option>
            <option value={11}>11. Timeline Calendar</option>
            <option value={12}>12. Achievement Timeline</option>
            <option value={13}>13. Subject-Color Coded Timeline</option>
            <option value={14}>14. Minimalist Timeline</option>
            <option value={15}>15. Photo Timeline</option>
            <option value={16}>16. Progress Path</option>
            <option value={17}>17. Flow Diagram</option>
            <option value={18}>18. Comparison Timeline</option>
            <option value={19}>19. Milestone Timeline</option>
            <option value={20}>20. Stream Graph</option>
          </select>
        )}
        
        {viewType === 'question' && (
          <select 
            value={questionViewVariant} 
            onChange={e => onQuestionViewVariantChange(Number(e.target.value) as QuestionViewVariant)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm px-3 py-1.5 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-200"
          >
            {/* Question Views - 20 distinct styles */}
            <option value={1}>1. Standard Question View</option>
            <option value={2}>2. Card Deck View</option>
            <option value={3}>3. Knowledge Tree View</option>
            <option value={4}>4. Diagnostic Dashboard View</option>
            <option value={5}>5. Heatmap View</option>
            <option value={6}>6. Concept Map View</option>
            <option value={7}>7. Tag Cloud View</option>
            <option value={8}>8. Matrix Grid View</option>
            <option value={9}>9. Venn Diagram View</option>
            <option value={10}>10. Scatter Plot View</option>
            <option value={11}>11. Question Journey View</option>
            <option value={12}>12. Question Network View</option>
            <option value={13}>13. Spider/Radar Chart View</option>
            <option value={14}>14. Histogram View</option>
            <option value={15}>15. Accordion Category View</option>
            <option value={16}>16. Question Stack View</option>
            <option value={17}>17. Bubble Pack View</option>
            <option value={18}>18. Question Timeline View</option>
            <option value={19}>19. Mastery Path View</option>
            <option value={20}>20. Question Galaxy View</option>
            <option value={21}>21. Periodic Table View</option>
            <option value={22}>22. Circuit Board View</option>
            <option value={23}>23. Solar System View</option>
            <option value={24}>24. Mind Map View</option>
            <option value={25}>25. Watercolor Gallery View</option>
            <option value={26}>26. Urban Blueprint View</option>
            <option value={27}>27. Steampunk Machinery View</option>
            <option value={28}>28. Bookshelf View</option>
            <option value={29}>29. Vintage Botanical View</option>
            <option value={30}>30. Infographic Dashboard View</option>
            <option value={31}>31. Film Strip View</option>
            <option value={32}>32. Ancient Scroll View</option>
            <option value={33}>33. Stained Glass View</option>
            <option value={34}>34. Weather Map View</option>
            <option value={35}>35. Gradient Flow View</option>
          </select>
        )}
      </div>
    </div>
  )
}
