"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Book, Calculator, Sigma, Languages, Pencil, ChevronRight } from "lucide-react";
import { 
  usePageLoadAnimation, 
  useStaggeredAnimation 
} from "@/hooks/useAnimatedEffects";

export default function QuestionBankPage() {
  const router = useRouter();
  const { containerRef } = usePageLoadAnimation();
  const { getDelayClass } = useStaggeredAnimation(5);

  // Redirect to subjects page after a short delay
  // This allows the animation to play before redirecting
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/test/question-bank/subjects");
    }, 200);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10 page-header-animate">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-gradient">Redirecting to Question Bank...</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Taking you to the subjects selection page.
          </p>
        </div>
        <div className="text-center py-8">
          <div className="inline-block w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
        <div className="mt-6">
          <p className="text-gray-500">
            If you are not redirected, 
            <Link href="/test/question-bank/subjects" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
              click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
