# Current User Flow Analysis

## Application Structure

Based on the file structure and component organization, this appears to be a Next.js educational platform with the following main sections:

- **Profile**: Personal dashboard with customizable cards and progress tracking
- **Dashboard**: Overview of general metrics and progress
- **Course**: Educational content organized by subject
- **Question Bank**: Practice questions for assessment
- **Review**: Review of completed work and assessments
- **Mock Test**: Simulated testing environments

The profile section is particularly complex, with:
- Multiple tabs (Overview, Reading, Writing, Math)
- Drag-and-drop customizable card system in the Overview tab
- Domain-specific visualizations in each subject tab
- Various chart types for different metrics (timeline, skills, progress)

## Identified Issues and Bottlenecks

### 1. Performance Concerns
- Multiple chart components may cause loading delays
- Loading all visualizations at once may impact initial page load time
- No clear strategy for loading priority of above-the-fold content

### 2. Technical Complexity
- Drag-and-drop functionality is causing hydration issues
- ClientOnly component suggests server/client rendering differences
- Complex state management across different visualizations

### 3. User Experience Friction
- Navigation may not follow natural learning journey
- Relationship between visualizations across tabs may not be clear
- Advanced features like drag-and-drop customization may be overwhelming for new users

### 4. Data Management
- Possible redundant data fetching across related visualizations
- No clear strategy for data prefetching for likely next views
- Error states and loading states exist but may not be optimally implemented

## Current User Journeys

Based on the application structure, the most common user journeys appear to be:

1. **Learning Journey**:
   Dashboard → Course → Question Bank → Review → Mock Test

2. **Progress Tracking**:
   Profile Overview → Subject-specific tabs (Reading/Writing/Math)

3. **Practice Flow**:
   Dashboard → Question Bank → Review

4. **Assessment Flow**:
   Dashboard → Mock Test → Review

These journeys may not be optimally supported by the current navigation and page structure.
