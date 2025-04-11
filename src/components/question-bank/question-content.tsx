"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function QuestionContent() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const questionText = `In a study of urban physical expansion, Richa Mahtta et al. conducted a meta-analysis of more than 300 cities worldwide to determine whether urban land expansion (ULE) was more strongly influenced by urban population growth or by growth in gross domestic product (GDP) per capita, a measure of economic activity. Because efficient national government is necessary to provide urban services and infrastructure that attract economic investment, Mahtta et al. propose that absent other factors, the importance of GDP per capita growth to ULE would likely increase relative to the importance of population growth as governments become more efficient. If true, this suggests the possibility that ______`;

  const options = [
  {
    id: "A",
    text: "national governments of countries in Region 1 experienced declines in efficiency in the period from 2000 to 2014, relative to the period from 1970 to 2000"
  },
  {
    id: "B",
    text: "countries in Region 1 experienced a slower rate of economic growth in the period from 2000 to 2014 than countries in Region 2 did, despite increasing national government efficiency in Region 1"
  },
  {
    id: "C",
    text: "national governments of most countries in Region 2 became more efficient in the period from 2000 to 2014 than they had been in the period from 1970 to 2000, but those of several countries in this region did not"
  },
  {
    id: "D",
    text: "national governments of countries in Region 1 and in Region 2 generally became more efficient in the period from 2000 to 2014 than they had been in the period from 1970 to 2000, but at different rates"
  }];


  return (
    <div className="grid md:grid-cols-2 gap-8" data-oid="u40-19t">
      {/* Left column - Question text */}
      <div className="p-8" data-oid="-4rm6k.">
        <p className="text-base leading-relaxed" data-oid="578sub6">
          {questionText}
        </p>
      </div>
      
      {/* Right column - Answer options */}
      <div className="bg-blue-50/30 p-8" data-oid="vur:rx8">
        <div className="bg-blue-50 py-3 px-4 rounded-md text-blue-700 font-medium mb-6" data-oid="rvzfpox">
          Select an Answer
        </div>
        
        <div className="space-y-4" data-oid="yxa7tcz">
          {options.map((option) =>
          <div
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={cn(
              "border rounded-lg p-4 transition-colors cursor-pointer",
              selectedOption === option.id ?
              "border-blue-500 bg-blue-50" :
              "border-gray-200 hover:border-blue-200 hover:bg-blue-50/30"
            )} data-oid="mpmxe:2">

              <div className="flex gap-4" data-oid="c_x-4kr">
                <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                  selectedOption === option.id ?
                  "bg-blue-100 text-blue-700 border-2 border-blue-500" :
                  "bg-gray-100 text-gray-700"
                )} data-oid="y:xuky4">

                  {option.id}
                </div>
                <div className="text-sm leading-relaxed mt-1.5" data-oid="b05ncey">
                  {option.text}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-center" data-oid="-cah3kj">
          <button
            className="py-2 px-8 bg-gray-100 text-gray-900 rounded-md font-medium hover:bg-gray-200 transition-colors" data-oid="i5ird7-">

            Check Answer
          </button>
        </div>
      </div>
    </div>);

}