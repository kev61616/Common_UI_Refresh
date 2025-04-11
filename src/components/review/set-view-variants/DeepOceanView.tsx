'use client';

import React, { useState } from 'react';
import { SetViewProps } from './types';

export function DeepOceanView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [activeDepthZone, setActiveDepthZone] = useState<string>('all');

  if (!practiceSets || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="4bo20y8">
        <h3 className="text-xl font-bold mb-6 text-center" data-oid="r-n-xfk">57. Deep Ocean View</h3>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl" data-oid="90rs2u:">
          <p className="mb-4" data-oid="ym7sf6n">No data to explore in the ocean depths.</p>
          <p data-oid="sat_ssz">Complete some sets to begin your underwater expedition.</p>
        </div>
      </div>);

  }

  // Ocean depth zones
  const depthZones = [
  {
    id: 'sunlight',
    name: 'Sunlight Zone (0-200m)',
    color: 'from-sky-300 to-blue-500',
    description: 'High performance, recent practice sets (90%+ accuracy)',
    minAccuracy: 90
  },
  {
    id: 'twilight',
    name: 'Twilight Zone (200-1000m)',
    color: 'from-blue-500 to-blue-700',
    description: 'Good performance, developing mastery (75-89% accuracy)',
    minAccuracy: 75,
    maxAccuracy: 89
  },
  {
    id: 'midnight',
    name: 'Midnight Zone (1000-4000m)',
    color: 'from-blue-700 to-blue-900',
    description: 'Average performance, needs additional practice (60-74% accuracy)',
    minAccuracy: 60,
    maxAccuracy: 74
  },
  {
    id: 'abyss',
    name: 'Abyssal Zone (4000-6000m)',
    color: 'from-blue-900 to-slate-900',
    description: 'Lower performance, challenging topics (40-59% accuracy)',
    minAccuracy: 40,
    maxAccuracy: 59
  },
  {
    id: 'trench',
    name: 'Hadal Zone (6000m+)',
    color: 'from-slate-900 to-black',
    description: 'Lowest performance, most difficult topics (<40% accuracy)',
    maxAccuracy: 39
  }];


  // Assign marine life categories based on subject and performance
  const mapSetsToMarineOrganisms = () => {
    return practiceSets.map((set) => {
      // Determine depth zone based on accuracy
      let depthZone;

      if (set.accuracy >= 90) {
        depthZone = 'sunlight';
      } else if (set.accuracy >= 75) {
        depthZone = 'twilight';
      } else if (set.accuracy >= 60) {
        depthZone = 'midnight';
      } else if (set.accuracy >= 40) {
        depthZone = 'abyss';
      } else {
        depthZone = 'trench';
      }

      // Determine marine life type based on subject
      let organismType;
      let description;

      if (set.subject === 'Math') {
        if (set.accuracy >= 85) {
          organismType = 'dolphin';
          description = 'Intelligent and agile dolphins represent high-performing math skills';
        } else if (set.accuracy >= 70) {
          organismType = 'turtle';
          description = 'Methodical sea turtles represent solid mathematical reasoning';
        } else if (set.accuracy >= 55) {
          organismType = 'crab';
          description = 'Sideways-moving crabs represent mathematical challenges';
        } else if (set.accuracy >= 40) {
          organismType = 'anglerfish';
          description = 'Deep-sea anglerfish represent difficult math concepts';
        } else {
          organismType = 'blobfish';
          description = 'Pressure-adapted blobfish represent the most challenging math topics';
        }
      } else if (set.subject === 'Reading') {
        if (set.accuracy >= 85) {
          organismType = 'reef';
          description = 'Colorful coral reefs represent diverse reading comprehension skills';
        } else if (set.accuracy >= 70) {
          organismType = 'jellyfish';
          description = 'Translucent jellyfish represent flowing reading analysis';
        } else if (set.accuracy >= 55) {
          organismType = 'squid';
          description = 'Multi-armed squid represent complex reading connections';
        } else if (set.accuracy >= 40) {
          organismType = 'nautilus';
          description = 'Ancient nautilus represents challenging foundational reading skills';
        } else {
          organismType = 'isopod';
          description = 'Deep-sea isopods represent the most difficult reading concepts';
        }
      } else {// Writing
        if (set.accuracy >= 85) {
          organismType = 'whale';
          description = 'Majestic whales represent eloquent writing abilities';
        } else if (set.accuracy >= 70) {
          organismType = 'octopus';
          description = 'Creative octopuses represent adaptable writing skills';
        } else if (set.accuracy >= 55) {
          organismType = 'seahorse';
          description = 'Unique seahorses represent developing writing style';
        } else if (set.accuracy >= 40) {
          organismType = 'eel';
          description = 'Elusive eels represent challenging writing concepts';
        } else {
          organismType = 'viperfish';
          description = 'Intimidating viperfish represent the most difficult writing areas';
        }
      }

      // Generate position data for organism
      const depthZoneIndex = depthZones.findIndex((zone) => zone.id === depthZone);
      const verticalPosition = 30 + depthZoneIndex * 15 + Math.random() * 10;
      const horizontalPosition = 10 + Math.random() * 80;

      return {
        set,
        depthZone,
        organismType,
        description,
        position: {
          top: `${verticalPosition}%`,
          left: `${horizontalPosition}%`
        },
        size: 6 + set.accuracy / 10 // Size based on accuracy
      };
    });
  };

  const marineOrganisms = mapSetsToMarineOrganisms();

  // Filter organisms by active depth zone
  const filteredOrganisms = activeDepthZone === 'all' ?
  marineOrganisms :
  marineOrganisms.filter((organism) => organism.depthZone === activeDepthZone);

  // Helper function to get organism icon/image based on type
  const getOrganismIcon = (type: string, isSelected: boolean) => {
    // Ocean life emoji mapping - could be replaced with proper SVG or images
    const emojiMap: Record<string, string> = {
      dolphin: '🐬',
      turtle: '🐢',
      crab: '🦀',
      anglerfish: '🎣', // Using fishing pole as approximation
      blobfish: '🫠', // Using melting face as approximation
      reef: '🪸',
      jellyfish: '🪼',
      squid: '🦑',
      nautilus: '🐚',
      isopod: '🪲', // Using beetle as approximation
      whale: '🐋',
      octopus: '🐙',
      seahorse: '🦄', // Using unicorn as approximation
      eel: '🐍', // Using snake as approximation
      viperfish: '🦈' // Using shark as approximation
    };

    // Use the emoji with a container for styling
    return (
      <div
        className={`flex items-center justify-center rounded-full transition-transform duration-300
          ${isSelected ? 'transform scale-125 z-50 shadow-lg ring-2 ring-white/30' : 'hover:scale-110'}`} data-oid="6831ypj">

        <span className="text-4xl" role="img" aria-label={type} data-oid="v8:vdb1">
          {emojiMap[type] || '🌊'}
        </span>
      </div>);

  };

  // Function to get depth zone background gradient
  const getDepthZoneGradient = (zoneId: string) => {
    const zone = depthZones.find((z) => z.id === zoneId);
    return zone ? `bg-gradient-to-b ${zone.color}` : 'bg-blue-500';
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="7xuahu_">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="nmwbhbs">57. Deep Ocean View</h3>
      
      {/* Depth zone selector */}
      <div className="flex justify-center mb-6 space-x-4" data-oid="b1pj0za">
        <button
          onClick={() => setActiveDepthZone('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeDepthZone === 'all' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="hkd5n32">

          All Depths
        </button>
        {depthZones.map((zone) =>
        <button
          key={zone.id}
          onClick={() => setActiveDepthZone(zone.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${activeDepthZone === zone.id ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="q:m7uz4">

            {zone.id.charAt(0).toUpperCase() + zone.id.slice(1)}
          </button>
        )}
      </div>
      
      {/* Ocean visualization */}
      <div className="relative w-full min-h-[600px] overflow-hidden rounded-xl" data-oid="7i83ny4">
        {/* Ocean depth zones background */}
        <div className="absolute inset-0 flex flex-col" data-oid="pr7e11s">
          {depthZones.map((zone) =>
          <div
            key={zone.id}
            className={`flex-1 ${getDepthZoneGradient(zone.id)} 
                ${activeDepthZone === 'all' || activeDepthZone === zone.id ?
            'opacity-100' :
            'opacity-30'} 
                transition-opacity duration-500`} data-oid="lth4md3">

              {/* Zone label */}
              <div className="absolute left-4 text-white font-mono text-sm opacity-70" data-oid="pjt28wu">
                {zone.name}
              </div>
            </div>
          )}
        </div>
        
        {/* Light rays in sunlight zone */}
        <div className="absolute top-0 inset-x-0 h-[20%] overflow-hidden pointer-events-none" data-oid="kd65cww">
          {[...Array(10)].map((_, i) =>
          <div
            key={i}
            className="absolute top-0 bg-yellow-300/10 origin-top transform rotate-3"
            style={{
              left: `${10 + i * 8}%`,
              width: '4px',
              height: '100%',
              filter: 'blur(2px)'
            }} data-oid="8b6-ync">
          </div>
          )}
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" data-oid="a3teiv0">
          {[...Array(50)].map((_, i) =>
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`
            }} data-oid="aek46dq">
          </div>
          )}
        </div>
        
        {/* Marine organisms */}
        <div className="relative z-10 h-full" data-oid="s5lom92">
          {filteredOrganisms.map(({ set, organismType, description, position, size, depthZone }) =>
          <div
            key={set.id}
            className="absolute cursor-pointer transition-all duration-300"
            style={{
              top: position.top,
              left: position.left
            }}
            onClick={() => onSelectSet(set.id)} data-oid="tg6nkl.">

              {/* Organism icon/image */}
              {getOrganismIcon(organismType, selectedSetId === set.id)}
              
              {/* Info tooltip on selection */}
              {selectedSetId === set.id &&
            <div className="absolute mt-2 -translate-x-1/2 left-1/2 w-64 bg-black/75 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl z-50" data-oid="1:ldym.">
                  <div className="font-bold" data-oid="sy7y-9.">{set.subject} - {set.type}</div>
                  <div className="text-sm mt-1 text-blue-200" data-oid="4_bpsss">{organismType.charAt(0).toUpperCase() + organismType.slice(1)}</div>
                  <div className="text-xs mt-1 text-slate-300" data-oid="aahjil4">{description}</div>
                  
                  <div className="grid grid-cols-2 gap-x-2 mt-3 text-xs" data-oid="_qj-qh7">
                    <div data-oid="wmf.:dh">
                      <div className="text-slate-400" data-oid="ste5qj4">Accuracy</div>
                      <div className="font-medium" data-oid="3_tqp43">{set.accuracy}%</div>
                    </div>
                    <div data-oid="9r-wz5o">
                      <div className="text-slate-400" data-oid="2g1421n">Depth Zone</div>
                      <div className="font-medium" data-oid="eooycb.">{depthZone.charAt(0).toUpperCase() + depthZone.slice(1)}</div>
                    </div>
                    <div className="mt-2" data-oid="_6eg7cf">
                      <div className="text-slate-400" data-oid="el_r00j">Completed</div>
                      <div className="font-medium" data-oid="3nvjikx">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                    </div>
                    <div className="mt-2" data-oid="vlq_hq_">
                      <div className="text-slate-400" data-oid=".kugmr0">Pace</div>
                      <div className="font-medium" data-oid="3yjtfl5">{set.pace}</div>
                    </div>
                  </div>
                </div>
            }
            </div>
          )}
        </div>
        
        {/* Oceanographic UI elements */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2 text-green-300 font-mono text-xs" data-oid="j69jm4r">
          <div className="flex items-center" data-oid="wwv0r_9">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" data-oid="a-wc1mj"></div>
            <div data-oid="q4bp1ya">Sonar Active</div>
          </div>
          <div className="mt-1" data-oid="15t:umq">Depth: {activeDepthZone === 'all' ? '0-6000+' : activeDepthZone === 'sunlight' ? '0-200' : activeDepthZone === 'twilight' ? '200-1000' : activeDepthZone === 'midnight' ? '1000-4000' : activeDepthZone === 'abyss' ? '4000-6000' : '6000+'} meters</div>
          <div className="mt-1" data-oid="sh:t2e8">Pressure: {activeDepthZone === 'all' ? '1-1100' : activeDepthZone === 'sunlight' ? '1-20' : activeDepthZone === 'twilight' ? '20-100' : activeDepthZone === 'midnight' ? '100-400' : activeDepthZone === 'abyss' ? '400-600' : '600-1100'} atm</div>
          <div className="mt-1" data-oid="_2_okck">Temp: {activeDepthZone === 'all' ? '25-2°C' : activeDepthZone === 'sunlight' ? '25-15°C' : activeDepthZone === 'twilight' ? '15-5°C' : '4-2°C'}</div>
        </div>
        
        {/* Active zone information */}
        {activeDepthZone !== 'all' &&
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3" data-oid=":psbfs5">
            <h4 className="text-white font-bold text-sm" data-oid="ub2z0f8">
              {depthZones.find((z) => z.id === activeDepthZone)?.name}
            </h4>
            <p className="text-slate-300 text-xs mt-1" data-oid="a-fntcr">
              {depthZones.find((z) => z.id === activeDepthZone)?.description}
            </p>
            <div className="text-xs text-slate-400 mt-2" data-oid="uv_sfsv">
              Sets found: {filteredOrganisms.length} • 
              Avg. accuracy: {filteredOrganisms.length > 0 ? Math.round(filteredOrganisms.reduce((sum, org) => sum + org.set.accuracy, 0) / filteredOrganisms.length) : 0}%
            </div>
          </div>
        }
        
        {/* Deep sea legend */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2 text-xs text-white" data-oid="5vxyx9g">
          <h4 className="font-bold mb-1" data-oid="1:mf5lk">Marine Life Legend</h4>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1" data-oid="q3cwarm">
            <div className="flex items-center" data-oid="u4g1k7i">
              <span className="mr-1" data-oid="d7acuqz">🐬</span>
              <span className="text-slate-300" data-oid="jpzj1l1">Math (90%+)</span>
            </div>
            <div className="flex items-center" data-oid="tyxufdp">
              <span className="mr-1" data-oid="u6_r4:t">🪸</span>
              <span className="text-slate-300" data-oid="8the.13">Reading (90%+)</span>
            </div>
            <div className="flex items-center" data-oid="gcnko6o">
              <span className="mr-1" data-oid="b_uii8q">🐋</span>
              <span className="text-slate-300" data-oid="31u2r2:">Writing (90%+)</span>
            </div>
            <div className="flex items-center" data-oid="zdrplcr">
              <span className="mr-1" data-oid="spid3fq">🦀</span>
              <span className="text-slate-300" data-oid=".ksm.5u">Math (55-70%)</span>
            </div>
            <div className="flex items-center" data-oid="in_i-20">
              <span className="mr-1" data-oid="xiu34c:">🦑</span>
              <span className="text-slate-300" data-oid="u:.6yn_">Reading (55-70%)</span>
            </div>
            <div className="flex items-center" data-oid="zxdhjym">
              <span className="mr-1" data-oid="059jfwr">🐙</span>
              <span className="text-slate-300" data-oid="ct0hagp">Writing (55-70%)</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global data-oid="t8r28z2">{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation-name: float;
          animation-duration: 15s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>);

}