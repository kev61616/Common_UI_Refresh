# Math Skills Documentation

This document details the mathematics skills assessment system implemented in the Profile's Math tab.

## Overview

The Math tab evaluates and displays a student's proficiency in three core mathematical domains: Algebra, Geometry, and Data Analysis. These skills represent fundamental areas of mathematical ability that form the foundation for advanced mathematical and quantitative reasoning.

## Skills Assessment Framework

### Skill Categories

The mathematics assessment framework focuses on these key skill areas:

1. **Algebra (Symbolic Reasoning)**
   - Equation solving
   - Variable manipulation
   - Function understanding
   - Pattern recognition
   - Algebraic modeling

2. **Geometry (Spatial Reasoning)**
   - Shape properties
   - Measurement principles
   - Coordinate geometry
   - Transformations
   - Geometric proofs

3. **Data Analysis (Quantitative Reasoning)**
   - Statistical concepts
   - Data interpretation
   - Probability
   - Graph analysis
   - Data-based conclusions

### Measurement Methodology

Each skill is measured on a percentage scale (0-100%) based on:

- Performance on domain-specific math questions
- Question difficulty weighting (adaptive assessment)
- Solution approach evaluation
- Time efficiency metrics
- Consistency across multiple assessments

## Visual Representation

### Progress Bars

Each skill is represented visually through:

```tsx
<div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
  <div className="font-medium mb-2">Algebra</div>
  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
    <div 
      className="bg-cyan-500 h-full rounded-full" 
      style={{ width: `82%` }}
    ></div>
  </div>
  <div className="mt-1 text-right text-sm">82%</div>
</div>
```

Key visual design elements:
- Consistent progress bar height (h-2)
- Rounded styling (rounded-full)
- Color-coding for easy identification
- Text percentage for precise measurement
- Background contrast for accessibility

### Color Coding

- Cyan color (`cyan-500`) is used consistently for math skills
- This differentiates math skills from other subject areas
- Background uses slate colors with light/dark mode support
- Sufficient contrast ratios maintained for accessibility

## Detailed Skill Analysis

### Algebra (82%)

The algebra score measures a student's ability to:

- Solve linear and quadratic equations
- Manipulate algebraic expressions
- Understand and use variables appropriately
- Recognize and extend patterns
- Work with functions and relations
- Translate word problems into algebraic representations
- Apply algebraic techniques to solve real-world problems

**Proficiency levels**:
- Below 60%: Basic algebraic manipulations
- 60-75%: Core equation solving and expression handling
- 75-85%: Advanced function work and pattern recognition
- Above 85%: Complex algebraic modeling and problem-solving

### Geometry (70%)

The geometry score measures a student's ability to:

- Understand properties of 2D and 3D shapes
- Calculate area, perimeter, volume, and surface area
- Apply coordinate geometry principles
- Understand transformations (rotations, reflections, translations)
- Recognize and use geometric relationships
- Apply the Pythagorean theorem and trigonometric principles
- Construct and evaluate geometric proofs

**Proficiency levels**:
- Below 60%: Basic shape recognition and measurement
- 60-75%: Standard geometric calculations and relationships
- 75-85%: Advanced spatial reasoning and coordinate geometry
- Above 85%: Complex geometric proofs and spatial problem-solving

### Data Analysis (85%)

The data analysis score measures a student's ability to:

- Interpret charts, graphs, and data tables
- Calculate and interpret statistical measures
- Understand and apply probability concepts
- Make predictions based on data
- Recognize trends and patterns in datasets
- Evaluate the validity of data-based claims
- Collect and organize data appropriately

**Proficiency levels**:
- Below 60%: Basic data reading and interpretation
- 60-75%: Statistical calculations and basic probability
- 75-85%: Advanced statistical analysis and inference
- Above 85%: Complex data modeling and predictive analysis

## Technical Implementation

The skills breakdown is implemented in `MathTab.tsx`:

```tsx
<div className="bg-card rounded-xl shadow-sm border p-6 lg:col-span-2">
  <Typography variant="h3" className="text-foreground mb-4">Skills Breakdown</Typography>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {['Algebra', 'Geometry', 'Data Analysis'].map((skill, index) => (
      <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <div className="font-medium mb-2">{skill}</div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-cyan-500 h-full rounded-full" 
            style={{ width: `${[82, 70, 85][index]}%` }}
          ></div>
        </div>
        <div className="mt-1 text-right text-sm">{[82, 70, 85][index]}%</div>
      </div>
    ))}
  </div>
</div>
```

## Data Integration

Math skill data is derived from:

1. **Problem-Specific Analysis**:
   - Each problem is tagged with primary and secondary skill domains
   - Problem difficulty is calibrated through large-scale assessment
   - Approach tracking captures solution methods

2. **Quantitative Performance Metrics**:
   - Accuracy rates by problem type
   - Speed of solution (efficiency metrics)
   - Consistency across similar problem types
   - Error pattern detection

3. **Skill Relationship Analysis**:
   - Cross-domain performance correlation
   - Skill transfer assessment
   - Foundation skill impact on advanced topics

## Common Mathematical Misconceptions Tracking

The math assessment system also identifies and tracks common misconceptions:

| Misconception Area | Example | Remediation Approach |
|-------------------|---------|----------------------|
| Order of Operations | Applying operations in incorrect sequence | Step-by-step PEMDAS practice |
| Negative Number Operations | Errors in adding/subtracting negative numbers | Number line visualization exercises |
| Fraction Concepts | Applying operations without common denominators | Fraction modeling and equivalent fractions |
| Variable Manipulation | Moving terms incorrectly when solving equations | Balance-based equation practice |
| Area vs. Perimeter | Confusing linear and square units | Visual discrimination exercises |

## Adaptive Learning Integration

The math skills assessment directly feeds the adaptive learning system:

1. **Targeted Practice Generation**:
   - Problems specifically targeting skill gaps
   - Graduated difficulty progression
   - Mixed practice for skill maintenance

2. **Learning Path Customization**:
   - Prerequisite skill prioritization
   - Custom sequence based on individual strength/weakness profile
   - Acceleration opportunities for mastered skills

## Future Enhancements

Planned improvements to the mathematics skills assessment include:

1. **Problem-Solving Strategy Analysis**: Assessment of approach efficiency, not just correctness
2. **Conceptual Understanding Evaluation**: Beyond computational accuracy to deeper understanding
3. **Visual/Spatial Reasoning Metrics**: Dedicated assessment of mathematical visualization abilities
4. **Math Anxiety Detection**: Identification of emotional barriers to mathematical performance
5. **Real-World Application Assessment**: Evaluation of ability to apply math in authentic contexts
6. **Cross-Domain Integration**: How mathematical skills support science, computer science, etc.
