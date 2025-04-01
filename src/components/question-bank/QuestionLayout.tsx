"use client";

import { useEffect } from "react";
import { useQuestion } from "@/contexts/QuestionContext";
import { ToolWindow } from "@/components/ui/tool-window";
import { QuestionContent } from "./question-content";
import { Breadcrumb } from "./breadcrumb";
import { WordDefinitionPopup } from "./word-definition-popup";
import { useLayout } from "@/contexts/LayoutContext";

export default function QuestionLayout() {
  const { windows, closeWindow, updateWindowPosition } = useQuestion();
  const { setIsSATLayout } = useLayout();

  // Set the isSATLayout flag to true when the component mounts
  useEffect(() => {
    setIsSATLayout(true);
    return () => {
      setIsSATLayout(false);
    };
  }, [setIsSATLayout]);

  return (
    <div className="relative">
      <div className="min-h-screen bg-white">
        <div className="flex flex-col">
          <Breadcrumb />
          <div className="mx-auto w-full max-w-screen-xl px-4 py-6">
            <div className="bg-white border rounded-lg shadow-sm mb-6">
              <QuestionContent />
            </div>
          </div>
        </div>
      </div>

      {/* Tool windows */}
      {windows.map(
        (window) =>
          window.isOpen && (
            <ToolWindow
              key={window.id}
              id={window.id}
              title={window.title}
              url={window.url}
              position={window.position}
              onClose={() => closeWindow(window.id)}
              onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
            />
          )
      )}

      {/* Word definition popup that appears when double-clicking on words */}
      <WordDefinitionPopup />
    </div>
  );
}
