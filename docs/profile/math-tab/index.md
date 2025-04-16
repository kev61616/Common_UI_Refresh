# Math Tab Documentation

This document provides details about the Math tab in the Profile section, which focuses on the student's mathematical performance metrics.

## Purpose

The Math tab provides comprehensive insights into mathematical proficiency, breaking down performance across key mathematical domains and tracking progress over time. It enables students to identify their strengths and areas for improvement within specific math skills.

## Features

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

## Skills Analyzed

The Math tab analyzes the following key skills:

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

## User Interactions

- Interactive elements reveal detailed sub-topic performance
- Toggle options switch between different assessment types
- Problem category filters allow focusing on specific math domains
- Difficulty level selectors show performance across different challenge levels

## Technical Implementation

The Math tab is implemented in `src/components/profile/MathTab.tsx` and follows a consistent layout pattern:

```jsx
// Math tab implementation structure
export function MathTab() {
  return (
    <div className="space-y-6">
      <Typography variant="h2">Math Performance</Typography>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Card with cyan-500 theming */}
        <div className="rounded-xl shadow-sm border p-6">
          <Typography variant="h3">Current Score</Typography>
          <div className="flex items-center justify-center">
            <div className="text-6xl font-bold text-cyan-500">770</div>
            <div className="ml-4">
              <span className="text-success-500">↑ 30 points</span>
            </div>
          </div>
        </div>
        
        {/* Progress Chart */}
        <div className="rounded-xl shadow-sm border p-6">
          <Typography variant="h3">Progress</Typography>
          {/* Chart component */}
        </div>
        
        {/* Skills grid with progress bars */}
        <div className="rounded-xl shadow-sm border p-6 lg:col-span-2">
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

## Related Documentation

For more detailed implementation information, see:

- [Math Skills Documentation](./skills.md) - Details on how math skills are measured and displayed
- [Progress Tracking](./progress-tracking.md) - Information about math progress visualization

## Integration with Learning Resources

- Each skill area links to relevant practice materials
- Performance indicators suggest appropriate difficulty levels for practice
- Problem categories with lower scores trigger targeted learning recommendations
- Weekly practice recommendations are generated based on performance patterns
- Automated suggestions for skill improvement are provided (planned feature)

## Future Enhancements

- **Interactive Practice Problems**: Embedded math problems that target weak areas
- **Conceptual Understanding Assessment**: Enhanced evaluation of understanding beyond computational accuracy
- **Custom Study Plans**: Personalized study plans based on performance metrics
- **Problem-Solving Strategy Analysis**: Insights into how students approach different problem types
- **Visualization Tools**: Interactive visual tools for geometric and algebraic concepts
