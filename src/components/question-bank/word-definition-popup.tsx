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
        top: doubleClickPosition.top + 20
      }} data-oid="xs5:5ss">

      <div className="sticky top-0 bg-white z-10 border-b p-3 flex justify-between items-center" data-oid="i_7-i2c">
        <h3 className="font-medium text-lg" data-oid=":jx:_jp">{doubleClickedWord}</h3>
        <button
          onClick={() => {
            setDoubleClickedWord(null);
            setDoubleClickPosition(null);
          }}
          className="text-gray-500 hover:text-gray-700" data-oid="jb2u3ut">

          <X className="h-4 w-4" data-oid="tw1t5_b" />
          <span className="sr-only" data-oid="d_al1mh">Close</span>
        </button>
      </div>

      <div className="p-4" data-oid="mzqqot1">
        {loading && <p className="text-gray-500 text-sm" data-oid="lxzc.kg">Loading definition...</p>}

        {error &&
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded" data-oid="51d0vd:">
            Failed to load definition: {error}
          </div>
        }

        {definition &&
        <div className="space-y-3" data-oid="_hhm2lv">
            {definition.phonetic &&
          <div className="text-gray-600 text-sm font-mono" data-oid="h3r_d-x">{definition.phonetic}</div>
          }

            {definition.meanings?.map((meaning, index) =>
          <div key={index} className="border-t pt-2 first:border-t-0 first:pt-0" data-oid="1at.5rh">
                <div className="text-sm font-medium text-indigo-600 mb-1" data-oid="j:--_q_">
                  {meaning.partOfSpeech}
                </div>
                
                <ol className="space-y-2 list-decimal pl-5" data-oid=":55dkl9">
                  {meaning.definitions.map((def, i) =>
              <li key={i} className="text-sm" data-oid="lwb-dh8">
                      <div data-oid="2bwngrr">{def.definition}</div>
                      
                      {def.example &&
                <div className="text-gray-600 text-xs italic mt-1" data-oid="_ldfero">
                          "{def.example}"
                        </div>
                }

                      {def.synonyms.length > 0 &&
                <div className="mt-1" data-oid="izz1iwf">
                          <span className="text-xs font-semibold text-gray-500" data-oid="vruvye9">Synonyms: </span>
                          <span className="text-xs text-gray-600" data-oid="qw.ls.w">
                            {def.synonyms.join(", ")}
                          </span>
                        </div>
                }
                    </li>
              )}
                </ol>
              </div>
          )}

            {definition.etymology &&
          <div className="text-xs text-gray-600 border-t pt-2 mt-2" data-oid="5t4xg9o">
                <span className="font-semibold" data-oid=".di8b-a">Etymology: </span>
                {definition.etymology}
              </div>
          }
          </div>
        }
      </div>
    </div>);

}