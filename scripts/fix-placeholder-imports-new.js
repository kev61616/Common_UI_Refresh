/**
 * Script to fix placeholder imports in component files
 * Replaces $1 placeholders with proper imports
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Define the files that need fixing
const filesToFix = [
  'src/components/review/question-view-variants/variant-45/Component.tsx',
  'src/components/review/question-view-variants/variant-46/Component.tsx',
  'src/components/review/question-view-variants/variant-47/Component.tsx',
  'src/components/review/question-view-variants/variant-48/Component.tsx',
  'src/components/review/question-view-variants/variant-49/Component.tsx',
  'src/components/review/question-view-variants/variant-50/Component.tsx',
  'src/components/review/question-view-variants/variant-51/Component.tsx',
  'src/components/review/question-view-variants/variant-52/Component.tsx',
  'src/components/review/question-view-variants/variant-53/Component.tsx',
  'src/components/review/question-view-variants/variant-54/Component.tsx',
  'src/components/review/question-view-variants/variant-55/Component.tsx',
  'src/components/review/question-view-variants/variant-56/Component.tsx',
  'src/components/review/question-view-variants/variant-57/Component.tsx',
  'src/components/review/question-view-variants/variant-58/Component.tsx'
];

// Function to fix placeholder imports
async function fixPlaceholderImports(filePath) {
  try {
    // Read file content
    const content = await readFileAsync(filePath, 'utf8');
    
    // Check if the file has placeholder imports
    if (content.includes('import {$1}')) {
      console.log(`Fixing imports in ${filePath}...`);
      
      // Replace multiple placeholder imports with proper imports
      // Get component name from the export at the bottom of the file
      const componentNameMatch = content.match(/export function (\w+)/);
      let componentName = 'Component';
      
      if (componentNameMatch && componentNameMatch[1]) {
        componentName = componentNameMatch[1];
      }
      
      // Replace placeholder imports with actual imports
      const fixedContent = content.replace(
        /import \{\$1\} from '\.\.\/\.\.\/question-view\/Component\.tsx'\nimport \{\$1\} from '\.\.\/\.\.\/question-view\/Component\.tsx'\nimport \{\$1\} from '\.\.\/\.\.\/question-view\/Component\.tsx'/g,
        `import { QuestionViewProps } from '../types'
import { QuestionWithMetadata } from '../../question-view/types'
import { extractQuestionsWithMetadata } from '../../question-view/utils'`
      );
      
      // Write fixed content back to file
      await writeFileAsync(filePath, fixedContent);
      console.log(`  Fixed imports in ${filePath}`);
      return true;
    } else {
      console.log(`  No placeholder imports found in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`  Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Process all files
async function processFiles() {
  let fixedCount = 0;
  let errorCount = 0;
  
  for (const filePath of filesToFix) {
    try {
      // Skip if file doesn't exist
      if (!fs.existsSync(filePath)) {
        console.log(`  File ${filePath} does not exist, skipping.`);
        continue;
      }
      
      const result = await fixPlaceholderImports(filePath);
      if (result) fixedCount++;
    } catch (error) {
      console.error(`  Error processing ${filePath}:`, error);
      errorCount++;
    }
  }
  
  console.log(`\nProcess completed: ${fixedCount} files fixed, ${errorCount} errors.`);
}

// Run the script
processFiles().catch(console.error);
