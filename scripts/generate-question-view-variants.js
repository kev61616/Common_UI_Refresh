#!/usr/bin/env node

/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                   Question View Variants Generator Script                  ║
 * ║                                                                           ║
 * ║ Creates beautiful and distinctive question view components across 3 types ║
 * ║ - KnowledgeTreeView (10 variants)                                         ║
 * ║ - HeatmapView (10 variants)                                               ║
 * ║ - MatrixGridView (10 variants)                                            ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Usage: node scripts/generate-question-view-variants.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for beautiful terminal output
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

// Helper functions for visual outputs
const visual = {
  title: (text) => {
    const width = process.stdout.columns || 80;
    const padding = Math.max(0, Math.floor((width - text.length - 4) / 2));
    const line = '═'.repeat(width - 2);
    
    console.log(`${COLORS.magenta}╔${line}╗${COLORS.reset}`);
    console.log(`${COLORS.magenta}║${' '.repeat(padding)}${COLORS.bright}${COLORS.white}${text}${COLORS.reset}${COLORS.magenta}${' '.repeat(width - text.length - padding - 2)}║${COLORS.reset}`);
    console.log(`${COLORS.magenta}╚${line}╝${COLORS.reset}`);
  },
  
  sectionTitle: (text) => {
    console.log(`\n${COLORS.bright}${COLORS.cyan}◆ ${text} ${COLORS.reset}`);
    console.log(`${COLORS.cyan}${'─'.repeat(text.length + 4)}${COLORS.reset}`);
  },
  
  info: (text) => console.log(`${COLORS.blue}ℹ ${text}${COLORS.reset}`),
  
  success: (text) => console.log(`${COLORS.green}✓ ${text}${COLORS.reset}`),
  
  warning: (text) => console.log(`${COLORS.yellow}⚠ ${text}${COLORS.reset}`),
  
  error: (text) => console.log(`${COLORS.red}✗ ${text}${COLORS.reset}`),
  
  progress: (current, total, text) => {
    const width = 30;
    const percent = Math.floor((current / total) * 100);
    const filledWidth = Math.floor((current / total) * width);
    const emptyWidth = width - filledWidth;
    
    const bar = `${COLORS.bgMagenta}${' '.repeat(filledWidth)}${COLORS.reset}${COLORS.bgBlack}${' '.repeat(emptyWidth)}${COLORS.reset}`;
    
    process.stdout.write(`\r${COLORS.magenta}[${bar}] ${percent}%${COLORS.reset} ${text}`);
    
    if (current === total) {
      process.stdout.write('\n');
    }
  },

  separator: () => {
    console.log(`\n${COLORS.dim}${COLORS.cyan}${'━'.repeat(process.stdout.columns || 80)}${COLORS.reset}\n`);
  }
};

// Next available variant ID to start with (check registerAllQuestionViews.ts to see existing ones)
let nextVariantId = 43; // We'll continue from the last used ID

