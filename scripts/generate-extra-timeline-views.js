#!/usr/bin/env node

/**
 * ╔════════════════════════════════════════════════════════════════════════════╗
 * ║               Extra Timeline View Variants Generator Script                 ║
 * ║                                                                            ║
 * ║ Creates 20 additional distinctive timeline view variants                   ║
 * ║ with chronological visualizations for tracking practice history            ║
 * ╚════════════════════════════════════════════════════════════════════════════╝
 * 
 * Usage: node scripts/generate-extra-timeline-views.js
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
    
    console.log(`${COLORS.blue}╔${line}╗${COLORS.reset}`);
    console.log(`${COLORS.blue}║${' '.repeat(padding)}${COLORS.bright}${COLORS.white}${displayText}${COLORS.reset}${COLORS.blue}${' '.repeat(rightPadding)}║${COLORS.reset}`);
    console.log(`${COLORS.blue}╚${line}╝${COLORS.reset}`);
  },
  
  sectionTitle: (text) => {
    console.log(`\n${COLORS.bright}${COLORS.cyan}⏰ ${text} ${COLORS.reset}`);
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
    
    const bar = `${COLORS.bgBlue}${' '.repeat(filledWidth)}${COLORS.reset}${COLORS.bgBlack}${' '.repeat(emptyWidth)}${COLORS.reset}`;
    
    process.stdout.write(`\r${COLORS.blue}[${bar}] ${percent}%${COLORS.reset} ${text}`);
    
    if (current === total) {
      process.stdout.write('\n');
    }
  },
  
  timelineIcon: (index, name) => {
    const icons = ['⏱️', '🕰️', '⏲️', '⌛', '⏳', '📅', '🗓️', '📆', '📊', '📈', '📉', '🔄', '🔁', '🔃', '🕛', '🕧', '🕐', '🕜', '🕑', '🕝'];
    const icon = icons[index % icons.length];
    console.log(`\n${COLORS.blue}${icon} ${COLORS.bright}${name}${COLORS.reset}`);
  },

  timelineBanner: () => {
    const timelineBanner = [
      `${COLORS.blue}⏪━━━━━━ ${COLORS.cyan}Past${COLORS.blue} ━━━━━━━━━━ ${COLORS.yellow}Present${COLORS.blue} ━━━━━━━━━━ ${COLORS.green}Future${COLORS.blue} ━━━━━━⏩${COLORS.reset}`,
      `${COLORS.blue}          ○─────○─────○─────○─────●─────○─────○─────○          ${COLORS.reset}`,
      `${COLORS.cyan}       History   ${COLORS.yellow}          Now   ${COLORS.green}             Upcoming       ${COLORS.reset}`
    ];
    timelineBanner.forEach(line => console.log(line));
  },

  separator: () => {
    console.log(`\n${COLORS.dim}${COLORS.blue}${'━'.repeat(process.stdout.columns || 80)}${COLORS.reset}\n`);
  }
};

// Starting variant ID (continue from where existing timeline views end)
let nextVariantId = 21; 

// Define our new timeline view variants
const variants = [
  // Historical/cultural inspired
  {
    id: nextVariantId++,
    name: "Geological Eras Timeline",
    component: "GeologicalErasTimeline",
    description: "Stratified rock layer visualization where learning journey is mapped to geological time periods",
    tags: "geological,stratified,eras,historical"
  },
  {
    id: nextVariantId++,
    name: "Historical Dynasty Timeline",
    component: "HistoricalDynastyTimeline",
    description: "Ancient civilization inspired timeline showing practice history across dynastic periods",
    tags: "dynasty,civilization,historical,antiquity"
  },
  {
    id: nextVariantId++,
    name: "Evolutionary Tree Timeline",
    component: "EvolutionaryTreeTimeline",
    description: "Darwinian evolution-inspired timeline showing knowledge branching and adaptation over time",
    tags: "evolution,branching,adaptation,biological"
  },
  {
    id: nextVariantId++,
    name: "Renaissance Codex Timeline",
    component: "RenaissanceCodexTimeline",
    description: "Illuminated manuscript timeline with ornate decorations marking significant learning events",
    tags: "renaissance,manuscript,artistic,historical"
  },

  // Modern design inspired
  {
    id: nextVariantId++,
    name: "Parallax Scrolling Timeline",
    component: "ParallaxScrollingTimeline",
    description: "Multi-layered timeline with depth perception created through parallax scrolling effects",
    tags: "parallax,depth,scrolling,modern"
  },
  {
    id: nextVariantId++,
    name: "Neon Cyberpunk Timeline",
    component: "NeonCyberpunkTimeline",
    description: "Futuristic timeline with neon glow effects and cyberpunk-inspired visual elements",
    tags: "neon,cyberpunk,futuristic,glowing"
  },
  {
    id: nextVariantId++,
    name: "Isometric Building Timeline",
    component: "IsometricBuildingTimeline",
    description: "3D isometric building construction showing progress as floors added over time",
    tags: "isometric,building,architectural,construction"
  },
  {
    id: nextVariantId++,
    name: "Material Design Timeline",
    component: "MaterialDesignTimeline",
    description: "Google's Material Design inspired timeline with paper layers and elevation shadows",
    tags: "material,elevation,modern,layered"
  },

  // Scientific/data visualization inspired
  {
    id: nextVariantId++,
    name: "DNA Sequence Timeline",
    component: "DnaSequenceTimeline",
    description: "Genetic code inspired visualization with practice history encoded in DNA-like structures",
    tags: "dna,genetic,scientific,sequence"
  },
  {
    id: nextVariantId++,
    name: "Particle Physics Timeline",
    component: "ParticlePhysicsTimeline",
    description: "Quantum physics inspired timeline with particle interactions representing learning events",
    tags: "particle,physics,quantum,scientific"
  },
  {
    id: nextVariantId++,
    name: "Weather Pattern Timeline",
    component: "WeatherPatternTimeline",
    description: "Meteorological chart inspired timeline showing learning climate changes over time",
    tags: "weather,meteorological,patterns,forecasting"
  },
  {
    id: nextVariantId++,
    name: "Spiral Galaxy Timeline",
    component: "SpiralGalaxyTimeline",
    description: "Astronomical visualization with practice history forming a spiral galaxy of events",
    tags: "galaxy,spiral,astronomical,cosmic"
  },

  // Interactive/playful designs
  {
    id: nextVariantId++,
    name: "Film Strip Timeline",
    component: "FilmStripTimeline",
    description: "Cinema-inspired timeline displaying learning journey as frames on a movie reel",
    tags: "cinema,filmstrip,frames,visual"
  },
  {
    id: nextVariantId++,
    name: "Vinyl Record Timeline",
    component: "VinylRecordTimeline",
    description: "Musical timeline where practice history is tracked in vinyl record grooves and tracks",
    tags: "vinyl,music,records,analog"
  },
  {
    id: nextVariantId++,
    name: "Pinball Machine Timeline",
    component: "PinballMachineTimeline",
    description: "Game-inspired timeline with practice events as pinball machine elements and scoring zones",
    tags: "pinball,game,interactive,playful"
  },
  {
    id: nextVariantId++,
    name: "Train Journey Timeline",
    component: "TrainJourneyTimeline",
    description: "Railway inspired timeline with stations representing milestones in the learning journey",
    tags: "railway,journey,stations,travel"
  },

  // Natural/organic themes
  {
    id: nextVariantId++,
    name: "River Delta Timeline",
    component: "RiverDeltaTimeline",
    description: "Flowing water visualization where knowledge streams branch and converge over time",
    tags: "river,delta,flowing,natural"
  },
  {
    id: nextVariantId++,
    name: "Tree Rings Timeline",
    component: "TreeRingsTimeline",
    description: "Dendrochronology inspired timeline with practice history recorded in tree growth rings",
    tags: "treerings,growth,natural,organic"
  },
  {
    id: nextVariantId++,
    name: "Seasonal Cycle Timeline",
    component: "SeasonalCycleTimeline",
    description: "Yearly seasonal changes visualized as repeating cycles with different practice themes",
    tags: "seasons,cycles,nature,repeating"
  },
  {
    id: nextVariantId++,
    name: "Tidal Wave Timeline",
    component: "TidalWaveTimeline",
    description: "Ocean-inspired timeline with tidal patterns showing intensity of practice activities",
    tags: "tidal,waves,ocean,rhythmic"
  }
];

// Display beautiful intro
visual.title('Extra Timeline View Variants Generator');
visual.info(`Generating ${variants.length} additional beautiful timeline view variants`);
visual.timelineBanner();
console.log();

// Visualize all the variants we'll create
visual.sectionTitle('Timeline Variations To Be Created');
variants.forEach((variant, index) => {
  visual.timelineIcon(index, variant.name);
  console.log(`${COLORS.dim}${variant.description}${COLORS.reset}`);
});

visual.separator();

// Track creation progress
let currentVariant = 0;
const totalVariants = variants.length;

// Chronologically animate the creation
async function createComponents() {
  visual.sectionTitle(`Creating ${variants.length} New Timeline View Variants`);
  
  for (const variant of variants) {
    currentVariant++;
    visual.progress(currentVariant, totalVariants, `Creating ${COLORS.bright}${variant.name}${COLORS.reset}...`);
    
    try {
      // Create the component directory
      const componentDir = path.join(
        __dirname, 
        '../src/components/review/timeline-view-variants', 
        `variant-${variant.id}`
      );
      
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
      }
      
      // Create the index file - we'll use the generate-variant.js script
      const command = `node scripts/generate-variant.js timeline ${variant.id} "${variant.name}" ${variant.component} "${variant.description}" "${variant.tags}"`;
      execSync(command, { stdio: 'pipe' });
      
      // Add some delay to create a sense of time passing
      await new Promise(resolve => setTimeout(resolve, 100));
      
      visual.success(`Created timeline view: ${COLORS.bright}${COLORS.cyan}${variant.name}${COLORS.reset}`);
    } catch (error) {
      visual.error(`Error creating ${variant.name}:`);
      console.error(error);
    }
  }
}

// Run the creation process with progress tracking
createComponents().then(() => {
  visual.title('Extended Timeline Views Creation Complete!');
  
  visual.success(`Successfully created ${COLORS.bright}${variants.length}${COLORS.reset} additional timeline view variants!`);
  console.log(`\n${COLORS.bright}${COLORS.blue}Your application now has ${variants.length} more beautiful timeline visualizations!${COLORS.reset}`);
  
  // Show a timeline visualization of the variants
  console.log(`\n${COLORS.bright}${COLORS.white}Newly Added Timeline Views:${COLORS.reset}`);
  console.log(`${COLORS.blue}${'─'.repeat(process.stdout.columns || 80)}${COLORS.reset}`);
  
  let timeline = '';
  variants.forEach((variant, index) => {
    // Create a dot on the timeline
    const position = Math.floor((index / (variants.length - 1)) * 60);
    const timelineBefore = '─'.repeat(position);
    const timelineAfter = '─'.repeat(60 - position);
    timeline = `${COLORS.dim}${timelineBefore}${COLORS.reset}${COLORS.bright}${COLORS.blue}◆${COLORS.reset}${COLORS.dim}${timelineAfter}${COLORS.reset}`;
    
    console.log(`${timeline} ${COLORS.blue}${variant.id}.${COLORS.reset} ${COLORS.bright}${variant.name}${COLORS.reset}`);
  });
  
  console.log(`${COLORS.blue}${'─'.repeat(process.stdout.columns || 80)}${COLORS.reset}`);
  console.log(`\n${COLORS.green}All timeline views have been registered and are ready to use!${COLORS.reset}\n`);
});
