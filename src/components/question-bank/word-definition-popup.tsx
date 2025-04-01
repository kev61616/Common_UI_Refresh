"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useSelection } from "@/contexts/SelectionContext";
import { useWordDefinition } from "@/hooks/useWordDefinition";
import { cn } from "@/lib/utils";

export function WordDefinitionPopup() {
  const { doubleClickedWord, doubleClickPosition, setDoubleClickedWord, setDoubleClickPosition } = useSelection();
  const { definition, loading, error, fetchDefinition, clearDefinition } = useWordDefinition();
  const popupRef = useRef<HTMLDivElement>(null);

  // Fetch definition when a new word is double-clicked
  useEffect(() => {
    if (doubleClickedWord) {
      fetchDefinition(doubleClickedWord);
    } else {
      clearDefinition();
    }
  }, [doubleClickedWord, fetchDefinition, clearDefinition]);

  // Handle clicking outside to close the popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setDoubleClickedWord(null);
        setDoubleClickPosition(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDoubleClickedWord, setDoubleClickPosition]);

  // Don't render if no word is selected or no position is set
  if (!doubleClickedWord || !doubleClickPosition) return null;

  return (
    <div
      ref={popupRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-72 max-h-96 overflow-auto"
      style={{
        left: Math.min(
          doubleClickPosition.left,
          window.innerWidth - 300 // Prevent popup from going off-screen
        ),
        top: doubleClickPosition.top + 20,
      }}
    >
      <div className="sticky top-0 bg-white z-10 border-b p-3 flex justify-between items-center">
        <h3 className="font-medium text-lg">{doubleClickedWord}</h3>
        <button
          onClick={() => {
            setDoubleClickedWord(null);
            setDoubleClickPosition(null);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>

      <div className="p-4">
        {loading && <p className="text-gray-500 text-sm">Loading definition...</p>}

        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            Failed to load definition: {error}
          </div>
        )}

        {definition && (
          <div className="space-y-3">
            {definition.phonetic && (
              <div className="text-gray-600 text-sm font-mono">{definition.phonetic}</div>
            )}

            {definition.meanings?.map((meaning, index) => (
              <div key={index} className="border-t pt-2 first:border-t-0 first:pt-0">
                <div className="text-sm font-medium text-indigo-600 mb-1">
                  {meaning.partOfSpeech}
                </div>
                
                <ol className="space-y-2 list-decimal pl-5">
                  {meaning.definitions.map((def, i) => (
                    <li key={i} className="text-sm">
                      <div>{def.definition}</div>
                      
                      {def.example && (
                        <div className="text-gray-600 text-xs italic mt-1">
                          "{def.example}"
                        </div>
                      )}

                      {def.synonyms.length > 0 && (
                        <div className="mt-1">
                          <span className="text-xs font-semibold text-gray-500">Synonyms: </span>
                          <span className="text-xs text-gray-600">
                            {def.synonyms.join(", ")}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            {definition.etymology && (
              <div className="text-xs text-gray-600 border-t pt-2 mt-2">
                <span className="font-semibold">Etymology: </span>
                {definition.etymology}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
