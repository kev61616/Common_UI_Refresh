'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const ArtStudioGalleryView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center" data-oid="yh:beo5">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="4h.b:xt"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid="4c04my4">
        <p className="text-slate-500 dark:text-slate-400" data-oid="o2y269e">No artwork available in the studio</p>
      </div>);

  }

  // Determine art style and medium based on set properties
  const getArtStyle = (set: any) => {
    // Determine style based on subject
    const subjectStyles: Record<string, string> = {
      'Math': 'geometric',
      'Reading': 'impressionist',
      'Writing': 'calligraphic',
      'Science': 'surrealist',
      'History': 'renaissance',
      'Other': 'abstract'
    };

    return subjectStyles[set.subject] || 'abstract';
  };

  const getArtMedium = (set: any) => {
    // Determine medium based on question count
    if (set.questions.length > 20) return 'oil painting';
    if (set.questions.length > 15) return 'acrylic painting';
    if (set.questions.length > 10) return 'watercolor';
    if (set.questions.length > 5) return 'sketch';
    return 'drawing';
  };

  // Generate artwork canvas for each set
  const generateArtwork = (set: any, isSelected: boolean) => {
    const style = getArtStyle(set);
    const medium = getArtMedium(set);

    // Generate artwork SVG based on style, completeness, and accuracy
    const generateArtworkSVG = () => {
      const size = 180;
      const completionRatio = set.completedCount / set.questions.length;
      const accuracy = set.accuracy || 50;

      // Get color palette based on style
      const getColorPalette = () => {
        switch (style) {
          case 'geometric':
            return ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#f8fafc', '#475569'];
          case 'impressionist':
            return ['#10b981', '#059669', '#047857', '#f8fafc', '#0d9488', '#065f46', '#134e4a'];
          case 'calligraphic':
            return ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#f8fafc', '#44403c'];
          case 'surrealist':
            return ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#f8fafc', '#4338ca'];
          case 'renaissance':
            return ['#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#f8fafc', '#701a75'];
          default: // abstract
            return ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#f8fafc', '#1c1917'];
        }
      };

      const colors = getColorPalette();

      // Generate shape elements based on style
      const generateShapeElements = () => {
        const elements = [];

        // Number of elements based on question count
        const elemCount = Math.min(30, set.questions.length);

        // Accuracy determines how "finished" the artwork looks
        const completionLevel = accuracy / 100;

        switch (style) {
          case 'geometric':
            // Geometric shapes
            for (let i = 0; i < elemCount; i++) {
              const x = Math.random() * size;
              const y = Math.random() * size;
              const shapeSize = 5 + Math.random() * 20 * completionLevel;

              // Different shapes
              const shapeType = Math.floor(Math.random() * 3);
              const color = colors[Math.floor(Math.random() * colors.length)];

              if (shapeType === 0) {
                // Rectangle
                elements.push(
                  <rect
                    key={`shape-${i}`}
                    x={x}
                    y={y}
                    width={shapeSize}
                    height={shapeSize}
                    fill={color}
                    opacity={0.5 + Math.random() * 0.5}
                    transform={`rotate(${Math.random() * 90}, ${x}, ${y})`} data-oid="1etxbgv" />

                );
              } else if (shapeType === 1) {
                // Circle
                elements.push(
                  <circle
                    key={`shape-${i}`}
                    cx={x}
                    cy={y}
                    r={shapeSize / 2}
                    fill={color}
                    opacity={0.5 + Math.random() * 0.5} data-oid="e.cq975" />

                );
              } else {
                // Triangle
                const x1 = x;
                const y1 = y;
                const x2 = x + shapeSize;
                const y2 = y;
                const x3 = x + shapeSize / 2;
                const y3 = y - shapeSize;

                elements.push(
                  <polygon
                    key={`shape-${i}`}
                    points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                    fill={color}
                    opacity={0.5 + Math.random() * 0.5} data-oid="ihsnw5j" />

                );
              }
            }
            break;

          case 'impressionist':
            // Brushstrokes
            for (let i = 0; i < elemCount * 2; i++) {
              const x = Math.random() * size;
              const y = Math.random() * size;
              const strokeLength = 5 + Math.random() * 15 * completionLevel;
              const strokeWidth = 2 + Math.random() * 4 * completionLevel;
              const controlX = x + (Math.random() * 10 - 5);
              const controlY = y + (Math.random() * 10 - 5);
              const endX = x + Math.cos(Math.random() * Math.PI * 2) * strokeLength;
              const endY = y + Math.sin(Math.random() * Math.PI * 2) * strokeLength;

              const color = colors[Math.floor(Math.random() * colors.length)];

              elements.push(
                <path
                  key={`stroke-${i}`}
                  d={`M${x},${y} Q${controlX},${controlY} ${endX},${endY}`}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.7 + Math.random() * 0.3} data-oid="u3n4a:v" />

              );
            }
            break;

          case 'calligraphic':
            // Flowing lines
            for (let i = 0; i < elemCount; i++) {
              const startX = 10 + Math.random() * (size - 20);
              const startY = 10 + Math.random() * (size - 20);
              const controlX1 = startX + (Math.random() * 40 - 20);
              const controlY1 = startY + (Math.random() * 40 - 20);
              const controlX2 = startX + (Math.random() * 80 - 40);
              const controlY2 = startY + (Math.random() * 80 - 40);
              const endX = startX + (Math.random() * 40 - 20);
              const endY = startY + (Math.random() * 40 - 20);

              const strokeWidth = 1 + Math.random() * 5 * completionLevel;
              const color = colors[Math.floor(Math.random() * colors.length)];

              elements.push(
                <path
                  key={`calligraphic-${i}`}
                  d={`M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.7 + Math.random() * 0.3} data-oid="4_vo5f9" />

              );
            }
            break;

          default: // abstract and other styles
            // Random shapes and lines
            for (let i = 0; i < elemCount; i++) {
              const x = Math.random() * size;
              const y = Math.random() * size;
              const elementSize = 10 + Math.random() * 40 * completionLevel;

              const color = colors[Math.floor(Math.random() * colors.length)];
              const elementType = Math.floor(Math.random() * 4);

              if (elementType === 0) {
                // Splatter
                elements.push(
                  <circle
                    key={`abstract-${i}`}
                    cx={x}
                    cy={y}
                    r={2 + Math.random() * 10}
                    fill={color}
                    opacity={0.3 + Math.random() * 0.7} data-oid="nipmjmk" />

                );
              } else if (elementType === 1) {
                // Irregular shape
                const points = [];
                const numPoints = 5 + Math.floor(Math.random() * 5);

                for (let j = 0; j < numPoints; j++) {
                  const angle = j / numPoints * Math.PI * 2;
                  const radius = elementSize / 2 * (0.5 + Math.random() * 0.5);
                  const px = x + Math.cos(angle) * radius;
                  const py = y + Math.sin(angle) * radius;
                  points.push(`${px},${py}`);
                }

                elements.push(
                  <polygon
                    key={`abstract-${i}`}
                    points={points.join(' ')}
                    fill={color}
                    opacity={0.3 + Math.random() * 0.7} data-oid="snjqhgu" />

                );
              } else {
                // Curved line
                const startX = x;
                const startY = y;
                const controlX = x + (Math.random() * elementSize - elementSize / 2);
                const controlY = y + (Math.random() * elementSize - elementSize / 2);
                const endX = x + (Math.random() * elementSize - elementSize / 2);
                const endY = y + (Math.random() * elementSize - elementSize / 2);

                elements.push(
                  <path
                    key={`abstract-${i}`}
                    d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                    stroke={color}
                    strokeWidth={1 + Math.random() * 3}
                    fill="none"
                    opacity={0.3 + Math.random() * 0.7} data-oid="v01.mmr" />

                );
              }
            }
        }

        return elements;
      };

      // Canvas background based on completion status
      const getCanvasBackground = () => {
        const baseColor = colors[colors.length - 1]; // Last color is canvas color

        // Underpainting or sketch lines for lower completion
        if (completionRatio < 0.3) {
          return (
            <g data-oid="axt36bi">
              <rect x="0" y="0" width={size} height={size} fill={baseColor} data-oid="0piwc0t" />
              <g opacity={0.2} data-oid="5rvxgjz">
                {Array.from({ length: 20 }).map((_, i) =>
                <line
                  key={`sketch-${i}`}
                  x1={Math.random() * size}
                  y1={Math.random() * size}
                  x2={Math.random() * size}
                  y2={Math.random() * size}
                  stroke="#475569"
                  strokeWidth="0.5" data-oid="tfhpwcd" />

                )}
              </g>
            </g>);

        }

        // Regular canvas
        return <rect x="0" y="0" width={size} height={size} fill={baseColor} data-oid="77pe2fm" />;
      };

      // Elements to render on the canvas
      return (
        <g data-oid="2hec019">
          {getCanvasBackground()}
          {generateShapeElements()}
          
          {/* Signature if high accuracy and completion */}
          {accuracy > 85 && completionRatio > 0.8 &&
          <text
            x={size - 30}
            y={size - 10}
            className="text-[8px] fill-slate-600 dark:fill-slate-400 italic" data-oid="o519f0.">

              Student
            </text>
          }
        </g>);

    };

    return (
      <div className="relative flex flex-col h-full" data-oid="yiufjl1">
        {/* Art medium label */}
        <div className="absolute top-2 left-2 bg-white/80 dark:bg-black/50 text-xs px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-medium capitalize" data-oid="zxvng3s">
          {medium}
        </div>
        
        {/* Artwork canvas */}
        <div
          className={`relative overflow-hidden ${
          isSelected ? 'ring-4 ring-blue-500 dark:ring-blue-400' : ''}`
          } data-oid="0vq7ser">

          <div className="relative pb-[100%] w-full" data-oid="b87xm8n">
            <div className="absolute inset-0 bg-white dark:bg-slate-900 p-2" data-oid=":vtw0.3">
              <svg
                viewBox="0 0 180 180"
                className="w-full h-full shadow-md"
                style={{ filter: 'url(#paint-texture)' }} data-oid="qasc1bz">

                <defs data-oid="9pl9hj-">
                  <filter id="paint-texture" data-oid="_zjo1l1">
                    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" data-oid="3fhf:35" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" data-oid="hkx1vyl" />
                  </filter>
                </defs>
                
                {generateArtworkSVG()}
              </svg>
            </div>
          </div>
          
          {/* Easel structure or frame */}
          <div className="absolute inset-0 pointer-events-none" data-oid="89g1jvb">
            <div className="absolute inset-x-0 top-0 h-1 bg-slate-300 dark:bg-slate-600" data-oid="i1q9v75"></div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-300 dark:bg-slate-600" data-oid="6rot_by"></div>
            <div className="absolute inset-y-0 left-0 w-1 bg-slate-300 dark:bg-slate-600" data-oid="d-l8uio"></div>
            <div className="absolute inset-y-0 right-0 w-1 bg-slate-300 dark:bg-slate-600" data-oid="f6:9s_s"></div>
          </div>
        </div>
        
        {/* Artwork title and info */}
        <div className="mt-3 text-center" data-oid="4iwcac2">
          <div className={`font-medium italic text-sm truncate ${isSelected ? 'text-primary' : ''}`} data-oid="dszt-gw">
            "{set.title}"
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 capitalize" data-oid="2343sfb">
            {style} style • {set.questions.length} elements
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="_h3e3u5">
            Completion: {Math.round(set.completedCount / set.questions.length * 100)}%
          </div>
        </div>
      </div>);

  };

  // Group sets by "collection" (subject)
  const groupedSets = sets.reduce((acc, set) => {
    const subject = set.subject || 'Other';
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(set);
    return acc;
  }, {} as Record<string, typeof sets>);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="x.4hzj3">
      <h3 className="text-xl font-bold mb-4 text-center" data-oid="z1r:lx8">Art Studio Gallery</h3>
      
      <div className="bg-slate-100 dark:bg-slate-800/50 p-4 md:p-6 rounded-lg" data-oid="aoqp5l:">
        {/* Studio ambience elements */}
        <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-6" data-oid="k0bkup_">
          <div className="flex items-center justify-between" data-oid="0752_ss">
            <div className="text-sm text-slate-500 dark:text-slate-400" data-oid=":5k7mf4">
              <span className="font-medium" data-oid="0r59zy_">Studio Collections</span> • {sets.length} works in progress
            </div>
            
            <div className="flex items-center space-x-2" data-oid=":x-uz64">
              <div className="w-3 h-3 rounded-full bg-emerald-500" data-oid=".v.q.0x"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500" data-oid="rvb-uei"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500" data-oid="1n285ee"></div>
            </div>
          </div>
        </div>
        
        {/* Collections by subject */}
        <div className="space-y-8" data-oid="1huvmh7">
          {Object.entries(groupedSets).map(([subject, subjectSets]) =>
          <div key={subject} data-oid=":a-dltj">
              <h4 className="text-lg font-medium mb-4 border-b pb-2 border-slate-200 dark:border-slate-700" data-oid="_1l-5wt">
                {subject} Collection
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-oid="u-e6bhh">
                {subjectSets.map((set) =>
              <div
                key={set.id}
                onClick={() => onSelectSet(set.id)}
                className="cursor-pointer transform transition-all duration-300 hover:scale-105" data-oid="_ab4h65">

                    {generateArtwork(set, set.id === selectedSetId)}
                  </div>
              )}
              </div>
            </div>
          )}
        </div>
        
        {/* Studio tools */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-4 grid grid-cols-3 gap-4" data-oid="u:dz3ys">
          <div className="bg-white dark:bg-black/20 rounded-lg p-3 flex flex-col items-center" data-oid="jw65h18">
            <div className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center" data-oid="cdufe.r">Art Style</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 text-center" data-oid="x:tx22r">
              Determined by subject area
            </div>
          </div>
          
          <div className="bg-white dark:bg-black/20 rounded-lg p-3 flex flex-col items-center" data-oid="2t6sai6">
            <div className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center" data-oid="960xc1j">Medium</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 text-center" data-oid="iaxjs8-">
              Based on complexity (question count)
            </div>
          </div>
          
          <div className="bg-white dark:bg-black/20 rounded-lg p-3 flex flex-col items-center" data-oid="e-5az2:">
            <div className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center" data-oid="e2ldzzi">Completion</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 text-center" data-oid="3ydrj3i">
              Shown through artwork details
            </div>
          </div>
        </div>
      </div>
    </div>);

};