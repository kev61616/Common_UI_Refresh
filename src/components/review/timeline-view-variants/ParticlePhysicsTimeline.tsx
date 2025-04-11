'use client';

import { useState, useEffect, useRef } from 'react';
import { TimelineViewProps } from './types';

/**
 * Particle Physics Timeline (Timeline View Variant 30)
 * A physics-inspired timeline visualization with particle animations, force fields,
 * and quantum mechanics themed representation of learning sessions
 */
export function ParticlePhysicsTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);
  const [animationFrame, setAnimationFrame] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{x: number;y: number;vx: number;vy: number;radius: number;color: string;}>>([]);

  // Group practice sets by month
  const monthlyGroups = practiceSets.reduce((groups, set) => {
    const date = new Date(set.dateCompleted);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(set);
    return groups;
  }, {} as Record<string, typeof practiceSets>);

  // Sort months chronologically
  const sortedMonths = Object.keys(monthlyGroups).sort((a, b) => {
    const dateA = new Date(monthlyGroups[a][0].dateCompleted);
    const dateB = new Date(monthlyGroups[b][0].dateCompleted);
    return dateA.getTime() - dateB.getTime();
  });

  // Auto-scroll to selected set
  useEffect(() => {
    if (selectedSetId) {
      const element = document.getElementById(`particle-set-${selectedSetId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedSetId]);

  // Canvas animation for particle physics background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Initialize particles
    const initParticles = () => {
      const particles = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)]
        });
      }

      particlesRef.current = particles;
    };

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw connections between particles (if they're close enough)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      const animId = requestAnimationFrame(animate);
      setAnimationFrame(animId);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Get color scheme based on subject
  const getSubjectTheme = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          primary: 'bg-blue-500',
          ring: 'ring-blue-400',
          text: 'text-blue-600',
          gradient: 'from-blue-500 to-cyan-400',
          light: 'bg-blue-100',
          dark: 'bg-blue-900',
          particle: '#2563eb',
          symbol: 'γ', // Gamma particle
          name: 'Photon'
        };
      case 'Reading':
        return {
          primary: 'bg-green-500',
          ring: 'ring-green-400',
          text: 'text-green-600',
          gradient: 'from-green-500 to-emerald-400',
          light: 'bg-green-100',
          dark: 'bg-green-900',
          particle: '#10b981',
          symbol: 'e', // Electron
          name: 'Electron'
        };
      case 'Writing':
        return {
          primary: 'bg-purple-500',
          ring: 'ring-purple-400',
          text: 'text-purple-600',
          gradient: 'from-purple-500 to-fuchsia-400',
          light: 'bg-purple-100',
          dark: 'bg-purple-900',
          particle: '#8b5cf6',
          symbol: 'p', // Proton
          name: 'Proton'
        };
      default:
        return {
          primary: 'bg-amber-500',
          ring: 'ring-amber-400',
          text: 'text-amber-600',
          gradient: 'from-amber-500 to-orange-400',
          light: 'bg-amber-100',
          dark: 'bg-amber-900',
          particle: '#f59e0b',
          symbol: 'n', // Neutron
          name: 'Neutron'
        };
    }
  };

  // Format date in scientific notation
  const formatScientificDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `T-${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}.${hours}${minutes}`;
  };

  // Calculate energy level based on accuracy
  const getEnergyLevel = (accuracy: number) => {
    return Math.floor(accuracy / 20 + 1); // Levels 1-5
  };

  // Calculate wavelength visualization
  const getWavelength = (accuracy: number) => {
    // Return SVG path for wave visualization
    const amplitude = 8;
    const frequency = 0.05 + accuracy / 200; // Higher accuracy = higher frequency
    const points = [];

    for (let x = 0; x <= 100; x += 5) {
      const y = amplitude * Math.sin(x * frequency);
      points.push(`${x},${y}`);
    }

    return points.join(' ');
  };

  return (
    <div className="relative bg-slate-900 rounded-xl shadow-md p-6 overflow-hidden text-white" data-oid="6w3gbxj">
      {/* Canvas for particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20" data-oid="ix8i16s" />

      
      <h3 className="text-center text-2xl font-bold mb-6 text-white relative z-10" data-oid="9iy.h3e">
        <span className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500" data-oid=".zdga-q">30.</span> Particle Physics Timeline
      </h3>
      
      <div className="text-center mb-8 text-slate-400 font-mono text-sm" data-oid="q-xf0xm">
        Visualizing your learning journey through the lens of quantum mechanics and particle physics
      </div>
      
      {/* Main timeline container */}
      <div className="relative z-10 px-4 py-6" data-oid="cnem5mv">
        {sortedMonths.map((month, monthIndex) => {
          const sets = monthlyGroups[month];

          return (
            <div key={month} className="mb-16 last:mb-0" data-oid="x8f77py">
              {/* Month label */}
              <div className="relative mb-8" data-oid="dhx6cv.">
                <h4 className="text-xl font-bold text-center px-6 py-3 bg-slate-800 rounded-full inline-block mx-auto text-slate-200 border border-slate-700 relative z-10 shadow-lg" data-oid="-t_.0r8">
                  <span className="opacity-70 mr-2 font-mono" data-oid="emg2fnt">T:</span>{month}
                </h4>
                
                {/* Energy field connector */}
                {monthIndex < sortedMonths.length - 1 &&
                <div className="absolute left-1/2 top-full h-20 w-1 opacity-40 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" data-oid="296hixx"></div>
                }
              </div>
              
              {/* Practice sets as particle interactions */}
              <div className="space-y-8 relative" data-oid="24ez-uy">
                {sets.map((set, setIndex) => {
                  const isSelected = set.id === selectedSetId;
                  const isHovered = set.id === hoveredSetId;
                  const theme = getSubjectTheme(set.subject);
                  const energyLevel = getEnergyLevel(set.accuracy);
                  const wavelengthPath = getWavelength(set.accuracy);

                  return (
                    <div
                      id={`particle-set-${set.id}`}
                      key={set.id}
                      className={`relative transition-all duration-300 ${isSelected ? 'scale-105' : ''}`}
                      onMouseEnter={() => setHoveredSetId(set.id)}
                      onMouseLeave={() => setHoveredSetId(null)} data-oid="rlbf-n4">

                      {/* Particle collision visualization */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full top-0 opacity-75" data-oid="_kcrtc_">
                        <div
                          className={`w-6 h-6 rounded-full ${theme.primary} flex items-center justify-center text-white text-xs font-bold opacity-80`}
                          style={{
                            boxShadow: `0 0 15px ${theme.particle}`,
                            animation: 'pulse 2s infinite'
                          }} data-oid="5ewmd::">

                          {theme.symbol}
                        </div>
                      </div>
                      
                      {/* Card */}
                      <div
                        onClick={() => onSelectSet(set.id)}
                        className={`relative mx-auto max-w-2xl rounded-lg cursor-pointer 
                                  p-5 bg-slate-800 border ${isSelected || isHovered ? 'border-' + theme.ring : 'border-slate-700'}
                                  transition-all shadow-lg overflow-hidden ${isSelected ? 'ring-2 ' + theme.ring : ''}`} data-oid="mrwfhgj">

                        {/* Energy background */}
                        <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${theme.gradient}`} data-oid="0z7xw-g"></div>
                        
                        {/* Energy level indicators */}
                        <div className="absolute right-3 top-3 flex space-x-1" data-oid=".qrj6b:">
                          {[1, 2, 3, 4, 5].map((level) =>
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${level <= energyLevel ? theme.primary : 'bg-slate-700'}`} data-oid="x9jr-w5">
                          </div>
                          )}
                        </div>
                        
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4" data-oid="jl_d:kl">
                          <div className="flex items-center" data-oid="wa4y:rs">
                            <div
                              className={`${theme.primary} h-8 w-8 rounded-full flex items-center justify-center mr-3`}
                              style={{
                                boxShadow: `0 0 10px ${theme.particle}`
                              }} data-oid="i_0gah0">

                              {theme.symbol}
                            </div>
                            <div data-oid="bu1r_ax">
                              <h5 className={`font-bold ${theme.text}`} data-oid="oavv7dy">{set.type}</h5>
                              <p className="text-xs text-slate-400" data-oid="jwndj91">{theme.name} particle detected</p>
                            </div>
                          </div>
                          <div className="text-right" data-oid="qv3at9s">
                            <span className="text-xs text-slate-400 font-mono" data-oid="my-gb2w">{formatScientificDate(set.dateCompleted)}</span>
                          </div>
                        </div>
                        
                        {/* Subject and time info */}
                        <div className="flex flex-wrap gap-2 mb-3" data-oid="illk:.1">
                          <span className={`px-2 py-1 text-xs rounded-full ${theme.light} ${theme.text}`} data-oid="5amexgu">
                            {set.subject}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300" data-oid="f77q51d">
                            {Math.floor(set.timeUsed / 60)}m {set.timeUsed % 60}s
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300" data-oid="hxwgau7">
                            {set.questions.length} questions
                          </span>
                        </div>
                        
                        {/* Wavelength visualization */}
                        <div className="relative h-12 mb-3 bg-slate-900/50 rounded overflow-hidden flex items-center px-3" data-oid="wzn04uh">
                          <svg
                            className="w-full h-8"
                            viewBox="0 0 100 16"
                            preserveAspectRatio="none" data-oid="arydjq4">

                            <polyline
                              points={wavelengthPath}
                              fill="none"
                              stroke={theme.particle}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round" data-oid="rqst9ho" />

                          </svg>
                          <div className="absolute left-2 top-1 text-xs text-slate-500 font-mono" data-oid="-uip6be">λ</div>
                          <div className="absolute right-2 text-xs text-slate-400" data-oid="oro:1xh">{set.accuracy}% accuracy</div>
                        </div>
                        
                        {/* Quantum Stats */}
                        <div className="grid grid-cols-2 gap-3 my-3" data-oid="00a3i9s">
                          <div className="bg-slate-900 rounded p-2 text-sm" data-oid="bpzxq..">
                            <div className="text-xs text-slate-500 mb-1" data-oid="g_ujpe4">Spin States</div>
                            <div className="font-mono font-bold" data-oid="0rmxdvy">
                              <span className="text-green-400" data-oid="rqfywku">↑{set.questions.filter((q) => q.correct).length}</span> / <span className="text-red-400" data-oid="k843m35">↓{set.questions.filter((q) => !q.correct).length}</span>
                            </div>
                          </div>
                          <div className="bg-slate-900 rounded p-2 text-sm" data-oid="0iwlc02">
                            <div className="text-xs text-slate-500 mb-1" data-oid="r40yw5s">Error Coherence</div>
                            <div className="font-mono flex justify-between" data-oid="7v_9t3v">
                              <span className="text-purple-400" data-oid="dra1r7e">C:{set.mistakeTypes.conceptual}</span>
                              <span className="text-amber-400" data-oid="rqm9x2f">R:{set.mistakeTypes.careless}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded info (only shown when selected) */}
                        {isSelected &&
                        <div className={`mt-4 pt-3 border-t border-slate-700 ${theme.text}`} data-oid="d3r-g:q">
                            <div className="text-sm" data-oid="6o8vavb">
                              <div className="font-bold mb-1" data-oid="8ia6ccx">Quantum Observations</div>
                              <p className="text-slate-400" data-oid="9s7lnfg">
                                This {theme.name} particle shows a {set.accuracy < 70 ? 'destabilized' : 'stable'} waveform
                                with {set.mistakeTypes.conceptual + set.mistakeTypes.careless} error fluctuations.
                                Session completed with {set.questions.filter((q) => q.correct).length} correct responses
                                in a time-space continuum of {Math.floor(set.timeUsed / 60)}m {set.timeUsed % 60}s.
                              </p>
                            </div>
                          </div>
                        }
                      </div>
                    </div>);

                })}
              </div>
            </div>);

        })}
      </div>
      
      {/* Legend */}
      <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700" data-oid="o24nn.9">
        <h5 className="text-center text-sm font-medium text-slate-300 mb-3" data-oid="-rvle9i">Particle Physics Legend</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-oid="5w.hsva">
          <div className="flex items-center" data-oid="typs:qh">
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs mr-2" data-oid="16kvcb1">γ</div>
            <span className="text-sm text-slate-300" data-oid="7infhln">Photon (Math)</span>
          </div>
          <div className="flex items-center" data-oid="cn_drxl">
            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs mr-2" data-oid="_4ckiw_">e</div>
            <span className="text-sm text-slate-300" data-oid=".xz3.jf">Electron (Reading)</span>
          </div>
          <div className="flex items-center" data-oid="443cok7">
            <div className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs mr-2" data-oid="t7szs4i">p</div>
            <span className="text-sm text-slate-300" data-oid="ljwcc7k">Proton (Writing)</span>
          </div>
          <div className="flex items-center" data-oid="r64zemk">
            <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xs mr-2" data-oid="s6n:8yp">n</div>
            <span className="text-sm text-slate-300" data-oid="_4pt9sf">Neutron (Other)</span>
          </div>
        </div>
      </div>
      
      {/* Animation keyframes */}
      <style jsx data-oid="l71ya62">{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>);

}