'use client';

import React, { useState, useEffect } from 'react';
import { SetViewProps } from './types';

export function CelestialObservatoryView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [viewMode, setViewMode] = useState<'telescope' | 'chart' | 'spectral'>('telescope');
  const [rotation, setRotation] = useState(0);

  // Animate star field rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.05) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!practiceSets || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="oeayf8z">
        <h3 className="text-xl font-bold mb-6 text-center" data-oid="55uoa:e">56. Celestial Observatory View</h3>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl" data-oid="cj04igh">
          <p className="mb-4" data-oid="s9bb7o8">No celestial bodies detected in the observatory.</p>
          <p data-oid="ql-ni_y">Complete some sets to begin your astronomical observations.</p>
        </div>
      </div>);

  }

  // Generate unique star field for background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 2.5;
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: size,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() > 0.7
      });
    }
    return stars;
  };

  const stars = generateStars();

  // Assign celestial body types to each practice set
  const mapSetsToCelestialBodies = () => {
    return practiceSets.map((set, index) => {
      // Determine celestial body type based on subject and performance
      let bodyType: 'star' | 'planet' | 'moon' | 'comet' | 'nebula' | 'galaxy';

      if (set.accuracy >= 90) {
        bodyType = 'star'; // Brightest objects
      } else if (set.accuracy >= 80) {
        bodyType = 'planet'; // Large visible objects
      } else if (set.accuracy >= 70) {
        bodyType = 'moon'; // Smaller bodies
      } else if (set.accuracy >= 60) {
        bodyType = 'nebula'; // Diffuse objects
      } else if (set.accuracy >= 50) {
        bodyType = 'comet'; // Moving objects
      } else {
        bodyType = 'galaxy'; // Distant objects
      }

      // Map subject to astronomical classification
      const classification = set.subject === 'Math' ?
      'Main Sequence' :
      set.subject === 'Reading' ?
      'Variable' :
      'Binary System';

      // Determine magnitude (brightness) based on accuracy
      const magnitude = (100 - set.accuracy) / 10;

      // Map difficulty to distance
      const distance = set.type.includes('Hard') ?
      'Distant' :
      set.type.includes('Medium') ?
      'Mid-field' :
      'Nearby';

      // Calculate observation date
      const observationDate = new Date(set.dateCompleted).toLocaleDateString();

      // Generate a spectral class based on subject and accuracy
      let spectralClass: string;
      if (set.subject === 'Math') {
        spectralClass = set.accuracy > 80 ? 'O' : set.accuracy > 70 ? 'B' : set.accuracy > 60 ? 'A' : 'F';
      } else if (set.subject === 'Reading') {
        spectralClass = set.accuracy > 80 ? 'G' : set.accuracy > 70 ? 'K' : 'M';
      } else {
        spectralClass = set.accuracy > 80 ? 'S' : set.accuracy > 70 ? 'C' : 'R';
      }

      return {
        set,
        bodyType,
        classification,
        magnitude,
        distance,
        observationDate,
        spectralClass,
        coordinates: {
          rightAscension: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
          declination: `${Math.floor(Math.random() * 90)}° ${Math.floor(Math.random() * 60)}'`
        }
      };
    });
  };

  const celestialBodies = mapSetsToCelestialBodies();

  // Get color based on celestial body type and subject
  const getCelestialBodyColor = (bodyType: string, subject: string) => {
    if (bodyType === 'star') {
      return subject === 'Math' ?
      'bg-blue-500' // Blue stars
      : subject === 'Reading' ?
      'bg-yellow-300' // Yellow stars
      : 'bg-red-500'; // Red stars
    } else if (bodyType === 'planet') {
      return subject === 'Math' ?
      'bg-emerald-400' // Earth-like
      : subject === 'Reading' ?
      'bg-amber-500' // Gas giant
      : 'bg-rose-300'; // Martian
    } else if (bodyType === 'nebula') {
      return subject === 'Math' ?
      'bg-indigo-400/50' :
      subject === 'Reading' ?
      'bg-pink-400/50' :
      'bg-purple-400/50';
    } else if (bodyType === 'moon') {
      return 'bg-gray-300';
    } else if (bodyType === 'comet') {
      return 'bg-cyan-300';
    } else {
      return 'bg-violet-600';
    }
  };

  // Get size based on celestial body type and set properties
  const getCelestialBodySize = (bodyType: string, accuracy: number) => {
    const baseSize = 3 + accuracy / 10;

    if (bodyType === 'star') {
      return baseSize * 2;
    } else if (bodyType === 'planet') {
      return baseSize * 1.7;
    } else if (bodyType === 'moon') {
      return baseSize * 1.2;
    } else if (bodyType === 'nebula') {
      return baseSize * 2.5;
    } else if (bodyType === 'comet') {
      return baseSize * 0.8;
    } else {
      return baseSize * 1.5;
    }
  };

  // Get glow effect based on body type and accuracy
  const getGlowEffect = (bodyType: string, accuracy: number) => {
    if (bodyType === 'star') {
      // Stars have strong glow based on accuracy
      return `shadow-lg shadow-yellow-500/50 ring-2 ring-yellow-300/30 ring-offset-0`;
    } else if (bodyType === 'nebula') {
      // Nebulae have diffuse glow
      return `shadow-xl shadow-purple-500/30`;
    } else if (bodyType === 'comet') {
      // Comets have tail-like glow
      return `relative after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:h-[2px] after:w-12 after:bg-gradient-to-r after:from-cyan-300 after:to-transparent`;
    }
    return '';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="hj-r36p">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="s1lntl0">56. Celestial Observatory View</h3>
      
      {/* Observatory Control Panel */}
      <div className="flex justify-center mb-6 space-x-4" data-oid="zecps2k">
        <button
          onClick={() => setViewMode('telescope')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${viewMode === 'telescope' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="sbwq5t3">

          Telescope View
        </button>
        <button
          onClick={() => setViewMode('chart')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${viewMode === 'chart' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="g0ns1:r">

          Celestial Chart
        </button>
        <button
          onClick={() => setViewMode('spectral')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${viewMode === 'spectral' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="k5rl::g">

          Spectral Analysis
        </button>
      </div>
      
      {/* Telescope View */}
      {viewMode === 'telescope' &&
      <div className="relative bg-slate-950 rounded-xl overflow-hidden min-h-[600px]" data-oid="uor8w:7">
          {/* Star field background */}
          <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 5s linear'
          }} data-oid="_jzz7xc">

            {stars.map((star) =>
          <div
            key={`star-${star.id}`}
            className={`absolute rounded-full bg-white ${star.twinkle ? 'animate-twinkle' : ''}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }} data-oid="95-swg2" />

          )}
          </div>
          
          {/* Telescope overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950" data-oid="z8mt621"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" data-oid="n4txksb"></div>
          
          {/* Telescope frame */}
          <div className="absolute inset-0 border-[80px] border-black rounded-[50%] pointer-events-none" data-oid="44y58fo"></div>
          <div className="absolute inset-16 border border-slate-700/30 rounded-full" data-oid="ch9:mx3"></div>
          <div className="absolute inset-20 border border-slate-700/20 rounded-full" data-oid="l3eee7i"></div>
          
          {/* Telescope gridlines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" data-oid="9:2ebnz">
            <div className="w-full h-[1px] bg-slate-700/20" data-oid="vcxu5f2"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" data-oid="xieoihu">
            <div className="h-full w-[1px] bg-slate-700/20" data-oid="0dn1yss"></div>
          </div>
          
          {/* Celestial bodies */}
          <div className="relative h-full flex items-center justify-center" data-oid="yms0055">
            <div className="w-full max-w-3xl h-[440px] relative" data-oid="4sc7j66">
              {celestialBodies.map(({ set, bodyType, magnitude, distance }, index) => {
              // Calculate position in a spiral pattern with some randomness
              const angle = index / celestialBodies.length * Math.PI * 2;
              const radius = 100 + index / celestialBodies.length * 120 + (Math.random() * 60 - 30);
              const x = Math.cos(angle) * radius + 50;
              const y = Math.sin(angle) * radius + 50;

              // Size and style based on body type
              const size = getCelestialBodySize(bodyType, set.accuracy);
              const colorClass = getCelestialBodyColor(bodyType, set.subject);
              const glowEffect = getGlowEffect(bodyType, set.accuracy);

              const isSelected = selectedSetId === set.id;

              // Create a slightly different position for the "observed" view to avoid overlap
              const observedX = x + (Math.random() * 20 - 10);
              const observedY = y + (Math.random() * 20 - 10);

              // Different styling for nebulae
              const isNebula = bodyType === 'nebula';
              const nebulaClasses = isNebula ?
              'rounded-full bg-gradient-to-br opacity-70 backdrop-blur-sm' :
              'rounded-full';

              return (
                <React.Fragment key={set.id}>
                    {/* Main celestial body */}
                    <div
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300
                        ${isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-10'}
                        ${nebulaClasses} ${colorClass} ${glowEffect}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: `${size * 4}px`,
                      height: `${size * 4}px`
                    }}
                    onClick={() => onSelectSet(set.id)} data-oid="lg4oaqx">

                      {/* Special effects for comets */}
                      {bodyType === 'comet' &&
                    <div className="absolute right-0 h-[1px] w-12 bg-gradient-to-l from-cyan-300 to-transparent" data-oid="35_0gmd"></div>
                    }
                    </div>
                    
                    {/* Detailed view when selected */}
                    {isSelected &&
                  <div className="absolute z-50 bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4 w-80" data-oid="kf3_vjb">
                        <div className="flex gap-4" data-oid="n27rk0.">
                          <div className={`w-12 h-12 ${colorClass} ${nebulaClasses} ${glowEffect}`} data-oid=".l1:ve2"></div>
                          <div data-oid="tq0xz0.">
                            <h4 className="text-white font-bold" data-oid="dcy7pev">{set.subject} - {set.type}</h4>
                            <div className="text-xs text-slate-400" data-oid="9g5pg5n">{bodyType.charAt(0).toUpperCase() + bodyType.slice(1)}</div>
                          </div>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300" data-oid="8h02m3s">
                          <div data-oid="_pq::lv">
                            <div className="text-slate-500" data-oid="5nazkkd">Magnitude</div>
                            <div data-oid="::3-u20">{magnitude.toFixed(1)}</div>
                          </div>
                          <div data-oid="ydv_xp7">
                            <div className="text-slate-500" data-oid="718_kl-">Distance</div>
                            <div data-oid="8srn.hi">{distance}</div>
                          </div>
                          <div data-oid="j1ch3hy">
                            <div className="text-slate-500" data-oid="ioevege">Brightness</div>
                            <div data-oid="mpae73w">{set.accuracy}%</div>
                          </div>
                          <div data-oid="7kj2q26">
                            <div className="text-slate-500" data-oid="097ohpe">Observed</div>
                            <div data-oid="k0jtmbn">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                  }
                  </React.Fragment>);

            })}
            </div>
          </div>
          
          {/* Observatory UI elements */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-slate-800 rounded px-3 py-1.5 text-green-400 font-mono text-xs" data-oid="r086588">
            Zoom: 20x
          </div>
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-slate-800 rounded px-3 py-1.5 text-green-400 font-mono text-xs" data-oid="bif0zm0">
            RA: 16h 42m • Dec: -12° 56'
          </div>
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm border border-slate-800 rounded px-3 py-1.5 text-green-400 font-mono text-xs" data-oid="i80w8ay">
            {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
          </div>
        </div>
      }
      
      {/* Star Chart View */}
      {viewMode === 'chart' &&
      <div className="relative bg-slate-900 rounded-xl overflow-hidden min-h-[600px] p-6" data-oid="84cpteh">
          {/* Chart title */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-serif italic" data-oid="bk7ong-">
            <h3 className="text-lg text-center" data-oid="rvpdfkm">Celestial Chart of Learning Progress</h3>
            <div className="text-sm text-center text-slate-400" data-oid=".7cgi:k">Northern Hemisphere • Academic Year 2025</div>
          </div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 p-12" data-oid="p-477ad">
            {[...Array(5)].map((_, i) =>
          <div
            key={i}
            className="absolute border border-slate-700/20 rounded-full"
            style={{
              left: `${10 + i * 10}%`,
              top: `${10 + i * 10}%`,
              width: `${80 - i * 20}%`,
              height: `${80 - i * 20}%`
            }} data-oid="x20x6rq">
          </div>
          )}
            
            {/* Radial lines */}
            {[...Array(12)].map((_, i) => {
            const angle = i / 12 * Math.PI * 2;
            return (
              <div
                key={`line-${i}`}
                className="absolute top-1/2 left-1/2 origin-center h-[1px] bg-slate-700/20"
                style={{
                  width: '40%',
                  transform: `rotate(${angle}rad) translateX(0)`
                }} data-oid="a_c8imz">
              </div>);

          })}
          </div>
          
          {/* Constellations and celestial bodies */}
          <div className="relative h-full pt-12" data-oid=".e980cq">
            {/* Group celestial bodies by subject to create "constellations" */}
            {['Math', 'Reading', 'Writing'].map((subject) => {
            const subjectBodies = celestialBodies.filter((item) => item.set.subject === subject);

            if (subjectBodies.length < 2) return null;

            // Create constellation connections
            const constellationLines = [];
            for (let i = 0; i < subjectBodies.length - 1; i++) {
              const source = subjectBodies[i];
              const target = subjectBodies[i + 1];

              // Calculate positions
              const sourceAngle = subjectBodies.indexOf(source) / celestialBodies.length * Math.PI * 2;
              const sourceRadius = 100 + subjectBodies.indexOf(source) / celestialBodies.length * 80;
              const sourceX = Math.cos(sourceAngle) * sourceRadius + 300;
              const sourceY = Math.sin(sourceAngle) * sourceRadius + 300;

              const targetAngle = subjectBodies.indexOf(target) / celestialBodies.length * Math.PI * 2;
              const targetRadius = 100 + subjectBodies.indexOf(target) / celestialBodies.length * 80;
              const targetX = Math.cos(targetAngle) * targetRadius + 300;
              const targetY = Math.sin(targetAngle) * targetRadius + 300;

              constellationLines.push(
                <line
                  key={`constellation-${subject}-${i}`}
                  x1={sourceX}
                  y1={sourceY}
                  x2={targetX}
                  y2={targetY}
                  stroke={
                  subject === 'Math' ? '#818cf8' :
                  subject === 'Reading' ? '#38bdf8' :
                  '#a78bfa'
                  }
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="4 2" data-oid="7b1s6h3" />

              );
            }

            return (
              <svg key={`constellation-${subject}`} className="absolute inset-0 w-full h-full pointer-events-none" data-oid="mh_zhpv">
                  {constellationLines}
                </svg>);

          })}
            
            {/* Plot celestial bodies */}
            {celestialBodies.map(({ set, bodyType, classification, coordinates }, index) => {
            // Calculate position in a spiral pattern
            const angle = index / celestialBodies.length * Math.PI * 2;
            const radius = 100 + index / celestialBodies.length * 80;
            const x = Math.cos(angle) * radius + 300;
            const y = Math.sin(angle) * radius + 300;

            // Size and style based on body type
            const size = getCelestialBodySize(bodyType, set.accuracy) * 0.7; // Smaller in chart view
            const colorClass = getCelestialBodyColor(bodyType, set.subject);

            return (
              <div
                key={set.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${x}px`,
                  top: `${y}px`
                }}
                onClick={() => onSelectSet(set.id)} data-oid="ik8bqn:">

                  {/* Star symbol */}
                  <div
                  className={`${colorClass} ${bodyType === 'star' ? 'star-shape' : 'rounded-full'}`}
                  style={{
                    width: `${size * 3}px`,
                    height: `${size * 3}px`,
                    transform: selectedSetId === set.id ? 'scale(1.5)' : '',
                    boxShadow: selectedSetId === set.id ? '0 0 10px rgba(255,255,255,0.5)' : ''
                  }} data-oid="8j54g4x">
                </div>
                  
                  {/* Star label */}
                  <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[8px] font-mono pointer-events-none
                      ${selectedSetId === set.id ? 'text-white' : 'text-slate-400'}`} data-oid="5gnt-gw">

                    {set.subject[0]}-{index + 1}
                  </div>
                  
                  {/* Star details on selection */}
                  {selectedSetId === set.id &&
                <div className="absolute top-8 left-1/2 -translate-x-1/2 mt-2 bg-slate-950/80 backdrop-blur-sm border border-slate-700 rounded p-2 w-48 pointer-events-none z-50" data-oid="indabof">
                      <div className="text-white text-xs font-medium" data-oid="xes0x.s">{set.subject} {set.type}</div>
                      <div className="text-slate-400 text-[10px]" data-oid="yz98za6">{classification} ({bodyType})</div>
                      <div className="mt-1 text-[10px] text-slate-300 grid grid-cols-2 gap-x-1" data-oid="qvyvx:t">
                        <div data-oid="-0.rezz">RA: {coordinates.rightAscension}</div>
                        <div data-oid="vccl980">Dec: {coordinates.declination}</div>
                      </div>
                      <div className="mt-1 text-[10px] text-slate-300 grid grid-cols-2 gap-x-1" data-oid="1k_4k5w">
                        <div data-oid="d8wqu7w">Magnitude: {(10 - set.accuracy / 10).toFixed(1)}</div>
                        <div data-oid="-deg:_h">Accuracy: {set.accuracy}%</div>
                      </div>
                    </div>
                }
                </div>);

          })}
            
            {/* Constellation Names */}
            {['Math', 'Reading', 'Writing'].map((subject) => {
            let x, y;
            const subjectBodies = celestialBodies.filter((item) => item.set.subject === subject);

            if (subjectBodies.length < 2) return null;

            // Calculate centroid position of the constellation
            const xSum = subjectBodies.reduce((sum, item, index) => {
              const angle = index / celestialBodies.length * Math.PI * 2;
              const radius = 100 + index / celestialBodies.length * 80;
              return sum + Math.cos(angle) * radius;
            }, 0);

            const ySum = subjectBodies.reduce((sum, item, index) => {
              const angle = index / celestialBodies.length * Math.PI * 2;
              const radius = 100 + index / celestialBodies.length * 80;
              return sum + Math.sin(angle) * radius;
            }, 0);

            x = xSum / subjectBodies.length + 300;
            y = ySum / subjectBodies.length + 300;

            // Map subjects to constellation names
            const constellationName = subject === 'Math' ?
            'MATHEMATICA MAJOR' :
            subject === 'Reading' ?
            'LECTIO MINOR' :
            'SCRIPTORIA';

            return (
              <div
                key={`constellation-name-${subject}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                style={{
                  left: `${x}px`,
                  top: `${y}px`
                }} data-oid="r9yi2jz">

                  <div className="text-xs font-serif italic text-slate-400/70" data-oid=".ayftw4">
                    {constellationName}
                  </div>
                </div>);

          })}
          </div>
          
          {/* Chart decorations */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[10px] text-slate-500 font-serif italic" data-oid="p:t67xb">
            <div data-oid="9g7zdtk">Observed from Syntaxia Observatory • Coordinates 40.7° N, 73.9° W</div>
            <div className="mt-1" data-oid="chi8csv">Chart prepared by Astronomical Society of Educational Progress</div>
          </div>
          
          {/* Compass directions */}
          <div className="absolute top-8 left-8 text-xs text-slate-500" data-oid="hbjg_b3">W</div>
          <div className="absolute top-8 right-8 text-xs text-slate-500" data-oid="jsviuul">E</div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500" data-oid="afhu211">S</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs text-slate-500" data-oid=".i_pev.">N</div>
          
          {/* Legend */}
          <div className="absolute bottom-8 right-8 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3" data-oid="t.m45tq">
            <h4 className="text-xs text-slate-300 mb-2" data-oid="-l:6i_.">Celestial Bodies</h4>
            <div className="space-y-1.5 text-[10px]" data-oid="k3:c.a_">
              <div className="flex items-center gap-2" data-oid="k7i:mk7">
                <div className="w-2 h-2 bg-yellow-300 star-shape" data-oid="mcc3:75"></div>
                <span className="text-slate-400" data-oid="s_i4r5f">Star (90%+)</span>
              </div>
              <div className="flex items-center gap-2" data-oid="gv85-zl">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" data-oid="gfh06cd"></div>
                <span className="text-slate-400" data-oid="nxb9shj">Planet (80%+)</span>
              </div>
              <div className="flex items-center gap-2" data-oid="xbf.ciu">
                <div className="w-2 h-2 bg-gray-300 rounded-full" data-oid="n_dbvan"></div>
                <span className="text-slate-400" data-oid="985399:">Moon (70%+)</span>
              </div>
              <div className="flex items-center gap-2" data-oid="b5tlso5">
                <div className="w-2 h-2 bg-indigo-400/50 rounded-full" data-oid="ofydmml"></div>
                <span className="text-slate-400" data-oid="-cdt:iy">Nebula (60%+)</span>
              </div>
              <div className="flex items-center gap-2" data-oid="_21cfvv">
                <div className="w-2 h-2 bg-cyan-300 rounded-full" data-oid="agng2::"></div>
                <span className="text-slate-400" data-oid="jgx:bno">Comet (50%+)</span>
              </div>
              <div className="flex items-center gap-2" data-oid="yltid-0">
                <div className="w-2 h-2 bg-violet-600 rounded-full" data-oid="h4dm3ls"></div>
                <span className="text-slate-400" data-oid="oxvsj75">Galaxy (Below 50%)</span>
              </div>
            </div>
          </div>
        </div>
      }
      
      {/* Spectral Analysis View */}
      {viewMode === 'spectral' &&
      <div className="relative bg-slate-900 rounded-xl overflow-hidden min-h-[600px]" data-oid="t392t:t">
          <div className="h-full p-6" data-oid="sbgmzaf">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="5nc2ysm">
              {celestialBodies.map(({ set, bodyType, spectralClass, magnitude, classification }) => {
              // Color based on spectral class
              const getSpectralColor = () => {
                switch (spectralClass) {
                  case 'O':return 'from-blue-400 to-indigo-600';
                  case 'B':return 'from-blue-300 to-blue-500';
                  case 'A':return 'from-blue-200 to-blue-400';
                  case 'F':return 'from-blue-100 to-yellow-200';
                  case 'G':return 'from-yellow-200 to-yellow-400';
                  case 'K':return 'from-yellow-400 to-orange-500';
                  case 'M':return 'from-orange-500 to-red-600';
                  case 'L':return 'from-red-600 to-red-800';
                  case 'C':return 'from-red-400 to-yellow-400';
                  case 'S':return 'from-orange-300 to-red-400';
                  default:return 'from-purple-400 to-indigo-500';
                }
              };

              // Generate spectral lines (black lines in the spectrum)
              const generateSpectralLines = () => {
                const lineCount = 3 + Math.floor(set.accuracy / 20);
                return Array.from({ length: lineCount }).map((_, i) => {
                  const position = 5 + Math.random() * 90;
                  const width = 0.2 + Math.random() * 1.5;
                  return (
                    <div
                      key={`line-${set.id}-${i}`}
                      className="absolute h-full bg-black"
                      style={{
                        left: `${position}%`,
                        width: `${width}px`,
                        opacity: 0.8
                      }} data-oid="q:x-:e2">
                    </div>);

                });
              };

              return (
                <div
                  key={set.id}
                  onClick={() => onSelectSet(set.id)}
                  className={`border rounded-lg overflow-hidden transition-all
                      ${selectedSetId === set.id ?
                  'border-white shadow-lg shadow-white/20' :
                  'border-slate-700 hover:border-slate-500 cursor-pointer'}`} data-oid="ona.h:a">

                    <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 flex justify-between items-center" data-oid="3nq0lns">
                      <div data-oid="7ljt:3:">
                        <span className="text-white text-sm font-medium" data-oid="68lkjpi">{set.subject} {set.type}</span>
                        <span className="ml-2 text-xs text-slate-400" data-oid="9dsrm-6">{bodyType}</span>
                      </div>
                      <div className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-700 text-indigo-300" data-oid="odtvv0s">
                        Class {spectralClass}
                      </div>
                    </div>
                    
                    {/* Spectral graph */}
                    <div className="p-4" data-oid=".g7i.5z">
                      <div className="relative h-8 w-full bg-gradient-to-r overflow-hidden rounded-sm mb-2" data-oid="_ovlkcu">
                        {/* Colored spectrum */}
                        <div className={`absolute inset-0 h-full w-full bg-gradient-to-r ${getSpectralColor()}`} data-oid="5jppdit"></div>
                        
                        {/* Absorption lines */}
                        {generateSpectralLines()}
                      </div>
                      
                      {/* Detail stats */}
                      <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-slate-300" data-oid="5e.21pz">
                        <div data-oid="2y7-:55">
                          <div className="text-slate-500" data-oid="57i02x1">Spectral Class</div>
                          <div data-oid="162.-tc">{spectralClass}-type</div>
                        </div>
                        <div data-oid="ssz6fb5">
                          <div className="text-slate-500" data-oid="7lyjoex">Classification</div>
                          <div data-oid="bx2a2sv">{classification}</div>
                        </div>
                        <div data-oid="j3:_3im">
                          <div className="text-slate-500" data-oid="xdrxk5u">Magnitude</div>
                          <div data-oid="_85:cen">{magnitude.toFixed(1)}</div>
                        </div>
                        <div data-oid="k-:21k7">
                          <div className="text-slate-500" data-oid="d3taa7x">Temperature</div>
                          <div data-oid="6ig6tn_">{Math.round(5000 + set.accuracy * 30)}K</div>
                        </div>
                        <div data-oid="qd42vnn">
                          <div className="text-slate-500" data-oid="1y5ui72">Luminosity</div>
                          <div data-oid="o7epr-v">{set.accuracy}%</div>
                        </div>
                        <div data-oid="ev6s5kr">
                          <div className="text-slate-500" data-oid="vxizf89">Observed</div>
                          <div data-oid="acy4bn1">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                        </div>
                      </div>
                      
                      {/* Key elements */}
                      <div className="mt-4 pt-3 border-t border-slate-700" data-oid="c4f:3n2">
                        <div className="text-xs text-slate-500 mb-1" data-oid="3igi_os">Key Elements Detected:</div>
                        <div className="flex flex-wrap gap-2" data-oid="vzc88:d">
                          {['H', 'He', 'O', 'N', 'C', 'Fe', 'Si'].slice(0, 3 + Math.floor(set.accuracy / 20)).map((element) =>
                        <span
                          key={`${set.id}-${element}`}
                          className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-300" data-oid="_48p9v8">

                              {element}
                            </span>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>);

            })}
            </div>
          </div>
          
          {/* Spectral Class Legend */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-slate-800 rounded-lg p-3 text-xs" data-oid="m.6jt84">
            <h4 className="font-bold text-white mb-2" data-oid="7:ffpm6">Spectral Classification</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1" data-oid="8z7_s9l">
              <div className="flex items-center gap-1.5" data-oid="b0tt13j">
                <div className="w-2 h-2 rounded-full bg-blue-400" data-oid="ta4ktjl"></div>
                <span className="text-blue-300" data-oid="dngh7mk">O - Highest Accuracy</span>
              </div>
              <div className="flex items-center gap-1.5" data-oid="qxlfi:m">
                <div className="w-2 h-2 rounded-full bg-red-500" data-oid="pumln:t"></div>
                <span className="text-red-300" data-oid="_4_mq4g">M - Needs Review</span>
              </div>
              <div className="flex items-center gap-1.5" data-oid="9q1:vlf">
                <div className="w-2 h-2 rounded-full bg-yellow-300" data-oid="3c78g1l"></div>
                <span className="text-yellow-200" data-oid="puvrea9">G - Good Progress</span>
              </div>
              <div className="flex items-center gap-1.5" data-oid="qocdld7">
                <div className="w-2 h-2 rounded-full bg-red-300" data-oid="giuzfng"></div>
                <span className="text-red-200" data-oid="fbf6zuf">K - Work Required</span>
              </div>
            </div>
          </div>
        </div>
      }
      
      <style jsx global data-oid="tyq-px:">{`
        .star-shape {
          clip-path: polygon(
            50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%,
            50% 75%, 18% 100%, 31% 59%, 0% 38%, 37% 38%
          );
        }
        
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>);

}