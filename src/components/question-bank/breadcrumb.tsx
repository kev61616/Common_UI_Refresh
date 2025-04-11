"use client";

import Link from "next/link";
import {
  ChevronRight,
  Maximize2,
  LogOut,
  Clock,
  FileText } from
"lucide-react";
import { useQuestion } from "@/contexts/QuestionContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
  suffix?: string;
}

export function Breadcrumb() {
  const { time, openCalculator, openFormulaSheet } = useQuestion();

  const items: BreadcrumbItem[] = [
  { label: "Math", href: "/test" },
  { label: "Multiply Binomials", href: "/test/sat-math" },
  { label: "Question 16", isCurrent: true, suffix: "(2x)" }];


  return (
    <div className="py-4 bg-white border-b flex justify-between items-center px-4" data-oid="-2:0eh:">
      {/* Left side: breadcrumb */}
      <div className="flex items-center text-sm" data-oid="41w4znh">
        {items.map((item, index) =>
        <div key={index} className="flex items-center whitespace-nowrap" data-oid=".ruu1jo">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-2" data-oid="-avzlru" />}
            {item.href && !item.isCurrent ?
          <Link
            href={item.href}
            className="text-gray-900 hover:text-blue-600 font-medium transition-colors" data-oid="di:ax:h">

                {item.label}
              </Link> :

          <span className={`${item.isCurrent ? "text-blue-600" : "text-gray-900"} font-medium`} data-oid="evuddp6">
                {item.label} {item.suffix && <span className="text-gray-500 ml-1" data-oid="_51d93b">{item.suffix}</span>}
              </span>
          }
          </div>
        )}
      </div>
      
      {/* Right side: tools */}
      <div className="flex items-center space-x-3" data-oid="7g8c6_l">
        {/* Timer */}
        <div className="flex items-center gap-1 text-gray-700" data-oid="3nep9yh">
          <Clock className="w-4 h-4" data-oid="uvv5pp1" />
          <span className="font-medium" data-oid="rt6l:71">{time.formatted}</span>
        </div>
        
        {/* Fullscreen */}
        <button
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
          aria-label="Toggle fullscreen" data-oid=".6npo8a">

          <Maximize2 className="w-4 h-4" data-oid="n340-p5" />
        </button>
        
        {/* Calculator */}
        <button
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
          onClick={openCalculator}
          aria-label="Open calculator" data-oid="lakpo9l">

          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" data-oid="5rgcd_n">
            <rect x="4" y="2" width="16" height="20" rx="2" data-oid="vako0v8" />
            <line x1="8" y1="6" x2="16" y2="6" data-oid="5.nnd58" />
            <line x1="8" y1="12" x2="10" y2="12" data-oid="z09n8sv" />
            <line x1="14" y1="12" x2="16" y2="12" data-oid="si4qav4" />
            <line x1="8" y1="18" x2="10" y2="18" data-oid="8iq14.l" />
            <line x1="14" y1="18" x2="16" y2="18" data-oid="jaxp0ae" />
          </svg>
        </button>
        
        {/* Formula Sheet */}
        <button
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
          onClick={openFormulaSheet}
          aria-label="Open formula sheet" data-oid="ahi4ugf">

          <FileText className="w-4 h-4" data-oid="dwbtdpk" />
        </button>
        
        {/* Save & Exit */}
        <button
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
          onClick={() => window.location.href = "/test"}
          aria-label="Save and exit" data-oid="_t4pt-4">

          <LogOut className="w-4 h-4" data-oid="xijflao" />
        </button>
      </div>
    </div>);

}