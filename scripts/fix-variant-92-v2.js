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
    
    // Add missing state variables
    content = content.replace(
      "const canvasRef = useRef<HTMLDivElement>(null)",
      "const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([]);\n  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);\n  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);\n  const [zoomLevel, setZoomLevel] = useState(1);\n  const canvasRef = useRef<HTMLDivElement>(null)"
    );
    
    // Fix useEffect dependency array syntax
    content = content.replace(
      "} [practiceSets])",
      "}, [practiceSets])"
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
