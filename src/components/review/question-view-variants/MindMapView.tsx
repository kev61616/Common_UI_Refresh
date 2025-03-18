'use client'

import { useState, useEffect, useRef } from 'react'
import { QuestionViewProps } from './types'

/**
 * MindMapView - Questions organized in an interactive mind map
 * Hierarchical visualization of questions based on subjects, topics, and subtopics
 */
export function MindMapView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [centerNode, setCenterNode] = useState<string | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  
  // Extract subjects, topics, and subtopics
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  
  // Build hierarchical structure
  type MindMapNode = {
    id: string;
    type: 'root' | 'subject' | 'topic' | 'subtopic' | 'question';
    label: string;
    children: MindMapNode[];
    parent?: MindMapNode;
    data?: any;
    x: number;
    y: number;
    radius: number;
    color: string;
    selected?: boolean;
  };
  
  // Build the mind map data structure
  const buildMindMap = () => {
    // Create root node
    const root: MindMapNode = {
      id: 'root',
      type: 'root',
      label: 'Questions',
      children: [],
      x: 0,
      y: 0,
      radius: 40,
      color: '#6366f1' // indigo-500
    };
    
    // Create subject nodes
    subjects.forEach(subject => {
      const subjectNode: MindMapNode = {
        id: `subject-${subject}`,
        type: 'subject',
        label: subject,
        children: [],
        parent: root,
        x: 0,
        y: 0,
        radius: 32,
        color: '#8b5cf6' // violet-500
      };
      
      // Get all sets for this subject
      const subjectSets = practiceSets.filter(set => set.subject === subject);
      
      // Extract topics for this subject
      const topics = Array.from(new Set(subjectSets.flatMap(set => 
        set.questions.map(q => q.topic)
      )));
      
      // Create topic nodes
      topics.forEach(topic => {
        const topicNode: MindMapNode = {
          id: `topic-${topic}`,
          type: 'topic',
          label: topic,
          children: [],
          parent: subjectNode,
          x: 0,
          y: 0,
          radius: 24,
          color: '#a855f7' // purple-500
        };
        
        // Get all questions for this topic
        const topicQuestions = subjectSets.flatMap(set => 
          set.questions.filter(q => q.topic === topic).map(q => ({
            ...q,
            setId: set.id,
            accuracy: set.accuracy
          }))
        );
        
        // Extract subtopics for this topic
        const subtopics = Array.from(new Set(topicQuestions.map(q => q.subtopic)));
        
        // Create subtopic nodes
        subtopics.forEach(subtopic => {
          const subtopicNode: MindMapNode = {
            id: `subtopic-${subtopic}`,
            type: 'subtopic',
            label: subtopic,
            children: [],
            parent: topicNode,
            x: 0,
            y: 0,
            radius: 18,
            color: '#d946ef' // fuchsia-500
          };
          
          // Get all questions for this subtopic
          const subtopicQuestions = topicQuestions.filter(q => q.subtopic === subtopic);
          
          // Group questions by set
          const setMap = new Map<string, { id: string; questions: typeof subtopicQuestions }>();
          
          subtopicQuestions.forEach(q => {
            if (!setMap.has(q.setId)) {
              setMap.set(q.setId, { id: q.setId, questions: [] });
            }
            setMap.get(q.setId)?.questions.push(q);
          });
          
          // Create question set nodes
          setMap.forEach((setData, setId) => {
            const relatedSet = practiceSets.find(s => s.id === setId);
            if (!relatedSet) return;
            
            // Calculate accuracy for this set's questions in this subtopic
            const correctCount = setData.questions.filter(q => q.correct).length;
            const accuracy = setData.questions.length > 0 
              ? (correctCount / setData.questions.length) * 100 
              : 0;
            
            // Get color based on accuracy
            let color = '#ef4444'; // red-500
            if (accuracy >= 80) color = '#10b981'; // emerald-500
            else if (accuracy >= 60) color = '#22c55e'; // green-500
            else if (accuracy >= 40) color = '#eab308'; // yellow-500
            else if (accuracy >= 20) color = '#f97316'; // orange-500
            
            const questionNode: MindMapNode = {
              id: `set-${setId}`,
              type: 'question',
              label: `${relatedSet.type} (${setData.questions.length})`,
              children: [],
              parent: subtopicNode,
              x: 0,
              y: 0,
              radius: 15,
              color,
              data: {
                setId,
                questionCount: setData.questions.length,
                accuracy,
                dateCompleted: relatedSet.dateCompleted
              },
              selected: setId === selectedSetId
            };
            
            subtopicNode.children.push(questionNode);
          });
          
          topicNode.children.push(subtopicNode);
        });
        
        subjectNode.children.push(topicNode);
      });
      
      root.children.push(subjectNode);
    });
    
    return root;
  };
  
  // Calculate node positions for visualization
  const calculatePositions = (
    node: MindMapNode, 
    centerX: number, 
    centerY: number, 
    radius = 200, 
    startAngle = 0, 
    endAngle = 2 * Math.PI,
    level = 0
  ) => {
    // Position the current node at the center
    node.x = centerX;
    node.y = centerY;
    
    // Get expanded status
    const isExpanded = expandedNodes.has(node.id) || centerNode === node.id;
    
    // Skip positioning children if not expanded and not the root
    if (!isExpanded && node.type !== 'root') {
      return;
    }
    
    // Calculate positions for children
    const childCount = node.children.length;
    if (childCount === 0) return;
    
    // Adjust radius based on level
    const childRadius = radius * 0.7;
    
    // Position each child in a circle around the parent
    node.children.forEach((child, index) => {
      // Calculate angle for this child
      const angle = startAngle + (endAngle - startAngle) * (index / childCount);
      
      // Calculate position
      const childX = centerX + Math.cos(angle) * childRadius;
      const childY = centerY + Math.sin(angle) * childRadius;
      
      // Recursively position this child's children
      calculatePositions(
        child,
        childX,
        childY,
        childRadius * 0.7,
        angle - Math.PI / 3,
        angle + Math.PI / 3,
        level + 1
      );
    });
  };
  
  // Build and animate the mind map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Build mind map
    const mindMap = buildMindMap();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate positions
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // If we have a center node, find it and center the view on it
      let centerViewNode = mindMap;
      if (centerNode) {
        const findNode = (node: MindMapNode): MindMapNode | null => {
          if (node.id === centerNode) return node;
          
          for (const child of node.children) {
            const found = findNode(child);
            if (found) return found;
          }
          
          return null;
        };
        
        const found = findNode(mindMap);
        if (found) {
          centerViewNode = found;
        }
      }
      
      // Calculate positions
      calculatePositions(centerViewNode, centerX, centerY);
      
      // Draw connections (draw from leaves to root to ensure lines are under nodes)
      const drawConnections = (node: MindMapNode) => {
        for (const child of node.children) {
          // Only draw if the node is expanded
          if (expandedNodes.has(node.id) || node.type === 'root' || node.id === centerNode) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(child.x, child.y);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)'; // slate-400 with opacity
            ctx.lineWidth = Math.max(1, 4 - (child.type === 'question' ? 3 : 1));
            ctx.stroke();
            
            drawConnections(child);
          }
        }
      };
      
      drawConnections(centerViewNode);
      
      // Draw nodes in reverse order (from leaves to root)
      const drawNodes = (node: MindMapNode) => {
        // Draw this node's children first
        for (const child of node.children) {
          // Only draw if the node is expanded
          if (expandedNodes.has(node.id) || node.type === 'root' || node.id === centerNode) {
            drawNodes(child);
          }
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        
        // Create gradient fill
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, adjustColorLightness(node.color, -20));
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw selection indicator
        if (node.selected) {
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        
        // Draw expand/collapse indicator
        if (node.children.length > 0 && node.type !== 'question') {
          const isExpanded = expandedNodes.has(node.id);
          
          ctx.beginPath();
          ctx.arc(node.x + node.radius * 0.6, node.y - node.radius * 0.6, node.radius * 0.3, 0, 2 * Math.PI);
          ctx.fillStyle = isExpanded ? '#475569' : '#6EE7B7'; // slate-600 : emerald-300
          ctx.fill();
          
          // Draw plus or minus symbol
          ctx.beginPath();
          ctx.moveTo(node.x + node.radius * 0.6 - node.radius * 0.15, node.y - node.radius * 0.6);
          ctx.lineTo(node.x + node.radius * 0.6 + node.radius * 0.15, node.y - node.radius * 0.6);
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          if (!isExpanded) {
            ctx.beginPath();
            ctx.moveTo(node.x + node.radius * 0.6, node.y - node.radius * 0.6 - node.radius * 0.15);
            ctx.lineTo(node.x + node.radius * 0.6, node.y - node.radius * 0.6 + node.radius * 0.15);
            ctx.stroke();
          }
        }
        
        // Draw set type label
        if (node.type === 'question') {
          // Only draw text if node is large enough
          if (node.radius > 10) {
            ctx.font = `${Math.max(10, node.radius * 0.6)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            
            // Truncate text if too long
            let label = node.label;
            if (ctx.measureText(label).width > node.radius * 2) {
              label = label.substring(0, 6) + '...';
            }
            
            ctx.fillText(label, node.x, node.y);
          }
        } else {
          // Draw subject/topic/subtopic label
          ctx.font = `${Math.max(10, node.radius * 0.6)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'white';
          
          // Truncate text if too long
          let label = node.label;
          const maxWidth = node.radius * 1.6;
          
          if (ctx.measureText(label).width > maxWidth) {
            // Try to find a good breaking point
            let words = label.split(' ');
            if (words.length > 1) {
              // Try multi-line
              const firstLine = [];
              const secondLine = [];
              
              let currentWidth = 0;
              for (const word of words) {
                const wordWidth = ctx.measureText(word + ' ').width;
                if (currentWidth + wordWidth <= maxWidth) {
                  firstLine.push(word);
                  currentWidth += wordWidth;
                } else {
                  secondLine.push(word);
                }
              }
              
              // If we managed to split into two reasonable lines
              if (firstLine.length > 0 && secondLine.length > 0) {
                ctx.fillText(firstLine.join(' '), node.x, node.y - node.radius * 0.2);
                ctx.fillText(secondLine.join(' '), node.x, node.y + node.radius * 0.2);
                return;
              }
            }
            
            // If we can't do multi-line nicely, truncate
            label = label.substring(0, 8) + '...';
          }
          
          ctx.fillText(label, node.x, node.y);
        }
      };
      
      drawNodes(centerViewNode);
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Handle mouse interaction
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Function to check if a point is inside a node
      const isPointInNode = (node: MindMapNode, x: number, y: number) => {
        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= node.radius;
      };
      
      // Function to find which node was clicked
      const findClickedNode = (node: MindMapNode): MindMapNode | null => {
        // Check if this node was clicked
        if (isPointInNode(node, mouseX, mouseY)) {
          return node;
        }
        
        // Only check children if the node is expanded or is the root
        if (expandedNodes.has(node.id) || node.type === 'root' || node.id === centerNode) {
          // Check if any of the children were clicked (in reverse order to handle overlaps)
          for (let i = node.children.length - 1; i >= 0; i--) {
            const clickedChild = findClickedNode(node.children[i]);
            if (clickedChild) {
              return clickedChild;
            }
          }
        }
        
        return null;
      };
      
      // Find which node was clicked
      let rootNode = mindMap;
      
      // If we have a center node, use that as the root for click detection
      if (centerNode) {
        const findCenterNode = (node: MindMapNode): MindMapNode | null => {
          if (node.id === centerNode) return node;
          
          for (const child of node.children) {
            const found = findCenterNode(child);
            if (found) return found;
          }
          
          return null;
        };
        
        const found = findCenterNode(mindMap);
        if (found) {
          rootNode = found;
        }
      }
      
      const clickedNode = findClickedNode(rootNode);
      
      if (clickedNode) {
        // Check if the expand/collapse indicator was clicked
        if (clickedNode.children.length > 0 && clickedNode.type !== 'question') {
          const indicatorX = clickedNode.x + clickedNode.radius * 0.6;
          const indicatorY = clickedNode.y - clickedNode.radius * 0.6;
          const indicatorRadius = clickedNode.radius * 0.3;
          
          const dx = indicatorX - mouseX;
          const dy = indicatorY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance <= indicatorRadius) {
            // Toggle expansion state
            setExpandedNodes(prev => {
              const newSet = new Set(prev);
              if (newSet.has(clickedNode.id)) {
                newSet.delete(clickedNode.id);
              } else {
                newSet.add(clickedNode.id);
              }
              return newSet;
            });
            return;
          }
        }
        
        // Double-click to center the view on this node (except for question nodes)
        if (e.detail === 2 && clickedNode.type !== 'question') {
          setCenterNode(clickedNode.id === centerNode ? null : clickedNode.id);
          return;
        }
        
        // For question nodes, select the set
        if (clickedNode.type === 'question' && clickedNode.data?.setId) {
          onSelectSet(clickedNode.data.setId);
        }
      }
    };
    
    canvas.addEventListener('click', handleClick);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
    };
  }, [practiceSets, selectedSetId, expandedNodes, centerNode, onSelectSet]);
  
  // Helper function to adjust color lightness
  const adjustColorLightness = (color: string, amount: number) => {
    // Parse the color
    let r = 0, g = 0, b = 0;
    
    if (color.startsWith('#')) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    }
    
    // Convert to HSL
    const hsl = rgbToHsl(r, g, b);
    
    // Adjust lightness
    hsl[2] = Math.max(0, Math.min(1, hsl[2] + amount / 100));
    
    // Convert back to RGB
    const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    
    // Convert to hex
    return `#${(1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1)}`;
  };
  
  // Helper function to convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return [h, s, l];
  };
  
  // Helper function to convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">24. Mind Map View</h3>
      
      <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 relative min-h-[500px] mb-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ height: '500px' }}
        ></canvas>
        
        {centerNode && (
          <button
            className="absolute top-4 left-4 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
            onClick={() => setCenterNode(null)}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Full View
          </button>
        )}
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-3 rounded-md text-sm">
        <div className="mb-3">
          <h4 className="font-medium mb-2 text-slate-700 dark:text-slate-300">Interaction Guide:</h4>
          <ul className="text-slate-600 dark:text-slate-400 text-xs space-y-1 ml-4 list-disc">
            <li>Click on nodes to select questions or expand/collapse branches</li>
            <li>Double-click on a node to focus on that branch</li>
            <li>Click the small circle on nodes to expand/collapse</li>
            <li>Click "Back to Full View" to return to the complete mind map</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
            <span className="text-slate-600 dark:text-slate-400">Root</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-violet-500"></div>
            <span className="text-slate-600 dark:text-slate-400">Subject</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-slate-600 dark:text-slate-400">Topic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-fuchsia-500"></div>
            <span className="text-slate-600 dark:text-slate-400">Subtopic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-slate-600 dark:text-slate-400">High Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-slate-600 dark:text-slate-400">Low Accuracy</span>
          </div>
        </div>
      </div>
    </div>
  )
}
