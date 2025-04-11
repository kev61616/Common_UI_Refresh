'use client';

import React, { useState } from 'react';
import { SetViewProps } from './types';

export function AncientCivilizationView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [activeCivilization, setActiveCivilization] = useState<string>('all');

  if (!practiceSets || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="wdu_o04">
        <h3 className="text-xl font-bold mb-6 text-center" data-oid="hqtob1e">58. Ancient Civilization View</h3>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl" data-oid="_._ez:x">
          <p className="mb-4" data-oid="7b._jml">No historical artifacts discovered yet.</p>
          <p data-oid=":g9r7pg">Complete some sets to begin your archaeological expedition.</p>
        </div>
      </div>);

  }

  // Define ancient civilizations
  const civilizations = [
  {
    id: 'egyptian',
    name: 'Egyptian',
    era: '3100-332 BCE',
    description: 'Known for monumental architecture, cultural achievements, and mathematical knowledge',
    themeColor: 'from-amber-600 to-yellow-500',
    textColor: 'text-amber-900 dark:text-amber-300'
  },
  {
    id: 'greek',
    name: 'Greek',
    era: '800-146 BCE',
    description: 'Known for philosophy, democracy, arts, sciences, and literature',
    themeColor: 'from-blue-500 to-teal-400',
    textColor: 'text-blue-900 dark:text-blue-300'
  },
  {
    id: 'roman',
    name: 'Roman',
    era: '753 BCE-476 CE',
    description: 'Known for engineering, law, governance systems, and military innovation',
    themeColor: 'from-red-600 to-red-400',
    textColor: 'text-red-900 dark:text-red-300'
  },
  {
    id: 'mayan',
    name: 'Mayan',
    era: '2000 BCE-1500 CE',
    description: 'Known for advanced mathematics, astronomy, architecture, and calendar systems',
    themeColor: 'from-emerald-600 to-green-500',
    textColor: 'text-emerald-900 dark:text-emerald-300'
  },
  {
    id: 'chinese',
    name: 'Chinese',
    era: '1600 BCE-1912 CE',
    description: 'Known for administrative systems, technology, art, and philosophical traditions',
    themeColor: 'from-rose-600 to-rose-400',
    textColor: 'text-rose-900 dark:text-rose-300'
  }];


  // Map sets to civilizations and artifacts
  const mapSetsToCivilizations = () => {
    return practiceSets.map((set) => {
      // Determine civilization based on subject
      let civilization;

      if (set.subject === 'Math') {
        civilization = 'egyptian'; // Egyptians were known for mathematical knowledge
      } else if (set.subject === 'Reading') {
        if (set.accuracy > 75) {
          civilization = 'greek'; // Greeks were known for literature and philosophy
        } else {
          civilization = 'chinese'; // Chinese also known for literature and scholarly tradition
        }
      } else {// Writing
        if (set.accuracy > 75) {
          civilization = 'roman'; // Romans known for documentation and record keeping
        } else {
          civilization = 'mayan'; // Mayans had hieroglyphic writing
        }
      }

      // Determine artifact type based on accuracy and set type
      let artifactType: string;
      let description: string;

      if (set.accuracy >= 90) {
        if (civilization === 'egyptian') {
          artifactType = 'pyramid';
          description = 'Great Pyramid of perfection';
        } else if (civilization === 'greek') {
          artifactType = 'parthenon';
          description = 'Parthenon of powerful knowledge';
        } else if (civilization === 'roman') {
          artifactType = 'colosseum';
          description = 'Colosseum of complete mastery';
        } else if (civilization === 'mayan') {
          artifactType = 'temple';
          description = 'Temple of tremendous understanding';
        } else {// Chinese
          artifactType = 'wall';
          description = 'Great Wall of wonderful achievement';
        }
      } else if (set.accuracy >= 75) {
        if (civilization === 'egyptian') {
          artifactType = 'sphinx';
          description = 'Sphinx of strong comprehension';
        } else if (civilization === 'greek') {
          artifactType = 'statue';
          description = 'Statue of significant progress';
        } else if (civilization === 'roman') {
          artifactType = 'aqueduct';
          description = 'Aqueduct of advanced knowledge flow';
        } else if (civilization === 'mayan') {
          artifactType = 'calendar';
          description = 'Calendar of considerable understanding';
        } else {// Chinese
          artifactType = 'pagoda';
          description = 'Pagoda of proper learning';
        }
      } else if (set.accuracy >= 60) {
        if (civilization === 'egyptian') {
          artifactType = 'obelisk';
          description = 'Obelisk of ongoing progress';
        } else if (civilization === 'greek') {
          artifactType = 'column';
          description = 'Column of competent understanding';
        } else if (civilization === 'roman') {
          artifactType = 'arch';
          description = 'Arch of adequate progress';
        } else if (civilization === 'mayan') {
          artifactType = 'stela';
          description = 'Stela of steady advancement';
        } else {// Chinese
          artifactType = 'vase';
          description = 'Vase of valuable progress';
        }
      } else if (set.accuracy >= 40) {
        if (civilization === 'egyptian') {
          artifactType = 'scarab';
          description = 'Scarab of starting knowledge';
        } else if (civilization === 'greek') {
          artifactType = 'pottery';
          description = 'Pottery of preparatory learning';
        } else if (civilization === 'roman') {
          artifactType = 'coin';
          description = 'Coin of core understanding';
        } else if (civilization === 'mayan') {
          artifactType = 'mask';
          description = 'Mask of modest progress';
        } else {// Chinese
          artifactType = 'scroll';
          description = 'Scroll of steady effort';
        }
      } else {
        if (civilization === 'egyptian') {
          artifactType = 'papyrus';
          description = 'Papyrus of preliminary effort';
        } else if (civilization === 'greek') {
          artifactType = 'shard';
          description = 'Pottery shard of practice foundation';
        } else if (civilization === 'roman') {
          artifactType = 'brick';
          description = 'Brick of basic understanding';
        } else if (civilization === 'mayan') {
          artifactType = 'glyph';
          description = 'Glyph of growing knowledge';
        } else {// Chinese
          artifactType = 'bamboo';
          description = 'Bamboo slip of beginning study';
        }
      }

      return {
        set,
        civilization,
        artifactType,
        description,
        size: 80 + set.accuracy * 0.4, // Size based on accuracy
        position: {
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`
        }
      };
    });
  };

  const civilizationArtifacts = mapSetsToCivilizations();

  // Filter artifacts by active civilization
  const filteredArtifacts = activeCivilization === 'all' ?
  civilizationArtifacts :
  civilizationArtifacts.filter((artifact) => artifact.civilization === activeCivilization);

  // Helper function to get the right background for a civilization
  const getCivilizationBackground = (id: string) => {
    const civ = civilizations.find((c) => c.id === id);
    return civ ? `bg-gradient-to-b ${civ.themeColor}` : '';
  };

  // Helper function to get artifact icon
  const getArtifactIcon = (type: string) => {
    // Use emoji as placeholders - in a real implementation you'd use proper SVG icons or images
    const iconMap: Record<string, string> = {
      pyramid: '🔺',
      sphinx: '🐈', // Cat as approximation for sphinx
      obelisk: '📊', // Chart as approximation for obelisk
      scarab: '🪲',
      papyrus: '📜',
      parthenon: '🏛️',
      statue: '🗿',
      column: '🏛️',
      pottery: '🏺',
      shard: '🧩',
      colosseum: '🏟️',
      aqueduct: '⚓', // Anchor as approximation for aqueduct
      arch: '🌈', // Rainbow as approximation for arch
      coin: '🪙',
      brick: '🧱',
      temple: '🗼',
      calendar: '📅',
      stela: '📋', // Clipboard as approximation for stela
      mask: '👺', // Goblin mask as approximation
      glyph: '🔣',
      wall: '🧱',
      pagoda: '🗼',
      vase: '🏺',
      scroll: '📜',
      bamboo: '🎋'
    };

    return (
      <span className="text-5xl" role="img" aria-label={type} data-oid=".bwt5:2">
        {iconMap[type] || '🏺'}
      </span>);

  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="s:0ja-g">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="a_85n_k">58. Ancient Civilization View</h3>
      
      {/* Civilization selector */}
      <div className="flex flex-wrap justify-center mb-6 gap-2" data-oid="55jx55o">
        <button
          onClick={() => setActiveCivilization('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeCivilization === 'all' ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="5mv_x4.">

          All Civilizations
        </button>
        {civilizations.map((civ) =>
        <button
          key={civ.id}
          onClick={() => setActiveCivilization(civ.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${activeCivilization === civ.id ?
          'bg-indigo-500 text-white' :
          'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`} data-oid="yjblmfm">

            {civ.name}
          </button>
        )}
      </div>
      
      {/* Civilization overview and visualization */}
      <div className="min-h-[600px]" data-oid="cn98y81">
        {/* Active civilization information */}
        {activeCivilization !== 'all' &&
        <div className="mb-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-800" data-oid="8sm8-r8">
            <h4 className="font-bold text-lg mb-1" data-oid="0ctneip">
              {civilizations.find((c) => c.id === activeCivilization)?.name} Civilization
            </h4>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-2" data-oid="u5yvpqq">
              Era: {civilizations.find((c) => c.id === activeCivilization)?.era}
            </div>
            <p className="text-sm" data-oid="4mcb3bb">
              {civilizations.find((c) => c.id === activeCivilization)?.description}
            </p>
          </div>
        }
        
        {activeCivilization === 'all' ?
        // Show separate regions for each civilization
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4" data-oid="0q1v36h">
            {civilizations.map((civ) => {
            const civArtifacts = civilizationArtifacts.filter((a) => a.civilization === civ.id);

            if (civArtifacts.length === 0) return null;

            return (
              <div
                key={civ.id}
                className={`rounded-lg p-4 ${getCivilizationBackground(civ.id)} cursor-pointer`}
                onClick={() => setActiveCivilization(civ.id)} data-oid="xxuceml">

                  <h4 className="font-bold text-white mb-1" data-oid="o4oabb8">{civ.name}</h4>
                  <div className="text-xs text-white/80 mb-3" data-oid="na:7bt1">{civ.era}</div>
                  
                  <div className="flex flex-wrap gap-2" data-oid="adz8vll">
                    {civArtifacts.slice(0, 4).map((artifact) =>
                  <div
                    key={artifact.set.id}
                    className="bg-white/20 backdrop-blur-sm rounded p-2 w-16 h-16 flex items-center justify-center" data-oid="xcyfgi.">

                        {getArtifactIcon(artifact.artifactType)}
                      </div>
                  )}
                    {civArtifacts.length > 4 &&
                  <div className="bg-white/20 backdrop-blur-sm rounded p-2 w-16 h-16 flex items-center justify-center" data-oid="s5d0hqg">
                        <span className="text-white font-bold" data-oid="uvfojoo">+{civArtifacts.length - 4}</span>
                      </div>
                  }
                  </div>
                  
                  <div className="mt-3 text-xs text-white/80" data-oid="w61_m3l">
                    {civArtifacts.length} artifacts • {Math.round(civArtifacts.reduce((sum, a) => sum + a.set.accuracy, 0) / civArtifacts.length)}% avg
                  </div>
                </div>);

          })}
          </div> :

        // Show detailed view of single civilization
        <div className={`relative min-h-[500px] rounded-xl overflow-hidden ${getCivilizationBackground(activeCivilization)} p-6`} data-oid="e-_5fs_">
            {/* Background elements for the civilization */}
            {activeCivilization === 'egyptian' &&
          <div className="absolute inset-0 pointer-events-none opacity-10" data-oid="b6n6.5h">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-amber-800" data-oid="ry_8nrj"></div>
                <div className="absolute bottom-20 left-[10%] w-[80%] h-[400px]"
            style={{ background: 'radial-gradient(circle at top, rgba(251,191,36,0.3) 0%, transparent 70%)' }} data-oid="cd:d:kq"></div>
              </div>
          }
            
            {activeCivilization === 'greek' &&
          <div className="absolute inset-0 pointer-events-none opacity-20" data-oid="vwkcakv">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-800" data-oid="-fgdgzz"></div>
                <div className="absolute top-[20%] left-[30%] w-32 h-60 rounded-t-full border-t-8 border-x-8 border-blue-200" data-oid="97ndm_e"></div>
                <div className="absolute top-[20%] left-[50%] w-32 h-60 rounded-t-full border-t-8 border-x-8 border-blue-200" data-oid="w40wqjq"></div>
              </div>
          }
            
            {activeCivilization === 'roman' &&
          <div className="absolute inset-0 pointer-events-none opacity-20" data-oid="i8-cw2m">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-red-900" data-oid="imn.jiz"></div>
                <div className="absolute top-[30%] left-[40%] w-[20%] h-40 border-8 border-red-200 rounded-t-full" data-oid="6g1ce8d"></div>
              </div>
          }
            
            {activeCivilization === 'mayan' &&
          <div className="absolute inset-0 pointer-events-none opacity-20" data-oid="l5_24:9">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-900" data-oid="l-bhek5"></div>
                <div className="absolute top-[20%] left-[30%] w-[40%] h-60" data-oid="4bei6-v">
                  <div className="w-full h-1/3 border-4 border-green-200" data-oid="qn7q5-4"></div>
                  <div className="w-[80%] mx-auto h-1/3 border-4 border-t-0 border-green-200" data-oid="oh_242r"></div>
                  <div className="w-[60%] mx-auto h-1/3 border-4 border-t-0 border-green-200" data-oid="j7vjjop"></div>
                </div>
              </div>
          }
            
            {activeCivilization === 'chinese' &&
          <div className="absolute inset-0 pointer-events-none opacity-20" data-oid="03xw6hm">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-rose-900" data-oid="r5aqm_a"></div>
                <div className="absolute top-[10%] left-[10%] right-[10%] h-10 border-4 border-rose-200" data-oid="2jcpijz"></div>
                <div className="absolute top-[10%] left-[20%] w-4 h-[40%] border-l-4 border-r-4 border-b-4 border-rose-200" data-oid="axamgsu"></div>
                <div className="absolute top-[10%] right-[20%] w-4 h-[40%] border-l-4 border-r-4 border-b-4 border-rose-200" data-oid="2.vbr8m"></div>
              </div>
          }
            
            {/* Artifacts for the selected civilization */}
            {filteredArtifacts.map(({ set, artifactType, description, size, position }) =>
          <div
            key={set.id}
            className={`absolute cursor-pointer transition-all duration-300
                  ${selectedSetId === set.id ? 'z-20 scale-110' : 'z-10 hover:scale-105'}`}
            style={{
              left: position.left,
              top: position.top
            }}
            onClick={() => onSelectSet(set.id)} data-oid="nium7fq">

                <div className="flex flex-col items-center" data-oid="5iplh3u">
                  <div className="bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full p-4 shadow-lg" data-oid="8bc-iwz">
                    {getArtifactIcon(artifactType)}
                  </div>
                  
                  {/* Artifact name only shown when selected */}
                  {selectedSetId === set.id &&
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white mt-2 w-64 text-center" data-oid="kv.repi">
                      <div className="font-bold" data-oid="275d-x.">{set.subject} - {set.type}</div>
                      <div className="text-sm mt-1" data-oid=".n01wcz">{description}</div>
                      <div className="flex justify-between mt-3 text-xs text-slate-300" data-oid="ik51mnx">
                        <div data-oid="dieso9b">Accuracy: {set.accuracy}%</div>
                        <div data-oid="aahme:z">Completed: {new Date(set.dateCompleted).toLocaleDateString()}</div>
                      </div>
                    </div>
              }
                </div>
              </div>
          )}
            
            {/* Artifact count and averages */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs rounded-lg p-2" data-oid="t:4bdye">
              <div className="font-medium" data-oid="z4qbxxk">{filteredArtifacts.length} Artifacts Discovered</div>
              <div data-oid="2:e8v83">Average Accuracy: {Math.round(filteredArtifacts.reduce((sum, a) => sum + a.set.accuracy, 0) / filteredArtifacts.length)}%</div>
            </div>
          </div>
        }
      </div>
      
      {/* Artifact Legend */}
      <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4" data-oid="c6_sdy.">
        <h4 className="font-medium text-sm mb-2" data-oid="nh4ylpc">Artifact Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs" data-oid="15tk5w8">
          <div className="flex flex-col items-center" data-oid="y7gt78-">
            <div className="mb-1" data-oid="v8yzhfu">🏛️/🔺/🏟️/🗼/🧱</div>
            <div className="text-slate-600 dark:text-slate-400" data-oid="5-cr149">Grand Monuments<br data-oid="q0nr:in" />(90%+ accuracy)</div>
          </div>
          <div className="flex flex-col items-center" data-oid="_5ry8:s">
            <div className="mb-1" data-oid="qrqqlwl">🗿/🏺/⚓/📅/🗼</div>
            <div className="text-slate-600 dark:text-slate-400" data-oid="hd_9.8b">Major Artifacts<br data-oid="0xavoax" />(75-89% accuracy)</div>
          </div>
          <div className="flex flex-col items-center" data-oid=":st7g8b">
            <div className="mb-1" data-oid="sp:t4.h">📊/🏛️/🌈/📋/🏺</div>
            <div className="text-slate-600 dark:text-slate-400" data-oid="0fek683">Medium Artifacts<br data-oid="_yqxvxz" />(60-74% accuracy)</div>
          </div>
          <div className="flex flex-col items-center" data-oid="i4u-ok2">
            <div className="mb-1" data-oid="d:b2byc">🪲/🏺/🪙/👺/📜</div>
            <div className="text-slate-600 dark:text-slate-400" data-oid="s58s-09">Minor Artifacts<br data-oid="cdd8itl" />(40-59% accuracy)</div>
          </div>
          <div className="flex flex-col items-center" data-oid="bj:l282">
            <div className="mb-1" data-oid="tp18nn3">📜/🧩/🧱/🔣/🎋</div>
            <div className="text-slate-600 dark:text-slate-400" data-oid="uyc3isv">Starter Artifacts<br data-oid="ph.kjpc" />(&lt;40% accuracy)</div>
          </div>
        </div>
      </div>
    </div>);

}