'use client';

import { SelectionProvider } from '@/contexts/SelectionContext';
import { QuestionProvider } from '@/contexts/QuestionContext';
import { LayoutProvider } from '@/contexts/LayoutContext';

export default function SATReadingLayout({
  children


}: {children: React.ReactNode;}) {
  return (
    <LayoutProvider data-oid="dm0yk9:">
      <SelectionProvider data-oid="s_xlh1z">
        <QuestionProvider data-oid="2jb3anh">
          <div className="min-h-screen bg-slate-50" data-oid="f.a64ji">
            <main data-oid="wi5-p3o">{children}</main>
          </div>
        </QuestionProvider>
      </SelectionProvider>
    </LayoutProvider>);

}