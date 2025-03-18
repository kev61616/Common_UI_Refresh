'use client'

/**
 * View Registry - Core system for registering and retrieving view components
 * 
 * This registry enables a modular and extensible approach to managing view variants.
 * Each view component can register itself along with metadata, allowing for:
 * - Dynamic loading and code-splitting
 * - Rich metadata for filtering, searching, and categorization
 * - Separation of view implementation from rendering logic
 */

// Define the metadata structure for each view
export type ViewMetadata = {
  id: number;  // Unique identifier for the view
  name: string;  // Display name
  description: string;  // Short description of what the view shows
  category: 'set' | 'timeline' | 'question';  // Which tab this view belongs to
  tags?: string[];  // For filtering/categorization
  thumbnailUrl?: string;  // Optional preview image
  isExperimental?: boolean;  // Mark experimental or WIP views
};

// Type definition for the registry structure
export type ViewRegistry = {
  [category: string]: {
    [id: number]: ViewMetadata
  }
};

// The actual registry object that holds all view metadata
const registry: ViewRegistry = {
  set: {},
  timeline: {},
  question: {}
};

/**
 * Register a view component with the registry
 * Called by each view implementation to add itself to the available views
 */
export function registerView(metadata: ViewMetadata): void {
  // Initialize category object if it doesn't exist
  if (!registry[metadata.category]) {
    registry[metadata.category] = {};
  }
  
  // Add the view to the registry
  registry[metadata.category][metadata.id] = metadata;
  
  // Log in development mode to help track registrations
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Registered ${metadata.category} view #${metadata.id}: ${metadata.name}`);
  }
}

/**
 * Get metadata for a specific view
 */
export function getViewMetadata(category: string, id: number): ViewMetadata | undefined {
  return registry[category]?.[id];
}

/**
 * Get all views for a specific category
 */
export function getAllViewsForCategory(category: string): ViewMetadata[] {
  return Object.values(registry[category] || {});
}

/**
 * Check if a specific view is registered
 */
export function isViewRegistered(category: string, id: number): boolean {
  return !!registry[category]?.[id];
}

/**
 * Get total count of registered views
 */
export function getViewCount(category?: string): number {
  if (category) {
    return Object.keys(registry[category] || {}).length;
  }
  
  return Object.values(registry).reduce(
    (total, categoryRegistry) => total + Object.keys(categoryRegistry).length, 
    0
  );
}
