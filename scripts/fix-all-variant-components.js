/**
 * Script to scan and fix syntax errors in all Component files
 * Fixes common issues like missing useRef imports and missing commas in useState destructuring
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fixes that will be applied to files
const applyFixes = (content) => {
  return content
    // Add useRef to React import if not present and is being used
    .replace(
      /import React, \{ useState, useEffect \} from 'react'([\s\S]*?)const [\s\S]*?useRef</g,
      "import React, { useState, useEffect, useRef } from 'react'$1const "
    )
    // Fix missing commas in useState destructuring
    .replace(/const \[(\w+) (\w+)\] = useState/g, "const [$1, $2] = useState")
    // Add missing semicolons
    .replace(/const \w+ = \w+\n/g, (match) => {
      if (!match.includes(';')) {
        return match.replace('\n', ';\n');
      }
      return match;
    });
};

// Process a single file
const processFile = (filePath) => {
  try {
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file needs fixing
    const hasUseRefIssue = content.includes('useRef<') && !content.includes('useRef } from');
    const hasMissingComma = content.match(/const \[(\w+) (\w+)\] = useState/);
    
    if (hasUseRefIssue || hasMissingComma) {
      // Apply fixes
      const fixedContent = applyFixes(content);
      
      // Write the fixed content back if changes were made
      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent);
        console.log(`Fixed syntax errors in ${filePath}`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
};

// Main function to find and process files
const main = () => {
  try {
    // Find all variant component files
    const baseDir = path.join(__dirname, '..');
    const pattern = path.join(baseDir, 'src/components/review/**/variant-*/Component.tsx');
    const files = glob.sync(pattern);
    
    console.log(`Found ${files.length} variant component files`);
    
    let fixedCount = 0;
    
    // Process each file
    for (const file of files) {
      const wasFixed = processFile(file);
      if (wasFixed) fixedCount++;
    }
    
    console.log(`\nCompleted: ${fixedCount} files fixed`);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Run the script
main();
