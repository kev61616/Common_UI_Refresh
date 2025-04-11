# Board View Click Behavior Updates

## Overview

This update addresses the distinction between two types of click interactions in the Review Question Board view:

1. **Clicking on a card stack/category**: Opens a popup showing ALL cards in that category
2. **Clicking on a specific card**: Focuses just that individual card

Previously, there was confusion about these interactions, with some clicks not working as expected.

## Implementation Details

### Column-Level Popup Behavior

- The entire column area is now clickable to open the category popup
- We added a transparent background layer to ensure clicks anywhere in the empty space trigger the popup
- Clear cursor indication when hovering over the clickable areas

```jsx
// Column content now opens popup when clicked
<div 
  className="p-3 max-h-[150px] relative overflow-hidden cursor-pointer" 
  onClick={(e) => {
    // When the container area is clicked (but not a card), open the popup
    if (!isAnyCardFocused && !isAnyPopupActive) {
      onOpenPopup(level.id, e);
    }
  }}>
  
  {/* Invisible background layer to capture clicks */}
  <div 
    className="absolute inset-0 bg-transparent z-0" 
    onClick={(e) => {
      // Same behavior as the container
      e.stopPropagation();
      if (!isAnyCardFocused && !isAnyPopupActive) {
        onOpenPopup(level.id, e);
      }
    }}
  />
```

### Individual Card Behavior

- Cards now use the semantic `<button>` element for better accessibility and click handling
- Enhanced visual feedback shows which action will occur
- "View Card" text appears on hover to indicate the action
- Cards receive strong visual highlighting when hovered

```jsx
// Handle clicking on an individual card
const handleCardClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
  console.log('Individual card clicked:', question.id);
  onClick(question.id);
};

// Visual indication of click behavior with "View Card" text
{isHovered && (
  <div className="mt-2 text-xs font-medium text-sky-600 dark:text-sky-400 flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
    View Card
  </div>
)}
```

## Additional Improvements

1. **Semantic HTML**: Using `<button>` elements with appropriate aria-labels
2. **Visual Distinction**: Added more prominent visual cues to indicate clickable areas
3. **Event Propagation**: Properly handled event propagation to prevent conflicts
4. **User Experience**: Added helpful "View Card" text with icon to clarify the interaction
5. **Text Selection Prevention**: Added `select-none` to prevent text selection when rapidly clicking

## User Experience

With these changes, users can:

1. Click anywhere on a card stack or column to see all cards in that category
2. Click on a specific card to focus just that card
3. Clearly understand which action will happen through visual cues and text labels

This provides a more intuitive interface that matches user expectations.
