# Profile Section Documentation

The Profile section is divided into 4 tabs, each providing a different perspective on the student's performance. This document outlines the purpose, features, and functionality of each tab.

## Table of Contents

1. [Overview Tab](#overview-tab)
2. [Reading Tab](#reading-tab)
3. [Writing Tab](#writing-tab)
4. [Math Tab](#math-tab)

## Overview Tab

The Overview tab provides a comprehensive dashboard of the student's performance across all subjects using a customizable card-based layout.

### Features

- **Draggable Cards**: Users can rearrange cards by dragging them to preferred positions
- **Customizable Layout**: The grid layout persists between sessions
- **Reset Layout**: Button to restore the default card arrangement
- **Expandable Cards**: Cards can be clicked to focus/expand for more detail

### Card Types

1. **Rank Card**: Displays the student's current rank (e.g., Platinum) and progress toward the next rank
2. **Achievements Card**: Shows recent achievements with icons, descriptions, and dates
3. **Scores Card**: Displays predicted scores for overall performance and individual subjects
4. **Skills Card**: Visual representation of current skill levels across subjects
5. **Streak Card**: Tracks daily activity and study streaks
6. **Tags Card**: Highlights tag mastery with accuracy percentages and trends

### Interactions

- Cards can be dragged to reorder them
- Clicking a card toggles its expanded state
- The "Reset Layout" button restores cards to their default positions

## Reading Tab

The Reading tab focuses specifically on the student's performance in reading-related skills and assessments, providing a dedicated view of reading competencies.

### Features

- **Current Score Card**: 
  - Displays the student's current reading score (720)
  - Shows point improvements (+20 points) since the previous assessment period
  - Uses color-coded indicators (green for improvement)
  - Prominently displays the score with large typography for emphasis

- **Progress Chart**: 
  - Visual representation of score improvement over time
  - Tracks historical performance to identify patterns and trends
  - Highlights significant milestones and improvements
  - Supports both weekly and monthly view options (planned feature)

- **Skills Breakdown**: 
  - Detailed analysis of specific reading-related skills
  - Color-coded progress bars with percentage completion
  - Responsive grid layout that adapts to different screen sizes

### Skills Analyzed

1. **Vocabulary (75%)**: 
   - Assesses word knowledge and usage
   - Tracks improvements in academic and subject-specific vocabulary
   - Identifies areas where vocabulary enhancement is needed

2. **Comprehension (68%)**: 
   - Measures understanding of texts at different complexity levels
   - Analyzes ability to extract meaning from various passage types
   - Identifies specific comprehension strategies that need improvement

3. **Analysis (82%)**: 
   - Evaluates critical thinking and analytical reading skills
   - Assesses ability to interpret author's intent and textual evidence
   - Tracks improvement in making inferences and drawing conclusions

### User Interactions

- Hovering over chart elements reveals detailed metrics
- Skill cards expand on click to show specific sub-skills and recommendations
- Time period filters allow viewing progress across different timeframes

### Technical Implementation

```jsx
// Reading tab implementation structure
export function ReadingTab() {
  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="rounded-xl shadow-sm border p-6">
        <Typography variant="h3">Current Score</Typography>
        <div className="flex items-center justify-center">
          <div className="text-6xl font-bold text-primary-500">720</div>
          <div className="ml-4">
            <span className="text-success-500">↑ 20 points</span>
          </div>
        </div>
      </div>
      
      {/* Progress Chart */}
      {/* Skills Breakdown with mapped skill components */}
    </div>
  );
}
```

### Accessibility Considerations

- Color is not used as the sole means of conveying information
- Progress bars include text percentage values
- Charts include appropriate ARIA labels for screen readers
- Keyboard navigation is supported for all interactive elements

## Writing Tab

The Writing tab provides a focused view of the student's writing capabilities, allowing for targeted assessment and improvement tracking of writing skills.

### Features

- **Current Score Card**: 
  - Prominently displays the current writing score (350)
  - Shows improvement metrics (+15 points) with timeframe context
  - Uses accent color theming to differentiate from other subject areas
  - Emphasizes progress with directional indicators

- **Progress Chart**: 
  - Timeline visualization showing writing score development
  - Plots assessment points to show progression patterns
  - Identifies key improvement periods and potential plateaus
  - Supports drill-down into specific assessment details (planned feature)

- **Skills Breakdown**: 
  - Granular analysis of writing competencies
  - Three primary skill categories with visual progress indicators
  - Percentage-based proficiency metrics for each skill area
  - Responsive design that adapts to different screen sizes

### Skills Analyzed

1. **Grammar (65%)**: 
   - Evaluates technical writing correctness
   - Tracks improvements in sentence structure and punctuation
   - Identifies specific grammar rules that need reinforcement
   - Focuses on both basic and advanced grammar concepts

2. **Clarity (70%)**: 
   - Measures how effectively ideas are communicated
   - Assesses vocabulary usage and word choice appropriateness
   - Tracks improvement in concision and precision of expression
   - Evaluates the student's ability to communicate complex ideas

3. **Structure (62%)**: 
   - Analyzes paragraph and essay organization
   - Evaluates logical flow and argument construction
   - Tracks improvement in thesis development and supporting evidence
   - Assesses transitions between ideas and overall coherence

### User Interactions

- Click interactions reveal detailed performance metrics for each skill
- Tooltips provide explanations of scoring methodologies
- Filtering options allow for comparing different time periods
- Detailed view button expands to show specific writing samples (future enhancement)

### Technical Implementation

```jsx
// Writing tab implementation structure
export function WritingTab() {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Writing Performance</Typography>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Card with accent-500 theming */}
        {/* Progress Chart placeholder */}
        
        {/* Skills grid with individual skill cards */}
        <div className="bg-card rounded-xl p-6 lg:col-span-2">
          <Typography variant="h3">Skills Breakdown</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mapped skill components with percentage bars */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Data Integration

- Writing scores are calculated from multiple assessment types
- Historical data is normalized to ensure consistent measurement
- Performance indicators are updated after each completed assessment
- Percentile comparisons against peer groups provide context (planned feature)

## Math Tab

The Math tab provides comprehensive insights into mathematical proficiency, breaking down performance across key mathematical domains and tracking progress over time.

### Features

- **Current Score Card**: 
  - Displays the current math score (770) with distinctive cyan color theming
  - Shows significant improvement metrics (+30 points) with timeframe context
  - Uses larger typography to emphasize strong performance
  - Provides contextual comparison to previous assessment periods

- **Progress Chart**: 
  - Visual representation of mathematical skill development over time
  - Identifies trend patterns in mathematical proficiency
  - Highlights acceleration or deceleration in learning curve
  - Supports comparison against target score trajectories (planned feature)

- **Skills Breakdown**: 
  - Detailed analysis across three foundational math domains
  - Color-coded progress indicators with percentage completion
  - Responsive layout that reorganizes based on screen dimensions
  - Balance of information density and visual clarity

### Skills Analyzed

1. **Algebra (82%)**: 
   - Evaluates equation solving and manipulation abilities
   - Tracks proficiency with variables, expressions, and functions
   - Identifies specific algebraic concepts requiring attention
   - Measures progress in both procedural fluency and conceptual understanding
   - Categorizes problem-solving approaches and efficiency

2. **Geometry (70%)**: 
   - Assesses spatial reasoning and geometric principle application
   - Tracks understanding of shapes, theorems, and proofs
   - Identifies areas where visualization or calculation needs improvement
   - Measures both computational accuracy and conceptual understanding
   - Evaluates progress in both 2D and 3D geometry concepts

3. **Data Analysis (85%)**: 
   - Measures statistical thinking and data interpretation skills
   - Assesses ability to analyze charts, graphs, and statistical measures
   - Tracks improvement in making data-based inferences and predictions
   - Evaluates understanding of probability and statistical significance
   - Identifies specific data analysis techniques that need reinforcement

### User Interactions

- Interactive elements reveal detailed sub-topic performance
- Toggle options switch between different assessment types
- Problem category filters allow focusing on specific math domains
- Difficulty level selectors show performance across different challenge levels

### Technical Implementation

```jsx
// Math tab implementation structure
export function MathTab() {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Math Performance</Typography>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Card with cyan-500 theming */}
        <div className="bg-card rounded-xl p-6">
          <Typography variant="h3">Current Score</Typography>
          <div className="flex items-center justify-center">
            <div className="text-6xl font-bold text-cyan-500">770</div>
            <div className="ml-4">
              <span className="text-success-500">↑ 30 points</span>
            </div>
          </div>
        </div>
        
        {/* Progress Chart placeholder */}
        
        {/* Skills grid with progress bars */}
        <div className="bg-card rounded-xl p-6 lg:col-span-2">
          <Typography variant="h3">Skills Breakdown</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mapped skill components with detailed rendering */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Integration with Learning Resources

- Each skill area links to relevant practice materials
- Performance indicators suggest appropriate difficulty levels for practice
- Problem categories with lower scores trigger targeted learning recommendations
- Weekly practice recommendations are generated based on performance patterns
- Automated suggestions for skill improvement are provided (planned feature)

## Technical Implementation

The Profile section is implemented using a tab-based navigation system with the `CrystalTabs` component. Each tab is rendered conditionally based on the active tab state:

```jsx
<ProfileTabs activeTab={activeTab} onTabChange={setActiveTab}>
  {activeTab === 0 && <ProfileCardGrid {...props} />}
  {activeTab === 1 && <ReadingTab />}
  {activeTab === 2 && <WritingTab />}
  {activeTab === 3 && <MathTab />}
</ProfileTabs>
```

The Overview tab uses a drag-and-drop system for card rearrangement, while the subject-specific tabs use a consistent layout pattern for displaying scores, progress, and skill breakdowns.
