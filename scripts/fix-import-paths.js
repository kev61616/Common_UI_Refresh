#!/usr/bin/env node

/**
 * Fix Import Paths Script
 * 
 * This script scans all variant component files and updates imports to use correct
 * relative paths based on the component's location in the directory structure.
 * 
 * Usage:
 * node scripts/fix-import-paths.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Define the component category directories
const VARIANT_DIRS = [
  'src/components/review/question-view-variants',
  'src/components/review/set-view-variants',
  'src/components/review/timeline-view-variants'
];

// Define import patterns to fix
const IMPORT_PATTERNS = [
  {
    // Match imports from ../question-view/*
    regex: /from ['"]\.\.\/question-view\/([^'"]+)['"]/g,
    replacement: (_, file) => `from '../../question-view/${file}'`
  },
  {
    // Match imports from ../set-view/*
    regex: /from ['"]\.\.\/set-view\/([^'"]+)['"]/g,
    replacement: (_, file) => `from '../../set-view/${file}'`
  },
  {
    // Match imports from ../timeline-view/*
    regex: /from ['"]\.\.\/timeline-view\/([^'"]+)['"]/g,
    replacement: (_, file) => `from '../../timeline-view/${file}'`
  },
  {
    // Match imports from ./types
    regex: /from ['"]\.\/types['"]/g,
    replacement: (match, file, componentType) => {
      if (file.endsWith('Component.tsx')) {
        // If we're in a variant directory's Component.tsx file,
        // import types from the parent component's types file
        const parentDir = componentType.replace('-variants', '');
        return `from '../../${parentDir}/types'`;
      }
      return match; // Keep the import as is for non-Component files
    }
  },
  {
    // Fix self-referential imports for QuestionWithMetadata
    regex: /import\s+{\s*QuestionWithMetadata\s*}\s+from\s+['"]\.\.\/\.\.\/question-view\/([^'"]+)\.tsx['"]/g,
    replacement: () => `import { QuestionWithMetadata } from '../question-view/types'`
  },
  {
    // Fix self-referential imports for extractQuestionsWithMetadata
    regex: /import\s+{\s*extractQuestionsWithMetadata\s*}\s+from\s+['"]\.\.\/\.\.\/question-view\/([^'"]+)\.tsx['"]/g,
    replacement: () => `import { extractQuestionsWithMetadata } from '../question-view/utils'`
  },
  {
    // Fix general imports from ../../question-view/types
    regex: /import\s+{([^}]+)}\s+from\s+['"]\.\.\/\.\.\/question-view\/types['"]/g,
    replacement: () => `import {$1} from '../question-view/types'`
  },
  {
    // Fix general imports from ../../question-view/utils
    regex: /import\s+{([^}]+)}\s+from\s+['"]\.\.\/\.\.\/question-view\/utils['"]/g,
    replacement: () => `import {$1} from '../question-view/utils'`
  }
];

/**
 * Recursively finds all TypeScript files in a directory
 */
async function findTsFiles(dir) {
  const files = [];
  const entries = await readdir(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      files.push(...await findTsFiles(fullPath));
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Updates import paths in a file
 */
async function updateImportPaths(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let updatedContent = content;
    let changed = false;
    
    // Get the component name from the file path
    const fileName = path.basename(filePath, path.extname(filePath));
    
    // Determine component type from file path
    const componentType = VARIANT_DIRS.find(dir => filePath.includes(dir))?.split('/').pop() || '';
    
    // Add custom pattern for self-referential imports specific to this component
    const componentSelfReferencePattern = {
      regex: new RegExp(`from\\s+['"]\\.\\.\/\\.\\.\/question-view\\/${fileName}\\.tsx['"]`, 'g'),
      replacement: (match) => {
        console.log(`  Found self-reference in ${fileName}`);
        if (match.includes('QuestionWithMetadata')) {
          return `from '../../question-view/types'`;
        } else if (match.includes('extractQuestionsWithMetadata')) {
          return `from '../../question-view/utils'`;
        }
        return match;
      }
    };
    
    // Apply custom pattern for this component first
    const beforeCustom = updatedContent;
    updatedContent = updatedContent.replace(componentSelfReferencePattern.regex, componentSelfReferencePattern.replacement);
    if (beforeCustom !== updatedContent) {
      changed = true;
      console.log(`  Fixed self-references in ${filePath}`);
    }
    
    // Apply each standard import pattern fix
    for (const pattern of IMPORT_PATTERNS) {
      const originalContent = updatedContent;
      updatedContent = updatedContent.replace(pattern.regex, (match, ...args) => {
        return pattern.replacement(match, path.basename(filePath), componentType, ...args);
      });
      
      if (originalContent !== updatedContent) {
        changed = true;
      }
    }
    
    // Also fix onSelectSet to check for undefined
    if (filePath.includes('Component.tsx') || filePath.endsWith('View.tsx')) {
      const onSelectSetPattern = /onClick={\(\) => onSelectSet\(([^)]+)\)}/g;
      const onSelectSetReplacement = 'onClick={() => onSelectSet && onSelectSet($1)}';
      
      const originalContent = updatedContent;
      updatedContent = updatedContent.replace(onSelectSetPattern, onSelectSetReplacement);
      
      if (originalContent !== updatedContent) {
        changed = true;
      }
    }
    
    // Write updated content if changes were made
    if (changed) {
      await writeFile(filePath, updatedContent);
      console.log(`✓ Updated imports in ${filePath}`);
      return 1;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return 0;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Fix Import Paths');
  console.log('================');
  
  let totalFilesUpdated = 0;
  
  // Process each variant directory
  for (const dir of VARIANT_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`Directory ${dir} does not exist, skipping...`);
      continue;
    }
    
    console.log(`\nScanning ${dir}...`);
    const files = await findTsFiles(dir);
    console.log(`Found ${files.length} TypeScript files.`);
    
    let filesUpdated = 0;
    
    // Process each file
    for (const file of files) {
      filesUpdated += await updateImportPaths(file);
    }
    
    console.log(`Updated imports in ${filesUpdated} files.`);
    totalFilesUpdated += filesUpdated;
  }
  
  console.log(`\nTotal files updated: ${totalFilesUpdated}`);
}

main().catch(console.error);
