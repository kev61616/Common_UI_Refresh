/**
 * Script to fix placeholder `$1` imports in component files
 * Replaces them with the proper imports that are required
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Directory with the component variants
const variantsDir = path.join(__dirname, '..', 'src', 'components', 'review', 'question-view-variants');

// Pattern to match for placeholder imports
const placeholderImportPattern = /import \{\$1\} from '\.\.\/\.\.\/question-view\/Component\.tsx'/g;
const correctImports = `import { QuestionViewProps } from '../types'
import { QuestionWithMetadata } from '../../question-view/types'
import { extractQuestionsWithMetadata } from '../../question-view/utils'`;

async function fixFile(filePath) {
  try {
    // Read the file
    const content = await readFileAsync(filePath, 'utf8');
    
    // Check if it contains the placeholder import
    if (placeholderImportPattern.test(content)) {
      console.log(`Fixing imports in ${filePath}`);
      
      // Replace the React import line and all placeholder imports
      const fixedContent = content.replace(
        /import React.*\n(import \{\$1\} from '\.\.\/\.\.\/question-view\/Component\.tsx'\n)*/,
        `import React, { useState, useEffect } from 'react'\n${correctImports}\n`
      );
      
      // Write the fixed content back
      await writeFileAsync(filePath, fixedContent);
      console.log(`  Fixed successfully`);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error(`  Error fixing ${filePath}:`, err);
    return false;
  }
}

async function processDirectory(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let fixedCount = 0;
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Process subdirectories recursively
        fixedCount += await processDirectory(fullPath);
      } else if (entry.name === 'Component.tsx') {
        // Fix Component.tsx files
        if (await fixFile(fullPath)) {
          fixedCount++;
        }
      }
    }
    
    return fixedCount;
  } catch (err) {
    console.error(`Error processing directory ${dirPath}:`, err);
    return 0;
  }
}

async function main() {
  console.log('Starting to fix placeholder imports...');
  const fixedCount = await processDirectory(variantsDir);
  console.log(`Fixed imports in ${fixedCount} files.`);
}

main().catch(console.error);
