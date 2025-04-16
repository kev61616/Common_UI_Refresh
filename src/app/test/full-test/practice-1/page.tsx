"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { QuestionLayout } from "@/components/layout/QuestionLayout";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Create a dynamic component that only renders on the client to prevent hydration errors
const ClientOnlyTest = dynamic(() => Promise.resolve(TestContent), { ssr: false });

// Create a SelectionContext similar to Brainbox2
const SelectionContext = createContext<{
  selectedText: string | null;
  doubleClickedWord: string | null;
  doubleClickPosition: { top: number; left: number } | null;
  setSelectedText: (text: string | null) => void;
  setDoubleClickedWord: (word: string | null) => void;
  setDoubleClickPosition: (position: { top: number; left: number } | null) => void;
}>({
  selectedText: null,
  doubleClickedWord: null,
  doubleClickPosition: null,
  setSelectedText: () => {},
  setDoubleClickedWord: () => {},
  setDoubleClickPosition: () => {},
});

const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [doubleClickedWord, setDoubleClickedWord] = useState<string | null>(null);
  const [doubleClickPosition, setDoubleClickPosition] = useState<{ top: number; left: number } | null>(null);

  // Listen for selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setSelectedText(selection.toString().trim());
      } else if (!selection?.toString().trim()) {
        setSelectedText(null);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <SelectionContext.Provider
      value={{
        selectedText,
        doubleClickedWord,
        doubleClickPosition,
        setSelectedText,
        setDoubleClickedWord,
        setDoubleClickPosition,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

const useSelection = () => useContext(SelectionContext);

// Question Panel Component
const QuestionPanel: React.FC<{
  question: any;
  onShowWordBookmarks?: () => void;
  questionIndex?: number;
  totalQuestions?: number;
}> = ({ question, onShowWordBookmarks, questionIndex, totalQuestions }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { selectedText, setDoubleClickedWord, setDoubleClickPosition } = useSelection();

  // Handle double click for word definition
  useEffect(() => {
    const handleDocumentDoubleClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const selection = window.getSelection();
        if (!selection) return;

        if (selection.toString().trim()) {
          const selectedWord = selection.toString().trim();
          
          if (selectedWord.indexOf(" ") === -1) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            const position = {
              top: rect.top + window.scrollY - 10,
              left: rect.left + rect.width / 2 + window.scrollX,
            };

            setDoubleClickedWord(selectedWord);
            setDoubleClickPosition(position);
          }
        }
      }
    };

    document.addEventListener("dblclick", handleDocumentDoubleClick);
    return () => {
      document.removeEventListener("dblclick", handleDocumentDoubleClick);
    };
  }, [setDoubleClickedWord, setDoubleClickPosition]);

  return (
    <div className="w-full p-6 border-b lg:border-b-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <div
            ref={contentRef}
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: question.text }}
          />
        </div>
      </div>
    </div>
  );
};

