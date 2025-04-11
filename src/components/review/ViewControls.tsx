'use client';

// Define view types
export type ViewType = 'list' | 'timeline' | 'question';
export type SetViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
export type TimelineViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type QuestionViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35;

interface ViewControlsProps {
  viewType: ViewType;
  setViewVariant: SetViewVariant;
  timelineViewVariant: TimelineViewVariant;
  questionViewVariant: QuestionViewVariant;
  onViewTypeChange: (type: ViewType) => void;
  onSetViewVariantChange: (variant: SetViewVariant) => void;
  onTimelineViewVariantChange: (variant: TimelineViewVariant) => void;
  onQuestionViewVariantChange: (variant: QuestionViewVariant) => void;
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
    <div className="flex justify-end items-center mb-8" data-oid="bszbc14">
      <div className="flex space-x-4" data-oid="9cvu7hq">
        {/* View Type Selector - Beautified tabs */}
        <div className="relative bg-gradient-to-r from-indigo-50 to-sky-50 p-1 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50 dark:from-slate-800 dark:to-slate-700 overflow-hidden" data-oid="5lgkkad">
          {/* Animated background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 animate-pulse-slow" data-oid="8su8fl6"></div>
          
          {/* Tabs container */}
          <div className="relative flex" data-oid="4_iqq17">
            <button
              onClick={() => onViewTypeChange('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewType === 'list' ?
              'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transform -translate-y-0.5 scale-105' :
              'bg-white/80 text-slate-700 hover:bg-white hover:text-indigo-500 dark:bg-slate-800/70 dark:hover:bg-slate-700/90 dark:text-slate-300'}`
              } data-oid="d-inr3s">

              <div className="flex items-center gap-1.5" data-oid="s5.q:uj">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="x.f6ap:">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" data-oid="xnen2ft" />
                </svg>
                <span data-oid="bbeu06d">By Set</span>
              </div>
            </button>
            <button
              onClick={() => onViewTypeChange('timeline')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewType === 'timeline' ?
              'bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg transform -translate-y-0.5 scale-105' :
              'bg-white/80 text-slate-700 hover:bg-white hover:text-purple-500 dark:bg-slate-800/70 dark:hover:bg-slate-700/90 dark:text-slate-300'}`
              } data-oid="8jz_a3u">

