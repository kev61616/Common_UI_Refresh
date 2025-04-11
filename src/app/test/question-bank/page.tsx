"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Book, Calculator, Sigma, Languages, Pencil, ChevronRight } from "lucide-react";
import {
  usePageLoadAnimation,
  useStaggeredAnimation } from
"@/hooks/useAnimatedEffects";

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
    <div ref={containerRef} className="min-h-screen bg-gray-50 py-12" data-oid="-:dxt-p">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-oid="173_x5t">
        <div className="mb-10 page-header-animate" data-oid="yo70kq2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-gradient" data-oid="u0j3e.8">Redirecting to Question Bank...</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto" data-oid="d31l4aw">
            Taking you to the subjects selection page.
          </p>
        </div>
        <div className="text-center py-8" data-oid="rh0jzuy">
          <div className="inline-block w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin" data-oid="ma8uqpi"></div>
        </div>
        <div className="mt-6" data-oid="g:5wzw9">
          <p className="text-gray-500" data-oid="zztzht9">
            If you are not redirected, 
            <Link href="/test/question-bank/subjects" className="text-blue-600 hover:text-blue-800 font-medium ml-1" data-oid="-4bbj76">
              click here
            </Link>
          </p>
        </div>
      </div>
    </div>);

}