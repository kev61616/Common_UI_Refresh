#!/usr/bin/env node

/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                Extra Question View Variants Generator Script              ║
 * ║                                                                          ║
 * ║ Creates 20 additional distinctive question view variants                 ║
 * ║ with rich, immersive visualizations and interactive elements             ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 * 
 * Usage: node scripts/generate-extra-question-views.js
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
    
    console.log(`${COLORS.green}╔${line}╗${COLORS.reset}`);
    console.log(`${COLORS.green}║${' '.repeat(padding)}${COLORS.bright}${COLORS.white}${displayText}${COLORS.reset}${COLORS.green}${' '.repeat(rightPadding)}║${COLORS.reset}`);
    console.log(`${COLORS.green}╚${line}╝${COLORS.reset}`);
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
    
    const bar = `${COLORS.bgGreen}${' '.repeat(filledWidth)}${COLORS.reset}${COLORS.bgBlack}${' '.repeat(emptyWidth)}${COLORS.reset}`;
    
    process.stdout.write(`\r${COLORS.green}[${bar}] ${percent}%${COLORS.reset} ${text}`);
    
    if (current === total) {
      process.stdout.write('\n');
    }
  },

  separator: () => {
    console.log(`\n${COLORS.dim}${COLORS.green}${'━'.repeat(process.stdout.columns || 80)}${COLORS.reset}\n`);
  }
};

// Starting variant ID (continue from where the previous script left off)
let nextVariantId = 73; 

