"use client";

import { QuestionLayout } from "@/components/layout/QuestionLayout";

export default function PracticeTest2() {
  return (
    <QuestionLayout>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Question 16: Advanced Algebra - Complex Expressions
          </h2>
          <p className="text-gray-600 mb-6">
            If f(x) = 2x² - 3x + 1 and g(x) = 3x - 4, find all values of x for which f(x) = g(x).
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                id="option-a" 
                name="answer" 
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="option-a" className="text-gray-700">
                A) x = 1 and x = 2
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
                B) x = -1 and x = 2
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
                C) x = 2 only
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
                D) x = 1 only
              </label>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <p className="text-gray-700 font-medium">Work Area:</p>
            <div className="mt-3 p-4 bg-gray-50 rounded-md min-h-[100px]">
              <p className="text-gray-500 italic">You can use this space to work out your solution.</p>
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
