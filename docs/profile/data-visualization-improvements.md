# Profile Tabs Data Visualization Improvements

This document outlines a comprehensive strategy for enhancing the data visualization components across the Reading, Writing, and Math tabs in the Profile section. These improvements aim to transform the current placeholder charts into rich, interactive visualizations that provide deeper insights into student performance.

## Table of Contents

- [Cross-Tab Visualization Framework](#cross-tab-visualization-framework)
- [Reading Tab Visualizations](#reading-tab-visualizations)
- [Writing Tab Visualizations](#writing-tab-visualizations)
- [Math Tab Visualizations](#math-tab-visualizations)
- [Technical Implementation](#technical-implementation)
- [Accessibility Considerations](#accessibility-considerations)
- [Implementation Phases](#implementation-phases)

## Cross-Tab Visualization Framework

To ensure consistency across tabs while allowing for domain-specific visualizations, we'll implement a shared framework of base components and utilities.

### Component Library Selection

We'll use a combination of libraries to balance development speed with customization:

1. **Primary Library: Recharts**
   - React-based with good TypeScript support
   - Excellent performance with large datasets
   - Built-in responsive design capabilities
   - Well-documented API with extensive examples

2. **Supplementary Libraries**
   - **Visx**: For more specialized visualizations
   - **D3.js**: For custom visualizations not available in higher-level libraries
   - **react-spring**: For advanced animations and transitions

### Shared Base Components

#### TimeSeriesChart Component

```tsx
// Generic time series chart for progression data
<TimeSeriesChart
  data={performanceData}
  metrics={['overall', 'vocabulary', 'comprehension']}
  timeRange="6months"
  colorScheme={subjectColorMap}
  showDataPoints={true}
  enableZoom={true}
  height={240}
  annotations={milestones}
  onPointClick={handleDataPointSelection}
/>
```

#### SkillBreakdownChart Component

```tsx
// Flexible chart for skill breakdown visualization
<SkillBreakdownChart
  skills={skillsData}
  type="bar" // or "radar", "radial"
  colorScheme={subjectColorMap}
  showPercentages={true}
  enableComparison={prevPeriodData}
  height={320}
  interactive={true}
  onSkillSelect={handleSkillSelection}
/>
```

#### ProgressMetricCard Component

```tsx
// Enhanced score display with trend visualization
<ProgressMetricCard
  current={scoreData.current}
  previous={scoreData.previous}
  change={scoreData.change}
  trend="up" // or "down", "neutral"
  color={subjectPrimaryColor}
  enableAnimation={true}
  comparisonPeriod="1 month"
  showHistoricalTooltip={true}
/>
```

### Theme Integration

All visualizations will respect the application theme (light/dark mode) and maintain consistent styling with the rest of the interface:

```tsx
// Theme provider integration
const chartColors = {
  reading: {
    primary: 'var(--color-primary-500)',
    secondary: ['var(--color-primary-300)', 'var(--color-primary-700)'],
    accent: 'var(--color-accent-500)'
  },
  writing: {
    primary: 'var(--color-accent-500)',
    secondary: ['var(--color-accent-300)', 'var(--color-accent-700)'],
    accent: 'var(--color-primary-500)'
  },
  math: {
    primary: 'var(--color-cyan-500)',
    secondary: ['var(--color-cyan-300)', 'var(--color-cyan-700)'],
    accent: 'var(--color-accent-500)'
  }
};
```

## Reading Tab Visualizations

### 1. Reading Progress Timeline

Replace the current placeholder with an interactive timeline showing reading score progression and skill development over time.

#### Implementation Details

```tsx
<ReadingTimelineChart
  data={readingHistoryData}
  metrics={[
    {id: 'overall', label: 'Overall Reading', color: '#4299E1'},
    {id: 'vocabulary', label: 'Vocabulary', color: '#9F7AEA'},
    {id: 'comprehension', label: 'Comprehension', color: '#38B2AC'},
    {id: 'analysis', label: 'Analysis', color: '#ED8936'}
  ]}
  annotations={significantEvents} // e.g., test dates, milestones
  timeRangeSelector={true}
  enableTooltips={true}
  showMovingAverage={true}
/>
```

#### Visual Features

- **Multi-line time series** with smooth curve interpolation
- **Shaded area beneath** the primary metric line for emphasis
- **Interactive data points** that reveal detailed metrics on hover
- **Milestone markers** (stars/flags) for significant achievements
- **Time range selectors** (1m, 3m, 6m, 1y, all)
- **Toggle controls** to show/hide individual skill lines
- **Trend indicators** showing rate of improvement

#### Data Structure

```typescript
interface ReadingHistoryPoint {
  date: string;             // ISO date string
  overall: number;          // Overall reading score
  vocabulary: number;       // Vocabulary sub-score
  comprehension: number;    // Comprehension sub-score
  analysis: number;         // Analysis sub-score
  assessmentType?: string;  // Type of assessment (optional)
  milestone?: string;       // Milestone description (optional)
}

type ReadingHistoryData = ReadingHistoryPoint[];
```

### 2. Vocabulary Growth Visualization

Add a specialized visualization focused on vocabulary development and word mastery.

#### Implementation Details

```tsx
<VocabularyGrowthChart
  wordData={vocabularyAcquisitionData}
  categories={[
    {id: 'academic', label: 'Academic', color: '#4299E1'},
    {id: 'literary', label: 'Literary', color: '#9F7AEA'},
    {id: 'domain', label: 'Subject-Specific', color: '#38B2AC'}
  ]}
  showDistribution={true}
  difficulty={true} // show word difficulty levels
  enableFiltering={true}
  maxWords={100}
/>
```

#### Visual Features

- **Word cloud visualization** with size indicating mastery level
- **Category-based color coding** to distinguish word types
- **Stacked area chart** showing vocabulary growth over time
- **Difficulty clustering** to group words by complexity level
- **Interactive word selection** to show usage examples
- **Filtering controls** for word categories and difficulty

#### Data Structure

```typescript
interface VocabularyWord {
  word: string;
  category: 'academic' | 'literary' | 'domain';
  masteryLevel: number;     // 0-100
  difficulty: number;       // 1-5
  firstEncountered: string; // ISO date
  lastTested: string;       // ISO date
  usageExamples?: string[]; // Optional examples
}

type VocabularyAcquisitionData = VocabularyWord[];
```

### 3. Reading Comprehension Matrix

Implement a detailed breakdown of comprehension skills across different text types.

#### Implementation Details

```tsx
<ComprehensionMatrix
  data={comprehensionData}
  dimensions={[
    {id: 'explicit', label: 'Explicit Information'},
    {id: 'implicit', label: 'Implicit Meaning'},
    {id: 'critical', label: 'Critical Evaluation'},
    {id: 'synthesis', label: 'Information Synthesis'}
  ]}
  passageTypes={[
    {id: 'narrative', label: 'Narrative'},
    {id: 'informational', label: 'Informational'},
    {id: 'persuasive', label: 'Persuasive'}
  ]}
  colorScale="sequential" // gradient from low to high performance
  showPerformanceLevels={true}
  enableDrilldown={true}
/>
```

#### Visual Features

- **Heat map visualization** showing performance across comprehension types
- **Matrix layout** correlating passage types with comprehension dimensions
- **Color intensity** indicating proficiency level
- **Interactive cells** revealing specific question examples
- **Tab navigation** between absolute scores and improvement metrics
- **Performance level indicators** from "developing" to "mastery"

#### Data Structure

```typescript
interface ComprehensionDataPoint {
  dimensionId: string;      // Comprehension dimension
  passageTypeId: string;    // Passage type
  score: number;            // Performance score (0-100)
  questionCount: number;    // Number of questions attempted
  improvementRate: number;  // Improvement since last assessment
  examples?: {              // Optional specific examples
    questionId: string;
    question: string;
    performance: 'correct' | 'incorrect' | 'partial';
  }[];
}

type ComprehensionData = ComprehensionDataPoint[];
```

## Writing Tab Visualizations

### 1. Writing Skills Radar Chart

Implement a comprehensive radar chart visualization showing writing skill dimensions.

#### Implementation Details

```tsx
<WritingSkillsRadar
  data={writingSkillsData}
  categories={[
    {id: 'grammar', label: 'Grammar & Mechanics'},
    {id: 'vocabulary', label: 'Vocabulary Usage'},
    {id: 'organization', label: 'Organization'},
    {id: 'style', label: 'Style & Voice'},
    {id: 'argumentation', label: 'Argumentation'},
    {id: 'evidence', label: 'Evidence Use'}
  ]}
  comparisonData={previousPeriodData}
  showLevels={[25, 50, 75, 100]}
  enableAnimation={true}
  onSkillClick={handleSkillSelection}
/>
```

#### Visual Features

- **Polygon shape** with vertices representing different writing skills
- **Filled area** showing current performance level
- **Dotted line overlay** showing previous performance for comparison
- **Animated transitions** when toggling between time periods
- **Hover tooltips** with specific score and improvement metrics
- **Skill selection** highlighting specific dimensions
- **Level rings** showing performance thresholds

#### Data Structure

```typescript
interface WritingSkillDataPoint {
  skillId: string;          // Skill identifier
  current: number;          // Current score (0-100)
  previous?: number;        // Previous score if comparison enabled
  target?: number;          // Target score if goal-setting enabled
  subSkills?: {             // Optional sub-skill breakdown
    id: string;
    name: string;
    score: number;
  }[];
}

type WritingSkillsData = WritingSkillDataPoint[];
```

### 2. Writing Error Reduction Chart

Create a visualization tracking improvement in error reduction over time.

#### Implementation Details

```tsx
<ErrorReductionChart
  data={writingErrorData}
  categories={[
    {id: 'punctuation', label: 'Punctuation', color: '#F56565'},
    {id: 'grammar', label: 'Grammar', color: '#ED8936'},
    {id: 'spelling', label: 'Spelling', color: '#ECC94B'},
    {id: 'structure', label: 'Structure', color: '#48BB78'}
  ]}
  timeRange="6months"
  normalizeByWordCount={true}
  showTrendlines={true}
  enableTooltips={true}
/>
```

#### Visual Features

- **Multi-line chart** showing error frequency over time
- **Downward trending lines** indicating improvement
- **Stacked area option** to show cumulative error reduction
- **Error density visualization** (errors per 100 words)
- **Interactive hover state** showing specific error examples
- **Toggle between absolute and relative** (percentage) improvement
- **Trend line projections** forecasting future improvement

#### Data Structure

```typescript
interface WritingErrorDataPoint {
  date: string;                   // ISO date string
  totalWordCount: number;         // Total words written
  errorCounts: {                  // Counts by error type
    [category: string]: number;
  };
  examples?: {                    // Optional specific examples
    category: string;
    errorText: string;
    correctedText: string;
  }[];
}

type WritingErrorData = WritingErrorDataPoint[];
```

### 3. Writing Complexity Progression

Implement a visualization showing the increasing sophistication of writing over time.

#### Implementation Details

```tsx
<WritingComplexityChart
  data={complexityMetricsData}
  metrics={[
    {id: 'sentenceLength', label: 'Sentence Length'},
    {id: 'sentenceVariety', label: 'Sentence Variety'},
    {id: 'vocabularyLevel', label: 'Vocabulary Level'},
    {id: 'transitionUse', label: 'Transition Usage'}
  ]}
  sampleTextMapping={true} // link chart points to actual writing samples
  showComplexityIndex={true}
  enableTimelineView={true}
/>
```

#### Visual Features

- **Multi-dimensional line chart** showing complexity metrics over time
- **Composite complexity index** combining multiple metrics
- **Sample text tooltips** showing before/after examples
- **Interactive time points** that reveal actual writing samples
- **Benchmark overlays** showing grade-level expectations
- **Sentence structure visualization** showing simple vs. complex sentences
- **Toggle between metrics** to focus on specific aspects

#### Data Structure

```typescript
interface ComplexityMetricsPoint {
  date: string;               // ISO date string
  assignmentId: string;       // Reference to writing assignment
  metrics: {                  // Various complexity metrics
    sentenceLength: number;   // Average sentence length
    sentenceVariety: number;  // Variety score (0-100)
    vocabularyLevel: number;  // Vocabulary level score (0-100)
    transitionUse: number;    // Transition usage score (0-100)
    complexityIndex: number;  // Combined metric (0-100)
  };
  sampleText?: {              // Optional sample from assignment
    excerpt: string;
    highlighted?: string[];   // Elements to highlight
  };
}

type ComplexityMetricsData = ComplexityMetricsPoint[];
```

## Math Tab Visualizations

### 1. Math Domain Mastery Visualization

Create a comprehensive visualization of mathematical domain mastery.

#### Implementation Details

```tsx
<MathDomainChart
  data={mathDomainData}
  domains={[
    {id: 'algebra', label: 'Algebra', color: '#4299E1'},
    {id: 'geometry', label: 'Geometry', color: '#38A169'},
    {id: 'dataAnalysis', label: 'Data Analysis', color: '#805AD5'},
    {id: 'numberSystems', label: 'Number Systems', color: '#DD6B20'}
  ]}
  showSubdomains={true}
  showMasteryLevels={true}
  enableDrilldown={true}
  interactionMode="explore" // or "assess", "practice"
/>
```

#### Visual Features

- **Hierarchical treemap visualization** of mathematical domains
- **Color intensity** indicating mastery level
- **Size proportional** to question frequency or importance
- **Expandable tiles** to explore sub-domains
- **Interactive filtering** by difficulty level
- **Mastery level indicators** from "beginning" to "advanced"
- **Problem count badges** showing assessment coverage

#### Data Structure

```typescript
interface MathDomainNode {
  id: string;
  name: string;
  masteryLevel: number;     // 0-100
  questionCount: number;    // Number of questions attempted
  subdomains?: MathDomainNode[]; // Optional subdomains
  conceptIds?: string[];    // Related concept identifiers
}

type MathDomainData = MathDomainNode[];
```

### 2. Problem-Solving Efficiency Visualization

Implement a visualization focusing on both accuracy and efficiency in problem-solving.

#### Implementation Details

```tsx
<ProblemSolvingMatrix
  data={problemSolvingData}
  difficultyCurve={true}
  showTimeEfficiency={true}
  quadrantView={true} // divides into speed/accuracy quadrants
  problemTypes={['algebra', 'geometry', 'dataAnalysis']}
  enableFiltering={true}
  showTargetZones={true}
/>
```

#### Visual Features

- **Scatter plot** with accuracy (y-axis) vs. time (x-axis)
- **Quadrant division** showing different performance patterns:
  - Fast & Accurate (top-left): Mastery
  - Slow & Accurate (top-right): Developing fluency
  - Fast & Inaccurate (bottom-left): Careless errors
  - Slow & Inaccurate (bottom-right): Conceptual gaps
- **Point size** indicating problem difficulty
- **Color coding** by problem type
- **Trend lines** showing progression over time
- **Target zones** highlighting optimal performance areas
- **Interactive hover** revealing specific problem details

#### Data Structure

```typescript
interface ProblemSolvingDataPoint {
  problemId: string;
  domain: string;           // Math domain
  subdomain?: string;       // Optional subdomain
  difficulty: number;       // 1-5 difficulty rating
  timeSpent: number;        // Time in seconds
  accuracy: number;         // 0-100 accuracy score
  attemptDate: string;      // ISO date string
  correctAnswer: boolean;   // Whether answered correctly
  partialCredit?: number;   // Optional partial credit (0-100)
}

type ProblemSolvingData = ProblemSolvingDataPoint[];
```

### 3. Conceptual vs. Procedural Understanding

Create a visualization showing the balance between different types of mathematical thinking.

#### Implementation Details

```tsx
<MathUnderstandingBalance
  data={understandingData}
  concepts={mathConcepts}
  showStrengthGaps={true}
  compareToPeers={peerData}
  timeProgression={true}
  enableConceptExplorer={true}
/>
```

#### Visual Features

- **Dual-axis chart** showing conceptual vs. procedural strength
- **Balance visualization** with interactive tilting
- **Concept network map** showing relationships between concepts
- **Strength/weakness highlighting** identifying imbalances
- **Peer comparison overlay** with percentile indicators
- **Time progression animation** showing development over time
- **Concept explorer mode** for detailed concept investigation

#### Data Structure

```typescript
interface MathUnderstandingDataPoint {
  conceptId: string;
  name: string;
  conceptualScore: number;  // 0-100 understanding score
  proceduralScore: number;  // 0-100 calculation/application score
  assessmentCount: number;  // Number of assessments
  relatedConcepts: string[]; // IDs of related concepts
  prerequisiteConcepts?: string[]; // Optional prerequisite concepts
  learningPath?: string[];  // Optional next concepts to learn
}

type MathUnderstandingData = MathUnderstandingDataPoint[];
```

## Technical Implementation

### Data Transformation Layer

To ensure clean separation between data fetching and visualization, we'll implement data transformation utilities:

```typescript
// Example transformation utility
const prepareTimeSeriesData = (rawData, metrics) => {
  return rawData.map(point => ({
    date: new Date(point.timestamp),
    ...metrics.reduce((acc, metric) => ({
      ...acc,
      [metric.id]: point[metric.id] || 0
    }), {})
  }));
};

// Usage example
const chartData = prepareTimeSeriesData(
  apiResponse.data, 
  [
    {id: 'overall', label: 'Overall Score'},
    {id: 'vocabulary', label: 'Vocabulary'}
  ]
);
```

### Chart Component Architecture

Components will follow a layered architecture pattern:

1. **Data Layer**: Fetches and transforms data
2. **Base Chart Layer**: Generic chart components
3. **Domain-Specific Layer**: Subject-specific visualizations
4. **Interactive Layer**: User interaction and controls

Example structure:

```tsx
// Structure for implementing chart components
const ReadingProgressChart = ({ studentId, timeRange }) => {
  // Data layer
  const { data, loading, error } = useReadingProgressData(studentId, timeRange);
  
  // Handle loading and error states
  if (loading) return <ChartSkeleton type="timeline" />;
  if (error) return <ChartErrorState error={error} onRetry={() => refetch()} />;
  
  // Transform data for visualization
  const chartData = prepareTimeSeriesData(data, readingMetrics);
  
  // Render the chart with appropriate configuration
  return (
    <BaseTimeSeriesChart
      data={chartData}
      metrics={readingMetrics}
      annotations={generateMilestones(data)}
      colorScheme={themeColors.reading}
      interactionHandlers={{
        onPointClick: handlePointSelection,
        onMetricToggle: handleMetricVisibility,
        onTimeRangeChange: handleTimeRangeChange
      }}
    />
  );
};
```

### Animation and Transition Strategy

We'll implement smooth animations and transitions to enhance user experience:

```typescript
// Animation configuration for chart elements
const chartAnimationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

// Usage with framer-motion or react-spring
const AnimatedChart = () => (
  <motion.div
    initial={chartAnimationConfig.initial}
    animate={chartAnimationConfig.animate}
    exit={chartAnimationConfig.exit}
  >
    <ChartComponent {...chartProps} />
  </motion.div>
);
```

### Loading and Error States

Each visualization will include standardized loading and error states:

```tsx
// Loading skeleton for charts
const ChartSkeleton = ({ type = 'bar', height = 300 }) => (
  <div className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg" style={{ height }}>
    {type === 'timeline' && (
      <div className="h-full flex flex-col justify-end px-4 pb-4">
        {/* Timeline chart skeleton elements */}
        <div className="flex items-end space-x-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-slate-200 dark:bg-slate-700 rounded-t"
              style={{ 
                height: `${20 + Math.random() * 60}%`,
                width: '20px'
              }} 
            />
          ))}
        </div>
      </div>
    )}
    {/* Add other skeleton types as needed */}
  </div>
);

// Error state component
const ChartErrorState = ({ error, onRetry }) => (
  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
    <div className="text-red-500 dark:text-red-400 mb-2">
      Unable to load chart data
    </div>
    <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
      {error.message || 'An unexpected error occurred'}
    </div>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm"
      >
        Try Again
      </button>
    )}
  </div>
);
```

## Accessibility Considerations

All visualizations will be built with accessibility in mind:

### Keyboard Navigation

```tsx
// Example keyboard navigation for interactive charts
const KeyboardAccessibleChart = () => {
  const [focusedPoint, setFocusedPoint] = useState(null);
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        // Move focus to next data point
        break;
      case 'ArrowLeft':
        // Move focus to previous data point
        break;
      case 'Enter':
        // Activate currently focused point
        break;
    }
  };
  
  return (
    <div 
      role="group" 
      aria-label="Reading progress chart"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <ChartComponent 
        focusedPoint={focusedPoint}
        onPointFocus={setFocusedPoint}
        /* other props */
      />
    </div>
  );
};
```

### Screen Reader Support

```tsx
// Screen reader enhancements
const AccessibleChart = ({ data, title, description }) => (
  <div>
    <div id={`${id}-title`}>{title}</div>
    <div id={`${id}-desc`} className="sr-only">{description}</div>
    
    <div
      role="img"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
    >
      <ChartComponent data={data} />
    </div>
    
    {/* Accessible data table alternative */}
    <div className="sr-only">
      <table>
        <caption>{title}</caption>
        <thead>
          <tr>{/* Column headers */}</tr>
        </thead>
        <tbody>
          {/* Data rows */}
        </tbody>
      </table>
    </div>
  </div>
);
```

### Color Considerations

- All visualizations will maintain WCAG AA contrast ratios
- Color will never be the sole means of conveying information
- Alternative text indicators will supplement color coding
- Each chart will be tested with color blindness simulators

## Implementation Phases

The visualization improvements will be implemented in phases:

### Phase 1: Foundation and Reading Tab (Weeks 1-2)

1. Set up the shared visualization framework
2. Implement the Reading Progress Timeline
3. Create reusable chart components
4. Establish loading and error state patterns

### Phase 2: Writing Tab Visualizations (Weeks 3-4)

1. Implement the Writing Skills Radar Chart
2. Develop the Error Reduction Chart
3. Create the Writing Complexity Progression chart
4. Refine shared components based on feedback

### Phase 3: Math Tab Visualizations (Weeks 5-6)

1. Implement the Math Domain Mastery visualization
2. Develop the Problem-Solving Efficiency matrix
3. Create the Conceptual vs. Procedural Understanding chart
4. Optimize performance for all visualizations

### Phase 4: Integration and Polish (Weeks 7-8)

1. Unify theming and styling across all charts
2. Implement full accessibility features
3. Add advanced interactions and animations
4. Conduct user testing and refinement
