'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export const CircuitSimulationView: React.FC<SetViewProps> = ({
  sets,
  selectedSetId,
  onSelectSet,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // When a set is selected, activate its category
    if (selectedSetId) {
      const selectedSet = sets.find((set) => set.id === selectedSetId);
      if (selectedSet) {
        setActiveCategory(selectedSet.subject);
      }
    }
  }, [selectedSetId, sets]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center" data-oid="ieh0avi">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" data-oid="yne4cki"></div>
      </div>);

  }

  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg" data-oid=":p_yz9e">
        <p className="text-slate-500 dark:text-slate-400" data-oid="esl2uii">No practice sets available</p>
      </div>);

  }

  // Group sets by subject
  const circuitSystems = sets.reduce((acc: Record<string, any[]>, set) => {
    const subject = set.subject || 'Other';
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(set);
    return acc;
  }, {});

  // Circuit system theme properties based on subject
  const getCircuitTheme = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          name: 'Logic Processing Unit',
          primaryColor: 'from-blue-500 to-cyan-500',
          secondaryColor: 'from-blue-600 to-indigo-700',
          accentColor: 'bg-cyan-400',
          bgColor: 'bg-gradient-to-br from-indigo-900/80 to-blue-900/80',
          nodeColor: 'border-cyan-400',
          lineColor: 'stroke-cyan-400/70',
          description: 'A computational circuit processing mathematical operations'
        };
      case 'Reading':
        return {
          name: 'Information Decoding Matrix',
          primaryColor: 'from-emerald-500 to-green-600',
          secondaryColor: 'from-emerald-600 to-teal-700',
          accentColor: 'bg-emerald-400',
          bgColor: 'bg-gradient-to-br from-teal-900/80 to-emerald-900/80',
          nodeColor: 'border-emerald-400',
          lineColor: 'stroke-emerald-400/70',
          description: 'A pattern recognition matrix for language processing'
        };
      case 'Writing':
        return {
          name: 'Expression Synthesis Network',
          primaryColor: 'from-amber-500 to-orange-600',
          secondaryColor: 'from-amber-600 to-orange-700',
          accentColor: 'bg-amber-400',
          bgColor: 'bg-gradient-to-br from-amber-900/80 to-orange-900/80',
          nodeColor: 'border-amber-400',
          lineColor: 'stroke-amber-400/70',
          description: 'A creative circuit for expressive composition'
        };
      default:
        return {
          name: 'General Knowledge Circuit',
          primaryColor: 'from-purple-500 to-fuchsia-600',
          secondaryColor: 'from-purple-600 to-fuchsia-700',
          accentColor: 'bg-purple-400',
          bgColor: 'bg-gradient-to-br from-purple-900/80 to-fuchsia-900/80',
          nodeColor: 'border-purple-400',
          lineColor: 'stroke-purple-400/70',
          description: 'A multi-purpose circuit processing various subjects'
        };
    }
  };

  // Circuit component types based on set properties
  const getCircuitComponentType = (set: any) => {
    // Base on accuracy and difficulty
    const accuracy = set.accuracy || 0;
    const difficulty = set.difficulty || 'Medium';

    // Component type based on accuracy and difficulty
    let componentType = 'standard';
    let efficiency = 'medium';

    // Component type based on difficulty
    if (difficulty === 'Expert') componentType = 'advanced';else
    if (difficulty === 'Hard') componentType = 'complex';else
    if (difficulty === 'Medium') componentType = 'standard';else
    componentType = 'basic';

    // Efficiency based on accuracy
    if (accuracy >= 90) efficiency = 'ultra';else
    if (accuracy >= 75) efficiency = 'high';else
    if (accuracy >= 60) efficiency = 'medium';else
    efficiency = 'low';

    return {
      componentType,
      efficiency,
      name:
      componentType === 'advanced' ? 'Quantum Processor' :
      componentType === 'complex' ? 'Advanced Circuit' :
      componentType === 'standard' ? 'Standard Component' :
      'Basic Module',
      efficiencyLabel:
      efficiency === 'ultra' ? 'Ultra-Efficient' :
      efficiency === 'high' ? 'High-Performance' :
      efficiency === 'medium' ? 'Standard Efficiency' :
      'Basic Performance'
    };
  };

  // Generate circuit node paths for a component
  const generateCircuitPaths = (set: any, index: number) => {
    const questionCount = Math.max(3, Math.min(8, set.questions?.length / 3 || 4));
    const component = getCircuitComponentType(set);
    const seed = (set.id.charCodeAt(0) || 1) * index;

    // Generate paths based on component type
    const isComplex = component.componentType === 'advanced' || component.componentType === 'complex';
    const pathCount = isComplex ? Math.floor(questionCount * 1.5) : questionCount;

    // Generate the circuit connections
    const paths = [];

    for (let i = 0; i < pathCount; i++) {
      // Calculate path points
      const startX = 10 + (seed + i * 7) % 30;
      const startY = 5 + (seed + i * 11) % 40;
      const endX = 70 + (seed + i * 13) % 30;
      const endY = 45 + (seed + i * 9) % 40;

      // Add some curvature for more complex paths
      const controlX1 = startX + 20 + (seed + i * 5) % 20;
      const controlY1 = startY + (seed + i * 7) % 30 - 10;
      const controlX2 = endX - 20 - (seed + i * 3) % 20;
      const controlY2 = endY - (seed + i * 11) % 30 + 10;

      // Simple or complex path based on component type
      if (isComplex) {
        paths.push(`M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`);
      } else {
        paths.push(`M${startX},${startY} L${endX},${endY}`);
      }
    }

    return paths;
  };

  // Generate circuit nodes for a component
  const generateCircuitNodes = (set: any, index: number) => {
    const component = getCircuitComponentType(set);
    const seed = (set.id.charCodeAt(0) || 1) * index;

    // Node positions
    const nodes = [];
    const nodeCount = component.componentType === 'advanced' ? 8 :
    component.componentType === 'complex' ? 6 :
    component.componentType === 'standard' ? 4 : 3;

    for (let i = 0; i < nodeCount; i++) {
      // Calculate node positions
      const x = 5 + (seed + i * 17) % 90;
      const y = 5 + (seed + i * 13) % 90;

      nodes.push({ x, y, key: i });
    }

    return nodes;
  };

  // Render a circuit component card
  const renderCircuitComponent = (set: any, isSelected: boolean) => {
    const theme = getCircuitTheme(set.subject);
    const component = getCircuitComponentType(set);
    const paths = generateCircuitPaths(set, parseInt(set.id.replace(/\D/g, '')) || 1);
    const nodes = generateCircuitNodes(set, parseInt(set.id.replace(/\D/g, '')) || 1);

    return (
      <div
        className={`
          relative border rounded-lg overflow-hidden transition-all duration-300
          bg-gray-900 border-gray-800
          ${isSelected ? 'ring-2 ring-offset-0 ring-white/50 transform scale-105 z-10' : 'hover:scale-[1.02]'}
          cursor-pointer
        `}
        onClick={() => onSelectSet(set.id)} data-oid="pezvnx-">

        {/* Circuit board background */}
        <div className="absolute inset-0 bg-[#101820] overflow-hidden" data-oid="i6hia40">
          {/* Circuit traces */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" data-oid=".pws6n4">
            {/* Grid pattern */}
            <pattern id={`circuit-grid-${set.id}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" data-oid="zoqgefm">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" data-oid="9e15_4n" />
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill={`url(#circuit-grid-${set.id})`} data-oid="k3vo9p." />
            
            {/* Circuit paths */}
            {paths.map((path, i) =>
            <g key={i} data-oid="_atzzgy">
                <path
                d={path}
                fill="none"
                className={`${theme.lineColor} ${isSelected ? 'opacity-80' : 'opacity-50'}`}
                strokeWidth="0.8"
                strokeDasharray={component.efficiency === 'ultra' ? '0' :
                component.efficiency === 'high' ? '1 0.5' :
                component.efficiency === 'medium' ? '2 1' :
                '3 2'} data-oid="5:wkn2w" />

                
                {/* Animated pulse for selected items */}
                {isSelected && component.efficiency === 'ultra' &&
              <path
                d={path}
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="1 15"
                className="animate-pulse" data-oid="udf4zq-" />

              }
              </g>
            )}
            
            {/* Circuit nodes */}
            {nodes.map((node) =>
            <circle
              key={node.key}
              cx={node.x}
              cy={node.y}
              r="1.5"
              className={`${theme.nodeColor} fill-black stroke-2`} data-oid="apfvf7i" />

            )}
          </svg>
        </div>
        
        {/* Component overlay */}
        <div className="relative z-10 p-4 text-white" data-oid="ve-9yjj">
          <div className="flex justify-between items-start" data-oid="qrs:kns">
            <h3 className="font-bold text-sm mb-1" data-oid="w9chu0y">{set.type}</h3>
            <div className={`${theme.accentColor} text-black rounded-full px-2 py-0.5 text-xs font-medium`} data-oid="-uzkthf">
              {set.accuracy}%
            </div>
          </div>
          
          <div className="text-xs opacity-80 mb-4" data-oid="a9uisy.">
            {new Date(set.dateCompleted).toLocaleDateString()}
          </div>
          
          {/* Circuit component visualization */}
          <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-3" data-oid="sj-ajca">
            <div className="flex items-center" data-oid="uy7r78y">
              <div className={`bg-gradient-to-br ${theme.primaryColor} w-10 h-10 rounded-lg flex items-center justify-center mr-3`} data-oid=":j5.w:h">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-oid="0ytla5.">
                  <path d="M9 2V4M15 2V4M9 20V22M15 20V22M4 9H2M4 15H2M22 9H20M22 15H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="fuxhmf2" />
                  <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-oid="g58bq:e" />
                </svg>
              </div>
              <div data-oid="ygvmgwl">
                <div className="font-medium text-sm" data-oid="k_02soo">{component.name}</div>
                <div className="text-xs opacity-80" data-oid="yle7-jp">{component.efficiencyLabel}</div>
              </div>
            </div>
          </div>
          
          {/* Component stats */}
          <div className="mt-4 space-y-3" data-oid="3nmq:dv">
            <div data-oid="rx10dy2">
              <div className="flex justify-between text-xs mb-1" data-oid="gw9qnru">
                <span data-oid="5acvs.f">Efficiency Rating</span>
                <span data-oid="0-rdm.b">{set.accuracy}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden" data-oid="n6:4l5c">
                <div
                  className={`h-full ${theme.accentColor}`}
                  style={{ width: `${set.accuracy}%` }} data-oid="0ni292w">
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2" data-oid="q85.xts">
              <div className="bg-white/5 p-2 rounded-lg" data-oid="7f3xy1_">
                <div className="text-xs opacity-70" data-oid="cbomygt">Complexity</div>
                <div className="text-sm" data-oid="gd7smrc">{set.difficulty || 'Medium'}</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg" data-oid=":uz-jpr">
                <div className="text-xs opacity-70" data-oid="l.w7hbf">Nodes</div>
                <div className="text-sm" data-oid="27yzjkm">{set.questions?.length || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>);

  };

  // Category names for the legend
  const generateCategoryCircuit = (category: string, isActive: boolean) => {
    const theme = getCircuitTheme(category);

    return (
      <div
        className={`
          relative rounded-lg overflow-hidden transition-all duration-300
          ${theme.bgColor} border
          ${isActive ?
        'border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' :
        'border-gray-800 hover:border-gray-700'}
          cursor-pointer p-3
        `}
        onClick={() => setActiveCategory(isActive ? null : category)} data-oid="jknageu">

        <div className="flex items-center" data-oid="sju5qne">
          <div className={`bg-gradient-to-br ${theme.primaryColor} w-8 h-8 rounded-full flex items-center justify-center mr-2`} data-oid="bt0_peh">
            {category === 'Math' &&
            <span className="text-white text-xs" data-oid="vmxrof4">∑</span>
            }
            {category === 'Reading' &&
            <span className="text-white text-xs" data-oid="8gys6xn">📖</span>
            }
            {category === 'Writing' &&
            <span className="text-white text-xs" data-oid="xr1u:dh">✍️</span>
            }
            {!['Math', 'Reading', 'Writing'].includes(category) &&
            <span className="text-white text-xs" data-oid="omjcrr.">⚙️</span>
            }
          </div>
          <div data-oid="iw-yz:e">
            <div className="text-white text-sm font-medium" data-oid="52cctsc">{theme.name}</div>
            <div className="text-white/70 text-xs" data-oid="c8vynn5">{
              circuitSystems[category] ? `${circuitSystems[category].length} components` : '0 components'
              }</div>
          </div>
        </div>
      </div>);

  };

  return (
    <div className="border border-gray-900 dark:border-gray-900 rounded-xl shadow-lg overflow-hidden bg-gray-950 p-5" data-oid="uua1n:6">
      <style jsx data-oid="nf_nq4t">{`
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .animate-pulse {
          animation: pulse-opacity 2s infinite;
        }
      `}</style>
      
      <h2 className="text-xl font-bold mb-1 text-white" data-oid="izi:sm1">Circuit Simulation</h2>
      
      <p className="text-white/60 text-sm mb-6" data-oid=":79:nhw">
        Your practice sets visualized as electronic circuit components with efficiency ratings
      </p>
      
      {/* Circuit categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6" data-oid="26_qr5h">
        {Object.keys(circuitSystems).map((category) =>
        generateCategoryCircuit(category, activeCategory === category)
        )}
      </div>
      
      {/* Circuit component grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-oid="qnj4c2k">
        {(activeCategory ?
        circuitSystems[activeCategory] :
        sets).
        map((set) => renderCircuitComponent(set, set.id === selectedSetId))}
      </div>
      
      {/* Legend */}
      <div className="mt-8 pt-4 border-t border-gray-800 text-white/60 text-xs grid grid-cols-2 sm:grid-cols-4 gap-4" data-oid="iimq.wq">
        <div data-oid="rlv2h6r">
          <div className="flex items-center" data-oid="dql7lyb">
            <div className="w-3 h-3 bg-cyan-400 rounded-full mr-1" data-oid="ywtlha:"></div>
            <span data-oid="mlr9-ey">Math Component</span>
          </div>
        </div>
        <div data-oid="_:e1.vx">
          <div className="flex items-center" data-oid="8w5hngz">
            <div className="w-3 h-3 bg-emerald-400 rounded-full mr-1" data-oid="tgzk5lh"></div>
            <span data-oid="zci4buh">Reading Component</span>
          </div>
        </div>
        <div data-oid="wry_wmz">
          <div className="flex items-center" data-oid="sskhjf.">
            <div className="w-3 h-3 bg-amber-400 rounded-full mr-1" data-oid="l-1tgsm"></div>
            <span data-oid="mmv1fu3">Writing Component</span>
          </div>
        </div>
        <div data-oid="2_wmqyz">
          <div className="flex items-center" data-oid="2hd:s:4">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-1" data-oid="ak2lnoi"></div>
            <span data-oid="0rp8g-1">General Component</span>
          </div>
        </div>
      </div>
    </div>);

};