"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft, Asterisk, X, Divide, Plus, Minus } from "lucide-react";
import { Suspense, useState } from "react";
import {
  useInteractiveGlow,
  usePageLoadAnimation,
  useStaggeredAnimation,
  useCountAnimation } from
"@/hooks/useAnimatedEffects";

interface SubtopicCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  imageColor: string;
  questionCount: number;
  masteryLevel: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  index: number;
}

function SubtopicCard({
  title,
  description,
  href,
  icon,
  imageColor,
  questionCount,
  masteryLevel,
  difficulty,
  index
}: SubtopicCardProps) {
  // Determine difficulty badge color
  const difficultyColor =
  difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
  difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
  'bg-purple-100 text-purple-800';

  const { elementRef } = useInteractiveGlow();
  const { getDelayClass } = useStaggeredAnimation(7);
  const [isHovering, setIsHovering] = useState(false);

  // Animate the count when hovering
  const animatedCount = useCountAnimation(isHovering ? questionCount : 0);

  return (
    <div
      ref={elementRef}
      className={`flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden
                 card-hover-effect interactive-glow shine-effect stagger-fade-in ${getDelayClass(index)}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)} data-oid="4wobehs">

      <Link href={href} className="block h-full" data-oid=".j8qs.-">
        <div className={`${imageColor} h-2`} data-oid="50rkk0e"></div>
        <div className="p-6" data-oid="7mz8r73">
          <div className="flex items-start" data-oid="l6ko9:w">
            <div className={`rounded-lg p-3 ${imageColor} bg-opacity-10 text-gray-700 mr-4 icon-parallax`} data-oid="nkbl2_w">
              {icon}
            </div>
            <div className="flex-1 content-parallax" data-oid="mjm9tnr">
              <div className="flex justify-between items-center mb-1" data-oid="ove1dpo">
                <h3 className="text-xl font-semibold" data-oid="w7wlndm">{title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`} data-oid="utpwch7">
                  {difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4" data-oid="x1qpb:m">{description}</p>
              
              <div className="flex justify-between items-center" data-oid="3fxh0b0">
                <div className="flex items-center" data-oid="upfr_jv">
                  <span className="text-sm text-gray-500" data-oid="th1ii8x">
                    {isHovering ? animatedCount : questionCount} questions
                  </span>
                  <div className="mx-2 w-1 h-1 rounded-full bg-gray-300" data-oid="o6rdb1."></div>
                  <div className="flex items-center" data-oid="tfc223o">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden" data-oid="sahg::i">
                      <div
                        className={`h-full rounded-full ${
                        masteryLevel >= 80 ? 'bg-green-500' :
                        masteryLevel >= 60 ? 'bg-emerald-500' :
                        masteryLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'} progress-bar-animate`
                        }
                        style={{ width: `${masteryLevel}%` }} data-oid="dbxkkwd">
                      </div>
                    </div>
                    <span className="text-sm text-gray-500" data-oid="kov0u5k">{masteryLevel}%</span>
                  </div>
                </div>
                <div className={`text-blue-600 flex items-center font-medium transition-transform duration-300 
                               ${isHovering ? 'translate-x-1' : ''}`} data-oid="sg:ti0b">
                  <span className="text-sm" data-oid="gis4uay">Practice</span>
                  <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-300 
                                          ${isHovering ? 'translate-x-1' : ''}`} data-oid=".23r63e" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>);

}

export default function AlgebraSubtopicsPage() {
  // Mock data for algebra subtopics
  const algebraSubtopics = [
  {
    title: "Linear Equations",
    description: "Solving first-degree equations with one variable",
    href: "/test/question-bank/subjects/math/algebra/linear-equations",
    icon: <Plus className="h-6 w-6" data-oid="w57_7tr" />,
    imageColor: "bg-blue-500",
    questionCount: 28,
    masteryLevel: 85,
    difficulty: 'Beginner' as const
  },
  {
    title: "Quadratic Equations",
    description: "Solving second-degree polynomial equations",
    href: "/test/question-bank/subjects/math/algebra/quadratic-equations",
    icon: <X className="h-6 w-6" data-oid="ul27e50" />,
    imageColor: "bg-indigo-500",
    questionCount: 32,
    masteryLevel: 72,
    difficulty: 'Intermediate' as const
  },
  {
    title: "Multiply Binomials",
    description: "FOIL method and distributing terms in expressions",
    href: "/test/question-bank",
    icon: <Asterisk className="h-6 w-6" data-oid="87sbkmd" />,
    imageColor: "bg-purple-500",
    questionCount: 24,
    masteryLevel: 68,
    difficulty: 'Intermediate' as const
  },
  {
    title: "Factoring Polynomials",
    description: "Breaking down polynomial expressions into products",
    href: "/test/question-bank/subjects/math/algebra/factoring",
    icon: <Divide className="h-6 w-6" data-oid="656.3xr" />,
    imageColor: "bg-emerald-500",
    questionCount: 30,
    masteryLevel: 65,
    difficulty: 'Intermediate' as const
  },
  {
    title: "Rational Expressions",
    description: "Working with fractions containing variables",
    href: "/test/question-bank/subjects/math/algebra/rational-expressions",
    icon: <Divide className="h-6 w-6" data-oid=":lzstmi" />,
    imageColor: "bg-amber-500",
    questionCount: 22,
    masteryLevel: 58,
    difficulty: 'Advanced' as const
  },
  {
    title: "Systems of Equations",
    description: "Solving multiple equations simultaneously",
    href: "/test/question-bank/subjects/math/algebra/systems",
    icon: <Plus className="h-6 w-6" data-oid="4ye-m-t" />,
    imageColor: "bg-teal-500",
    questionCount: 26,
    masteryLevel: 70,
    difficulty: 'Advanced' as const
  },
  {
    title: "Inequalities",
    description: "Solving and graphing inequalities",
    href: "/test/question-bank/subjects/math/algebra/inequalities",
    icon: <Minus className="h-6 w-6" data-oid="mfvl-6j" />,
    imageColor: "bg-red-500",
    questionCount: 18,
    masteryLevel: 75,
    difficulty: 'Intermediate' as const
  }];


  // Calculate total questions
  const totalQuestions = algebraSubtopics.reduce((sum, subtopic) => sum + subtopic.questionCount, 0);

  // Calculate overall mastery level
  const overallMastery = Math.round(
    algebraSubtopics.reduce((sum, subtopic) => sum + subtopic.masteryLevel * subtopic.questionCount, 0) / totalQuestions
  );

  return (
    <Suspense fallback={<div className="h-screen bg-white" data-oid="w1_6_ty">Loading...</div>} data-oid="n__uvcq">
      <div className="min-h-screen bg-white py-12" data-oid="wh5u3fw">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="so8gddt">
          <div className="mb-10" data-oid="r5a25c5">
            <div className="flex items-center text-sm text-gray-500 mb-4" data-oid="j6yx1jo">
              <Link href="/" className="hover:text-gray-700" data-oid="-6hy25v">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="01767u4" />
              <Link href="/test" className="hover:text-gray-700" data-oid="g5x5w:g">Test Center</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="xfe2vlh" />
              <Link href="/test/question-bank/subjects" className="hover:text-gray-700" data-oid="gkvtc56">Question Bank</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="9i12098" />
              <Link href="/test/question-bank/subjects/math" className="hover:text-gray-700" data-oid="vxsy5dp">Mathematics</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="l0p2ley" />
              <span className="text-gray-700 font-medium" data-oid="9k5e6c_">Algebra</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4" data-oid="9r1qg4h">Algebra Topics</h1>
            <p className="text-lg text-gray-600 max-w-3xl" data-oid="wc0lnvg">
              Select a topic to practice specific algebra concepts and problems.
            </p>
          </div>

          {/* Algebra Progress Overview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8" data-oid="gic5gu9">
            <h2 className="text-xl font-semibold mb-4" data-oid="-k7-5:i">Your Algebra Progress</h2>
            <div className="flex flex-wrap items-center justify-between" data-oid=".ib9:-_">
              <div className="flex items-center mb-4 sm:mb-0" data-oid="nlel99:">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4" data-oid="gyfi..c">
                  <span className="text-xl font-bold" data-oid="l4g6wl0">{overallMastery}%</span>
                </div>
                <div data-oid="v0jcz0u">
                  <div className="text-sm text-gray-500 mb-1" data-oid="4.6oyv3">Overall Mastery</div>
                  <div className="w-40 h-2 bg-gray-200 rounded-full" data-oid="2gzosm3">
                    <div
                      className={`h-full rounded-full ${
                      overallMastery >= 80 ? 'bg-green-500' :
                      overallMastery >= 60 ? 'bg-emerald-500' :
                      overallMastery >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`
                      }
                      style={{ width: `${overallMastery}%` }} data-oid="3tea19y">
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-oid="kkg9ta6">
                <div className="text-center" data-oid="e6ttr76">
                  <div className="text-2xl font-bold text-gray-800" data-oid="_ga1:gv">{totalQuestions}</div>
                  <div className="text-sm text-gray-500" data-oid="56wb-ry">Total Questions</div>
                </div>
                <div className="text-center" data-oid="dwallht">
                  <div className="text-2xl font-bold text-gray-800" data-oid="z8k:y9s">
                    {algebraSubtopics.filter((topic) => topic.difficulty === 'Beginner').length}
                  </div>
                  <div className="text-sm text-gray-500" data-oid="l2n.6:c">Beginner Topics</div>
                </div>
                <div className="text-center" data-oid="e6kykno">
                  <div className="text-2xl font-bold text-gray-800" data-oid="sx9jtcd">
                    {algebraSubtopics.filter((topic) => topic.difficulty === 'Intermediate').length}
                  </div>
                  <div className="text-sm text-gray-500" data-oid="19sjnyy">Intermediate</div>
                </div>
                <div className="text-center" data-oid="rko1648">
                  <div className="text-2xl font-bold text-gray-800" data-oid="by_n988">
                    {algebraSubtopics.filter((topic) => topic.difficulty === 'Advanced').length}
                  </div>
                  <div className="text-sm text-gray-500" data-oid="ddb:686">Advanced</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="yna4csn">
            {algebraSubtopics.map((subtopic, index) =>
            <SubtopicCard key={index} {...subtopic} index={index} data-oid="lg.rl.e" />
            )}
          </div>
          
          <div className="mt-12 flex justify-center" data-oid="e0ru7qs">
            <Link
              href="/test/question-bank/subjects/math"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200" data-oid="x50u..:">

              <ArrowLeft className="h-4 w-4 mr-2" data-oid="ym27tc3" />
              Back to Math Topics
            </Link>
          </div>
        </div>
      </div>
    </Suspense>);

}