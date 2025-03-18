#!/usr/bin/env node

/**
 * Variant Generation Script
 * 
 * This script automates the creation of new view variant registration files.
 * It takes parameters for the variant type, ID, name, and component name,
 * then generates the necessary files in the correct location with proper imports.
 * 
 * Usage:
 * node scripts/generate-variant.js [category] [id] [name] [component] [description] [tags]
 * 
 * Example:
 * node scripts/generate-variant.js question 4 "Diagnostic Dashboard" DiagnosticDashboardView "Comprehensive dashboard with analytics" "analytics,dashboard,performance"
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const [,, category, id, name, component, description, tags] = process.argv;

// Validate inputs
if (!category || !id || !name || !component) {
  console.error('Missing required parameters.');
  console.log('Usage: node scripts/generate-variant.js [category] [id] [name] [component] [description] [tags]');
  console.log('Example: node scripts/generate-variant.js question 4 "Diagnostic Dashboard" DiagnosticDashboardView "Comprehensive dashboard" "analytics,dashboard"');
  process.exit(1);
}

// Validate category
if (!['set', 'timeline', 'question'].includes(category)) {
  console.error('Category must be one of: set, timeline, question');
  process.exit(1);
}

// Generate the variant directory path
const variantDir = path.join(
  __dirname, 
  '../src/components/review', 
  `${category}-view-variants/variant-${id}`
);

// Create directory if it doesn't exist
if (!fs.existsSync(variantDir)) {
  fs.mkdirSync(variantDir, { recursive: true });
  console.log(`Created directory: ${variantDir}`);
}

// Generate the template content
const indexContent = `'use client'

import { ${component} } from '../${component}'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: ${id},
  name: '${name}',
  description: '${description || `${name} visualization for ${category} data`}',
  category: '${category}',
  tags: [${tags ? tags.split(',').map(tag => `'${tag.trim()}'`).join(', ') : ''}],
  isExperimental: false
})

// Export the component as default
export default ${component}
`;

// Write the index.ts file
fs.writeFileSync(path.join(variantDir, 'index.ts'), indexContent);
console.log(`Created variant-${id}/index.ts for ${category} view: ${name}`);

// Add the import to the registerAll file
const registerAllPath = path.join(
  __dirname, 
  '../src/components/review', 
  `${category}-view-variants/registerAll${category.charAt(0).toUpperCase() + category.slice(1)}Views.ts`
);

// Read existing content
if (fs.existsSync(registerAllPath)) {
  let registerContent = fs.readFileSync(registerAllPath, 'utf8');
  
  // Find the spot where we need to add the import
  const importEndIndex = registerContent.indexOf("// Export a dummy function");
  if (importEndIndex !== -1) {
    // Find the last import line
    const lines = registerContent.slice(0, importEndIndex).split('\n');
    let lastImportLine = 0;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportLine = i;
        break;
      }
    }
    
    // Add the new import line
    lines.splice(lastImportLine + 1, 0, `import './variant-${id}/index'`);
    
    // Update the register content
    registerContent = [...lines, ...registerContent.slice(importEndIndex).split('\n')].join('\n');
    
    // Write back to file
    fs.writeFileSync(registerAllPath, registerContent);
    console.log(`Updated ${registerAllPath} with import for variant-${id}`);
  } else {
    console.error(`Could not find import section in ${registerAllPath}`);
  }
} else {
  console.error(`Register file not found: ${registerAllPath}`);
}

console.log(`Successfully set up variant-${id} for ${category} view: ${name}`);
