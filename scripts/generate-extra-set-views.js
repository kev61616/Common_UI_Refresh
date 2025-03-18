#!/usr/bin/env node

/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                Extra Set View Variants Generator Script                ║
 * ║                                                                       ║
 * ║ Creates 20 additional distinctive set view variants                   ║
 * ║ with immersive visualizations for practice set collections            ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 * 
 * Usage: node scripts/generate-extra-set-views.js
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
    // Calculate padding, ensuring it's not negative
    const padding = Math.max(0, Math.floor((width - text.length - 4) / 2));
    const line = '═'.repeat(width - 2);
    
    // Truncate text if it's too long
    const displayText = text.length > width - 4 ? text.substring(0, width - 7) + '...' : text;
    
    // Calculate right padding, ensuring it's not negative
    const rightPadding = Math.max(0, width - displayText.length - padding - 2);
    
    console.log(`${COLORS.yellow}╔${line}╗${COLORS.reset}`);
    console.log(`${COLORS.yellow}║${' '.repeat(padding)}${COLORS.bright}${COLORS.white}${displayText}${COLORS.reset}${COLORS.yellow}${' '.repeat(rightPadding)}║${COLORS.reset}`);
    console.log(`${COLORS.yellow}╚${line}╝${COLORS.reset}`);
  },
  
  sectionTitle: (text) => {
    console.log(`\n${COLORS.bright}${COLORS.blue}⬢ ${text} ${COLORS.reset}`);
    console.log(`${COLORS.blue}${'─'.repeat(text.length + 4)}${COLORS.reset}`);
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
    
    const bar = `${COLORS.bgYellow}${' '.repeat(filledWidth)}${COLORS.reset}${COLORS.bgBlack}${' '.repeat(emptyWidth)}${COLORS.reset}`;
    
    process.stdout.write(`\r${COLORS.yellow}[${bar}] ${percent}%${COLORS.reset} ${text}`);
    
    if (current === total) {
      process.stdout.write('\n');
    }
  },

  setIcon: (index, name) => {
    const icons = ['📚', '📒', '📓', '📔', '📕', '📗', '📘', '📙', '📚', '🗂️', '📁', '📑', '📝', '📖', '📰', '🗃️', '📊', '📈', '📋', '📌'];
    const icon = icons[index % icons.length];
    console.log(`\n${COLORS.yellow}${icon} ${COLORS.bright}${name}${COLORS.reset}`);
  },

  separator: () => {
    console.log(`\n${COLORS.dim}${COLORS.yellow}${'━'.repeat(process.stdout.columns || 80)}${COLORS.reset}\n`);
  }
};

// Starting variant ID (continue from where existing set views end)
let nextVariantId = 21; 

// Define our new set view variants
const variants = [
  // Nature-inspired views
  {
    id: nextVariantId++,
    name: "Celestial Observatory View",
    component: "CelestialObservatoryView",
    description: "Planetary system visualization where sets orbit as planets with satellites representing assignments",
    tags: "celestial,astronomy,orbit,cosmos"
  },
  {
    id: nextVariantId++,
    name: "Coral Reef Ecosystem View",
    component: "CoralReefEcosystemView",
    description: "Underwater reef ecosystem where practice sets exist as coral formations with fish as activities",
    tags: "coral,underwater,ecosystem,marine"
  },
  {
    id: nextVariantId++,
    name: "Mountain Range Explorer View",
    component: "MountainRangeExplorerView",
    description: "Topographic mountain range where practice set difficulty forms peaks and valleys to explore",
    tags: "mountains,topographic,terrain,elevation"
  },
  {
    id: nextVariantId++,
    name: "Seasonal Garden View",
    component: "SeasonalGardenView",
    description: "Garden that changes with seasons, where sets are plants growing through different stages",
    tags: "garden,seasonal,growth,nature"
  },

  // Architecture and spaces
  {
    id: nextVariantId++,
    name: "Museum Gallery View",
    component: "MuseumGalleryView",
    description: "Museum exhibit halls showcasing practice sets as artwork with guided tour navigation",
    tags: "museum,gallery,exhibit,cultural"
  },
  {
    id: nextVariantId++,
    name: "Ancient Temple View",
    component: "AncientTempleView",
    description: "Ancient temple complex where sets are arranged as shrines and sanctuaries by subject",
    tags: "temple,ancient,sacred,historical"
  },
  {
    id: nextVariantId++,
    name: "City District View",
    component: "CityDistrictView",
    description: "Urban planning visualization with neighborhoods representing subject areas and buildings as sets",
    tags: "city,urban,district,metropolitan"
  },
  {
    id: nextVariantId++,
    name: "Library Archive View",
    component: "LibraryArchiveView",
    description: "Vast library with shelves, reading rooms and special collections organizing practice sets",
    tags: "library,books,archive,knowledge"
  },

  // Abstract & data visualizations
  {
    id: nextVariantId++,
    name: "Holographic Projection View",
    component: "HolographicProjectionView",
    description: "Futuristic 3D holographic interface for manipulating and exploring practice set collections",
    tags: "holographic,futuristic,3d,interactive"
  },
  {
    id: nextVariantId++,
    name: "Data Crystal View",
    component: "DataCrystalView",
    description: "Crystalline formations where practice sets form as geometric crystal clusters based on relations",
    tags: "crystal,geometric,faceted,prismatic"
  },
  {
    id: nextVariantId++,
    name: "Particle Flow View",
    component: "ParticleFlowView",
    description: "Physics-inspired flowing particle system where sets travel along momentum streams",
    tags: "particles,flow,physics,dynamic"
  },
  {
    id: nextVariantId++,
    name: "Fractal Dimension View",
    component: "FractalDimensionView",
    description: "Recursive fractal patterns that zoom and expand to reveal nested practice set relationships",
    tags: "fractal,recursive,mathematical,nested"
  },

  // Art & culture inspired
  {
    id: nextVariantId++,
    name: "Tapestry Weave View",
    component: "TapestryWeaveView",
    description: "Medieval-inspired tapestry where practice sets form a woven narrative of knowledge progress",
    tags: "tapestry,woven,medieval,textile"
  },
  {
    id: nextVariantId++,
    name: "Antique Map View",
    component: "AntiqueMapView",
    description: "Historical cartography-styled knowledge map with sea monsters and unexplored territories",
    tags: "map,antique,cartography,exploration"
  },
  {
    id: nextVariantId++,
    name: "Art Studio Gallery View",
    component: "ArtStudioGalleryView",
    description: "Artist's studio with practice sets displayed as works-in-progress on various easels and tables",
    tags: "studio,artist,creative,workspace"
  },
  {
    id: nextVariantId++,
    name: "Jazz Composition View",
    component: "JazzCompositionView",
    description: "Musical visualization where practice sets form notes and chords in a flowing jazz arrangement",
    tags: "jazz,music,composition,rhythm"
  },

  // Specialized metaphors
  {
    id: nextVariantId++,
    name: "Alchemy Laboratory View",
    component: "AlchemyLaboratoryView",
    description: "Medieval alchemist's workshop with practice sets as potions, scrolls and experimental apparatus",
    tags: "alchemy,laboratory,mystical,medieval"
  },
  {
    id: nextVariantId++,
    name: "Time Capsule View",
    component: "TimeCapsuleView",
    description: "Historical time capsule collection where sets are preserved artifacts from different eras",
    tags: "timecapsule,historical,artifacts,preservation"
  },
  {
    id: nextVariantId++,
    name: "Puzzle Box View",
    component: "PuzzleBoxView",
    description: "Intricate mechanical puzzle box with practice sets revealed as compartments are solved",
    tags: "puzzle,mechanical,mystery,interactive"
  },
  {
    id: nextVariantId++,
    name: "Zodiac Constellation View",
    component: "ZodiacConstellationView",
    description: "Astrological zodiac wheel with practice sets arranged as star constellations by subject",
    tags: "zodiac,astrological,constellation,celestial"
  }
];

