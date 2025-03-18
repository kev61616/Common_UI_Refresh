'use client'

import { SetViewProps } from './types'

export function HexagonalView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">12. Hexagonal Grid View</h3>
      <div className="flex justify-center">
        <div className="honeycomb">
          {practiceSets.slice(0, 12).map((set, index) => (
            <div 
              key={set.id} 
              className={`honeycomb-cell ${index % 3 === 0 ? 'reading' : index % 3 === 1 ? 'math' : 'writing'}`}
              onClick={() => onSelectSet && onSelectSet(set.id)}
            >
              <div className={`honeycomb-content ${selectedSetId === set.id ? 'selected' : ''}`}>
                <h3 className="text-sm font-semibold">{set.subject}</h3>
                <div className="text-xs">{set.type}</div>
                <div className="text-lg font-bold mt-2">{set.accuracy}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .honeycomb {
          display: flex;
          flex-wrap: wrap;
          max-width: 900px;
          margin: 0 auto;
          transform: translateY(20px);
        }
        .honeycomb-cell {
          flex: 0 1 200px;
          max-width: 250px;
          height: 120px;
          margin: 20px 12px;
          position: relative;
          cursor: pointer;
          z-index: 1;
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          transition: transform 0.3s ease;
          transform: scale(0.95);
        }
        .honeycomb-cell:hover, .honeycomb-cell .selected {
          transform: scale(1);
          z-index: 2;
        }
        .honeycomb-cell.reading .honeycomb-content {
          background: linear-gradient(135deg, #93c5fd, #3b82f6);
        }
        .honeycomb-cell.math .honeycomb-content {
          background: linear-gradient(135deg, #c4b5fd, #8b5cf6);
        }
        .honeycomb-cell.writing .honeycomb-content {
          background: linear-gradient(135deg, #fbcfe8, #db2777);
        }
        .honeycomb-content {
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          text-shadow: 0 1px 1px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
          padding: 10px;
        }
        .honeycomb-content.selected {
          box-shadow: 0 0 0 5px rgba(255,255,255,0.5);
        }
        
        @media (max-width: 640px) {
          .honeycomb-cell {
            flex: 0 1 130px;
            height: 80px;
          }
        }
      `}</style>
    </div>
  )
}