// Define our new variants for each base type
const variants = [
  // KnowledgeTree variants
  {
    id: nextVariantId++,
    name: "Radial Knowledge Tree",
    component: "RadialKnowledgeTreeView",
    baseComponent: "KnowledgeTreeView",
    description: "Interactive circular tree layout with expandable branches radiating from the center",
    tags: "radial,tree,interactive,hierarchical"
  },
  {
    id: nextVariantId++,
    name: "Botanical Knowledge Garden",
    component: "BotanicalKnowledgeGardenView",
    baseComponent: "KnowledgeTreeView",
    description: "Questions visualized as plants and flowers growing from topic roots with bloom states indicating mastery level",
    tags: "botanical,garden,nature,growth"
  },
  {
    id: nextVariantId++,
    name: "Neural Network Tree",
    component: "NeuralNetworkTreeView",
    baseComponent: "KnowledgeTreeView",
    description: "Interactive neural connections showing relationships between topics with pulsing nodes indicating activity",
    tags: "neural,network,connections,interactive"
  },
  {
    id: nextVariantId++,
    name: "Constellation Tree",
    component: "ConstellationTreeView",
    baseComponent: "KnowledgeTreeView",
    description: "Questions visualized as stars forming constellations grouped by topic, with brightness indicating performance",
    tags: "constellation,stars,cosmic,astronomy"
  },
  {
    id: nextVariantId++,
    name: "Fractal Knowledge Map",
    component: "FractalKnowledgeMapView",
    baseComponent: "KnowledgeTreeView",
    description: "Recursive, zoomable fractal patterns grouping topics with infinite detail levels for deeper exploration",
    tags: "fractal,recursive,zoomable,mathematical"
  },
  {
    id: nextVariantId++,
    name: "Mountain Range Knowledge",
    component: "MountainRangeKnowledgeView",
    baseComponent: "KnowledgeTreeView",
    description: "3D terrain visualization with mountain heights mapping to mastery level across knowledge domains",
    tags: "mountains,terrain,3d,elevation"
  },
  {
    id: nextVariantId++,
    name: "Architectural Blueprint",
    component: "ArchitecturalBlueprintView",
    baseComponent: "KnowledgeTreeView",
    description: "Technical drawing style with topics visualized as rooms and structures in a blueprint layout",
    tags: "blueprint,architectural,technical,design"
  },
  {
    id: nextVariantId++,
    name: "Subway Knowledge Map",
    component: "SubwayKnowledgeMapView",
    baseComponent: "KnowledgeTreeView",
    description: "Metro/subway-style map with colored lines connecting topic stations and question stops",
    tags: "subway,metro,transit,connections"
  },
  {
    id: nextVariantId++,
    name: "Timeline Tree",
    component: "TimelineTreeView",
    baseComponent: "KnowledgeTreeView",
    description: "Chronological branching structure showing learning progression over time with growth indicators",
    tags: "timeline,chronological,progression,history"
  },
  {
    id: nextVariantId++,
    name: "Quantum Knowledge Field",
    component: "QuantumKnowledgeFieldView",
    baseComponent: "KnowledgeTreeView",
    description: "Particle-physics inspired visualization with topics as quantum fields and questions as particles",
    tags: "quantum,physics,particles,scientific"
  },
  
  // Heatmap variants
  {
    id: nextVariantId++,
    name: "3D Terrain Heatmap",
    component: "TerrainHeatmapView",
    baseComponent: "HeatmapView",
    description: "Elevation-based 3D visualization with height and color indicating performance across topics",
    tags: "3d,terrain,elevation,topographic"
  },
  {
    id: nextVariantId++,
    name: "Aurora Heatmap",
    component: "AuroraHeatmapView",
    baseComponent: "HeatmapView",
    description: "Shimmering, animated northern lights style visualization with color intensity showing mastery",
    tags: "aurora,animated,atmospheric,colorful"
  },
  {
    id: nextVariantId++,
    name: "Satellite Thermal Map",
    component: "SatelliteThermalMapView",
    baseComponent: "HeatmapView",
    description: "Satellite imagery styled visualization with infrared-like thermal signatures indicating knowledge hotspots",
    tags: "satellite,thermal,infrared,geographic"
  },
  {
    id: nextVariantId++,
    name: "Pixel Art Heatmap",
    component: "PixelArtHeatmapView",
    baseComponent: "HeatmapView",
    description: "Retro pixel-based visualization with distinctive color palettes reminiscent of 8-bit graphics",
    tags: "pixel,retro,gaming,8-bit"
  },
  {
    id: nextVariantId++,
    name: "Weather Map Heatmap",
    component: "WeatherMapHeatmapView",
    baseComponent: "HeatmapView",
    description: "Meteorological-styled visualization with temperature and pressure zones indicating mastery areas",
    tags: "weather,meteorological,temperature,pressure"
  },
  {
    id: nextVariantId++,
    name: "Topographic Contour Map",
    component: "TopographicContourMapView",
    baseComponent: "HeatmapView",
    description: "Contour lines showing mastery 'elevations' across subjects with detailed elevation markers",
    tags: "topographic,contour,elevation,cartographic"
  },
  {
    id: nextVariantId++,
    name: "Biome Ecosystem Map",
    component: "BiomeEcosystemMapView",
    baseComponent: "HeatmapView",
    description: "Different ecosystems representing mastery levels from desert to rainforest based on question performance",
    tags: "biome,ecosystem,nature,environment"
  },
  {
    id: nextVariantId++,
    name: "Microscopic Cell View",
    component: "MicroscopicCellView",
    baseComponent: "HeatmapView",
    description: "Cellular/microscopic styling with cell density and activity indicating mastery and knowledge growth",
    tags: "microscopic,cellular,biological,scientific"
  },
  {
    id: nextVariantId++,
    name: "Urban Density Map",
    component: "UrbanDensityMapView",
    baseComponent: "HeatmapView",
    description: "City-like visualization with building density and height showing mastery concentration areas",
    tags: "urban,city,density,architectural"
  },
  {
    id: nextVariantId++,
    name: "Heatmap Prism",
    component: "HeatmapPrismView",
    baseComponent: "HeatmapView",
    description: "Light spectrum visualization that splits and refracts based on performance metrics across subjects",
    tags: "prism,spectrum,light,physics"
  },
  
  // Matrix Grid variants
  {
    id: nextVariantId++,
    name: "Periodic Table of Knowledge",
    component: "PeriodicTableOfKnowledgeView",
    baseComponent: "MatrixGridView",
    description: "Chemistry-inspired grid with elemental styling for topics and questions arranged by properties",
    tags: "periodic,chemistry,scientific,elements"
  },
  {
    id: nextVariantId++,
    name: "Digital Circuit Board",
    component: "DigitalCircuitBoardView",
    baseComponent: "MatrixGridView",
    description: "Electronic schematics visualization with connected components showing data flow between topics",
    tags: "circuit,electronic,technical,connections"
  },
  {
    id: nextVariantId++,
    name: "Architectural Facade Grid",
    component: "ArchitecturalFacadeGridView",
    baseComponent: "MatrixGridView",
    description: "Building facade with windows lighting up based on performance across different knowledge areas",
    tags: "architecture,facade,building,windows"
  },
  {
    id: nextVariantId++,
    name: "Mosaic Tile Matrix",
    component: "MosaicTileMatrixView",
    baseComponent: "MatrixGridView",
    description: "Ancient mosaic-styled tiles with patterns and colors indicating performance and mastery level",
    tags: "mosaic,tiles,ancient,artistic"
  },
  {
    id: nextVariantId++,
    name: "Cosmic Matrix",
    component: "CosmicMatrixView",
    baseComponent: "MatrixGridView",
    description: "Space-themed grid with galaxies, nebulae, and celestial objects representing knowledge domains",
    tags: "cosmic,space,celestial,astronomical"
  },
  {
    id: nextVariantId++,
    name: "Chess Strategy Board",
    component: "ChessStrategyBoardView",
    baseComponent: "MatrixGridView",
    description: "Game board visualization with chess pieces representing mastery levels and strategic positions",
    tags: "chess,strategy,game,tactical"
  },
  {
    id: nextVariantId++,
    name: "Textile Pattern Grid",
    component: "TextilePatternGridView",
    baseComponent: "MatrixGridView",
    description: "Woven fabric-like visualization with different weave patterns indicating question performance",
    tags: "textile,fabric,pattern,woven"
  },
  {
    id: nextVariantId++,
    name: "Stained Glass Matrix",
    component: "StainedGlassMatrixView",
    baseComponent: "MatrixGridView",
    description: "Medieval stained glass window aesthetic with light passing through colored panels by mastery",
    tags: "stained-glass,medieval,artistic,illuminated"
  },
  {
    id: nextVariantId++,
    name: "Geological Cross Section",
    component: "GeologicalCrossSectionView",
    baseComponent: "MatrixGridView",
    description: "Layered rock formations showing 'depth' of knowledge across topics with stratified layers",
    tags: "geological,strata,layers,scientific"
  },
  {
    id: nextVariantId++,
    name: "Crystalline Structure",
    component: "CrystallineStructureView",
    baseComponent: "MatrixGridView",
    description: "3D crystal matrix with facets reflecting performance metrics across different dimensions",
    tags: "crystal,3d,geometric,reflective"
  }
];