// Choices Panel Component
const ChoicesPanel: React.FC<{
  choices: Array<{ id: string; text: string }>;
  selectedChoice: string | null;
  onSelectChoice: (id: string) => void;
  correctChoice?: string;
  showCorrectAnswer?: boolean;
}> = ({ choices, selectedChoice, onSelectChoice, correctChoice, showCorrectAnswer = false }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Answer Choices</h3>
      <div className="space-y-4">
        {choices.map((choice, index) => {
          const isSelected = choice.id === selectedChoice;
          const isCorrect = showCorrectAnswer && choice.id === correctChoice;

          return (
            <div
              key={choice.id}
              className={`
                flex items-center space-x-3 p-3 rounded-md transition-colors
                ${isSelected ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}
                ${isCorrect ? "bg-green-50 border border-green-200" : ""}
              `}
              onClick={() => onSelectChoice(choice.id)}
            >
              <input
                type="radio"
                id={`option-${choice.id}`}
                name="answer"
                checked={isSelected}
                onChange={() => onSelectChoice(choice.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                suppressHydrationWarning
              />
              <label
                htmlFor={`option-${choice.id}`}
                className="flex-grow text-gray-700 cursor-pointer"
              >
                {choice.id.toUpperCase()}) {choice.text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Question Navigator Component
const QuestionNavigator: React.FC<{
  currentQuestion: number;
  totalQuestions: number;
}> = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">
        Question {currentQuestion} of {totalQuestions}
      </span>
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

// Word Definition Bar Component
const WordDefinitionBar: React.FC<{
  word: string;
  position: { top: number; left: number };
  onClose: () => void;
}> = ({ word, position, onClose }) => {
  const [definition, setDefinition] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading definition
    const timer = setTimeout(() => {
      // Mock definition
      const definitions = {
        binomials: "Algebraic expressions consisting of two terms connected by addition or subtraction.",
        product: "The result of multiplying two or more numbers or expressions together.",
        multiply: "To perform multiplication, finding the product of two or more numbers or expressions.",
      };
      
      setDefinition(definitions[word.toLowerCase() as keyof typeof definitions] || 
        "An algebraic or numeric term in mathematics used in equations and formulas.");
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [word]);

  return (
    <div
      className="fixed z-50 bg-white shadow-lg rounded-lg border border-gray-200 p-4 w-72"
      style={{
        top: position.top - 150,
        left: position.left - 140,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-800">{word}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      {loading ? (
        <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
      ) : (
        <p className="text-sm text-gray-600">{definition}</p>
      )}
    </div>
  );
};

// Word Bookmarks Manager Component
const WordBookmarkManager: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  // Simulate bookmarked words
  const bookmarkedWords = [
    { word: "Binomials", definition: "Algebraic expressions consisting of two terms connected by addition or subtraction." },
    { word: "Product", definition: "The result of multiplying two or more numbers or expressions together." },
    { word: "FOIL", definition: "A method for multiplying two binomials: First, Outer, Inner, Last." },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Bookmarked Words</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 max-h-80 overflow-y-auto">
          {bookmarkedWords.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No bookmarked words yet</p>
          ) : (
            <div className="space-y-4">
              {bookmarkedWords.map((item, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <h3 className="font-medium text-gray-800">{item.word}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.definition}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sample question data
const sampleQuestion = {
  id: "question-16",
  text: `<h2 class="text-xl font-semibold text-gray-800 mb-4">Question 16: Algebra - Multiply Binomials</h2>
         <p class="text-gray-600 mb-6">Find the product of (3x - 4) and (2x + 5).</p>`,
  choices: [
    { id: "a", text: "6x² + 7x - 20" },
    { id: "b", text: "6x² - 7x - 20" },
    { id: "c", text: "6x² + 15x - 8x - 20" },
    { id: "d", text: "5x² + x - 20" }
  ],
  answer: "b",
  explanation: "To multiply these binomials, we use the FOIL method (First, Outer, Inner, Last):\n(3x - 4)(2x + 5)\nFirst: 3x × 2x = 6x²\nOuter: 3x × 5 = 15x\nInner: -4 × 2x = -8x\nLast: -4 × 5 = -20\nCombining like terms: 6x² + 15x - 8x - 20 = 6x² + 7x - 20"
};

// The main content component that will be loaded client-side only
function TestContent() {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showWordBookmarks, setShowWordBookmarks] = useState(false);
  const { doubleClickedWord, doubleClickPosition, setDoubleClickedWord, setDoubleClickPosition } = useSelection();

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoice(choiceId);
  };

  const handleShowWordBookmarks = () => {
    setShowWordBookmarks(true);
  };

  const handleCloseWordBookmarks = () => {
    setShowWordBookmarks(false);
  };

  const handleCloseDefinition = () => {
    setDoubleClickedWord(null);
    setDoubleClickPosition(null);
  };

  const handlePrevious = () => {
    // Navigation to previous question would be implemented here
    console.log("Navigate to previous question");
  };

  const handleNext = () => {
    // Navigation to next question would be implemented here
    console.log("Navigate to next question");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Question panel with text highlighting and word definition features */}
        <div className="lg:col-span-2">
          <QuestionPanel
            question={sampleQuestion}
            onShowWordBookmarks={handleShowWordBookmarks}
            questionIndex={16}
            totalQuestions={50}
          />
        </div>

        {/* Answer choices panel */}
        <div className="lg:col-span-1">
          <ChoicesPanel
            choices={sampleQuestion.choices}
            selectedChoice={selectedChoice}
            onSelectChoice={handleSelectChoice}
            correctChoice={sampleQuestion.answer}
            showCorrectAnswer={false}
          />
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between mt-8 px-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors"
        >
          Previous
        </button>
        <QuestionNavigator currentQuestion={16} totalQuestions={50} />
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
        >
          Next
        </button>
      </div>

      {/* Word definition component (conditionally rendered) */}
      {doubleClickedWord && doubleClickPosition && (
        <WordDefinitionBar
          word={doubleClickedWord}
          position={doubleClickPosition}
          onClose={handleCloseDefinition}
        />
      )}

      {/* Word bookmarks panel (conditionally rendered) */}
      {showWordBookmarks && (
        <WordBookmarkManager onClose={handleCloseWordBookmarks} />
      )}
    </div>
  );
}

// Main page component
export default function PracticeTest1() {
  return (
    <SelectionProvider>
      <QuestionLayout>
        <Suspense fallback={<div className="p-8 text-center">Loading test content...</div>}>
          <ClientOnlyTest />
        </Suspense>
      </QuestionLayout>
    </SelectionProvider>
  );
}
