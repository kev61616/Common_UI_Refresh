'use client';

// Reusable progress chart component for displaying historical progress
export function ProgressChart({ data }: { data: number[] }) {
  return (
    <div className="flex items-end h-16 space-x-1">
      {data.map((value, index) => (
        <div 
          key={index} 
          className="bg-gradient-to-t from-indigo-500 to-indigo-400 dark:from-indigo-600 dark:to-indigo-500 rounded-sm w-6 md:w-8 hover:opacity-80 transition-all duration-300 relative group"
          style={{ 
            height: `${value}%`,
            animation: `grow-up 0.6s ease-out ${index * 0.1}s both`
          }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {value}% - Day {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}
