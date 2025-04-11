'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from '../../question-view-variants/types';

/**
 * Neural Network Visualization View
 * 
 * This component visualizes questions as a neural network, where:
 * - Questions are represented as nodes (neurons)
 * - Topics create connections between questions
 * - Different layers represent difficulty levels
 * - Colors represent performance/accuracy
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: QuestionViewProps) {
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [networkData, setNetworkData] = useState<{nodes: any[];links: any[];}>({ nodes: [], links: [] });

  useEffect(() => {
    // Generate network data from practice sets
    if (!practiceSets || practiceSets.length === 0) return;

    const selectedSet = practiceSets.find((set) => set.id === selectedSetId) || practiceSets[0];

    // Build nodes from questions, grouped by topics
    const nodes = selectedSet.questions.map((question, idx) => ({
      id: question.id,
      group: question.topic === 'Algebra' ? 1 : question.topic === 'Statistics' ? 2 : 3,
      name: `Q${idx + 1}`,
      correct: question.correct,
      difficulty: question.difficulty,
      size: question.timeSpent / 10 + 5 // Size based on time spent
    }));

    // Create links between related questions (same topic or subtopic)
    const links: any[] = [];
    const topicGroups: {[key: string]: string[];} = {};

    selectedSet.questions.forEach((q) => {
      if (!topicGroups[q.topic]) topicGroups[q.topic] = [];
      topicGroups[q.topic].push(q.id);
    });

    // For each topic group, create connections
    Object.values(topicGroups).forEach((group) => {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          links.push({
            source: group[i],
            target: group[j],
            value: 1
          });
        }
      }
    });

    setNetworkData({ nodes, links });
  }, [practiceSets, selectedSetId]);

  const handleNodeClick = (nodeId: string) => {
    if (activeNodes.includes(nodeId)) {
      setActiveNodes(activeNodes.filter((id) => id !== nodeId));
    } else {
      setActiveNodes([...activeNodes, nodeId]);
    }
  };

  // Simple force-directed layout calculation
  const nodePositions = networkData.nodes.map((node, idx) => {
    const angle = idx / networkData.nodes.length * Math.PI * 2;
    const radius = 150 + (node.difficulty === 'Easy' ? 0 : node.difficulty === 'Medium' ? 50 : 100);
    return {
      ...node,
      x: Math.cos(angle) * radius + 400,
      y: Math.sin(angle) * radius + 250
    };
  });

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md h-full min-h-[600px] overflow-hidden" data-oid="c-b6g4p">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white" data-oid="awbf8ik">
        Neural Network Question View
      </h2>
      
      <div className="flex mb-4 space-x-2" data-oid="8vl2udy">
        {practiceSets.map((set) =>
        <button
          key={set.id}
          onClick={() => onSelectSet(set.id)}
          className={`px-3 py-1 rounded text-sm ${
          set.id === selectedSetId ?
          'bg-blue-600 text-white' :
          'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`
          } data-oid="buyx0-2">

            {set.subject}: {set.type}
          </button>
        )}
      </div>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 h-[500px] overflow-hidden" data-oid="ivebw-0">
        <svg width="100%" height="100%" viewBox="0 0 800 500" data-oid="61ecc0n">
          {/* Links between nodes */}
          {networkData.links.map((link, idx) => {
            const source = nodePositions.find((n) => n.id === link.source);
            const target = nodePositions.find((n) => n.id === link.target);
            if (!source || !target) return null;

            // Create pulsing effect for active connections
            const isActive = activeNodes.includes(source.id) || activeNodes.includes(target.id);

            return (
              <line
                key={`link-${idx}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isActive ? "#4299e1" : "#a0aec0"}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.8 : 0.3}
                className={isActive ? "animate-pulse" : ""} data-oid="3:ogcbc" />);


          })}
          
          {/* Nodes */}
          {nodePositions.map((node) => {
            const isActive = activeNodes.includes(node.id);
            // Color based on correct/incorrect and activation
            const fillColor = node.correct ?
            isActive ? '#68d391' : '#48bb78' // Green shades for correct
            : isActive ? '#fc8181' : '#f56565'; // Red shades for incorrect

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => handleNodeClick(node.id)}
                className="cursor-pointer transition-all duration-300 ease-in-out" data-oid="0x80d22">

                {/* Node pulse effect for active nodes */}
                {isActive &&
                <circle
                  r={node.size + 10}
                  fill={fillColor}
                  opacity={0.2}
                  className="animate-ping" data-oid="p0d:tw9" />

                }
                
                {/* Main node circle */}
                <circle
                  r={node.size}
                  fill={fillColor}
                  stroke={isActive ? "#2b6cb0" : "transparent"}
                  strokeWidth={2} data-oid="dlmogeb" />

                
                {/* Node label */}
                <text
                  textAnchor="middle"
                  dy=".3em"
                  fontSize={12}
                  fill="white"
                  fontWeight="bold" data-oid="k_crmb-">

                  {node.name}
                </text>
              </g>);

          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-700 p-2 rounded shadow" data-oid=":6-s.7:">
          <div className="text-sm font-semibold mb-1" data-oid="w706i-m">Legend</div>
          <div className="flex items-center mb-1" data-oid="bh4vxh-">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2" data-oid="mk0rnc-"></div>
            <span className="text-xs" data-oid="06b5-7q">Correct</span>
          </div>
          <div className="flex items-center mb-1" data-oid="5-g91xl">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2" data-oid="6npg7-:"></div>
            <span className="text-xs" data-oid="ofb104i">Incorrect</span>
          </div>
          <div className="flex items-center" data-oid="3r.qv6z">
            <div className="w-4 h-4 border border-blue-500 mr-2" data-oid="m790o:1"></div>
            <span className="text-xs" data-oid="et6k8u8">Active</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400" data-oid="akui0gv">
        <p data-oid="zvjgb1.">Click on neurons to activate them and see connections. The network visualizes relationships between questions based on topics.</p>
        <p className="mt-1" data-oid="._k9ca:">
          Nodes are positioned by difficulty (distance from center) and colored by correctness.
          Size represents time spent on the question.
        </p>
      </div>
    </div>);

}