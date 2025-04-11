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
    <div className="relative" data-oid="eh8n6px">
      <div className="min-h-screen bg-white" data-oid="zx-an4r">
        <div className="flex flex-col" data-oid="6hx:n2e">
          <Breadcrumb data-oid="fw06o.o" />
          <div className="mx-auto w-full max-w-screen-xl px-4 py-6" data-oid="2hn_1du">
            <div className="bg-white border rounded-lg shadow-sm mb-6" data-oid="8tcv:-o">
              <QuestionContent data-oid="dekvseg" />
            </div>
          </div>
        </div>
      </div>

      {/* Tool windows */}
      {windows.map(
        (window) =>
        window.isOpen &&
        <ToolWindow
          key={window.id}
          id={window.id}
          title={window.title}
          url={window.url}
          position={window.position}
          onClose={() => closeWindow(window.id)}
          onPositionChange={(pos) => updateWindowPosition(window.id, pos)} data-oid="qvj1bnl" />


      )}

      {/* Word definition popup that appears when double-clicking on words */}
      <WordDefinitionPopup data-oid="noa3skw" />
    </div>);

}