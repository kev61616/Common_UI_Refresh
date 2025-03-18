/**
 * Script to fix syntax errors in the variant-92 Component file
 */

const fs = require('fs');
const path = require('path');

const fixFile = () => {
  try {
    // Define file path
    const filePath = path.join(__dirname, '..', 'src/components/review/question-view-variants/variant-92/Component.tsx');
    
    // Check if the file exists
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error(`File doesn't exist: ${filePath}`);
      return;
    }
    
    // Fix specific syntax issues in variant-92
    // 1. Fix missing variable declaration for HTMLDivElement
    content = content.replace(
      /const HTMLDivElement>\(null\)/g,
      "const canvasRef = useRef<HTMLDivElement>(null)"
    );
    
    // 2. Fix broken conditional expression
    content = content.replace(
      /const filteredQuestions = selectedSubject;\s+\? allQuestions\.filter\(q => q\.setSubject === selectedSubject\)\s+: allQuestions/g,
      "const filteredQuestions = selectedSubject\n    ? allQuestions.filter(q => q.setSubject === selectedSubject)\n    : allQuestions"
    );
    
    // 3. Fix missing commas in function parameters
    content = content.replace(
      /\{ practiceSets onSelectSet selectedSetId \}/g,
      "{ practiceSets, onSelectSet, selectedSetId }"
    );
    
    // Write the fixed content back
    fs.writeFileSync(filePath, content);
    console.log(`Fixed syntax errors in ${filePath}`);
    
    return true;
  } catch (error) {
    console.error(`Error:`, error.message);
    return false;
  }
};

// Run the script
fixFile();