// Display beautiful intro
visual.title('Question View Variants Generator');
visual.info(`Generating ${variants.length} beautiful question view variants`);
console.log();

// Group variants by base component for better visual organization
const baseComponents = {};
variants.forEach(variant => {
  if (!baseComponents[variant.baseComponent]) {
    baseComponents[variant.baseComponent] = [];
  }
  baseComponents[variant.baseComponent].push(variant);
});

// Track creation progress
let currentVariant = 0;
const totalVariants = variants.length;

// Create components for each base type
async function createComponents() {
  for (const [baseComponent, componentVariants] of Object.entries(baseComponents)) {
    visual.sectionTitle(`${baseComponent} Variants (${componentVariants.length})`);
    
    for (const variant of componentVariants) {
      currentVariant++;
      visual.progress(currentVariant, totalVariants, `Creating ${COLORS.bright}${variant.name}${COLORS.reset}...`);
      
      try {
        // Create the component directory
        const componentDir = path.join(
          __dirname, 
          '../src/components/review/question-view-variants', 
          `variant-${variant.id}`
        );
        
        if (!fs.existsSync(componentDir)) {
          fs.mkdirSync(componentDir, { recursive: true });
        }
        
        // Create the component file
        const componentPath = path.join(componentDir, 'Component.tsx');
        const baseComponentPath = path.join(
          __dirname, 
          '../src/components/review/question-view-variants', 
          `${variant.baseComponent}.tsx`
        );
        
        // Read the base component file
        const baseComponentContent = fs.readFileSync(baseComponentPath, 'utf8');
        
        // Modify it to create the new component
        let componentContent = baseComponentContent
          .replace(`export function ${variant.baseComponent}`, `export function ${variant.component}`)
          .replace(`${variant.baseComponent} (Question View Variant`, `${variant.component} (Question View Variant ${variant.id})`);
        
        // Replace the title in the component
        componentContent = componentContent.replace(
          /<h3 className="text-xl font-bold mb-6 text-center">[^<]*<\/h3>/,
          `<h3 className="text-xl font-bold mb-6 text-center">${variant.id}. ${variant.name}</h3>`
        );
        
        // Add the base component's name as a comment
        componentContent = componentContent.replace(
          /'use client'/,
          `'use client'\n\n// Based on ${variant.baseComponent}\n// ${variant.description}`
        );
        
        fs.writeFileSync(componentPath, componentContent);
        
        // Create the index file
        const indexPath = path.join(componentDir, 'index.ts');
        const indexContent = `'use client'

import { ${variant.component} } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: ${variant.id},
  name: '${variant.name}',
  description: '${variant.description}',
  category: 'question',
  tags: [${variant.tags.split(',').map(tag => `'${tag.trim()}'`).join(', ')}],
  isExperimental: false
})

// Export the component as default
export default ${variant.component}
`;
        fs.writeFileSync(indexPath, indexContent);
        
        // Update the registration file
        const registerAllPath = path.join(
          __dirname,
          '../src/components/review/question-view-variants/registerAllQuestionViews.ts'
        );
        
        let registerContent = fs.readFileSync(registerAllPath, 'utf8');
        
        // Find the last import line
        const importEndIndex = registerContent.indexOf("// Export a dummy function");
        if (importEndIndex !== -1) {
          const lines = registerContent.slice(0, importEndIndex).split('\n');
          let lastImportLine = 0;
          for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].trim().startsWith('import ')) {
              lastImportLine = i;
              break;
            }
          }
          
          // Add the new import line
          lines.splice(lastImportLine + 1, 0, `import './variant-${variant.id}/index'`);
          
          // Update the register content
          registerContent = [...lines, ...registerContent.slice(importEndIndex).split('\n')].join('\n');
          
          // Write back to file
          fs.writeFileSync(registerAllPath, registerContent);
        }
        
      } catch (error) {
        visual.error(`Error creating ${variant.component}:`);
        console.error(error);
      }
    }
    
    visual.success(`Completed all ${componentVariants.length} ${baseComponent} variants`);
    visual.separator();
  }
}

// Run the creation process with progress tracking
createComponents().then(() => {
  visual.title('Creation Complete!');
  
  // Display stats by base component
  console.log(`\n${COLORS.bright}${COLORS.white}Summary of Created Variants:${COLORS.reset}`);
  for (const [baseComponent, componentVariants] of Object.entries(baseComponents)) {
    console.log(`${COLORS.cyan}${baseComponent}:${COLORS.reset} ${componentVariants.length} variants (IDs ${componentVariants[0].id}-${componentVariants[componentVariants.length-1].id})`);
  }
  
  visual.success(`Successfully created ${COLORS.bright}${variants.length}${COLORS.reset} new question view variants!`);
  console.log(`\n${COLORS.bright}${COLORS.green}Your application now has beautiful visualizations for all types of question data!${COLORS.reset}\n`);
});
