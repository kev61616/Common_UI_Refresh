/**
 * Types for the Knowledge Graph and Learning Path system
 * Used to represent course concepts, their relationships, and possible learning paths
 */

// Definition of a single knowledge node (concept) in the course
export interface KnowledgeNode {
  id: string;
  moduleId: string; // Reference to the containing module
  lessonId?: string; // Optional reference to a specific lesson
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  importance: 'core' | 'recommended' | 'supplementary';
  estimatedMinutes: number;
  resources: string[]; // IDs of associated resources
  concepts: string[]; // Key concepts contained in this node
  position?: { x: number; y: number }; // Optional position for graph layout
  metadata: Record<string, any>; // Extensible properties
}

// Types of relationships between knowledge nodes
export type RelationshipType = 
  'prerequisite' | // Concept A must be understood before concept B
  'builds-upon' |  // Concept B extends or enhances concept A
  'relates-to' |   // Concepts share commonalities but aren't sequential
  'applies-to' |   // Concept A can be applied to understand or solve concept B
  'contrasts-with'; // Concepts that highlight important differences

// Definition of a relationship between two knowledge nodes
export interface KnowledgeRelationship {
  id: string;
  sourceId: string; // ID of the source node
  targetId: string; // ID of the target node
  type: RelationshipType;
  strength: number; // 1-10 indicating relationship strength
  description?: string; // Optional description of the relationship
  bidirectional?: boolean; // Whether the relationship applies in both directions
}

// Types of learning paths available
export type LearningPathType = 
  'comprehensive' | // Covers all concepts thoroughly
  'accelerated' |   // Focuses on core concepts for quicker completion
  'application' |   // Emphasizes practical applications
  'theory' |        // Prioritizes theoretical understanding
  'custom';         // User-defined path

// Definition of a learning path through the knowledge graph
export interface LearningPath {
  id: string;
  courseId: string;
  name: string;
  description: string;
  nodeSequence: string[]; // Ordered array of node IDs
  type: LearningPathType;
  estimatedTotalTime: number; // In minutes
  targetAudience?: string; // Who this path is best suited for
  createdBy?: string; // User ID of path creator if custom
  createdAt: string; // ISO timestamp
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Complete knowledge graph for a course
export interface CourseKnowledgeGraph {
  courseId: string;
  nodes: KnowledgeNode[];
  relationships: KnowledgeRelationship[];
  predefinedPaths: LearningPath[];
  version: string; // For tracking graph updates
  lastUpdated: string; // ISO timestamp
}

// User's progress through a knowledge graph
export interface KnowledgeGraphProgress {
  userId: string;
  courseId: string;
  completedNodes: string[]; // IDs of completed nodes
  currentPathId?: string; // ID of the path the user is following
  pathProgress?: {
    pathId: string;
    currentNodeIndex: number;
    completedNodes: string[];
    startedAt: string; // ISO timestamp
    lastAccessedAt: string; // ISO timestamp
  };
  recommendedNextNodes?: string[]; // IDs of recommended next nodes
}

// Knowledge node with additional user-specific data
export interface UserKnowledgeNode extends KnowledgeNode {
  completed: boolean;
  inProgress: boolean;
  recommended: boolean;
  masteryLevel?: number; // 0-100 indicating mastery level
  lastAccessedAt?: string; // ISO timestamp
}

// View options for the knowledge graph visualization
export interface KnowledgeGraphViewOptions {
  focusNodeId?: string; // ID of the node to focus on
  highlightedPath?: string[]; // Node IDs in the highlighted path
  showLabels: boolean; // Whether to show node labels
  showRelationshipLabels: boolean; // Whether to show relationship labels
  filterByDifficulty?: ('beginner' | 'intermediate' | 'advanced')[]; // Filter by difficulty
  filterByImportance?: ('core' | 'recommended' | 'supplementary')[]; // Filter by importance
  filterByRelationshipType?: RelationshipType[]; // Filter by relationship type
  layout: 'force-directed' | 'hierarchical' | 'radial' | 'custom'; // Layout algorithm
}
