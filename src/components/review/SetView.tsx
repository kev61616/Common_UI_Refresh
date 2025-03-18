import { mockPracticeSets } from '@/lib/mockData';

export const SetView = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
        Practice Sets ({mockPracticeSets.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPracticeSets.map((set) => (
          <div
            key={set.id}
            className="p-4 rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {set.subject}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(set.dateCompleted).toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
              {set.type} Practice
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {set.questions.length} questions • {set.accuracy}% accuracy
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
