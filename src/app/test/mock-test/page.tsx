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
    <LayoutProvider data-oid=":-dbu34">
      <SelectionProvider data-oid="ehv1ddk">
        <QuestionProvider data-oid="5sc_za8">
          <Suspense fallback={<div className="h-screen bg-white" data-oid="ynx-73q">Loading...</div>} data-oid="6xx7q04">
            <QuestionLayout data-oid="9af7xg9" />
          </Suspense>
        </QuestionProvider>
      </SelectionProvider>
    </LayoutProvider>);

}