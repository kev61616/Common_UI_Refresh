# Component Migration Checklist

**Component Name:** [Component Name]  
**Migration Priority:** [High/Medium/Low]  
**Developer:** [Developer Name]  
**Start Date:** [YYYY-MM-DD]  
**Target Completion:** [YYYY-MM-DD]  

## Pre-Migration Assessment

- [ ] Review the component's documentation in the original template
- [ ] Identify all props and their types
- [ ] Document component's state management approach
- [ ] Identify dependencies on other components
- [ ] Analyze template-specific styling dependencies
- [ ] Review accessibility implementation
- [ ] Capture the component's current behavior with screenshots/recordings
- [ ] Identify test coverage for the component

## Component Interface

- [ ] Document all public props
  ```typescript
  interface ComponentProps {
    // Copy the interface here
  }
  ```
- [ ] Document all emitted events/callbacks
- [ ] Document any context dependencies
- [ ] Document any hooks used by the component

## State Management

- [ ] Identify all state variables and their purpose
- [ ] Document state update patterns
- [ ] Note any effects and their dependencies
- [ ] Document any URL state interactions (useSearchParams)
- [ ] Identify local storage usage

## Template Dependencies

- [ ] List all CSS classes used from the original template
- [ ] Identify template-specific layout patterns
- [ ] Note any template-specific animation/transitions
- [ ] Document icon/asset usage
- [ ] Identify responsive behavior breakpoints

## Migration Steps

### 1. Scaffold the New Component

- [ ] Create the component file in the new template structure
- [ ] Implement the same props interface
- [ ] Set up basic structure and imports

### 2. Implement Core Functionality

- [ ] Migrate state management logic
- [ ] Implement the primary functionality
- [ ] Ensure accessibility attributes are preserved
- [ ] Maintain the same event handling patterns

### 3. Adapt Styling

- [ ] Map original template styles to new template equivalents
- [ ] Implement responsive behavior
- [ ] Adjust spacing/layout to match design system
- [ ] Test darkmode/theme variants if applicable

### 4. Test Functionality

- [ ] Verify all props work as expected
- [ ] Confirm state management behaves correctly
- [ ] Test all user interactions
- [ ] Verify accessibility with screen readers/keyboard
- [ ] Test responsive behavior across breakpoints

### 5. Integration Testing

- [ ] Test the component within its parent containers
- [ ] Verify props passed from parents work correctly
- [ ] Test interactions with sibling components
- [ ] Verify context consumers/providers work as expected

## Final Verification

- [ ] Component visually matches the design in the new template
- [ ] All functionality from the original implementation works
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Props documentation is up to date
- [ ] Accessibility requirements are met

## Migration Notes

**Challenges Encountered:**
- [Document any significant challenges and their solutions]

**API Changes:**
- [List any changes to the public API, if any]

**Performance Considerations:**
- [Note any performance implications of the migration]

## Sign-off

- [ ] Code Review Completed by: [Reviewer Name]
- [ ] Design Review Completed by: [Designer Name]
- [ ] Accessibility Review Completed by: [A11y Reviewer Name]
- [ ] Migration Approved on: [YYYY-MM-DD]
