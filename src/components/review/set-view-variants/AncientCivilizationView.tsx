'use client'

import React, { useState } from 'react'
import { SetViewProps } from './types'

export function AncientCivilizationView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [activeCivilization, setActiveCivilization] = useState<string>('all')

  if (!practiceSets || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-center">58. Ancient Civilization View</h3>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="mb-4">No historical artifacts discovered yet.</p>
          <p>Complete some sets to begin your archaeological expedition.</p>
        </div>
      </div>
    )
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
    }
  ]

  // Map sets to civilizations and artifacts
  const mapSetsToCivilizations = () => {
    return practiceSets.map(set => {
      // Determine civilization based on subject
      let civilization
      
      if (set.subject === 'Math') {
        civilization = 'egyptian' // Egyptians were known for mathematical knowledge
      } else if (set.subject === 'Reading') {
        if (set.accuracy > 75) {
          civilization = 'greek' // Greeks were known for literature and philosophy
        } else {
          civilization = 'chinese' // Chinese also known for literature and scholarly tradition
        }
      } else { // Writing
        if (set.accuracy > 75) {
          civilization = 'roman' // Romans known for documentation and record keeping
        } else {
          civilization = 'mayan' // Mayans had hieroglyphic writing
        }
      }
      
      // Determine artifact type based on accuracy and set type
      let artifactType: string
      let description: string
      
      if (set.accuracy >= 90) {
        if (civilization === 'egyptian') {
          artifactType = 'pyramid'
          description = 'Great Pyramid of perfection'
        } else if (civilization === 'greek') {
          artifactType = 'parthenon'
          description = 'Parthenon of powerful knowledge'
        } else if (civilization === 'roman') {
          artifactType = 'colosseum'
          description = 'Colosseum of complete mastery'
        } else if (civilization === 'mayan') {
          artifactType = 'temple'
          description = 'Temple of tremendous understanding'
        } else { // Chinese
          artifactType = 'wall'
          description = 'Great Wall of wonderful achievement'
        }
      } else if (set.accuracy >= 75) {
        if (civilization === 'egyptian') {
          artifactType = 'sphinx'
          description = 'Sphinx of strong comprehension'
        } else if (civilization === 'greek') {
          artifactType = 'statue'
          description = 'Statue of significant progress'
        } else if (civilization === 'roman') {
          artifactType = 'aqueduct'
          description = 'Aqueduct of advanced knowledge flow'
        } else if (civilization === 'mayan') {
          artifactType = 'calendar'
          description = 'Calendar of considerable understanding'
        } else { // Chinese
          artifactType = 'pagoda'
          description = 'Pagoda of proper learning'
        }
      } else if (set.accuracy >= 60) {
        if (civilization === 'egyptian') {
          artifactType = 'obelisk'
          description = 'Obelisk of ongoing progress'
        } else if (civilization === 'greek') {
          artifactType = 'column'
          description = 'Column of competent understanding'
        } else if (civilization === 'roman') {
          artifactType = 'arch'
          description = 'Arch of adequate progress'
        } else if (civilization === 'mayan') {
          artifactType = 'stela'
          description = 'Stela of steady advancement'
        } else { // Chinese
          artifactType = 'vase'
          description = 'Vase of valuable progress'
        }
      } else if (set.accuracy >= 40) {
        if (civilization === 'egyptian') {
          artifactType = 'scarab'
          description = 'Scarab of starting knowledge'
        } else if (civilization === 'greek') {
          artifactType = 'pottery'
          description = 'Pottery of preparatory learning'
        } else if (civilization === 'roman') {
          artifactType = 'coin'
          description = 'Coin of core understanding'
        } else if (civilization === 'mayan') {
          artifactType = 'mask'
          description = 'Mask of modest progress'
        } else { // Chinese
          artifactType = 'scroll'
          description = 'Scroll of steady effort'
        }
      } else {
        if (civilization === 'egyptian') {
          artifactType = 'papyrus'
          description = 'Papyrus of preliminary effort'
        } else if (civilization === 'greek') {
          artifactType = 'shard'
          description = 'Pottery shard of practice foundation'
        } else if (civilization === 'roman') {
          artifactType = 'brick'
          description = 'Brick of basic understanding'
        } else if (civilization === 'mayan') {
          artifactType = 'glyph'
          description = 'Glyph of growing knowledge'
        } else { // Chinese
          artifactType = 'bamboo'
          description = 'Bamboo slip of beginning study'
        }
      }
      
      return {
        set,
        civilization,
        artifactType,
        description,
        size: 80 + (set.accuracy * 0.4), // Size based on accuracy
        position: {
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`
        }
      }
    })
  }
  
  const civilizationArtifacts = mapSetsToCivilizations()
  
  // Filter artifacts by active civilization
  const filteredArtifacts = activeCivilization === 'all' 
    ? civilizationArtifacts 
    : civilizationArtifacts.filter(artifact => artifact.civilization === activeCivilization)
    
  // Helper function to get the right background for a civilization
  const getCivilizationBackground = (id: string) => {
    const civ = civilizations.find(c => c.id === id)
    return civ ? `bg-gradient-to-b ${civ.themeColor}` : ''
  }
  
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
    }
    
    return (
      <span className="text-5xl" role="img" aria-label={type}>
        {iconMap[type] || '🏺'}
      </span>
    )
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">58. Ancient Civilization View</h3>
      
      {/* Civilization selector */}
      <div className="flex flex-wrap justify-center mb-6 gap-2">
        <button 
          onClick={() => setActiveCivilization('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeCivilization === 'all' 
              ? 'bg-indigo-500 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          All Civilizations
        </button>
        {civilizations.map(civ => (
          <button 
            key={civ.id}
            onClick={() => setActiveCivilization(civ.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${activeCivilization === civ.id 
                ? 'bg-indigo-500 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            {civ.name}
          </button>
        ))}
      </div>
      
      {/* Civilization overview and visualization */}
      <div className="min-h-[600px]">
        {/* Active civilization information */}
        {activeCivilization !== 'all' && (
          <div className="mb-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
            <h4 className="font-bold text-lg mb-1">
              {civilizations.find(c => c.id === activeCivilization)?.name} Civilization
            </h4>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Era: {civilizations.find(c => c.id === activeCivilization)?.era}
            </div>
            <p className="text-sm">
              {civilizations.find(c => c.id === activeCivilization)?.description}
            </p>
          </div>
        )}
        
        {activeCivilization === 'all' ? (
          // Show separate regions for each civilization
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {civilizations.map(civ => {
              const civArtifacts = civilizationArtifacts.filter(a => a.civilization === civ.id)
              
              if (civArtifacts.length === 0) return null
              
              return (
                <div 
                  key={civ.id}
                  className={`rounded-lg p-4 ${getCivilizationBackground(civ.id)} cursor-pointer`}
                  onClick={() => setActiveCivilization(civ.id)}
                >
                  <h4 className="font-bold text-white mb-1">{civ.name}</h4>
                  <div className="text-xs text-white/80 mb-3">{civ.era}</div>
                  
                  <div className="flex flex-wrap gap-2">
                    {civArtifacts.slice(0, 4).map(artifact => (
                      <div 
                        key={artifact.set.id}
                        className="bg-white/20 backdrop-blur-sm rounded p-2 w-16 h-16 flex items-center justify-center"
                      >
                        {getArtifactIcon(artifact.artifactType)}
                      </div>
                    ))}
                    {civArtifacts.length > 4 && (
                      <div className="bg-white/20 backdrop-blur-sm rounded p-2 w-16 h-16 flex items-center justify-center">
                        <span className="text-white font-bold">+{civArtifacts.length - 4}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 text-xs text-white/80">
                    {civArtifacts.length} artifacts • {Math.round(civArtifacts.reduce((sum, a) => sum + a.set.accuracy, 0) / civArtifacts.length)}% avg
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Show detailed view of single civilization
          <div className={`relative min-h-[500px] rounded-xl overflow-hidden ${getCivilizationBackground(activeCivilization)} p-6`}>
            {/* Background elements for the civilization */}
            {activeCivilization === 'egyptian' && (
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-amber-800"></div>
                <div className="absolute bottom-20 left-[10%] w-[80%] h-[400px]"
                     style={{ background: 'radial-gradient(circle at top, rgba(251,191,36,0.3) 0%, transparent 70%)' }}></div>
              </div>
            )}
            
            {activeCivilization === 'greek' && (
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-800"></div>
                <div className="absolute top-[20%] left-[30%] w-32 h-60 rounded-t-full border-t-8 border-x-8 border-blue-200"></div>
                <div className="absolute top-[20%] left-[50%] w-32 h-60 rounded-t-full border-t-8 border-x-8 border-blue-200"></div>
              </div>
            )}
            
            {activeCivilization === 'roman' && (
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-red-900"></div>
                <div className="absolute top-[30%] left-[40%] w-[20%] h-40 border-8 border-red-200 rounded-t-full"></div>
              </div>
            )}
            
            {activeCivilization === 'mayan' && (
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-900"></div>
                <div className="absolute top-[20%] left-[30%] w-[40%] h-60">
                  <div className="w-full h-1/3 border-4 border-green-200"></div>
                  <div className="w-[80%] mx-auto h-1/3 border-4 border-t-0 border-green-200"></div>
                  <div className="w-[60%] mx-auto h-1/3 border-4 border-t-0 border-green-200"></div>
                </div>
              </div>
            )}
            
            {activeCivilization === 'chinese' && (
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-rose-900"></div>
                <div className="absolute top-[10%] left-[10%] right-[10%] h-10 border-4 border-rose-200"></div>
                <div className="absolute top-[10%] left-[20%] w-4 h-[40%] border-l-4 border-r-4 border-b-4 border-rose-200"></div>
                <div className="absolute top-[10%] right-[20%] w-4 h-[40%] border-l-4 border-r-4 border-b-4 border-rose-200"></div>
              </div>
            )}
            
            {/* Artifacts for the selected civilization */}
            {filteredArtifacts.map(({ set, artifactType, description, size, position }) => (
              <div 
                key={set.id}
                className={`absolute cursor-pointer transition-all duration-300
                  ${selectedSetId === set.id ? 'z-20 scale-110' : 'z-10 hover:scale-105'}`}
                style={{ 
                  left: position.left, 
                  top: position.top,
                }}
                onClick={() => onSelectSet(set.id)}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full p-4 shadow-lg">
                    {getArtifactIcon(artifactType)}
                  </div>
                  
                  {/* Artifact name only shown when selected */}
                  {selectedSetId === set.id && (
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white mt-2 w-64 text-center">
                      <div className="font-bold">{set.subject} - {set.type}</div>
                      <div className="text-sm mt-1">{description}</div>
                      <div className="flex justify-between mt-3 text-xs text-slate-300">
                        <div>Accuracy: {set.accuracy}%</div>
                        <div>Completed: {new Date(set.dateCompleted).toLocaleDateString()}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Artifact count and averages */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs rounded-lg p-2">
              <div className="font-medium">{filteredArtifacts.length} Artifacts Discovered</div>
              <div>Average Accuracy: {Math.round(filteredArtifacts.reduce((sum, a) => sum + a.set.accuracy, 0) / filteredArtifacts.length)}%</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Artifact Legend */}
      <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
        <h4 className="font-medium text-sm mb-2">Artifact Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
          <div className="flex flex-col items-center">
            <div className="mb-1">🏛️/🔺/🏟️/🗼/🧱</div>
            <div className="text-slate-600 dark:text-slate-400">Grand Monuments<br/>(90%+ accuracy)</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-1">🗿/🏺/⚓/📅/🗼</div>
            <div className="text-slate-600 dark:text-slate-400">Major Artifacts<br/>(75-89% accuracy)</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-1">📊/🏛️/🌈/📋/🏺</div>
            <div className="text-slate-600 dark:text-slate-400">Medium Artifacts<br/>(60-74% accuracy)</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-1">🪲/🏺/🪙/👺/📜</div>
            <div className="text-slate-600 dark:text-slate-400">Minor Artifacts<br/>(40-59% accuracy)</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-1">📜/🧩/🧱/🔣/🎋</div>
            <div className="text-slate-600 dark:text-slate-400">Starter Artifacts<br/>(&lt;40% accuracy)</div>
          </div>
        </div>
      </div>
    </div>
  )
}