// Define our new question view variants - 4 variants for each of the 5 base types (KnowledgeTreeView, HeatmapView, MatrixGridView, TagCloudView, ConceptMapView)
const variants = [
  // KnowledgeTreeView extended variants (4 more)
  {
    id: nextVariantId++,
    name: "Origami Knowledge Tree",
    component: "OrigamiKnowledgeTreeView",
    baseComponent: "KnowledgeTreeView",
    description: "Paper-folding inspired hierarchical knowledge representation with origami-styled nodes and branches",
    tags: "origami,paper,folding,hierarchical"
  },
  {
    id: nextVariantId++,
    name: "Bonsai Knowledge Tree",
    component: "BonsaiKnowledgeTreeView",
    baseComponent: "KnowledgeTreeView",
    description: "Artistic bonsai tree visualization with topic branches and question leaves growing based on mastery",
    tags: "bonsai,artistic,growth,zen"
  },
  {
    id: nextVariantId++,
    name: "Underwater Coral Tree",
    component: "UnderwaterCoralTreeView",
    baseComponent: "KnowledgeTreeView",
    description: "Ocean-inspired knowledge tree with coral formations representing topic clusters and question nodes",
    tags: "underwater,coral,ocean,aquatic"
  },
  {
    id: nextVariantId++,
    name: "Winter Frost Tree",
    component: "WinterFrostTreeView",
    baseComponent: "KnowledgeTreeView",
    description: "Snow-covered tree with ice crystal formations representing knowledge areas and frost patterns for mastery",
    tags: "winter,frost,snow,seasonal"
  },
  
  // HeatmapView extended variants (4 more)
  {
    id: nextVariantId++,
    name: "Volcanic Activity Heatmap",
    component: "VolcanicActivityHeatmapView",
    baseComponent: "HeatmapView",
    description: "Volcanic regions visualization with magma hotspots and cooling areas representing knowledge intensity",
    tags: "volcanic,magma,geological,intense"
  },
  {
    id: nextVariantId++,
    name: "Neural Activation Heatmap",
    component: "NeuralActivationHeatmapView",
    baseComponent: "HeatmapView",
    description: "Brain-inspired neural activation patterns showing firing intensity across knowledge regions",
    tags: "neural,brain,activation,scientific"
  },
  {
    id: nextVariantId++,
    name: "Watercolor Wash Heatmap",
    component: "WatercolorWashHeatmapView",
    baseComponent: "HeatmapView",
    description: "Artistic watercolor visualization with color bleeding and intensity showing mastery gradients",
    tags: "watercolor,artistic,gradient,painting"
  },
  {
    id: nextVariantId++,
    name: "Sound Wave Heatmap",
    component: "SoundWaveHeatmapView",
    baseComponent: "HeatmapView",
    description: "Audio-inspired heatmap with frequency and amplitude patterns representing knowledge areas",
    tags: "sound,audio,wave,frequency"
  },
  
  // MatrixGridView extended variants (4 more)
  {
    id: nextVariantId++,
    name: "Illuminated Manuscript Grid",
    component: "IlluminatedManuscriptGridView",
    baseComponent: "MatrixGridView",
    description: "Medieval manuscript-styled grid with illuminated borders and decorated knowledge cells",
    tags: "manuscript,medieval,illuminated,historic"
  },
  {
    id: nextVariantId++,
    name: "Cyberpunk Circuit Grid",
    component: "CyberpunkCircuitGridView",
    baseComponent: "MatrixGridView",
    description: "Futuristic neon-lit circuit board layout with glowing connections between knowledge nodes",
    tags: "cyberpunk,neon,futuristic,glowing"
  },
  {
    id: nextVariantId++,
    name: "Japanese Tatami Grid",
    component: "JapaneseTatamiGridView",
    baseComponent: "MatrixGridView",
    description: "Traditional Japanese tatami mat-inspired grid with zen garden elements and balance indicators",
    tags: "tatami,japanese,zen,traditional"
  },
  {
    id: nextVariantId++,
    name: "Honeycomb Matrix",
    component: "HoneycombMatrixView",
    baseComponent: "MatrixGridView",
    description: "Natural hexagonal honeycomb structure with cell filling patterns showing mastery progression",
    tags: "honeycomb,hexagonal,natural,structured"
  },
  
  // TagCloudView extended variants (4 more)
  {
    id: nextVariantId++,
    name: "Constellation Tag Cloud",
    component: "ConstellationTagCloudView",
    baseComponent: "TagCloudView",
    description: "Night sky visualization where tags form constellations connected by starry lines",
    tags: "constellation,stars,night,astronomy"
  },
  {
    id: nextVariantId++,
    name: "Bubble Float Tag Cloud",
    component: "BubbleFloatTagCloudView",
    baseComponent: "TagCloudView",
    description: "Floating bubble visualization where tags exist in different sized spheres with animated movement",
    tags: "bubbles,floating,animated,playful"
  },
  {
    id: nextVariantId++,
    name: "Typography Art Tag Cloud",
    component: "TypographyArtTagCloudView",
    baseComponent: "TagCloudView",
    description: "Artistic typography-focused tag visualization with font variations and calligraphic elements",
    tags: "typography,calligraphy,artistic,fonts"
  },
  {
    id: nextVariantId++,
    name: "Autumn Leaves Tag Cloud",
    component: "AutumnLeavesTagCloudView",
    baseComponent: "TagCloudView",
    description: "Seasonal tag visualization with falling autumn leaves containing knowledge elements",
    tags: "autumn,leaves,seasonal,organic"
  },
  
  // ConceptMapView extended variants (4 more)
  {
    id: nextVariantId++,
    name: "Renaissance Diagram Concept Map",
    component: "RenaissanceDiagramConceptMapView",
    baseComponent: "ConceptMapView",
    description: "Leonardo da Vinci inspired concept visualization with detailed anatomical-style diagrams",
    tags: "renaissance,diagram,historical,detailed"
  },
  {
    id: nextVariantId++,
    name: "Quantum Field Concept Map",
    component: "QuantumFieldConceptMapView",
    baseComponent: "ConceptMapView",
    description: "Quantum physics inspired concept visualization with probability fields and energy states",
    tags: "quantum,physics,probabilistic,scientific"
  },
  {
    id: nextVariantId++,
    name: "Dreamscape Concept Map",
    component: "DreamscapeConceptMapView",
    baseComponent: "ConceptMapView",
    description: "Surrealist dream-inspired fluid concept mapping with morphing connections and transitions",
    tags: "dreamscape,surreal,fluid,artistic"
  },
  {
    id: nextVariantId++,
    name: "Ancient Cave Painting Concept Map",
    component: "CavePaintingConceptMapView",
    baseComponent: "ConceptMapView",
    description: "Prehistoric cave art inspired concept mapping with primal symbols and ochre coloring",
    tags: "cave-painting,ancient,primal,symbolic"
  }
];

// Display beautiful intro
visual.title('Extra Question View Variants Generator');
visual.info(`Generating ${variants.length} additional beautiful question view variants`);
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
    visual.sectionTitle(`${baseComponent} Extended Variants (${componentVariants.length})`);
    
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
    
    visual.success(`Completed all ${componentVariants.length} ${baseComponent} extended variants`);
    visual.separator();
  }
}

// Run the creation process with progress tracking
createComponents().then(() => {
  visual.title('Extended Question Views Creation Complete!');
  
  // Display stats by base component
  console.log(`\n${COLORS.bright}${COLORS.white}Summary of Additional Question View Variants:${COLORS.reset}`);
  for (const [baseComponent, componentVariants] of Object.entries(baseComponents)) {
    console.log(`${COLORS.cyan}${baseComponent}:${COLORS.reset} ${componentVariants.length} variants (IDs ${componentVariants[0].id}-${componentVariants[componentVariants.length-1].id})`);
  }
  
  visual.success(`Successfully created ${COLORS.bright}${variants.length}${COLORS.reset} additional question view variants!`);
  console.log(`\n${COLORS.bright}${COLORS.green}Your application now has even more beautiful question visualizations!${COLORS.reset}\n`);
});
