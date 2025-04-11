"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  usePageLoadAnimation,
  useStaggeredAnimation } from
"@/hooks/useAnimatedEffects";

export default function QuestionBankRedirectClient() {
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
    <div ref={containerRef} className="min-h-screen bg-white py-12 dark:bg-slate-900" data-oid="qn6ua6h">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-oid="mrn_s:v">
        <div className="mb-10 page-header-animate" data-oid="tuz.krz">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" data-oid="bx7x:zk">Redirecting to SAT Question Bank...</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-oid=":te_83g">
            We've moved! Taking you to the new SAT Question Bank page.
          </p>
        </div>
        <div className="text-center py-8" data-oid="1_lxjfq">
          <div className="inline-block w-12 h-12 border-t-4 border-sky-500 border-solid rounded-full animate-spin" data-oid="-v0-f_7"></div>
        </div>
        <div className="mt-6" data-oid="2oqfzy8">
          <p className="text-gray-500 dark:text-gray-400" data-oid="j:urg8u">
            If you are not redirected, 
            <Link href="/sat/question-bank" className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium ml-1" data-oid="i2cl63a">
              click here
            </Link>
          </p>
        </div>
      </div>
    </div>);

}