// Display beautiful intro
visual.title('Extra Set View Variants Generator');
visual.info(`Generating ${variants.length} additional beautiful set view variants`);
console.log();

// Visualize all the variants we'll create
console.log(`${COLORS.bright}${COLORS.white}Set View Collection:${COLORS.reset}`);
variants.forEach((variant, index) => {
  visual.setIcon(index, variant.name);
  console.log(`${COLORS.dim}${variant.description}${COLORS.reset}`);
});

visual.separator();

// Track creation progress
let currentVariant = 0;
const totalVariants = variants.length;

// Create components
async function createComponents() {
  visual.sectionTitle(`Creating ${variants.length} New Set View Variants`);
  
  for (const variant of variants) {
    currentVariant++;
    visual.progress(currentVariant, totalVariants, `Creating ${COLORS.bright}${variant.name}${COLORS.reset}...`);
    
    try {
      // Create the component directory
      const componentDir = path.join(
        __dirname, 
        '../src/components/review/set-view-variants', 
        `variant-${variant.id}`
      );
      
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
      }
      
      // Create the index file - we'll use the generate-variant.js script
      const command = `node scripts/generate-variant.js set ${variant.id} "${variant.name}" ${variant.component} "${variant.description}" "${variant.tags}"`;
      execSync(command, { stdio: 'pipe' });
      
      visual.success(`Created set view: ${COLORS.bright}${COLORS.cyan}${variant.name}${COLORS.reset}`);
    } catch (error) {
      visual.error(`Error creating ${variant.name}:`);
      console.error(error);
    }
  }
}

// Run the creation process with progress tracking
createComponents().then(() => {
  visual.title('Extended Set Views Creation Complete!');
  
  visual.success(`Successfully created ${COLORS.bright}${variants.length}${COLORS.reset} additional set view variants!`);
  console.log(`\n${COLORS.bright}${COLORS.yellow}Your application now has ${variants.length} more beautiful set visualizations!${COLORS.reset}`);
  
  // Show a list with fancy formatting
  console.log(`\n${COLORS.bright}${COLORS.white}Newly Added Set Views:${COLORS.reset}`);
  console.log(`${COLORS.dim}${'─'.repeat(process.stdout.columns || 80)}${COLORS.reset}`);
  
  variants.forEach((variant, index) => {
    const padding = ' '.repeat(Math.max(0, 30 - variant.name.length));
    console.log(`${COLORS.yellow}${variant.id}.${COLORS.reset} ${COLORS.bright}${variant.name}${COLORS.reset}${padding} ${COLORS.dim}${variant.description.substring(0, 60)}...${COLORS.reset}`);
  });
  
  console.log(`${COLORS.dim}${'─'.repeat(process.stdout.columns || 80)}${COLORS.reset}`);
  console.log(`\n${COLORS.green}All set views have been registered and are ready to use!${COLORS.reset}\n`);
});
