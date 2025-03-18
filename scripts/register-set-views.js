#!/usr/bin/env node

/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                   Set View Registration Script                 ║
 * ║                                                               ║
 * ║  Registers all set view components with the new modular system ║
 * ╚═══════════════════════════════════════════════════════════════╝
 * 
 * Usage: node scripts/register-set-views.js
 */

const { execSync } = require('child_process');

// ANSI color codes
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
    
    console.log(`${COLORS.cyan}╔${line}╗${COLORS.reset}`);
    console.log(`${COLORS.cyan}║${' '.repeat(padding)}${COLORS.bright}${COLORS.white}${text}${COLORS.reset}${COLORS.cyan}${' '.repeat(width - text.length - padding - 2)}║${COLORS.reset}`);
    console.log(`${COLORS.cyan}╚${line}╝${COLORS.reset}`);
  },
  
  sectionTitle: (text) => {
    console.log(`\n${COLORS.bright}${COLORS.magenta}■ ${text} ${COLORS.reset}`);
    console.log(`${COLORS.magenta}${'─'.repeat(text.length + 4)}${COLORS.reset}`);
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
    
    const bar = `${COLORS.bgCyan}${' '.repeat(filledWidth)}${COLORS.reset}${COLORS.bgBlack}${' '.repeat(emptyWidth)}${COLORS.reset}`;
    
    process.stdout.write(`\r${COLORS.cyan}[${bar}] ${percent}%${COLORS.reset} ${text}`);
    
    if (current === total) {
      process.stdout.write('\n');
    }
  }
};

// Define set views to register
const setViews = [
  {
    id: 7,
    name: "Radial View",
    component: "RadialView", 
    description: "Circular arrangement of sets radiating from a central point",
    tags: "radial,circular,interactive"
  },
  {
    id: 8,
    name: "Carousel View",
    component: "CarouselView",
    description: "Horizontal scrolling carousel of practice set cards",
    tags: "carousel,scrolling,interactive"
  },
  {
    id: 11,
    name: "3D Card Flip View",
    component: "CardFlipView",
    description: "Interactive 3D flipping cards for practice sets",
    tags: "3d,cards,interactive,flip"
  },
  {
    id: 13,
    name: "Mood-Based View",
    component: "MoodBasedView",
    description: "Practice sets arranged by emotional response and engagement level",
    tags: "mood,emotional,engagement"
  },
  {
    id: 14,
    name: "Artistic Gallery View",
    component: "ArtisticGalleryView",
    description: "Visual gallery presentation with artistic elements for practice sets",
    tags: "gallery,artistic,visual"
  },
  {
    id: 15,
    name: "Mind Map View",
    component: "MindMapView",
    description: "Connected nodes showing relationships between practice sets",
    tags: "mindmap,connections,relationships"
  },
  {
    id: 16,
    name: "Metro Tile Design View",
    component: "MetroTileView",
    description: "Grid of differently sized tiles representing practice sets",
    tags: "metro,tiles,grid"
  },
  {
    id: 17,
    name: "Timeline Spiral View",
    component: "TimelineSpiralView",
    description: "Spiral arrangement of practice sets by completion time",
    tags: "spiral,timeline,chronological"
  },
  {
    id: 18,
    name: "Accordion Panels View",
    component: "AccordionPanelsView",
    description: "Expandable/collapsible panels for organizing practice sets by category",
    tags: "accordion,expandable,organized"
  },
  {
    id: 19,
    name: "Magazine Layout View",
    component: "MagazineLayoutView",
    description: "Magazine-style layout with featured sets and categorized sections",
    tags: "magazine,featured,layout"
  },
  {
    id: 20,
    name: "Global Map View",
    component: "GlobalMapView",
    description: "World map visualization with practice sets positioned by topic regions",
    tags: "map,global,geographical"
  }
];

// Display beautiful intro
visual.title('Set View Registration');
visual.info(`Found ${setViews.length} set views to register`);
console.log();

// Register each set view with progress bar
setViews.forEach((view, index) => {
  try {
    visual.progress(index, setViews.length, `Processing: ${COLORS.bright}${view.name}${COLORS.reset}...`);
    
    const command = `node scripts/generate-variant.js set ${view.id} "${view.name}" ${view.component} "${view.description}" "${view.tags}"`;
    execSync(command, { stdio: 'pipe' });
    
    visual.success(`Registered view ${COLORS.bright}${COLORS.cyan}${view.id}. ${view.name}${COLORS.reset}`);
  } catch (error) {
    visual.error(`Failed to register ${view.name}: ${error.message}`);
  }
});

visual.progress(setViews.length, setViews.length, 'All views processed');

// Completion message
console.log('\n');
visual.title('Registration Complete');
visual.success(`Successfully registered ${setViews.length} set views`);
console.log(`\n${COLORS.bright}${COLORS.green}The system now has gorgeous visualizations for all ${setViews.length} set views!${COLORS.reset}\n`);
