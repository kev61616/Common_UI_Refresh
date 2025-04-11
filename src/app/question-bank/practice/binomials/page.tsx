import { Suspense } from "react";
import { QuestionProvider } from "@/contexts/QuestionContext";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { SelectionProvider } from "@/contexts/SelectionContext";
import QuestionLayout from "@/components/question-bank/QuestionLayout";

// Mark page as static to avoid hydration issues
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function BinomialsPage() {
  return (
    <LayoutProvider data-oid="elqzeqs">
      <SelectionProvider data-oid="-f5nsxt">
        <QuestionProvider data-oid="6a:pjr5">
          <Suspense fallback={<div className="h-screen bg-white" data-oid="0d6g33b">Loading...</div>} data-oid="l4n4xw3">
            <QuestionLayout data-oid="3-2ju0j" />
          </Suspense>
        </QuestionProvider>
      </SelectionProvider>
    </LayoutProvider>);

}