              <div className="flex items-center gap-1.5" data-oid="dyneb9l">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="sn1k7gu">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" data-oid="qdl3jz0" />
                </svg>
                <span data-oid="m6no8q4">Timeline</span>
              </div>
            </button>
            <button
              onClick={() => onViewTypeChange('question')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewType === 'question' ?
              'bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-lg transform -translate-y-0.5 scale-105' :
              'bg-white/80 text-slate-700 hover:bg-white hover:text-sky-500 dark:bg-slate-800/70 dark:hover:bg-slate-700/90 dark:text-slate-300'}`
              } data-oid="njlebz6">

              <div className="flex items-center gap-1.5" data-oid="aa:y_uq">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="d_1hqmn">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="uj0iekj" />
                </svg>
                <span data-oid="whh9h-l">By Question</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Variant Selector */}
        {viewType === 'list' &&
        <select
          value={setViewVariant}
          onChange={(e) => onSetViewVariantChange(Number(e.target.value) as SetViewVariant)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm px-3 py-1.5 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-200" data-oid="7_scmvz">

            {/* By Set Views - 30 distinct styles */}
            <option value={1} data-oid="2ioxvek">1. Standard Cards View</option>
            <option value={2} data-oid="5_p686d">2. Compact Table/Grid View</option>
            <option value={3} data-oid="kf4.uzu">3. Timeline-Inspired View</option>
            <option value={4} data-oid="62.l2pd">4. Masonry Grid View</option>
            <option value={5} data-oid="ukfjzt2">5. Calendar View</option>
            <option value={6} data-oid="km68e0j">6. Kanban Board View</option>
            <option value={7} data-oid="ht43kyo">7. Modern Grid View</option>
            <option value={11} data-oid="tff3gx6">11. 3D Card Flip View</option>
            <option value={12} data-oid="v96g9ok">12. Hexagonal View</option>
            <option value={13} data-oid="cr8f2ew">13. Mood-Based View</option>
            <option value={14} data-oid="_fapf93">14. Artistic Gallery View</option>
            <option value={15} data-oid=".mkmwtg">15. Mind Map View</option>
            <option value={16} data-oid="ddv.erz">16. Metro/Tile Design View</option>
            <option value={17} data-oid="xymns-t">17. Timeline Spiral View</option>
            <option value={18} data-oid="2cl1m31">18. Accordion Panels View</option>
            <option value={19} data-oid="b5m9sge">19. Magazine Layout View</option>
            <option value={20} data-oid="0sxhbzp">20. Knowledge World Map</option>
            <option value={21} data-oid="dhosvgl">21. Floating Islands View</option>
            <option value={22} data-oid="598lj7h">22. Neon Arcade View</option>
            <option value={23} data-oid="s2i-5kz">23. Glassmorphism View</option>
            <option value={24} data-oid="3.xu4-1">24. Paper Craft View</option>
            <option value={25} data-oid="vcjnd4p">25. Isometric Grid View</option>
            <option value={26} data-oid="3fx3zei">26. Frosted Crystal View</option>
            <option value={27} data-oid="5rnn09i">27. Layered Glass View</option>
            <option value={28} data-oid="3y2x9g2">28. Bubble Glass View</option>
            <option value={29} data-oid="uokn-t3">29. Prismatic Glass View</option>
            <option value={30} data-oid="99ker.6">30. Framed Glass View</option>
          </select>
        }
        
        {viewType === 'timeline' &&
        <select
          value={timelineViewVariant}
          onChange={(e) => onTimelineViewVariantChange(Number(e.target.value) as TimelineViewVariant)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm px-3 py-1.5 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-200" data-oid="mhmp61s">

            {/* Timeline Views - 20 distinct styles */}
            <option value={1} data-oid="jq5gwry">1. Standard Timeline View</option>
            <option value={2} data-oid="mqjvqt5">2. Compact Timeline View</option>
            <option value={3} data-oid="vzhybp4">3. Detailed Timeline View</option>
            <option value={4} data-oid="o85_g9e">4. Vertical Scrolling Timeline</option>
            <option value={5} data-oid="7k-zpfk">5. Branching Timeline</option>
            <option value={6} data-oid="k_x0k1c">6. Circular Timeline</option>
            <option value={7} data-oid="jh3l6_x">7. 3D Timeline</option>
            <option value={8} data-oid="fhv_czr">8. Storytelling Timeline</option>
            <option value={9} data-oid="drlciho">9. Interactive Timeline Slider</option>
            <option value={10} data-oid="cuunj77">10. Metro Timeline</option>
            <option value={11} data-oid="_9uj-x3">11. Timeline Calendar</option>
            <option value={12} data-oid="s7rh_ip">12. Achievement Timeline</option>
            <option value={13} data-oid="29-iaad">13. Subject-Color Coded Timeline</option>
            <option value={14} data-oid="4m5q9rn">14. Minimalist Timeline</option>
            <option value={15} data-oid="17m91g5">15. Photo Timeline</option>
            <option value={16} data-oid="nuxphek">16. Progress Path</option>
            <option value={17} data-oid="70.q4yy">17. Flow Diagram</option>
            <option value={18} data-oid="uitj2nf">18. Comparison Timeline</option>
            <option value={19} data-oid="f5s-ywh">19. Milestone Timeline</option>
            <option value={20} data-oid="x3uy.jd">20. Stream Graph</option>
          </select>
        }
        
        {viewType === 'question' &&
        <select
          value={questionViewVariant}
          onChange={(e) => onQuestionViewVariantChange(Number(e.target.value) as QuestionViewVariant)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm px-3 py-1.5 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-200" data-oid="fqjb_df">

            {/* Question Views - 20 distinct styles */}
            <option value={1} data-oid="gyt8m4o">1. Standard Question View</option>
            <option value={2} data-oid="ax5y17.">2. Card Deck View</option>
            <option value={3} data-oid=".sokmln">3. Knowledge Tree View</option>
            <option value={4} data-oid="cs6a:re">4. Diagnostic Dashboard View</option>
            <option value={5} data-oid="8cy_.i9">5. Heatmap View</option>
            <option value={6} data-oid="wmjjbwc">6. Concept Map View</option>
            <option value={7} data-oid="a_f9yyb">7. Tag Cloud View</option>
            <option value={8} data-oid="lwfdgok">8. Matrix Grid View</option>
            <option value={9} data-oid="fd-_i-m">9. Venn Diagram View</option>
            <option value={10} data-oid="me0tt8h">10. Scatter Plot View</option>
            <option value={11} data-oid="-daux3t">11. Question Journey View</option>
            <option value={12} data-oid="_c.jnrd">12. Question Network View</option>
            <option value={13} data-oid="-38hcuv">13. Spider/Radar Chart View</option>
            <option value={14} data-oid="1qv--l5">14. Histogram View</option>
            <option value={15} data-oid="zz61:00">15. Accordion Category View</option>
            <option value={16} data-oid="wxglned">16. Question Stack View</option>
            <option value={17} data-oid="-sq0csm">17. Bubble Pack View</option>
            <option value={18} data-oid="wyehjf.">18. Question Timeline View</option>
            <option value={19} data-oid="84gxolg">19. Mastery Path View</option>
            <option value={20} data-oid="umgn8a0">20. Question Galaxy View</option>
            <option value={21} data-oid="-_9beft">21. Periodic Table View</option>
            <option value={22} data-oid="oe0-gt1">22. Circuit Board View</option>
            <option value={23} data-oid="j79g_sw">23. Solar System View</option>
            <option value={24} data-oid="fde1tmm">24. Mind Map View</option>
            <option value={25} data-oid="4g:spqk">25. Watercolor Gallery View</option>
            <option value={26} data-oid="vasprfz">26. Urban Blueprint View</option>
            <option value={27} data-oid="6usytjc">27. Steampunk Machinery View</option>
            <option value={28} data-oid="bgyfpgf">28. Bookshelf View</option>
            <option value={29} data-oid="xxjnkz0">29. Vintage Botanical View</option>
            <option value={30} data-oid="e-b:gyy">30. Infographic Dashboard View</option>
            <option value={31} data-oid="d76l7xm">31. Film Strip View</option>
            <option value={32} data-oid="t9rx.wb">32. Ancient Scroll View</option>
            <option value={33} data-oid="5-n_olh">33. Stained Glass View</option>
            <option value={34} data-oid="8:l0zj6">34. Weather Map View</option>
            <option value={35} data-oid="rhtwst8">35. Gradient Flow View</option>
          </select>
        }
      </div>
    </div>);

}