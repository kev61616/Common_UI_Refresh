'use client'

import React, { useState, useEffect, useRef } from 'react'
import { QuestionViewProps } from './types'
import { QuestionWithMetadata } from '../question-view/types'
import { extractQuestionsWithMetadata } from '../question-view/utils'

/**
 * Concept Map View (Question View Variant 6)
 * Interactive network visualization of question concepts and their relationships
 */
export function ConceptMapView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const canvasRef = useRef<HTMLDivElement>(null)
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets)
    setAllQuestions(questions)
  }, [practiceSets])
  
  // Filter questions by subject if one is selected
  const filteredQuestions = selectedSubject
    ? allQuestions.filter(q => q.setSubject === selectedSubject)
    : allQuestions
  
  // Generate concept nodes from questions
  const generateConceptNodes = () => {
    // Create a map for topics
    const topicMap = new Map<string, {
      id: string;
      label: string;
      type: 'topic';
      count: number;
      correct: number;
      sets: Set<string>;
      subtopics: Set<string>;
      subjects: Set<string>;
      x: number;
      y: number;
      radius: number;
    }>();
    
    // Create a map for subtopics
    const subtopicMap = new Map<string, {
      id: string;
      label: string;
      type: 'subtopic';
      parentTopic: string;
      count: number;
      correct: number;
      sets: Set<string>;
      x: number;
      y: number;
      radius: number;
    }>();
    
    // Process questions to build the maps
    filteredQuestions.forEach(question => {
      // Update topic node
      if (!topicMap.has(question.topic)) {
        topicMap.set(question.topic, {
          id: `topic-${question.topic}`,
          label: question.topic,
          type: 'topic',
          count: 0,
          correct: 0, 
          sets: new Set(),
          subtopics: new Set(),
          subjects: new Set(),
          x: 0, y: 0, // Placeholder, will be calculated later
          radius: 0 // Placeholder, will be calculated later
        });
      }
      
      const topicNode = topicMap.get(question.topic)!;
      topicNode.count += 1;
      topicNode.correct += question.correct ? 1 : 0;
      topicNode.sets.add(question.setId);
      topicNode.subtopics.add(question.subtopic);
      topicNode.subjects.add(question.setSubject);
      
      // Update subtopic node
      const subtopicId = `${question.topic}|${question.subtopic}`;
      if (!subtopicMap.has(subtopicId)) {
        subtopicMap.set(subtopicId, {
          id: `subtopic-${subtopicId}`,
          label: question.subtopic,
          type: 'subtopic',
          parentTopic: question.topic,
          count: 0,
          correct: 0,
          sets: new Set(),
          x: 0, y: 0, // Placeholder, will be calculated later
          radius: 0 // Placeholder, will be calculated later
        });
      }
      
      const subtopicNode = subtopicMap.get(subtopicId)!;
      subtopicNode.count += 1;
      subtopicNode.correct += question.correct ? 1 : 0;
      subtopicNode.sets.add(question.setId);
    });
    
    // Calculate positions for nodes (in a circular layout)
    const topicNodes = Array.from(topicMap.values());
    const topicCount = topicNodes.length;
    const centerX = 400; // Center X coordinate
    const centerY = 250; // Center Y coordinate
    const radius = 150; // Circle radius for topics
    
    // Position topic nodes in a circle
    topicNodes.forEach((node, index) => {
      // Calculate angle in radians
      const angle = (index / topicCount) * Math.PI * 2;
      
      // Calculate position using polar coordinates
      node.x = centerX + radius * Math.cos(angle);
      node.y = centerY + radius * Math.sin(angle);
      
      // Calculate radius based on the number of questions (min 25, max 50)
      node.radius = Math.max(25, Math.min(50, 15 + (node.count / 5)));
    });
    
    // Position subtopic nodes around their parent topic
    const subtopicNodes = Array.from(subtopicMap.values());
    subtopicNodes.forEach(node => {
      const parentNode = topicNodes.find(t => t.label === node.parentTopic)!;
      if (parentNode) {
        // Find position for subtopic based on parent and other siblings
        const siblingCount = parentNode.subtopics.size;
        const siblings = subtopicNodes.filter(s => s.parentTopic === node.parentTopic);
        const siblingIndex = siblings.indexOf(node);
        
        // Calculate angle offset for this subtopic
        const angleOffset = (siblingIndex / siblingCount) * Math.PI * 2;
        const topicRadius = parentNode.radius;
        const distance = topicRadius * 2.5;
        
        // Calculate position
        node.x = parentNode.x + distance * Math.cos(angleOffset);
        node.y = parentNode.y + distance * Math.sin(angleOffset);
        
        // Calculate radius based on count (min 15, max 30)
        node.radius = Math.max(15, Math.min(30, 10 + (node.count / 5)));
      }
    });
    
    return {
      topics: topicNodes,
      subtopics: subtopicNodes
    };
  };
  
  // Generate links between nodes
  const generateLinks = (topics: any[], subtopics: any[]) => {
    const links: { source: string; target: string; type: string; strength: number }[] = [];
    
    // Create links from topics to subtopics
    subtopics.forEach(subtopic => {
      const parent = topics.find(t => t.label === subtopic.parentTopic);
      if (parent) {
        links.push({
          source: parent.id,
          target: subtopic.id,
          type: 'topic-subtopic',
          strength: subtopic.count
        });
      }
    });
    
    // Create links between topics when they share subtopics
    const topicPairs = new Map<string, number>();
    
    filteredQuestions.forEach(question => {
      // Find all questions with the same subtopic but different topics
      const sameSubtopicQuestions = filteredQuestions.filter(
        q => q.subtopic === question.subtopic && q.topic !== question.topic
      );
      
      // Create or update connections between these topics
      sameSubtopicQuestions.forEach(relatedQuestion => {
        const pairKey = [question.topic, relatedQuestion.topic].sort().join('|');
        if (!topicPairs.has(pairKey)) {
          topicPairs.set(pairKey, 0);
        }
        topicPairs.set(pairKey, topicPairs.get(pairKey)! + 1);
      });
    });
    
    // Add topic-topic links for shared subtopics
    Array.from(topicPairs.entries()).forEach(([pairKey, strength]) => {
      const [topic1, topic2] = pairKey.split('|');
      const source = topics.find(t => t.label === topic1);
      const target = topics.find(t => t.label === topic2);
      
      if (source && target && strength > 0) {
        links.push({
          source: source.id,
          target: target.id,
          type: 'topic-topic',
          strength
        });
      }
    });
    
    return links;
  };
  
  // Get node color based on type and performance
  const getNodeColor = (node: any) => {
    // Calculate accuracy
    const accuracy = node.count > 0 ? (node.correct / node.count) * 100 : 0;
    
    // Base color by node type
    const baseColor = node.type === 'topic' ? 'indigo' : 'teal';
    
    // Adjust shade by accuracy
    if (accuracy >= 90) return `bg-${baseColor}-100 dark:bg-${baseColor}-900/30 border-${baseColor}-400`;
    if (accuracy >= 70) return `bg-${baseColor}-100 dark:bg-${baseColor}-900/20 border-${baseColor}-300`;
    if (accuracy >= 50) return `bg-${baseColor}-50 dark:bg-${baseColor}-900/10 border-${baseColor}-200`;
    return `bg-slate-100 dark:bg-slate-800 border-${baseColor}-200`;
  };
  
  // Get link class based on type and strength
  const getLinkClass = (link: any) => {
    const baseClass = 'stroke-[2]';
    
    if (link.type === 'topic-subtopic') {
      return `${baseClass} stroke-slate-300 dark:stroke-slate-600 opacity-70`;
    } else {
      // Adjust opacity based on strength
      const opacity = Math.min(0.7, Math.max(0.2, 0.2 + 0.1 * link.strength));
      return `${baseClass} stroke-indigo-300 dark:stroke-indigo-700 opacity-${Math.round(opacity * 10)}`;
    }
  };
  
  // Get selected node CSS class
  const getSelectedClass = (node: any) => {
    if (
      (node.type === 'topic' && node.label === selectedTopic) ||
      (node.type === 'subtopic' && node.parentTopic === selectedTopic)
    ) {
      return 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-indigo-400';
    }
    return '';
  };
  
  // Build the data model for visualization
  const conceptData = generateConceptNodes();
  const links = generateLinks(conceptData.topics, conceptData.subtopics);
  
  // Find related questions for selected topic
  const getRelatedQuestions = () => {
    if (!selectedTopic) return [];
    
    return filteredQuestions.filter(q => q.topic === selectedTopic);
  };
  
  const relatedQuestions = getRelatedQuestions();
  
  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">6. Concept Map View</h3>
      
      {/* Controls */}
      <div className="flex justify-between mb-6">
        {/* Subject filter */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedSubject(null)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              selectedSubject === null
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            All Subjects
          </button>
          <button
            onClick={() => setSelectedSubject('Math')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              selectedSubject === 'Math'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Math
          </button>
          <button
            onClick={() => setSelectedSubject('Reading')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              selectedSubject === 'Reading'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Reading
          </button>
          <button
            onClick={() => setSelectedSubject('Writing')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              selectedSubject === 'Writing'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Writing
          </button>
        </div>
        
        {/* Zoom controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <span className="text-lg">-</span>
          </button>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {Math.round(zoomLevel * 100)}%
          </div>
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <span className="text-lg">+</span>
          </button>
        </div>
      </div>
      
      {/* Concept Map Visualization */}
      <div className="relative overflow-hidden border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 h-[500px]">
        {/* SVG Canvas */}
        <div 
          ref={canvasRef}
          className="absolute inset-0 transform-gpu transition-transform duration-300 origin-center"
          style={{ 
            transform: `scale(${zoomLevel})`,
            width: '100%',
            height: '100%'
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
            {/* Links */}
            <g>
              {links.map((link, i) => (
                <line
                  key={`link-${i}`}
                  x1={conceptData.topics.find(n => n.id === link.source)?.x || 
                      conceptData.subtopics.find(n => n.id === link.source)?.x || 0}
                  y1={conceptData.topics.find(n => n.id === link.source)?.y || 
                      conceptData.subtopics.find(n => n.id === link.source)?.y || 0}
                  x2={conceptData.topics.find(n => n.id === link.target)?.x || 
                      conceptData.subtopics.find(n => n.id === link.target)?.x || 0}
                  y2={conceptData.topics.find(n => n.id === link.target)?.y || 
                      conceptData.subtopics.find(n => n.id === link.target)?.y || 0}
                  className={getLinkClass(link)}
                  strokeDasharray={link.type === 'topic-topic' ? "5,5" : ""}
                />
              ))}
            </g>
            
            {/* Topic Nodes */}
            {conceptData.topics.map(node => (
              <g 
                key={node.id} 
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedTopic(selectedTopic === node.label ? null : node.label)}
                className="cursor-pointer"
              >
                <circle 
                  r={node.radius}
                  className={`${getNodeColor(node)} border transition-all ${getSelectedClass(node)}`}
                />
                <text 
                  textAnchor="middle" 
                  dy=".3em" 
                  className="text-xs font-medium fill-slate-700 dark:fill-slate-200 pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            ))}
            
            {/* Subtopic Nodes */}
            {conceptData.subtopics.map(node => (
              <g 
                key={node.id} 
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedTopic(node.parentTopic)}
                className="cursor-pointer"
              >
                <circle 
                  r={node.radius}
                  className={`${getNodeColor(node)} border transition-all ${getSelectedClass(node)}`}
                />
                <text 
                  textAnchor="middle" 
                  dy=".3em" 
                  className="text-xs fill-slate-700 dark:fill-slate-200 pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-md text-xs border border-slate-200 dark:border-slate-700">
          <div className="font-medium mb-1">Legend</div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-indigo-100 border border-indigo-300 mr-1"></div>
            <span>Topic nodes</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-teal-100 border border-teal-300 mr-1"></div>
            <span>Subtopic nodes</span>
          </div>
          <div className="flex items-center">
            <svg width="16" height="8">
              <line x1="0" y1="4" x2="16" y2="4" className="stroke-slate-300 dark:stroke-slate-600 stroke-[2]" />
            </svg>
            <span className="ml-1">Direct relations</span>
          </div>
          <div className="flex items-center">
            <svg width="16" height="8">
              <line x1="0" y1="4" x2="16" y2="4" className="stroke-indigo-300 dark:stroke-indigo-700 stroke-[2] stroke-dasharray-[5,5]" />
            </svg>
            <span className="ml-1">Concept relations</span>
          </div>
        </div>
        
        {/* Instructions */}
        {!selectedTopic && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-md text-center border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="font-medium mb-1">Interactive Concept Map</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Click on any node to see related questions
            </p>
          </div>
        )}
      </div>
      
      {/* Related questions panel (shown when a topic is selected) */}
      {selectedTopic && (
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">{selectedTopic} Questions</h4>
            <button 
              onClick={() => setSelectedTopic(null)}
              className="text-xs px-2 py-1 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600"
            >
              Close
            </button>
          </div>
          
          <div className="space-y-2 max-h-[250px] overflow-y-auto">
            {relatedQuestions.map(question => (
              <div 
                key={question.id}
                onClick={() => onSelectSet && onSelectSet(question.setId)}
                className={`p-3 border rounded-md flex items-center justify-between cursor-pointer ${
                  selectedSetId === question.setId 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div>
                  <div className="font-medium text-sm flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      question.correct 
                        ? 'bg-green-500 dark:bg-green-400' 
                        : 'bg-red-500 dark:bg-red-400'
                    }`}></span>
                    {question.topic} - {question.subtopic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    From {question.setType} • {question.setSubject}
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className={`inline-block px-2 py-1 rounded-full ${
                    question.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : question.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {question.difficulty}
                  </div>
                </div>
              </div>
            ))}
            
            {relatedQuestions.length === 0 && (
              <div className="py-6 text-center text-slate-500 dark:text-slate-400">
                <p>No questions available for this topic.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
