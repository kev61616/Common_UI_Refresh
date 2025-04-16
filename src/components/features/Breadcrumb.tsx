"use client";

import {
  ChevronRight,
  Calculator,
  LogOut,
  Clock,
  FileText,
} from "lucide-react";
import { useQuestion } from "@/contexts/QuestionContext";
import { useState } from "react";

// Utility function to conditionally join classes
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const subjects = [
  { id: "math", name: "Math", active: true },
  { id: "reading", name: "Reading" },
  { id: "writing", name: "Writing" },
];

const topics = [
  { id: "multiply-binomials", name: "Multiply Binomials", active: true },
  { id: "item-1", name: "Item 1" },
  { id: "item-2", name: "Item 2" },
  { id: "item-3", name: "Item 3" },
];

function BreadcrumbItem({
  text,
  isLast,
  attempts,
  items,
}: {
  text: string;
  isLast?: boolean;
  attempts?: number;
  items?: Array<{ id: string; name: string; active?: boolean }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative group transition-all duration-200",
            isLast ? "text-blue-600" : "text-black hover:text-gray-700"
          )}
        >
          <span className="flex items-center">
            {text}
            {attempts && (
              <span className="ml-2 text-sm text-gray-500">({attempts}x)</span>
            )}
          </span>
        </button>
        
        {isOpen && items && (
          <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-50 p-2 min-w-[12rem]">
            <div className="py-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm whitespace-nowrap transition-all duration-200",
                    "hover:bg-violet-50 hover:text-violet-700",
                    item.active && "bg-blue-50 text-blue-600"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {!isLast && (
        <ChevronRight className="w-3.5 h-3.5 mx-[2px] text-gray-400" />
      )}
    </div>
  );
}

function ToolsBar({ className }: { className?: string }) {
  const { time, openCalculator, openFormulaSheet } = useQuestion();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-mono flex items-center gap-2"
        role="timer"
        aria-label="Time spent"
      >
        <Clock className="w-4 h-4" aria-hidden="true" />
        <time className="font-['Inter']">{time.formatted}</time>
      </div>

      <button
        className="p-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
        onClick={openCalculator}
        aria-label="Open calculator"
      >
        <Calculator className="w-4 h-4" aria-hidden="true" />
      </button>
      
      <button
        className="p-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
        onClick={openFormulaSheet}
        aria-label="Open formula sheet"
      >
        <FileText className="w-4 h-4" aria-hidden="true" />
      </button>
      
      <button
        className="p-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
        onClick={() => window.location.href = "/dashboard"}
        aria-label="Save and exit"
      >
        <LogOut className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function EnhancedBreadcrumb() {
  return (
    <div className="bg-white relative">
      <div className="w-[95%] mx-auto py-3 flex flex-col">
        {/* Desktop layout - side by side */}
        <div className="hidden md:flex items-center justify-between w-full">
          <nav aria-label="Question navigation">
            <div className="flex items-center whitespace-nowrap gap-3">
              <BreadcrumbItem text="Math" items={subjects} />
              <BreadcrumbItem text="Multiply Binomials" items={topics} />
              <BreadcrumbItem
                text="Question 16"
                isLast
                attempts={2}
              />
            </div>
          </nav>
          <ToolsBar />
        </div>

        {/* Mobile layout - stacked */}
        <div className="flex flex-col md:hidden space-y-3">
          <nav aria-label="Question navigation">
            <div className="flex items-center whitespace-nowrap gap-3">
              <BreadcrumbItem text="Math" items={subjects} />
              <BreadcrumbItem text="Multiply Binomials" items={topics} />
              <BreadcrumbItem
                text="Question 16"
                isLast
                attempts={2}
              />
            </div>
          </nav>
          <ToolsBar className="justify-start" />
        </div>
      </div>
    </div>
  );
}
