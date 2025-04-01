"use client";

import React, { useEffect } from "react";
import { useLayout } from "./LayoutContext";

interface SelectionContextType {
  selectedText: string;
  setSelectedText: (text: string) => void;
  doubleClickedWord: string | null;
  setDoubleClickedWord: (word: string | null) => void;
  doubleClickPosition: { top: number; left: number } | null;
  setDoubleClickPosition: (
    position: { top: number; left: number } | null,
  ) => void;
}

// Ensure we're initializing with a non-null value
const SelectionContext = React.createContext<SelectionContextType>({
  selectedText: "",
  setSelectedText: () => {},
  doubleClickedWord: null,
  setDoubleClickedWord: () => {},
  doubleClickPosition: null,
  setDoubleClickPosition: () => {},
});

// Local storage keys
const WORD_STORAGE_KEY = "doubleClickedWord";
const POSITION_STORAGE_KEY = "doubleClickPosition";

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const { isSATLayout } = useLayout();
  const [selectedText, setSelectedText] = React.useState("");
  const [doubleClickedWord, setDoubleClickedWord] = React.useState<
    string | null
  >(null);
  const [doubleClickPosition, setDoubleClickPosition] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  // Clear any persisted state from localStorage on initial render
  // to ensure dictionary popup starts disengaged
  useEffect(() => {
    try {
      // Remove any saved word
      localStorage.removeItem(WORD_STORAGE_KEY);
      // Remove any saved position
      localStorage.removeItem(POSITION_STORAGE_KEY);
      
      // Ensure state is cleared as well
      setDoubleClickedWord(null);
      setDoubleClickPosition(null);
    } catch (error) {
      console.error("Error clearing selection state from localStorage:", error);
    }
  }, []);

  // Custom setters that update localStorage
  const handleSetDoubleClickedWord = (word: string | null) => {
    setDoubleClickedWord(word);
    try {
      if (word) {
        localStorage.setItem(WORD_STORAGE_KEY, word);
      } else {
        localStorage.removeItem(WORD_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving word to localStorage:", error);
    }
  };

  const handleSetDoubleClickPosition = (
    position: { top: number; left: number } | null,
  ) => {
    setDoubleClickPosition(position);
    try {
      if (position) {
        localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position));
      } else {
        localStorage.removeItem(POSITION_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving position to localStorage:", error);
    }
  };

  // Listen for text selection
  React.useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        setSelectedText(selection.toString());
      } else {
        setSelectedText("");
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  // Handle double-click on words
  React.useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      console.log("Double-click event triggered", e.target);

      // We enable word definition in all layouts
      console.log("Word definition enabled in all layouts");

      // First approach: try to get the word from the selection
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        const selectedWord = selection.toString().trim();
        console.log("Selected word from selection:", selectedWord);
        
        // Only process if it's a single word (no spaces)
        if (selectedWord.indexOf(" ") === -1) {
          // Get the position for the definition bar
          try {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            const position = {
              top: rect.top + window.scrollY - 10, // Position slightly above the word
              left: rect.left + rect.width / 2 + window.scrollX, // Center it
            };
            
            handleSetDoubleClickedWord(selectedWord);
            handleSetDoubleClickPosition(position);
            return;
          } catch (err) {
            console.error("Error getting selection position:", err);
          }
        }
      }
      
      // Second approach: extract the word at the click position
      try {
        // Only process double-clicks on text-containing elements
        if (!(e.target instanceof HTMLElement)) return;
        
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        // Create a range at the click position
        const range = document.caretRangeFromPoint(clickX, clickY);
        if (!range) return;
        
        // Get the text node and offset
        const textNode = range.startContainer;
        if (textNode.nodeType !== Node.TEXT_NODE) {
          // If we didn't get a text node, try to get text from the element
          const element = e.target;
          const text = element.textContent || "";
          if (!text.trim()) return;
          
          // Use the element's position instead
          const rect = element.getBoundingClientRect();
          
          // Try to determine the clicked word
          // Split by spaces and find the closest word to the click position
          const words = text.split(/\s+/);
          if (words.length === 0) return;
          
          // If there's only one word, use it
          if (words.length === 1) {
            const word = words[0].trim();
            if (word && word.length > 0) {
              const position = {
                top: rect.top + window.scrollY - 10,
                left: clickX, // Use the actual click X position
              };
              
              handleSetDoubleClickedWord(word);
              handleSetDoubleClickPosition(position);
            }
            return;
          }
          
          // Otherwise, use the element's text but show at click position
          const position = {
            top: rect.top + window.scrollY - 10,
            left: clickX,
          };
          
          // Get the closest word to the click point
          const closestWord = findClosestWord(element, e.clientX, e.clientY);
          if (closestWord) {
            handleSetDoubleClickedWord(closestWord);
            handleSetDoubleClickPosition(position);
          }
          
          return;
        }
        
        const text = textNode.textContent || "";
        const offset = range.startOffset;
        
        // Find the word boundaries
        let startPos = offset;
        let endPos = offset;
        
        // Find the start of the word
        while (startPos > 0 && /[\w\u4e00-\u9fa5]/.test(text[startPos - 1])) {
          startPos--;
        }
        
        // Find the end of the word
        while (endPos < text.length && /[\w\u4e00-\u9fa5]/.test(text[endPos])) {
          endPos++;
        }
        
        // Extract the word
        const word = text.substring(startPos, endPos).trim();
        console.log("Word from click position:", word);
        
        // Only process if it's a valid word
        if (word && word.length > 0) {
          // Get the position for the definition bar
          const rect = range.getBoundingClientRect();
          
          const position = {
            top: rect.top + window.scrollY - 10, // Position slightly above the word
            left: rect.left + rect.width / 2 + window.scrollX, // Center it
          };
          
          handleSetDoubleClickedWord(word);
          handleSetDoubleClickPosition(position);
        }
      } catch (err) {
        console.error("Error processing double-click:", err);
      }
    };
    
    // Helper function to find the closest word to a click position
    function findClosestWord(element: HTMLElement, clientX: number, clientY: number): string | null {
      // Get all text nodes in the element
      const textNodes: Node[] = [];
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        { acceptNode: (node) => node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT }
      );
      
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }
      
      if (textNodes.length === 0) return null;
      
      // Find the closest text node
      let closestNode = null;
      let closestDistance = Infinity;
      let closestWord = null;
      
      for (const node of textNodes) {
        const range = document.createRange();
        range.selectNodeContents(node);
        
        const rects = range.getClientRects();
        for (let i = 0; i < rects.length; i++) {
          const rect = rects[i];
          const distance = Math.sqrt(
            Math.pow(clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(clientY - (rect.top + rect.height / 2), 2)
          );
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestNode = node;
            
            // Try to find the word within this text node
            const text = node.textContent || "";
            const words = text.split(/\s+/);
            if (words.length > 0) {
              // Use the first word as default
              closestWord = words[0];
            }
          }
        }
      }
      
      return closestWord;
    }

    document.addEventListener("dblclick", handleDoubleClick);

    return () => {
      document.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [isSATLayout]); // Add isSATLayout as a dependency

  const contextValue = React.useMemo(
    () => ({
      selectedText,
      setSelectedText,
      doubleClickedWord,
      setDoubleClickedWord: handleSetDoubleClickedWord,
      doubleClickPosition,
      setDoubleClickPosition: handleSetDoubleClickPosition,
    }),
    [selectedText, doubleClickedWord, doubleClickPosition],
  );

  return (
    <SelectionContext.Provider value={contextValue}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = React.useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
