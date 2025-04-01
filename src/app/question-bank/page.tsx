"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  usePageLoadAnimation, 
  useStaggeredAnimation 
} from "@/hooks/useAnimatedEffects";

export default function QuestionBankRedirectPage() {
  const router = useRouter();
  const { containerRef } = usePageLoadAnimation();

  // Redirect to the new SAT Question Bank page after a short delay
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/sat/question-bank");
    }, 200);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white py-12 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10 page-header-animate">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Redirecting to SAT Question Bank...</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We've moved! Taking you to the new SAT Question Bank page.
          </p>
        </div>
        <div className="text-center py-8">
          <div className="inline-block w-12 h-12 border-t-4 border-sky-500 border-solid rounded-full animate-spin"></div>
        </div>
        <div className="mt-6">
          <p className="text-gray-500 dark:text-gray-400">
            If you are not redirected, 
            <Link href="/sat/question-bank" className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium ml-1">
              click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
