'use client'

import { lazy } from 'react'
import { isViewRegistered } from '../registry/viewRegistry'

/**
 * Dynamically loads a Question View component based on variant number
 * 
 * This function supports three different module structures:
 * 1. Modern structure: variant-X/index.ts with default export
 * 2. Legacy structure: Direct component file with named exports
 * 3. Fallback to a placeholder component if the variant isn't found
 * 
 * @param variant The variant number to load
 * @returns A lazy-loaded React component
 */
export function getQuestionViewComponent(variant: number) {
  // Check if this variant is registered first
  if (!isViewRegistered('question', variant)) {
    console.warn(`Question view variant ${variant} is not registered. Using fallback component.`)
    return getFallbackComponent('question', variant)
  }

  try {
    // Use dynamic import to load the component on-demand
    // This creates a code-split point for better performance
    return lazy(() => 
      // Try to import the modern modular structure first
      import(`../question-view-variants/variant-${variant}/index`)
        .then(module => ({ 
          // Return the default export or a named export based on convention
          default: module.default || module[`QuestionVariant${variant}View`] || module
        }))
        .catch(error => {
          console.warn(`Failed to load variant-${variant}, trying legacy path...`, error)
          
          // If modern structure fails, try the legacy structure
          return import(`../question-view-variants/${getLegacyComponentName(variant)}`)
            .then(module => ({ 
              // Handle legacy components which use different naming conventions
              default: module.default || 
                      module[`${getLegacyComponentName(variant)}`] || 
                      module 
            }))
            .catch(error => {
              console.error(`Failed to load question view variant ${variant}:`, error)
              // If both fail, return the fallback
              return { default: getFallbackComponent('question', variant) }
            })
        })
    )
  } catch (error) {
    console.error(`Error setting up lazy loading for question view variant ${variant}:`, error)
    return getFallbackComponent('question', variant)
  }
}

/**
 * Get the legacy component name based on variant number
 * Maps variant numbers to their original file names in the legacy structure
 */
function getLegacyComponentName(variant: number): string {
  // This mapping handles the existing component naming conventions
  const variantMap: Record<number, string> = {
    1: 'index', // Standard Question View is directly in question-view directory
    2: 'CardDeckView',
    3: 'KnowledgeTreeView',
    4: 'DiagnosticDashboardView',
    5: 'HeatmapView',
    6: 'ConceptMapView',
    7: 'TagCloudView',
    8: 'MatrixGridView',
    9: 'VennDiagramView',
    10: 'ScatterPlotView',
    11: 'QuestionJourneyView',
    12: 'QuestionNetworkView',
    13: 'SpiderChartView',
    14: 'HistogramView',
    15: 'AccordionCategoryView',
    16: 'QuestionStackView',
    17: 'BubblePackView',
    18: 'QuestionTimelineView',
    19: 'MasteryPathView',
    20: 'QuestionGalaxyView',
    21: 'PeriodicTableView',
    22: 'CircuitBoardView',
    23: 'SolarSystemView',
    24: 'MindMapView',
    25: 'WatercolorGalleryView',
    26: 'UrbanBlueprintView',
    27: 'SteampunkMachineryView',
    28: 'BookshelfView',
    29: 'VintageBotanicalView',
    30: 'InfographicDashboardView',
    31: 'FilmStripView',
    32: 'AncientScrollView',
    33: 'StainedGlassView',
    34: 'WeatherMapView',
    35: 'GradientFlowView',
    // Add more mappings as needed
  }

  return variantMap[variant] || `QuestionVariant${variant}View`
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
