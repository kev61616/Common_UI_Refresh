'use client';

import { SelectionProvider } from '@/contexts/SelectionContext';
import { QuestionProvider } from '@/contexts/QuestionContext';

export default function ReadingLayout({
  children


}: {children: React.ReactNode;}) {
  return (
    <SelectionProvider data-oid=":e23g1j">
      <QuestionProvider data-oid="z3vs-ql">
        <div className="min-h-screen bg-slate-50" data-oid="rh6l5nb">
          <main data-oid="2qq0wb.">{children}</main>
        </div>
      </QuestionProvider>
    </SelectionProvider>);

}