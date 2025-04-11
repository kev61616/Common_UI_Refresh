'use client';

import { useState, useEffect, useRef } from 'react';
import { QuestionViewProps } from './types';
import { PracticeSet, Question } from '@/lib/mockData';

/**
 * QuestionNetworkView - Network visualization showing relationships between questions
 * Displays questions as nodes in a network with edges representing relationships
 */
export function QuestionNetworkView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [linkType, setLinkType] = useState<'topic' | 'difficulty' | 'subject'>('topic');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Extract all questions from all practice sets
  const allQuestions: (Question & {setId: string;subject: string;})[] = practiceSets.flatMap((set) =>
  set.questions.map((q) => ({
    ...q,
    setId: set.id,
    subject: set.subject // Add subject to each question for easier access
  }))
  );

  // Limit to a manageable number of nodes for performance
  const questionsForNetwork = allQuestions.slice(0, 50);

  // Create nodes for questions
  type NetworkNode = {
    id: string;
    label: string;
    radius: number;
    color: string;
    question: (Question & {setId: string;subject: string;});
    x: number;
    y: number;
    vx: number;
    vy: number;
    fx: number | null;
    fy: number | null;
  };

  // Create network nodes from questions
  const nodes: NetworkNode[] = questionsForNetwork.map((question, index) => {
    const set = practiceSets.find((s) => s.id === question.setId)!;

    // Colors based on subject
    const subjectColors: Record<string, string> = {
      'Math': '#f97316', // orange
      'Reading': '#3b82f6', // blue
      'Writing': '#10b981' // green
    };

    // Colors based on difficulty
    const difficultyColors: Record<string, string> = {
      'Easy': '#10b981', // green
      'Medium': '#f59e0b', // amber
      'Hard': '#ef4444' // red
    };

    // Determine color based on current link type
    let nodeColor = '#94a3b8'; // default (slate)
    if (linkType === 'subject') {
      nodeColor = subjectColors[set.subject] || '#94a3b8';
    } else if (linkType === 'difficulty') {
      nodeColor = difficultyColors[question.difficulty] || '#94a3b8';
    } else if (linkType === 'topic') {
      // Generate color from topic (hash-based)
      const hash = question.topic.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);

      // Generate a color from the hash
      const hue = Math.abs(hash) % 360;
      nodeColor = `hsl(${hue}, 70%, 60%)`;
    }

    return {
      id: question.id,
      label: question.topic.substring(0, 10) + (question.topic.length > 10 ? '...' : ''),
      radius: question.correct ? 2.5 : 2,
      color: nodeColor,
      question,
      x: 50 + Math.random() * 50 - 25,
      y: 50 + Math.random() * 50 - 25,
      vx: 0,
      vy: 0,
      fx: null,
      fy: null
    };
  });

  // Create links between nodes based on linkType
  type NetworkLink = {
    source: string;
    target: string;
    strength: number;
    color: string;
  };

  // Create network links based on selected type
  const generateLinks = (): NetworkLink[] => {
    const links: NetworkLink[] = [];

    // Helper to check if two questions should be linked
    const shouldLink = (q1: typeof nodes[0]['question'], q2: typeof nodes[0]['question']) => {
      if (linkType === 'topic') {
        return q1.topic === q2.topic && q1.id !== q2.id;
      } else if (linkType === 'difficulty') {
        return q1.difficulty === q2.difficulty && q1.id !== q2.id;
      } else if (linkType === 'subject') {
        return q1.subject === q2.subject && q1.id !== q2.id;
      }
      return false;
    };

    // Create links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (shouldLink(nodes[i].question, nodes[j].question)) {
          links.push({
            source: nodes[i].id,
            target: nodes[j].id,
            strength: 0.5,
            color: nodes[i].color
          });
        }
      }
    }

    return links;
  };

  const links = generateLinks();

  // Simple force-directed graph layout implementation
  useEffect(() => {
    if (!svgRef.current) return;

    const nodeMap = new Map(nodes.map((node) => [node.id, node]));
    const linkForces = links.map((link) => ({
      source: nodeMap.get(link.source)!,
      target: nodeMap.get(link.target)!,
      strength: link.strength
    }));

    // Physics parameters
    const repulsionForce = 0.4;
    const linkDistance = 15;
    const centeringForce = 0.01;

    // Simulation function
    const simulate = () => {
      // Apply forces to nodes
      nodes.forEach((node) => {
        node.fx = null;
        node.fy = null;

        // Centering force
        node.vx = (node.vx || 0) + (50 - node.x) * centeringForce;
        node.vy = (node.vy || 0) + (50 - node.y) * centeringForce;

        // Repulsion between nodes
        nodes.forEach((otherNode) => {
          if (node.id === otherNode.id) return;

          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          if (distance < 20) {
            const force = repulsionForce / (distance * distance);
            node.vx += dx * force;
            node.vy += dy * force;
          }
        });

        // Apply velocity with damping
        node.x += node.vx * 0.5;
        node.y += node.vy * 0.5;
        node.vx *= 0.9;
        node.vy *= 0.9;

        // Constrain to bounds
        node.x = Math.max(5, Math.min(95, node.x));
        node.y = Math.max(5, Math.min(95, node.y));
      });

      // Apply link forces
      linkForces.forEach((link) => {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        // Ideal distance based on link strength
        const idealDistance = linkDistance;

        // Attract or repel based on current vs ideal distance
        const force = (distance - idealDistance) * link.strength * 0.1;

        // Apply force to both nodes (in opposite directions)
        link.source.vx += dx * force;
        link.source.vy += dy * force;
        link.target.vx -= dx * force;
        link.target.vy -= dy * force;
      });

      // Update the DOM
      updateGraph();
    };

    // Update the SVG elements
    const updateGraph = () => {
      // Only update if component is still mounted
      if (!svgRef.current) return;

      // Get the SVG element
      const svg = svgRef.current;

      // Update nodes
      const nodeElements = Array.from(svg.querySelectorAll('.node-circle'));
      const labelElements = Array.from(svg.querySelectorAll('.node-label'));

      nodes.forEach((node, i) => {
        if (nodeElements[i]) {
          nodeElements[i].setAttribute('cx', node.x.toString());
          nodeElements[i].setAttribute('cy', node.y.toString());
        }

        if (labelElements[i]) {
          labelElements[i].setAttribute('x', node.x.toString());
          labelElements[i].setAttribute('y', (node.y + node.radius + 2).toString());
        }
      });

      // Update links
      const linkElements = Array.from(svg.querySelectorAll('.link-line'));

      links.forEach((link, i) => {
        if (linkElements[i]) {
          const source = nodeMap.get(link.source)!;
          const target = nodeMap.get(link.target)!;

          linkElements[i].setAttribute('x1', source.x.toString());
          linkElements[i].setAttribute('y1', source.y.toString());
          linkElements[i].setAttribute('x2', target.x.toString());
          linkElements[i].setAttribute('y2', target.y.toString());
        }
      });
    };

    // Run the simulation for a few iterations to stabilize
    for (let i = 0; i < 100; i++) {
      simulate();
    }

    // Continue simulation (optional - for interactive movement)
    let animationFrameId: number;
    const loop = () => {
      simulate();
      animationFrameId = requestAnimationFrame(loop);
    };

    // Start loop if desired, but it might be better for performance to just run once
    // loop()

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [linkType, selectedSetId]);

  // Handle node click
  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node.id === selectedNode ? null : node.id);
    onSelectSet(node.question.setId);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="2o17pu-">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="8uvhv5c">12. Question Network View</h3>
      
      {/* Controls */}
      <div className="mb-4 flex justify-center" data-oid="k8h3mea">
        <div className="inline-flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg" data-oid="lj_c24h">
          {([
          { id: 'topic', label: 'By Topic' },
          { id: 'difficulty', label: 'By Difficulty' },
          { id: 'subject', label: 'By Subject' }] as
          const).map((option) =>
          <button
            key={option.id}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            linkType === option.id ?
            'bg-white dark:bg-slate-700 shadow-sm' :
            'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`
            }
            onClick={() => setLinkType(option.id)} data-oid="bhuy2vo">

              {option.label}
            </button>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg mb-4 text-sm text-slate-600 dark:text-slate-300" data-oid="b4d1cxv">
        <p data-oid="r:1q4hu">This network visualization shows relationships between questions. Questions are connected based on shared {
          linkType === 'topic' ? 'topics' :
          linkType === 'difficulty' ? 'difficulty levels' :
          'subjects'
          }. Click on nodes to see question details.</p>
      </div>
      
      {/* Network visualization */}
      <div className="aspect-video bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden relative mb-6" data-oid="_0sokg_">
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 100 100" className="font-sans" data-oid="rsta.cs">
          {/* Links */}
          {links.map((link, i) => {
            const source = nodes.find((n) => n.id === link.source)!;
            const target = nodes.find((n) => n.id === link.target)!;

            const isSelected =
            selectedNode && (selectedNode === link.source || selectedNode === link.target);

            return (
              <line
                key={`link-${i}`}
                className="link-line"
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={link.color}
                strokeWidth={isSelected ? 0.5 : 0.2}
                strokeOpacity={isSelected ? 0.8 : 0.3} data-oid="en9xg18" />);


          })}
          
          {/* Nodes */}
          {nodes.map((node, i) => {
            const isSelected = selectedNode === node.id;

            return (
              <g key={`node-${i}`} onClick={() => handleNodeClick(node)} className="cursor-pointer" data-oid="qlmxxg9">
                <circle
                  className="node-circle"
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? node.radius * 1.5 : node.radius}
                  fill={node.color}
                  fillOpacity={isSelected ? 0.9 : 0.6}
                  stroke={node.color}
                  strokeWidth={isSelected ? 0.5 : 0.2} data-oid="6rja4h6" />

                
                {isSelected &&
                <text
                  className="node-label"
                  x={node.x}
                  y={node.y + node.radius + 2}
                  fontSize="2"
                  textAnchor="middle"
                  fill={node.color} data-oid="cta.yqa">

                    {node.label}
                  </text>
                }
                
                {/* Tooltips for nodes */}
                <title data-oid="ixtg6d_">
                  {node.question.topic}
                  {`\nDifficulty: ${node.question.difficulty}`}
                  {`\nSubject: ${node.question.subject}`}
                  {`\nCorrect: ${node.question.correct ? 'Yes' : 'No'}`}
                </title>
              </g>);

          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm mb-4" data-oid="8901p:i">
        <h4 className="text-sm font-semibold mb-2" data-oid="tb5km0f">Legend:</h4>
        <div className="flex flex-wrap gap-4" data-oid="o4j-erh">
          {linkType === 'subject' ?
          // Subject legend
          ['Math', 'Reading', 'Writing'].map((subject, i) => {
            const colors: Record<string, string> = {
              'Math': '#f97316', // orange
              'Reading': '#3b82f6', // blue
              'Writing': '#10b981' // green
            };

            return (
              <div key={i} className="flex items-center" data-oid="-11maf.">
                  <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[subject] }} data-oid="wmss8pu">
                </div>
                  <span className="text-sm" data-oid="py0sm0a">{subject}</span>
                </div>);

          }) :
          linkType === 'difficulty' ?
          // Difficulty legend
          ['Easy', 'Medium', 'Hard'].map((difficulty, i) => {
            const colors: Record<string, string> = {
              'Easy': '#10b981', // green
              'Medium': '#f59e0b', // amber
              'Hard': '#ef4444' // red
            };

            return (
              <div key={i} className="flex items-center" data-oid="6tyiv8i">
                  <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[difficulty] }} data-oid="ykuemy4">
                </div>
                  <span className="text-sm" data-oid="kpg.1g7">{difficulty}</span>
                </div>);

          }) :

          // Topic legend (just a brief explanation)
          <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="22149o2">
              Colors represent different topics. Related topics have similar colors.
            </div>
          }
        </div>
      </div>
      
      {/* Statistics */}
      <div className="text-sm text-slate-600 dark:text-slate-300" data-oid="s2htbo9">
        <p className="mb-2" data-oid="wxt9l..">Network Statistics:</p>
        <ul className="space-y-1 list-disc pl-5" data-oid="ntv-jm7">
          <li data-oid="950cvg:">Questions: {nodes.length}</li>
          <li data-oid="916l4:e">Connections: {links.length}</li>
          <li data-oid="j68vw3i">Topics: {new Set(nodes.map((n) => n.question.topic)).size}</li>
          <li data-oid="rqppxj3">Connected by: {
            linkType === 'topic' ? 'Shared topics' :
            linkType === 'difficulty' ? 'Same difficulty level' :
            'Same subject'
            }</li>
        </ul>
      </div>
    </div>);

}