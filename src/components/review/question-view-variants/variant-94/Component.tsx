'use client';

import React, { useState, useEffect } from 'react';
import { QuestionViewProps } from '../../question-view-variants/types';

/**
 * 3D Cube Grid View
 * 
 * This component visualizes questions as interactive 3D cubes in a grid.
 * - Each cube represents a question
 * - Cubes are organized in a 3D space by topic, difficulty, and correctness
 * - Colors and cube size indicate performance metrics
 * - Cubes can be rotated to reveal different information on each face
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: QuestionViewProps) {
  const [hoveredCube, setHoveredCube] = useState<string | null>(null);
  const [selectedCube, setSelectedCube] = useState<string | null>(null);
  const [rotationAngles, setRotationAngles] = useState<{x: number;y: number;}>({ x: 15, y: 30 });
  const [cubes, setCubes] = useState<any[]>([]);

  useEffect(() => {
    // Process data when practice sets or selected set changes
    if (!practiceSets || practiceSets.length === 0) return;

    const selectedSet = practiceSets.find((set) => set.id === selectedSetId) || practiceSets[0];

    // Generate cubes from the questions in the selected set
    const generatedCubes = selectedSet.questions.map((question, index) => {
      // Determine positions in 3D grid based on properties
      const difficultyMap = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };
      const difficultyZ = difficultyMap[question.difficulty] || 0;

      // Group by topic to position in columns
      const topicGroups: {[key: string]: number;} = {};
      const uniqueTopics = [...new Set(selectedSet.questions.map((q) => q.topic))];
      uniqueTopics.forEach((topic, i) => {
        topicGroups[topic] = i;
      });

      // Group by subtopic for rows
      const subtopicGroups: {[key: string]: number;} = {};
      const uniqueSubtopics = [...new Set(selectedSet.questions.map((q) => q.subtopic))];
      uniqueSubtopics.forEach((subtopic, i) => {
        subtopicGroups[subtopic] = i;
      });

      const x = (topicGroups[question.topic] || 0) * 120;
      const y = (subtopicGroups[question.subtopic] || 0) * 120;
      const z = difficultyZ * 120;

      // Size based on time spent (normalize to reasonable values)
      const baseSize = 40;
      const sizeVariation = question.timeSpent / 60 * 10; // Map to 0-10 range
      const size = Math.max(baseSize, Math.min(baseSize + sizeVariation, baseSize * 1.5));

      // Color by correctness - green for correct, red for incorrect
      const baseColor = question.correct ? '#48bb78' : '#f56565';

      return {
        id: question.id,
        position: { x, y, z },
        topic: question.topic,
        subtopic: question.subtopic,
        difficulty: question.difficulty,
        correct: question.correct,
        timeSpent: question.timeSpent,
        size,
        color: baseColor,
        index
      };
    });

    setCubes(generatedCubes);
  }, [practiceSets, selectedSetId]);

  // Handle 3D camera movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only when mouse is pressed

    const dx = e.movementX;
    const dy = e.movementY;

    setRotationAngles((prev) => ({
      x: prev.x + dy * 0.5,
      y: prev.y + dx * 0.5
    }));
  };

  // Handle cube interactions
  const handleCubeClick = (cubeId: string) => {
    setSelectedCube((prev) => prev === cubeId ? null : cubeId);
  };

  // Calculate 3D cube styles with perspective and rotation
  const getTransformStyle = (cube: any) => {
    const { x, y, z } = cube.position;

    return {
      transform: `
        perspective(1200px) 
        rotateX(${rotationAngles.x}deg) 
        rotateY(${rotationAngles.y}deg)
        translate3d(${x - 300}px, ${y - 150}px, ${z}px)
      `,
      zIndex: Math.round(1000 - z) // Ensure proper stacking
    };
  };

  return (
    <div
      className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md h-full min-h-[600px] overflow-hidden relative"
      onMouseMove={handleMouseMove} data-oid="-ndac6l">

      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white z-10 relative" data-oid="r8x3dvh">
        3D Cube View
      </h2>
      
      <div className="flex mb-4 space-x-2 z-10 relative" data-oid="hp79aaz">
        {practiceSets.map((set) =>
        <button
          key={set.id}
          onClick={() => onSelectSet(set.id)}
          className={`px-3 py-1 rounded text-sm ${
          set.id === selectedSetId ?
          'bg-blue-600 text-white' :
          'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`
          } data-oid="gs0.7u:">

            {set.subject}: {set.type}
          </button>
        )}
      </div>
      
      <div className="relative h-[500px] overflow-hidden bg-white dark:bg-gray-800 rounded-lg" data-oid="jr3vdiz">
        <div className="absolute inset-0 flex items-center justify-center" data-oid="mto2y0v">
          <div className="relative w-full h-full" data-oid="domqpyk">
            {/* 3D Space with cubes */}
            {cubes.map((cube) => {
              const isHovered = hoveredCube === cube.id;
              const isSelected = selectedCube === cube.id;

              return (
                <div
                  key={cube.id}
                  className={`absolute transition-transform duration-300 cursor-pointer`}
                  style={getTransformStyle(cube)}
                  onMouseEnter={() => setHoveredCube(cube.id)}
                  onMouseLeave={() => setHoveredCube(null)}
                  onClick={() => handleCubeClick(cube.id)} data-oid="2gtyp-n">

                  {/* 3D Cube using CSS */}
                  <div
                    className={`
                      relative preserve-3d transform transition-all duration-300 
                      ${isSelected ? 'cube-rotate' : ''}
                    `}
                    style={{
                      width: `${cube.size}px`,
                      height: `${cube.size}px`,
                      transformStyle: 'preserve-3d'
                    }} data-oid="0t2d4se">

                    {/* Front face */}
                    <div
                      className="absolute inset-0 flex items-center justify-center font-bold text-white"
                      style={{
                        backgroundColor: cube.color,
                        transform: 'translateZ(20px)',
                        border: isHovered || isSelected ? '2px solid white' : 'none',
                        boxShadow: isHovered ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
                        opacity: isHovered ? 0.9 : 0.8
                      }} data-oid="p.pcl-z">

                      Q{cube.index + 1}
                    </div>
                    
                    {/* Back face */}
                    <div
                      className="absolute inset-0 flex items-center justify-center p-1 text-xs text-white text-center"
                      style={{
                        backgroundColor: cube.color,
                        transform: 'rotateY(180deg) translateZ(20px)',
                        opacity: 0.8
                      }} data-oid="m56k5.l">

                      {cube.topic}
                    </div>
                    
                    {/* Right face */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white"
                      style={{
                        backgroundColor: cube.color,
                        transform: 'rotateY(90deg) translateZ(20px)',
                        opacity: 0.7
                      }} data-oid="vck985a">

                      {cube.difficulty}
                    </div>
                    
                    {/* Left face */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white"
                      style={{
                        backgroundColor: cube.color,
                        transform: 'rotateY(-90deg) translateZ(20px)',
                        opacity: 0.7
                      }} data-oid="3oxf3i-">

                      {cube.timeSpent}s
                    </div>
                    
                    {/* Top face */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white text-xs p-1 text-center"
                      style={{
                        backgroundColor: cube.color,
                        transform: 'rotateX(90deg) translateZ(20px)',
                        opacity: 0.7
                      }} data-oid="w1:tzeg">

                      {cube.correct ? 'Correct' : 'Incorrect'}
                    </div>
                    
                    {/* Bottom face */}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white"
                      style={{
                        backgroundColor: cube.color,
                        transform: 'rotateX(-90deg) translateZ(20px)',
                        opacity: 0.7
                      }} data-oid="nc3pdi.">

                      {cube.subtopic}
                    </div>
                  </div>
                </div>);

            })}
          </div>
        </div>
        
        {/* Controls and Info */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-700 p-2 rounded shadow z-10" data-oid="4bwl_mx">
          <div className="text-sm font-semibold mb-1" data-oid="xnu8o6x">Legend</div>
          <div className="flex items-center mb-1" data-oid="p63iyry">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2" data-oid="j2_5.dx"></div>
            <span className="text-xs" data-oid="794-pwo">Correct</span>
          </div>
          <div className="flex items-center mb-1" data-oid="e:mgd8s">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2" data-oid="f2-y442"></div>
            <span className="text-xs" data-oid="-4_dr6h">Incorrect</span>
          </div>
          <div className="text-xs mt-2" data-oid="6mizyos">
            <p data-oid="j3652w_">Drag to rotate the view</p>
            <p data-oid="1n5b1fv">Click a cube to rotate it</p>
          </div>
        </div>
        
        {/* Selected question details */}
        {selectedCube &&
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-700 p-3 rounded shadow max-w-xs z-10" data-oid="w7kdbu9">
            <h3 className="text-sm font-semibold" data-oid="g0vb-89">Question Details</h3>
            {(() => {
            const cube = cubes.find((c) => c.id === selectedCube);
            if (!cube) return null;
            return (
              <div className="text-xs mt-1" data-oid="q5usf.e">
                  <p data-oid="f5q.-m9"><span className="font-medium" data-oid="hr73g_8">Topic:</span> {cube.topic}</p>
                  <p data-oid=".xd0abk"><span className="font-medium" data-oid="ozp_3hw">Subtopic:</span> {cube.subtopic}</p>
                  <p data-oid="t:9368v"><span className="font-medium" data-oid="yvy-h_5">Difficulty:</span> {cube.difficulty}</p>
                  <p data-oid="v29:k5l"><span className="font-medium" data-oid="vdkx4w3">Time spent:</span> {cube.timeSpent}s</p>
                  <p data-oid="fymlbi5"><span className="font-medium" data-oid="7km-qoo">Result:</span> {cube.correct ? 'Correct' : 'Incorrect'}</p>
                </div>);

          })()}
            <button
            className="mt-2 text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded"
            onClick={() => setSelectedCube(null)} data-oid="fvk5_k-">

              Close
            </button>
          </div>
        }
      </div>
      
      <style jsx data-oid="th7gway">{`
        @keyframes rotate {
          0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .cube-rotate {
          animation: rotate 5s linear infinite;
        }
      `}</style>
    </div>);

}