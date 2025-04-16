"use client";

import { QuestionLayout } from "@/components/layout/QuestionLayout";

export default function OfficialSimulation() {
  return (
    <QuestionLayout>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Question 16: Data Analysis - Graph Interpretation
          </h2>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              The graph below shows the relationship between the temperature (in degrees Fahrenheit) and the number of chirps per minute for a certain species of cricket.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md mb-4 flex justify-center">
              <div className="w-full max-w-md h-64 bg-white rounded-md border border-gray-200 flex items-center justify-center">
                <p className="text-gray-400 text-sm">[Graph illustration would appear here]</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              Based on the line of best fit shown in the graph, which of the following is closest to the predicted number of chirps per minute when the temperature is 75°F?
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                id="option-a" 
                name="answer" 
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="option-a" className="text-gray-700">
                A) 90 chirps per minute
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                id="option-b" 
                name="answer" 
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="option-b" className="text-gray-700">
                B) 100 chirps per minute
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                id="option-c" 
                name="answer" 
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="option-c" className="text-gray-700">
                C) 110 chirps per minute
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                id="option-d" 
                name="answer" 
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="option-d" className="text-gray-700">
                D) 120 chirps per minute
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </QuestionLayout>
  );
}
