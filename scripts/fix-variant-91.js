/**
 * Script to fix syntax errors in the variant-91 Component file
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const fixFile = async () => {
  const filePath = path.join(__dirname, '..', 'src/components/review/question-view-variants/variant-91/Component.tsx');
  
  try {
    // Check if the file exists
    let content;
    try {
      content = await readFileAsync(filePath, 'utf8');
    } catch (err) {
      console.error(`File doesn't exist: ${filePath}`);
      return;
    }
    
    // Fix the useState calls and add useRef import
    const fixedContent = content
      // Add useRef to the React import
      .replace(/import React, \{ useState, useEffect \} from 'react'/, 
               "import React, { useState, useEffect, useRef } from 'react'")
      // Fix missing commas in useState destructuring
      .replace(/const \[selectedSubject setSelectedSubject\] = useState/,
               "const [selectedSubject, setSelectedSubject] = useState")
      .replace(/const \[zoomLevel setZoomLevel\] = useState/,
               "const [zoomLevel, setZoomLevel] = useState");
    
    // Write the fixed content back
    await writeFileAsync(filePath, fixedContent);
    console.log(`Fixed syntax errors in ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
};

// Run the script
fixFile().catch(console.error);
