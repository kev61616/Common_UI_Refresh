import { Suspense } from "react";
import { QuestionProvider } from "@/contexts/QuestionContext";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { SelectionProvider } from "@/contexts/SelectionContext";
import QuestionLayout from "@/components/question-bank/QuestionLayout";

// Mark page as static to avoid hydration issues
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function MockTestPage() {
  return (
    <LayoutProvider>
      <SelectionProvider>
        <QuestionProvider>
          <Suspense fallback={<div className="h-screen bg-white">Loading...</div>}>
            <QuestionLayout />
          </Suspense>
        </QuestionProvider>
      </SelectionProvider>
    </LayoutProvider>
  );
}
