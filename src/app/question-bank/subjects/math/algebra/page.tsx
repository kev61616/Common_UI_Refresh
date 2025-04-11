"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft, Asterisk, X, Divide, Plus, Minus, Sparkles, BookOpen, Trophy } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
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
  featured?: boolean;
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
  index,
  featured = false
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
                 card-hover-effect interactive-glow shine-effect stagger-fade-in ${getDelayClass(index)}
                 ${featured ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)} data-oid="w9l:0xq">

      <Link href={href} className="block h-full" data-oid="9577hz.">
        <div className={`${imageColor} h-2`} data-oid="3l259m1"></div>
        <div className="p-6" data-oid="bgy-v-2">
          {featured &&
          <div className="absolute top-4 right-4 flex items-center text-blue-600 text-sm font-medium" data-oid="r6k.dw5">
              <Sparkles className="w-4 h-4 mr-1" data-oid="_pzksp1" />
              <span data-oid="p8r3zcx">Recommended</span>
            </div>
          }
          <div className="flex items-start" data-oid="xh4i2.f">
            <div className={`rounded-lg p-3 ${imageColor} bg-opacity-10 text-gray-700 mr-4 icon-parallax`} data-oid="9kwwls6">
              {icon}
            </div>
            <div className="flex-1 content-parallax" data-oid="l0wggau">
              <div className="flex justify-between items-center mb-1" data-oid="zzoqkyx">
                <h3 className="text-xl font-semibold" data-oid="67t1k53">{title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`} data-oid="ut8qtux">
                  {difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4" data-oid="cwysnvf">{description}</p>
              
              <div className="flex justify-between items-center" data-oid=":.x.7qx">
                <div className="flex items-center" data-oid="ywtau5t">
                  <span className="text-sm text-gray-500" data-oid="9:jft8.">
                    {isHovering ? animatedCount : questionCount} questions
                  </span>
                  <div className="mx-2 w-1 h-1 rounded-full bg-gray-300" data-oid="7oktxrn"></div>
                  <div className="flex items-center" data-oid="q-ay7jy">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden" data-oid="xvf:7u7">
                      <div
                        className={`h-full rounded-full ${
                        masteryLevel >= 80 ? 'bg-green-500' :
                        masteryLevel >= 60 ? 'bg-emerald-500' :
                        masteryLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'} progress-bar-animate`
                        }
                        style={{ width: `${masteryLevel}%` }} data-oid="uvk8bxc">
                      </div>
                    </div>
                    <span className="text-sm text-gray-500" data-oid="waeaibw">{masteryLevel}%</span>
                  </div>
                </div>
                <div className={`text-blue-600 flex items-center font-medium transition-transform duration-300 
                               ${isHovering ? 'translate-x-1' : ''}`} data-oid="uh0_l5p">
                  <span className="text-sm" data-oid="fs47i.e">Practice</span>
                  <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-300 
                                          ${isHovering ? 'translate-x-1' : ''}`} data-oid="bh.akj8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>);

}

export default function AlgebraSubtopicsPage() {
  const { containerRef } = usePageLoadAnimation();
  const [randomBgPosition, setRandomBgPosition] = useState({ x: 20, y: 20 });

  // Change background pattern position slightly on load for visual interest
  useEffect(() => {
    setRandomBgPosition({
      x: Math.floor(Math.random() * 40),
      y: Math.floor(Math.random() * 40)
    });
  }, []);

  // Mock data for algebra subtopics
  const algebraSubtopics = [
  {
    title: "Linear Equations",
    description: "Solving first-degree equations with one variable",
    href: "/question-bank/subjects/math/algebra/linear-equations",
    icon: <Plus className="h-6 w-6" data-oid="o2bij20" />,
    imageColor: "bg-blue-500",
    questionCount: 28,
    masteryLevel: 85,
    difficulty: 'Beginner' as const
  },
  {
    title: "Quadratic Equations",
    description: "Solving second-degree polynomial equations",
    href: "/question-bank/subjects/math/algebra/quadratic-equations",
    icon: <X className="h-6 w-6" data-oid=":u7xx:p" />,
    imageColor: "bg-indigo-500",
    questionCount: 32,
    masteryLevel: 72,
    difficulty: 'Intermediate' as const,
    featured: true
  },
  {
    title: "Multiply Binomials",
    description: "FOIL method and distributing terms in expressions",
    href: "/question-bank/practice/binomials",
    icon: <Asterisk className="h-6 w-6" data-oid="fp9x_5p" />,
    imageColor: "bg-purple-500",
    questionCount: 24,
    masteryLevel: 68,
    difficulty: 'Intermediate' as const,
    featured: true
  },
  {
    title: "Factoring Polynomials",
    description: "Breaking down polynomial expressions into products",
    href: "/question-bank/subjects/math/algebra/factoring",
    icon: <Divide className="h-6 w-6" data-oid="74.o_md" />,
    imageColor: "bg-emerald-500",
    questionCount: 30,
    masteryLevel: 65,
    difficulty: 'Intermediate' as const
  },
  {
    title: "Rational Expressions",
    description: "Working with fractions containing variables",
    href: "/question-bank/subjects/math/algebra/rational-expressions",
    icon: <Divide className="h-6 w-6" data-oid="0l37yxu" />,
    imageColor: "bg-amber-500",
    questionCount: 22,
    masteryLevel: 58,
    difficulty: 'Advanced' as const
  },
  {
    title: "Systems of Equations",
    description: "Solving multiple equations simultaneously",
    href: "/question-bank/subjects/math/algebra/systems",
    icon: <Plus className="h-6 w-6" data-oid="zpf46ir" />,
    imageColor: "bg-teal-500",
    questionCount: 26,
    masteryLevel: 70,
    difficulty: 'Advanced' as const
  },
  {
    title: "Inequalities",
    description: "Solving and graphing inequalities",
    href: "/question-bank/subjects/math/algebra/inequalities",
    icon: <Minus className="h-6 w-6" data-oid="dy:jsx3" />,
    imageColor: "bg-red-500",
    questionCount: 18,
    masteryLevel: 75,
    difficulty: 'Intermediate' as const
  }];


  // Calculate total questions
  const totalQuestions = algebraSubtopics.reduce((sum, subtopic) => sum + subtopic.questionCount, 0);
  const animatedTotalQuestions = useCountAnimation(totalQuestions, 1500);

  // Calculate overall mastery level
  const overallMastery = Math.round(
    algebraSubtopics.reduce((sum, subtopic) => sum + subtopic.masteryLevel * subtopic.questionCount, 0) / totalQuestions
  );

  // Learning resources (mock data)
  const resources = [
  { title: "Algebra Video Tutorials", type: "Videos", count: 12 },
  { title: "Formula Sheet", type: "PDF", count: 1 },
  { title: "Practice Problem Sets", type: "Worksheets", count: 8 }];


  // Level distribution (for the pie chart visual)
  const levelCounts = {
    beginner: algebraSubtopics.filter((topic) => topic.difficulty === 'Beginner').length,
    intermediate: algebraSubtopics.filter((topic) => topic.difficulty === 'Intermediate').length,
    advanced: algebraSubtopics.filter((topic) => topic.difficulty === 'Advanced').length
  };

  return (
    <Suspense fallback={<div className="h-screen bg-white" data-oid="g:lmj1_">Loading...</div>} data-oid="h694fcj">
      <div ref={containerRef} className="min-h-screen bg-white py-12"
      style={{
        backgroundImage: `radial-gradient(circle at ${randomBgPosition.x}% ${randomBgPosition.y}%, #e0f2fe 0%, transparent 12%)`,
        backgroundSize: '35px 35px'
      }} data-oid="_..51aw">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="koioet7">
          <div className="mb-10 page-header-animate" data-oid="y8nv2h7">
            <div className="flex items-center text-sm text-gray-500 mb-4" data-oid="7nma5uh">
              <Link href="/" className="hover:text-gray-700" data-oid="4es42_-">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="7:tldaz" />
              <Link href="/question-bank" className="hover:text-gray-700" data-oid="xuugsbr">Question Bank</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="pb-yf9s" />
              <Link href="/question-bank/examtypes/gept" className="hover:text-gray-700" data-oid=":km-l30">GEPT</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="4hpqn-_" />
              <Link href="/question-bank/subjects" className="hover:text-gray-700" data-oid="s_lyqv0">Subjects</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="2.wxpfr" />
              <Link href="/question-bank/subjects/math" className="hover:text-gray-700" data-oid="w1ccssr">Mathematics</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="8b2xihx" />
              <span className="text-gray-700 font-medium" data-oid="q0rc4fs">Algebra</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between" data-oid="y90bgtz">
              <div data-oid="qf63gr1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4" data-oid="nfvkbod">Algebra Topics</h1>
                <p className="text-lg text-gray-600 max-w-3xl" data-oid="orfldmw">
                  Select a topic to practice specific algebra concepts and problems.
                </p>
              </div>
              <div className="flex space-x-6 mt-6 md:mt-0" data-oid="_hj:qre">
                <div className="text-center" data-oid="bhn.tdn">
                  <div className="text-3xl font-bold text-indigo-600" data-oid="6cj7cja">{animatedTotalQuestions}</div>
                  <div className="text-sm text-gray-500" data-oid="kngadre">Total Questions</div>
                </div>
                <div className="text-center" data-oid="ufmk4fp">
                  <div className="text-3xl font-bold text-green-600" data-oid="lfdsa8q">{overallMastery}%</div>
                  <div className="text-sm text-gray-500" data-oid="t-w9bvq">Mastery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start - Recommended Topics */}
          <div className="mb-10 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6 shadow-sm animated-border stagger-fade-in stagger-delay-1" data-oid="1kigt:j">
            <div className="flex items-center mb-4" data-oid="xm:1syv">
              <Sparkles className="h-5 w-5 text-indigo-600 mr-2" data-oid="zf:ylnb" />
              <h2 className="text-xl font-semibold text-gray-900" data-oid="tbj2b-4">Quick Start</h2>
            </div>
            <p className="text-gray-600 mb-6" data-oid="a4giseu">
              Based on your performance, these topics are recommended for you to improve your algebra skills.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="98z_vva">
              {algebraSubtopics.
              filter((topic) => topic.featured).
              map((topic, idx) =>
              <Link key={idx} href={topic.href} className="flex items-center bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow" data-oid="hc.kkrm">
                    <div className={`p-3 rounded-full ${topic.imageColor} bg-opacity-10 mr-4`} data-oid="3w43iw3">
                      {topic.icon}
                    </div>
                    <div className="flex-1" data-oid="phl44st">
                      <h3 className="font-medium text-gray-900" data-oid="6crt8_.">{topic.title}</h3>
                      <div className="flex items-center mt-1" data-oid=":b0.1zp">
                        <div className="text-xs text-gray-500" data-oid="fq9sivc">{topic.questionCount} questions</div>
                        <div className="mx-2 w-1 h-1 rounded-full bg-gray-300" data-oid="hjyp2go"></div>
                        <div className="text-xs text-gray-500" data-oid="9_30t68">{topic.difficulty}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" data-oid="-mdc0rv" />
                  </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 mb-10" data-oid="ieu.nq.">
            {/* Left Column - Algebra Progress Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 xl:w-2/3" data-oid="b_-bljb">
              <div className="flex items-center mb-4" data-oid="c0pfdx4">
                <Trophy className="h-5 w-5 text-amber-500 mr-2" data-oid="57gjgar" />
                <h2 className="text-xl font-semibold" data-oid="vf3jlbj">Your Algebra Progress</h2>
              </div>
              
              <div className="flex flex-wrap items-center justify-between" data-oid="aujiwzn">
                <div className="flex items-center mb-4 sm:mb-0" data-oid="zbv3poa">
                  <div className="relative" data-oid="1okuci3">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center" data-oid=".o5_hwg">
                      <div className="absolute inset-0" data-oid="p-7n_5a">
                        {/* This is a simplified visual representation of a pie chart */}
                        <div className="absolute inset-0 rounded-full overflow-hidden" data-oid="mn2b3iv">
                          <div className="absolute top-0 left-0 w-1/2 h-full bg-purple-500 origin-right"
                          style={{ transform: `rotate(${levelCounts.advanced / algebraSubtopics.length * 360}deg)` }} data-oid="1kupg2n"></div>
                          <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500 origin-right"
                          style={{ transform: `rotate(${levelCounts.intermediate / algebraSubtopics.length * 360}deg)` }} data-oid="sj01hre"></div>
                          <div className="absolute top-0 left-0 w-1/2 h-full bg-green-500 origin-right"
                          style={{ transform: `rotate(${levelCounts.beginner / algebraSubtopics.length * 360}deg)` }} data-oid="2dmx:g4"></div>
                        </div>
                        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center" data-oid="w2_t408">
                          <span className="text-xl font-bold text-blue-600" data-oid="qnylg45">{overallMastery}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 text-center" data-oid="bbhtkmy">Mastery</div>
                  </div>
                  <div className="ml-6" data-oid="e445gtm">
                    <div className="space-y-2" data-oid="y38wvka">
                      <div className="flex items-center" data-oid="rf52dqx">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2" data-oid="xnxager"></div>
                        <span className="text-sm text-gray-600" data-oid="70dxihu">Beginner ({levelCounts.beginner})</span>
                      </div>
                      <div className="flex items-center" data-oid="yteeltp">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" data-oid="sd4azbg"></div>
                        <span className="text-sm text-gray-600" data-oid=".7memo.">Intermediate ({levelCounts.intermediate})</span>
                      </div>
                      <div className="flex items-center" data-oid="1y97rwz">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" data-oid=":q3edo:"></div>
                        <span className="text-sm text-gray-600" data-oid="4414hgr">Advanced ({levelCounts.advanced})</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" data-oid=".ai2ww_">
                  <div className="text-center" data-oid="vt:9d_9">
                    <div className="text-2xl font-bold text-gray-800" data-oid="rciz87p">{totalQuestions}</div>
                    <div className="text-sm text-gray-500" data-oid="ai.19ps">Total Questions</div>
                  </div>
                  <div className="text-center" data-oid="yl-mbr_">
                    <div className="text-2xl font-bold text-gray-800" data-oid="zjc5.1y">
                      {algebraSubtopics.filter((topic) => topic.masteryLevel >= 80).length}
                    </div>
                    <div className="text-sm text-gray-500" data-oid="_eh4w2q">Mastered Topics</div>
                  </div>
                  <div className="text-center" data-oid="dh-ecmv">
                    <div className="text-2xl font-bold text-gray-800" data-oid=":rkfwll">
                      {algebraSubtopics.filter((topic) => topic.masteryLevel < 60).length}
                    </div>
                    <div className="text-sm text-gray-500" data-oid="ib72j0k">Topics to Improve</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Learning Resources */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 xl:w-1/3" data-oid="9m.yhyr">
              <div className="flex items-center mb-4" data-oid="cftcz4o">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" data-oid="o9httsa" />
                <h2 className="text-xl font-semibold" data-oid="ts8a0xt">Learning Resources</h2>
              </div>
              <div className="space-y-3" data-oid="jtwg4lp">
                {resources.map((resource, index) =>
                <Link href="#" key={index} className="flex items-center justify-between py-2 border-b border-gray-100 hover:bg-gray-50 px-2 rounded" data-oid="9xejphm">
                    <div data-oid="7e76_ki">
                      <div className="font-medium text-gray-800" data-oid="9j5x-l0">{resource.title}</div>
                      <div className="text-xs text-gray-500" data-oid="w7f6e5g">{resource.count} {resource.type}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" data-oid="bt7wc42" />
                  </Link>
                )}
                <div className="pt-2" data-oid="24n3j0u">
                  <Link href="/question-bank/resources" className="text-sm text-blue-600 hover:text-blue-800 flex items-center" data-oid="j9..n9f">
                    View all resources
                    <ChevronRight className="h-4 w-4 ml-1" data-oid="eo22:_." />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-oid="yjy.pcu">
            {algebraSubtopics.map((subtopic, index) =>
            <SubtopicCard key={index} {...subtopic} index={index} data-oid="wz6p0a2" />
            )}
          </div>
          
          <div className="mt-12 flex justify-center" data-oid="zmnd3cq">
            <Link
              href="/question-bank/subjects/math"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 button-pulse" data-oid=".ua6rbt">

              <ArrowLeft className="h-4 w-4 mr-2" data-oid="t6g174_" />
              Back to Math Topics
            </Link>
          </div>
        </div>
      </div>
    </Suspense>);

}