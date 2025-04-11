"use client";

import Link from "next/link";
import { ChevronRight, Plus, Divide, ArrowLeft, FunctionSquare, Circle, Triangle } from "lucide-react";
import { Suspense, useState } from "react";
import {
  useInteractiveGlow,
  usePageLoadAnimation,
  useStaggeredAnimation,
  useCountAnimation } from
"@/hooks/useAnimatedEffects";

interface TopicCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  imageColor: string;
  questionCount: number;
  masteryLevel: number;
  index: number;
}

function TopicCard({
  title,
  description,
  href,
  icon,
  imageColor,
  questionCount,
  masteryLevel,
  index
}: TopicCardProps) {
  const { elementRef } = useInteractiveGlow();
  const { getDelayClass } = useStaggeredAnimation(5);
  const [isHovering, setIsHovering] = useState(false);

  // Animate the count when hovering
  const animatedCount = useCountAnimation(isHovering ? questionCount : 0);

  return (
    <div
      ref={elementRef}
      className={`flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden
                 card-hover-effect interactive-glow shine-effect stagger-fade-in ${getDelayClass(index)}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)} data-oid=".pzow:1">

      <Link href={href} className="block h-full" data-oid="4synywn">
        <div className={`${imageColor} h-2`} data-oid="ggh1krb"></div>
        <div className="p-6" data-oid="kprx_wj">
          <div className="flex items-start" data-oid="rw2q1f4">
            <div className={`rounded-lg p-3 ${imageColor} bg-opacity-10 text-gray-700 mr-4 icon-parallax`} data-oid="djov2qn">
              {icon}
            </div>
            <div className="flex-1 content-parallax" data-oid="6rf:z83">
              <h3 className="text-xl font-semibold mb-1" data-oid="yzrnlk9">{title}</h3>
              <p className="text-gray-600 text-sm mb-4" data-oid="wvqsgbv">{description}</p>
              
              <div className="flex justify-between items-center" data-oid="81_hypo">
                <div className="flex items-center" data-oid="fs-zjdf">
                  <span className="text-sm text-gray-500" data-oid="1zur3im">
                    {isHovering ? animatedCount : questionCount} questions
                  </span>
                  <div className="mx-2 w-1 h-1 rounded-full bg-gray-300" data-oid="jf5r:zo"></div>
                  <div className="flex items-center" data-oid="-.mmgp4">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden" data-oid="c_9ea-h">
                      <div
                        className={`h-full rounded-full ${
                        masteryLevel >= 80 ? 'bg-green-500' :
                        masteryLevel >= 60 ? 'bg-emerald-500' :
                        masteryLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'} progress-bar-animate`
                        }
                        style={{ width: `${masteryLevel}%` }} data-oid="hqsjfqf">
                      </div>
                    </div>
                    <span className="text-sm text-gray-500" data-oid="z7a2kiu">{masteryLevel}%</span>
                  </div>
                </div>
                <div className={`text-blue-600 flex items-center font-medium transition-transform duration-300 
                              ${isHovering ? 'translate-x-1' : ''}`} data-oid="-h5wz7j">
                  <span className="text-sm" data-oid="66e9vt7">Explore</span> 
                  <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-300 
                                        ${isHovering ? 'translate-x-1' : ''}`} data-oid="k9.kb_5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>);

}

// Enhanced loading component
function MathTopicsLoading() {
  return (
    <div className="min-h-screen bg-white py-12" data-oid="t_kn:gt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="y1l9g9v">
        <div className="mb-10 animate-pulse" data-oid="mtqb3eq">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" data-oid="_3qs9iy"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" data-oid="lfoi:nr"></div>
          <div className="h-4 bg-gray-200 rounded w-full max-w-3xl" data-oid="6d:w:lx"></div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8 animate-pulse" data-oid="x:6d8:w">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" data-oid="1_oc6zm"></div>
          <div className="flex flex-wrap items-center justify-between" data-oid="ys12wl4">
            <div className="flex items-center mb-4 sm:mb-0" data-oid=".x9.cg.">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4" data-oid="cfbo7.u"></div>
              <div data-oid="2-37xfb">
                <div className="h-4 bg-gray-200 rounded w-24 mb-1" data-oid="29tuecd"></div>
                <div className="w-40 h-2 bg-gray-200 rounded-full" data-oid="kqngso6"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" data-oid="6l4hxdo">
              {[1, 2, 3].map((i) =>
              <div key={i} className="text-center" data-oid="p86v5e-">
                  <div className="h-6 bg-gray-200 rounded w-12 mx-auto mb-1" data-oid="kgh7xhq"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto" data-oid="9.ecxx9"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="jcaoi0f">
          {[1, 2, 3, 4, 5].map((i) =>
          <div key={i} className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-pulse" data-oid="0oowudx">
              <div className="h-2 bg-gray-200" data-oid="jdmqcdw"></div>
              <div className="p-6" data-oid="umylj4i">
                <div className="flex items-start" data-oid="4cfo836">
                  <div className="rounded-lg p-3 bg-gray-200 mr-4 w-12 h-12" data-oid="ng6vv8-"></div>
                  <div className="flex-1" data-oid="awtw5p9">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-1" data-oid="93p3s8-"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" data-oid="wleiee1"></div>
                    <div className="flex justify-between items-center" data-oid="07vrrkt">
                      <div className="h-4 bg-gray-200 rounded w-32" data-oid="aceaq4v"></div>
                      <div className="h-4 bg-gray-200 rounded w-16" data-oid="7x-lsg3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}

// Main content component separated for proper Suspense handling
function MathTopicsContent() {
  // Mock data for math topic cards
  const mathTopics = [
  {
    title: "Algebra",
    description: "Equations, inequalities, functions, and polynomials",
    href: "/test/question-bank/subjects/math/algebra",
    icon: <FunctionSquare className="h-6 w-6" data-oid="jtg09e3" />,
    imageColor: "bg-blue-500",
    questionCount: 180,
    masteryLevel: 75
  },
  {
    title: "Geometry",
    description: "Angles, triangles, circles, and coordinate geometry",
    href: "/test/question-bank/subjects/math/geometry",
    icon: <Triangle className="h-6 w-6" data-oid="d9ql1a_" />,
    imageColor: "bg-emerald-500",
    questionCount: 120,
    masteryLevel: 82
  },
  {
    title: "Trigonometry",
    description: "Trig functions, identities, and applications",
    href: "/test/question-bank/subjects/math/trigonometry",
    icon: <Triangle className="h-6 w-6" data-oid="h725rrw" />,
    imageColor: "bg-purple-500",
    questionCount: 85,
    masteryLevel: 68
  },
  {
    title: "Statistics & Probability",
    description: "Data analysis, distributions, and probability models",
    href: "/test/question-bank/subjects/math/statistics",
    icon: <Circle className="h-6 w-6" data-oid="i5nkxpy" />,
    imageColor: "bg-indigo-500",
    questionCount: 95,
    masteryLevel: 79
  },
  {
    title: "Arithmetic & Number Theory",
    description: "Number properties, fractions, ratios, and percentages",
    href: "/test/question-bank/subjects/math/arithmetic",
    icon: <Plus className="h-6 w-6" data-oid="p7drqw0" />,
    imageColor: "bg-amber-500",
    questionCount: 60,
    masteryLevel: 88
  }];


  // Calculate total questions
  const totalQuestions = mathTopics.reduce((sum, topic) => sum + topic.questionCount, 0);

  // Calculate overall mastery level
  const overallMastery = Math.round(
    mathTopics.reduce((sum, topic) => sum + topic.masteryLevel * topic.questionCount, 0) / totalQuestions
  );

  return (
    <div className="min-h-screen bg-white py-12" data-oid="my1a7hx">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="f:3ze1p">
        <div className="mb-10" data-oid="qpj1gye">
          <div className="flex items-center text-sm text-gray-500 mb-4" data-oid="m-rf_ov">
            <Link href="/" className="hover:text-gray-700" data-oid="53j3b38">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" data-oid=".4.-yo9" />
            <Link href="/test" className="hover:text-gray-700" data-oid="kkjsyy.">Test Center</Link>
            <ChevronRight className="h-4 w-4 mx-1" data-oid="djrrade" />
            <Link href="/test/question-bank/subjects" className="hover:text-gray-700" data-oid="v6u0cyq">Question Bank</Link>
            <ChevronRight className="h-4 w-4 mx-1" data-oid="ap:imz1" />
            <span className="text-gray-700 font-medium" data-oid="-x0j19g">Mathematics</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4" data-oid="shv.lbt">Mathematics Topics</h1>
          <p className="text-lg text-gray-600 max-w-3xl" data-oid="p6_bqba">
            Select a topic to explore specific math concepts and practice questions.
          </p>
        </div>

        {/* Math Progress Overview */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8" data-oid="e8pzmd4">
          <h2 className="text-xl font-semibold mb-4" data-oid="c6l52d3">Your Mathematics Progress</h2>
          <div className="flex flex-wrap items-center justify-between" data-oid="a3s:sms">
            <div className="flex items-center mb-4 sm:mb-0" data-oid=".98zitj">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4" data-oid=":0.a14p">
                <span className="text-xl font-bold" data-oid="mvv:-oj">{overallMastery}%</span>
              </div>
              <div data-oid="a0ta.q6">
                <div className="text-sm text-gray-500 mb-1" data-oid="dejnyjz">Overall Mastery</div>
                <div className="w-40 h-2 bg-gray-200 rounded-full" data-oid="eywbstl">
                  <div
                    className={`h-full rounded-full ${
                    overallMastery >= 80 ? 'bg-green-500' :
                    overallMastery >= 60 ? 'bg-emerald-500' :
                    overallMastery >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`
                    }
                    style={{ width: `${overallMastery}%` }} data-oid="qtiaw7z">
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" data-oid="00eiixc">
              <div className="text-center" data-oid="q.jkfd4">
                <div className="text-2xl font-bold text-gray-800" data-oid="2ruqdtt">{totalQuestions}</div>
                <div className="text-sm text-gray-500" data-oid="s.5ow6h">Total Questions</div>
              </div>
              <div className="text-center" data-oid="1qyhc.x">
                <div className="text-2xl font-bold text-gray-800" data-oid="s61q3tm">
                  {mathTopics.filter((topic) => topic.masteryLevel >= 80).length}
                </div>
                <div className="text-sm text-gray-500" data-oid="7wafm:u">Mastered Topics</div>
              </div>
              <div className="text-center" data-oid="upy:v.g">
                <div className="text-2xl font-bold text-gray-800" data-oid="re4jd5h">
                  {mathTopics.filter((topic) => topic.masteryLevel < 60).length}
                </div>
                <div className="text-sm text-gray-500" data-oid="7-_9814">Topics to Improve</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="y3yn3aa">
          {mathTopics.map((topic, index) =>
          <TopicCard key={index} {...topic} index={index} data-oid="inc.lbl" />
          )}
        </div>
        
        <div className="mt-12 flex justify-center" data-oid="xxkbx33">
          <Link
            href="/test/question-bank/subjects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200" data-oid="cgsu04q">

            <ArrowLeft className="h-4 w-4 mr-2" data-oid="gro:ylh" />
            Back to Subjects
          </Link>
        </div>
      </div>
    </div>);

}

// Top-level page component with proper Suspense boundary
export default function MathTopicsPage() {
  return (
    <Suspense fallback={<MathTopicsLoading data-oid="kmr7.oj" />} data-oid="cj6nzsw">
      <MathTopicsContent data-oid="d83t.cv" />
    </Suspense>);

}