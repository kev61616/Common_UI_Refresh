# Syntax Project Guide

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Code Style
- **TypeScript**: Use strict typing, avoid `any` where possible
- **Formatting**: Single quotes, no semicolons, 2-space indentation
- **Imports**: Group imports (React, components, utils, types)
- **Components**: Prefer functional components with named exports
- **Naming**: PascalCase for components/types, camelCase for variables/functions
- **Variants**: Follow modular pattern for view variants with consistent folder structure

## Project Structure
- `/src/components/review/` - Main review components
- `/src/components/review/*-view-variants/` - View variant components
- Use dynamic imports for view variants via registry pattern
- Always register new variants in appropriate registry files

## Implementation Workflow for New View Variants

1. **Planning Phase**
   - Review `/docs/view-planning.md` for guidance to prioritize data insight value
   - Select an unimplemented view focusing on a unique way to visualize the data
   - Document how this visualization will provide specific user value and insights
   - Each view should enable users to discover patterns or relationships not easily seen in other views

2. **Implementation Phase**
   - Implement the view with a focus on data-driven insights, not just visual appeal
   - Prioritize information hierarchy and cognitive accessibility
   - Consider how the visualization helps users answer specific questions about their data
   - Map visual elements directly to meaningful data attributes and relationships

3. **Registration and Documentation**
   - Only register when view is fully implemented and polished
   - Update the appropriate changes document with features and implementation details
   - Document any technical considerations for future maintenance

## Implementation Scripts
- `node scripts/generate-variant.js [category] [id] [name] [component] [description] [tags]`
  - Creates new variant registration files (categories: set, timeline, question)
  - Example: `node scripts/generate-variant.js question 20 "Word Cloud View" TagCloudView`
  - **Important**: Only register views that are fully implemented and polished
- `node scripts/register-existing-components.js`
  - Automatically registers existing component files not yet in the modular system
  - Use with caution as it registers all found components regardless of implementation state

## Documentation Files
- `/docs/view-planning.md` - Master planning document with guidelines and insight objectives
- `/docs/timelinechanges.md` - Timeline view implementations and status
- `/docs/setviewchanges.md` - Set view implementations and status
- `/docs/questionviewchanges.md` - Question view implementations and status
- Each view implementation should include:
  - Primary insight objective (what specific question does this view help answer?)
  - Data-to-visual mapping rationale (why these visual encodings for these attributes?)
  - User testing outcomes and accessibility considerations
  - Example user stories or scenarios where this view provides unique value
  - Technical implementation details and performance considerations

## Error Handling
- Use error boundaries for component-level errors
- Provide meaningful fallback UI for failed component loads