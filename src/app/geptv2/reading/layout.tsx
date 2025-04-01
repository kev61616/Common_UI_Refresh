'use client';

import { SelectionProvider } from '@/contexts/SelectionContext';
import { QuestionProvider } from '@/contexts/QuestionContext';

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SelectionProvider>
      <QuestionProvider>
        <div className="min-h-screen bg-slate-50">
          <main>{children}</main>
        </div>
      </QuestionProvider>
    </SelectionProvider>
  );
}