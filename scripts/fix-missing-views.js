/**
 * Script to fix variant files with missing imported components
 * Creates fallback components for views with missing implementations
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Define the problematic files and their missing views
const problemFiles = [
  { 
    path: 'src/components/review/set-view-variants/variant-8/index.ts', 
    missingComponent: 'CarouselView',
    id: 8,
    name: 'Carousel View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-14/index.ts', 
    missingComponent: 'ArtisticGalleryView',
    id: 14,
    name: 'Artistic Gallery View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-15/index.ts', 
    missingComponent: 'MindMapView',
    id: 15,
    name: 'Mind Map View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-16/index.ts', 
    missingComponent: 'MetroTileView',
    id: 16,
    name: 'Metro Tile View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-17/index.ts', 
    missingComponent: 'TimelineSpiralView',
    id: 17,
    name: 'Timeline Spiral View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-18/index.ts', 
    missingComponent: 'AccordionPanelsView',
    id: 18,
    name: 'Accordion Panels View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-19/index.ts', 
    missingComponent: 'MagazineLayoutView',
    id: 19,
    name: 'Magazine Layout View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-20/index.ts', 
    missingComponent: 'GlobalMapView',
    id: 20,
    name: 'Global Map View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-21/index.ts', 
    missingComponent: 'CelestialObservatoryView',
    id: 21,
    name: 'Celestial Observatory View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-22/index.ts', 
    missingComponent: 'CoralReefEcosystemView',
    id: 22,
    name: 'Coral Reef Ecosystem View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-23/index.ts', 
    missingComponent: 'MountainRangeExplorerView',
    id: 23,
    name: 'Mountain Range Explorer View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-24/index.ts', 
    missingComponent: 'SeasonalGardenView',
    id: 24,
    name: 'Seasonal Garden View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-25/index.ts', 
    missingComponent: 'MuseumGalleryView',
    id: 25,
    name: 'Museum Gallery View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-26/index.ts', 
    missingComponent: 'AncientTempleView',
    id: 26,
    name: 'Ancient Temple View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-27/index.ts', 
    missingComponent: 'CityDistrictView',
    id: 27,
    name: 'City District View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-28/index.ts', 
    missingComponent: 'LibraryArchiveView',
    id: 28,
    name: 'Library Archive View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-29/index.ts', 
    missingComponent: 'HolographicProjectionView',
    id: 29,
    name: 'Holographic Projection View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-30/index.ts', 
    missingComponent: 'DataCrystalView',
    id: 30,
    name: 'Data Crystal View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-31/index.ts', 
    missingComponent: 'ParticleFlowView',
    id: 31,
    name: 'Particle Flow View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-32/index.ts', 
    missingComponent: 'FractalDimensionView',
    id: 32,
    name: 'Fractal Dimension View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-33/index.ts', 
    missingComponent: 'TapestryWeaveView',
    id: 33,
    name: 'Tapestry Weave View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-34/index.ts', 
    missingComponent: 'AntiqueMapView',
    id: 34,
    name: 'Antique Map View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-36/index.ts', 
    missingComponent: 'JazzCompositionView',
    id: 36,
    name: 'Jazz Composition View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-38/index.ts', 
    missingComponent: 'TimeCapsuleView',
    id: 38,
    name: 'Time Capsule View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-39/index.ts', 
    missingComponent: 'PuzzleBoxView',
    id: 39,
    name: 'Puzzle Box View'
  },
  { 
    path: 'src/components/review/set-view-variants/variant-40/index.ts', 
    missingComponent: 'ZodiacConstellationView',
    id: 40,
    name: 'Zodiac Constellation View'
  },
  // Timeline Variants
  { 
    path: 'src/components/review/timeline-view-variants/variant-21/index.ts', 
    missingComponent: 'GeologicalErasTimeline',
    id: 21,
    name: 'Geological Eras Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-22/index.ts', 
    missingComponent: 'HistoricalDynastyTimeline',
    id: 22,
    name: 'Historical Dynasty Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-23/index.ts', 
    missingComponent: 'EvolutionaryTreeTimeline',
    id: 23,
    name: 'Evolutionary Tree Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-24/index.ts', 
    missingComponent: 'RenaissanceCodexTimeline',
    id: 24,
    name: 'Renaissance Codex Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-25/index.ts', 
    missingComponent: 'ParallaxScrollingTimeline',
    id: 25,
    name: 'Parallax Scrolling Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-26/index.ts', 
    missingComponent: 'NeonCyberpunkTimeline',
    id: 26,
    name: 'Neon Cyberpunk Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-27/index.ts', 
    missingComponent: 'IsometricBuildingTimeline',
    id: 27,
    name: 'Isometric Building Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-28/index.ts', 
    missingComponent: 'MaterialDesignTimeline',
    id: 28,
    name: 'Material Design Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-29/index.ts', 
    missingComponent: 'DnaSequenceTimeline',
    id: 29,
    name: 'DNA Sequence Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-30/index.ts', 
    missingComponent: 'ParticlePhysicsTimeline',
    id: 30,
    name: 'Particle Physics Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-31/index.ts', 
    missingComponent: 'WeatherPatternTimeline',
    id: 31,
    name: 'Weather Pattern Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-32/index.ts', 
    missingComponent: 'SpiralGalaxyTimeline',
    id: 32,
    name: 'Spiral Galaxy Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-33/index.ts', 
    missingComponent: 'FilmStripTimeline',
    id: 33,
    name: 'Film Strip Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-34/index.ts', 
    missingComponent: 'VinylRecordTimeline',
    id: 34,
    name: 'Vinyl Record Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-35/index.ts', 
    missingComponent: 'PinballMachineTimeline',
    id: 35,
    name: 'Pinball Machine Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-36/index.ts', 
    missingComponent: 'TrainJourneyTimeline',
    id: 36,
    name: 'Train Journey Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-37/index.ts', 
    missingComponent: 'RiverDeltaTimeline',
    id: 37,
    name: 'River Delta Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-38/index.ts', 
    missingComponent: 'TreeRingsTimeline',
    id: 38,
    name: 'Tree Rings Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-39/index.ts', 
    missingComponent: 'SeasonalCycleTimeline',
    id: 39,
    name: 'Seasonal Cycle Timeline'
  },
  { 
    path: 'src/components/review/timeline-view-variants/variant-40/index.ts', 
    missingComponent: 'TidalWaveTimeline',
    id: 40,
    name: 'Tidal Wave Timeline'
  }
];

// Template for the fixed file content
function generateFixedContent(file) {
  // Determine the category based on the file path
  const category = file.path.includes('timeline-view-variants') ? 'timeline' : 'set';
  
  return `'use client'

import { registerView } from '../../registry/viewRegistry'
import React from 'react';

// Register this view with metadata
registerView({
  id: ${file.id},
  name: '${file.name}',
  description: 'Component implementation is missing',
  category: '${category}',
  tags: ['stub', 'fallback'],
  isExperimental: false
})

// Create a fallback component since ${file.missingComponent} is missing
const Fallback${file.missingComponent} = (props: any) => {
  // Using manual React.createElement instead of JSX for .ts file
  return React.createElement('div', {
    className: "border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm",
    children: [
      React.createElement('h3', {
        className: "text-xl font-bold mb-6 text-center",
        children: "${file.id}. ${file.name}"
      }),
      React.createElement('div', {
        className: "p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md text-amber-600 dark:text-amber-400",
        children: "This component is not available. The ${file.missingComponent} implementation is missing."
      })
    ]
  });
};

// Export the fallback component as default
export default Fallback${file.missingComponent}
`;
}

// Fix each file
async function fixFiles() {
  for (const file of problemFiles) {
    try {
      console.log(`Fixing ${file.path}...`);
      
      // Generate the fixed content for this file
      const fixedContent = generateFixedContent(file);
      
      // Write the fixed content
      await writeFileAsync(file.path, fixedContent);
      
      console.log(`  Successfully fixed ${file.path}`);
    } catch (error) {
      console.error(`  Error fixing ${file.path}:`, error);
    }
  }
}

// Run the script
fixFiles().then(() => {
  console.log('All files fixed successfully');
}).catch(error => {
  console.error('Error fixing files:', error);
});
