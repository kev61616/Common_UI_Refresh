'use client';

import { SelectionProvider } from '@/contexts/SelectionContext';
import { QuestionProvider } from '@/contexts/QuestionContext';
import { LayoutProvider } from '@/contexts/LayoutContext';

export default function SATReadingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider>
      <SelectionProvider>
        <QuestionProvider>
          <div className="min-h-screen bg-slate-50">
            <main>{children}</main>
          </div>
        </QuestionProvider>
      </SelectionProvider>
    </LayoutProvider>
  );
}