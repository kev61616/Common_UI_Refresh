#!/usr/bin/env node

/**
 * Component Registration Script
 * 
 * This script automatically registers existing view components that haven't
 * yet been set up with the new variant registration system.
 * 
 * It scans the various view variant directories for components, and
 * for each component that doesn't have a variant registration, it
 * creates a new variant file with appropriate metadata.
 * 
 * Usage:
 * node scripts/register-existing-components.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper to convert component name to variant metadata
function getMetadataFromComponentName(componentName, category) {
  // Convert from CamelCase to words with spaces
  let name = componentName.replace(/([A-Z])/g, ' $1').trim();
  
  // Remove the category suffix if present
  name = name.replace(/\s?(View|Chart|Graph|Timeline)$/, '');
  
  // Get tags from component name
  const tags = [];
  if (name.includes('Dashboard')) tags.push('dashboard', 'analytics');
  if (name.includes('Chart')) tags.push('chart', 'data-visualization');
  if (name.includes('Map')) tags.push('map', 'spatial');
  if (name.includes('Graph')) tags.push('graph', 'network');
  if (name.includes('Tree')) tags.push('tree', 'hierarchical');
  if (name.includes('Timeline')) tags.push('chronological');
  if (name.includes('Interactive')) tags.push('interactive');
  if (name.includes('3D') || name.includes('Three')) tags.push('3d');
  
  // Default tags based on category
  if (category === 'set') tags.push('sets', 'collection');
  if (category === 'timeline') tags.push('timeline', 'chronological');
  if (category === 'question') tags.push('questions', 'analysis');
  
  // Format tags - remove duplicates and sort
  const uniqueTags = [...new Set(tags)];
  
  return {
    name,
    tags: uniqueTags,
    description: `${name} visualization for ${category === 'set' ? 'practice sets' : category === 'timeline' ? 'timelines' : 'questions'}`
  };
}

// Categories to process
const categories = ['set', 'question', 'timeline'];

// Track registered variants to avoid overlap
const registeredVariants = {
  set: [1, 2, 3, 4, 5, 6, 9, 10, 12],
  question: [1, 2, 3, 9, 36],
  timeline: [1, 2, 3, 5]
};

// Find existing components that need registration
categories.forEach(category => {
  const variantsDir = path.join(__dirname, `../src/components/review/${category}-view-variants`);
  
  // Skip if directory doesn't exist
  if (!fs.existsSync(variantsDir)) {
    console.log(`${category}-view-variants directory doesn't exist, skipping`);
    return;
  }
  
  // Get all component files (those ending with View.tsx)
  const files = fs.readdirSync(variantsDir)
    .filter(file => file.endsWith('View.tsx'));
    
  console.log(`Found ${files.length} ${category} view components`);
  
  // Process each component file
  files.forEach(file => {
    // Extract component name (without .tsx)
    const componentName = file.replace('.tsx', '');
    
    // Check if this component is already registered (by looking for a variant-X directory with an import for this component)
    let alreadyRegistered = false;
    const variantDirs = fs.readdirSync(variantsDir)
      .filter(dir => dir.startsWith('variant-') && fs.statSync(path.join(variantsDir, dir)).isDirectory());
      
    for (const dir of variantDirs) {
      const indexPath = path.join(variantsDir, dir, 'index.ts');
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        if (content.includes(`import { ${componentName} }`)) {
          alreadyRegistered = true;
          break;
        }
      }
    }
    
    if (alreadyRegistered) {
      console.log(`Component ${componentName} is already registered, skipping`);
      return;
    }
    
    // Find next available variant ID
    let nextId = 4; // Start from 4 as we've already registered some variants
    while (registeredVariants[category].includes(nextId)) {
      nextId++;
    }
    
    // Generate metadata
    const metadata = getMetadataFromComponentName(componentName, category);
    
    // Register this variant ID
    registeredVariants[category].push(nextId);
    
    // Run the generate-variant script
    try {
      const command = `node scripts/generate-variant.js ${category} ${nextId} "${metadata.name}" ${componentName} "${metadata.description}" "${metadata.tags.join(',')}"`;
      console.log(`Executing: ${command}`);
      execSync(command, { stdio: 'inherit' });
    } catch (error) {
      console.error(`Error registering ${componentName}: ${error.message}`);
    }
  });
});

console.log('Completed component registration process');
