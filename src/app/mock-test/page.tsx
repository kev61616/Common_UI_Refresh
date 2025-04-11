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
    <LayoutProvider data-oid="fo3oozk">
      <SelectionProvider data-oid="afj7c40">
        <QuestionProvider data-oid="777b3yd">
          <Suspense fallback={<div className="h-screen bg-white" data-oid="a.r6:v5">Loading...</div>} data-oid="8bheshb">
            <QuestionLayout data-oid="cut27ot" />
          </Suspense>
        </QuestionProvider>
      </SelectionProvider>
    </LayoutProvider>);

}