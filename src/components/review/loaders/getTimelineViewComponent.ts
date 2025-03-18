'use client'

import { lazy } from 'react'
import { isViewRegistered } from '../registry/viewRegistry'

/**
 * Dynamically loads a Timeline View component based on variant number
 * 
 * This function supports three different module structures:
 * 1. Modern structure: variant-X/index.ts with default export
 * 2. Legacy structure: Direct component file with named exports
 * 3. Fallback to a placeholder component if the variant isn't found
 * 
 * @param variant The variant number to load
 * @returns A lazy-loaded React component
 */
export function getTimelineViewComponent(variant: number) {
  // Check if this variant is registered first
  if (!isViewRegistered('timeline', variant)) {
    console.warn(`Timeline view variant ${variant} is not registered. Using fallback component.`)
    return getFallbackComponent('timeline', variant)
  }

  try {
    // Use dynamic import to load the component on-demand
    // This creates a code-split point for better performance
    return lazy(() => 
      // Try to import the modern modular structure first
      import(`../timeline-view-variants/variant-${variant}/index`)
        .then(module => ({ 
          // Return the default export or a named export based on convention
          default: module.default || module[`TimelineVariant${variant}View`] || module
        }))
        .catch(error => {
          console.warn(`Failed to load variant-${variant}, trying legacy path...`, error)
          
          // If modern structure fails, try the legacy structure
          return import(`../timeline-view-variants/${getLegacyComponentName(variant)}`)
            .then(module => ({ 
              // Handle legacy components which use different naming conventions
              default: module.default || 
                      module[`${getLegacyComponentName(variant)}`] || 
                      module 
            }))
            .catch(error => {
              console.error(`Failed to load timeline view variant ${variant}:`, error)
              // If both fail, return the fallback
              return { default: getFallbackComponent('timeline', variant) }
            })
        })
    )
  } catch (error) {
    console.error(`Error setting up lazy loading for timeline view variant ${variant}:`, error)
    return getFallbackComponent('timeline', variant)
  }
}

/**
 * Get the legacy component name based on variant number
 * Maps variant numbers to their original file names in the legacy structure
 */
function getLegacyComponentName(variant: number): string {
  // This mapping handles the existing component naming conventions
  const variantMap: Record<number, string> = {
    1: 'TimelineView', // Standard Timeline View
    2: 'TimelineView2',
    3: 'TimelineView3',
    4: 'VerticalScrollingTimeline',
    5: 'BranchingTimeline',
    6: 'CircularTimeline',
    7: 'ThreeDTimeline',
    8: 'StorytellingTimeline',
    9: 'InteractiveTimelineSlider',
    10: 'MetroTimeline',
    11: 'TimelineCalendar',
    12: 'AchievementTimeline',
    13: 'SubjectColorCodedTimeline',
    14: 'MinimalistTimeline',
    15: 'PhotoTimeline',
    16: 'ProgressPath',
    17: 'FlowDiagram',
    18: 'MilestoneTimeline',
    19: 'ComparisonTimeline',
    20: 'StreamGraph',
    // Add more mappings as needed
  }

  return variantMap[variant] || `TimelineVariant${variant}View`
}

/**
 * Returns a fallback component that displays when a view fails to load
 */
function getFallbackComponent(category: string, variant: number) {
  // Using a function that returns a React component
  return function FallbackComponent(props: any) {
    // We need to cast the JSX to any since we're in a .ts file, not .tsx
    return {
      $$typeof: Symbol.for('react.element'),
      type: 'div',
      props: {
        className: "border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm",
        children: [
          {
            $$typeof: Symbol.for('react.element'),
            type: 'h3',
            props: {
              className: "text-xl font-bold mb-6 text-center",
              children: `${variant}. ${category.charAt(0).toUpperCase() + category.slice(1)} View`
            }
          },
          {
            $$typeof: Symbol.for('react.element'),
            type: 'div',
            props: {
              className: "min-h-[500px] flex justify-center items-center bg-slate-50 dark:bg-slate-800/50 rounded-lg",
              children: {
                $$typeof: Symbol.for('react.element'),
                type: 'div',
                props: {
                  className: "text-center p-8 max-w-md",
                  children: [
                    {
                      $$typeof: Symbol.for('react.element'),
                      type: 'div',
                      props: {
                        className: "mb-4 text-amber-600 dark:text-amber-400",
                        children: {
                          $$typeof: Symbol.for('react.element'),
                          type: 'svg',
                          props: {
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "h-12 w-12 mx-auto",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: {
                              $$typeof: Symbol.for('react.element'),
                              type: 'path',
                              props: {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      $$typeof: Symbol.for('react.element'),
                      type: 'h4',
                      props: {
                        className: "text-lg font-medium mb-2",
                        children: "View Not Available"
                      }
                    },
                    {
                      $$typeof: Symbol.for('react.element'),
                      type: 'p',
                      props: {
                        className: "text-slate-600 dark:text-slate-400 mb-4",
                        children: "This view could not be loaded. It may be under development or there was an error loading it."
                      }
                    },
                    {
                      $$typeof: Symbol.for('react.element'),
                      type: 'div',
                      props: {
                        className: "text-sm text-slate-500 dark:text-slate-500 p-2 bg-slate-100 dark:bg-slate-800 rounded-md",
                        children: `Technical details: Failed to load ${category} view variant #${variant}`
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    };
  }
}
