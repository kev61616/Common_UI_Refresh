"use client";

import Link from "next/link";
import { ChevronRight, Plus, Divide, ArrowLeft, FunctionSquare, Circle, Triangle, Sparkles } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
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
  featured?: boolean;
}

function TopicCard({
  title,
  description,
  href,
  icon,
  imageColor,
  questionCount,
  masteryLevel,
  index,
  featured = false
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
                 card-hover-effect interactive-glow shine-effect stagger-fade-in ${getDelayClass(index)}
                 ${featured ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)} data-oid="j7y0fd7">

      <Link href={href} className="block h-full" data-oid="zu5afz2">
        <div className={`${imageColor} h-2`} data-oid="8yixmud"></div>
        <div className="p-6" data-oid="-r2reya">
          {featured &&
          <div className="absolute top-4 right-4 flex items-center text-blue-600 text-sm font-medium" data-oid="4-wft0y">
              <Sparkles className="w-4 h-4 mr-1" data-oid="484y1gg" />
              <span data-oid="azgiwhy">Popular</span>
            </div>
          }
          <div className="flex items-start" data-oid="j-6zfhm">
            <div className={`rounded-lg p-3 ${imageColor} bg-opacity-10 text-gray-700 mr-4 icon-parallax`} data-oid="bp684x8">
              {icon}
            </div>
            <div className="flex-1 content-parallax" data-oid="2jw3c1p">
              <h3 className="text-xl font-semibold mb-1" data-oid="6c5sdf9">{title}</h3>
              <p className="text-gray-600 text-sm mb-4" data-oid="vbdk2wl">{description}</p>
              
              <div className="flex justify-between items-center" data-oid="1r1bels">
                <div className="flex items-center" data-oid="l71f1sk">
                  <span className="text-sm text-gray-500" data-oid="awh8:ji">
                    {isHovering ? animatedCount : questionCount} questions
                  </span>
                  <div className="mx-2 w-1 h-1 rounded-full bg-gray-300" data-oid="_q_zfl8"></div>
                  <div className="flex items-center" data-oid=".pfgeqa">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden" data-oid="-lxbfwj">
                      <div
                        className={`h-full rounded-full ${
                        masteryLevel >= 80 ? 'bg-green-500' :
                        masteryLevel >= 60 ? 'bg-emerald-500' :
                        masteryLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'} progress-bar-animate`
                        }
                        style={{ width: `${masteryLevel}%` }} data-oid="2.gqabh">
                      </div>
                    </div>
                    <span className="text-sm text-gray-500" data-oid="x8wjyfw">{masteryLevel}%</span>
                  </div>
                </div>
                <div className={`text-blue-600 flex items-center font-medium transition-transform duration-300 
                              ${isHovering ? 'translate-x-1' : ''}`} data-oid="vs00hp4">
                  <span className="text-sm" data-oid="iza3vwy">Explore</span> 
                  <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-300 
                                        ${isHovering ? 'translate-x-1' : ''}`} data-oid="0k8q1c1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>);

}

export default function MathTopicsPage() {
  const { containerRef } = usePageLoadAnimation();
  const [randomBgPosition, setRandomBgPosition] = useState({ x: 20, y: 20 });

  // Change background pattern position slightly on load for visual interest
  useEffect(() => {
    setRandomBgPosition({
      x: Math.floor(Math.random() * 40),
      y: Math.floor(Math.random() * 40)
    });
  }, []);

  // Mock data for math topic cards
  const mathTopics = [
  {
    title: "Algebra",
    description: "Equations, inequalities, functions, and polynomials",
    href: "/question-bank/subjects/math/algebra",
    icon: <FunctionSquare className="h-6 w-6" data-oid="19wzuyj" />,
    imageColor: "bg-blue-500",
    questionCount: 180,
    masteryLevel: 75,
    featured: true
  },
  {
    title: "Geometry",
    description: "Angles, triangles, circles, and coordinate geometry",
    href: "/question-bank/subjects/math/geometry",
    icon: <Triangle className="h-6 w-6" data-oid="wfk.ati" />,
    imageColor: "bg-emerald-500",
    questionCount: 120,
    masteryLevel: 82
  },
  {
    title: "Trigonometry",
    description: "Trig functions, identities, and applications",
    href: "/question-bank/subjects/math/trigonometry",
    icon: <Triangle className="h-6 w-6" data-oid=":n8yu2b" />,
    imageColor: "bg-purple-500",
    questionCount: 85,
    masteryLevel: 68
  },
  {
    title: "Statistics & Probability",
    description: "Data analysis, distributions, and probability models",
    href: "/question-bank/subjects/math/statistics",
    icon: <Circle className="h-6 w-6" data-oid="hw5jk1b" />,
    imageColor: "bg-indigo-500",
    questionCount: 95,
    masteryLevel: 79,
    featured: true
  },
  {
    title: "Arithmetic & Number Theory",
    description: "Number properties, fractions, ratios, and percentages",
    href: "/question-bank/subjects/math/arithmetic",
    icon: <Plus className="h-6 w-6" data-oid="ck-o4ov" />,
    imageColor: "bg-amber-500",
    questionCount: 60,
    masteryLevel: 88
  }];


  // Calculate total questions
  const totalQuestions = mathTopics.reduce((sum, topic) => sum + topic.questionCount, 0);
  const animatedTotalQuestions = useCountAnimation(totalQuestions, 1500);

  // Calculate overall mastery level
  const overallMastery = Math.round(
    mathTopics.reduce((sum, topic) => sum + topic.masteryLevel * topic.questionCount, 0) / totalQuestions
  );

  // Recently practiced topics (mock data)
  const recentTopics = [
  { name: "Quadratic Equations", time: "Yesterday", score: 85 },
  { name: "Linear Systems", time: "3 days ago", score: 92 },
  { name: "Factoring Polynomials", time: "Last week", score: 78 }];


  return (
    <Suspense fallback={<div className="h-screen bg-white" data-oid="yaz_a2d">Loading...</div>} data-oid="yhdt820">
      <div ref={containerRef} className="min-h-screen bg-white py-12"
      style={{
        backgroundImage: `radial-gradient(circle at ${randomBgPosition.x}% ${randomBgPosition.y}%, #e6f7ff 0%, transparent 15%)`,
        backgroundSize: '30px 30px'
      }} data-oid="nhbqpq8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="9ck4knv">
          <div className="mb-10 page-header-animate" data-oid="wg9doyz">
            <div className="flex items-center text-sm text-gray-500 mb-4" data-oid="ip0n5h7">
              <Link href="/" className="hover:text-gray-700" data-oid="b6wv3ue">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="skxndd0" />
              <Link href="/question-bank" className="hover:text-gray-700" data-oid="efveh6.">Question Bank</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="wsm9nwf" />
              <Link href="/question-bank/examtypes/gept" className="hover:text-gray-700" data-oid="yjddvm2">GEPT</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="13k5.n2" />
              <Link href="/question-bank/subjects" className="hover:text-gray-700" data-oid="k_vpos.">Subjects</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="mdgkrw:" />
              <span className="text-gray-700 font-medium" data-oid="r5gpk:k">Mathematics</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between" data-oid="7zae4g0">
              <div data-oid="cif.mwy">
                <h1 className="text-4xl font-bold text-gray-900 mb-4" data-oid="a-3ef14">Mathematics Topics</h1>
                <p className="text-lg text-gray-600 max-w-3xl" data-oid="nf7n8qk">
                  Select a topic to explore specific math concepts and practice questions.
                </p>
              </div>
              <div className="flex space-x-6 mt-6 md:mt-0" data-oid="zx42q43">
                <div className="text-center" data-oid="c:dh0gn">
                  <div className="text-3xl font-bold text-indigo-600" data-oid="sd-q7yu">{animatedTotalQuestions}</div>
                  <div className="text-sm text-gray-500" data-oid="xz3_ziq">Total Questions</div>
                </div>
                <div className="text-center" data-oid="t8jq-4g">
                  <div className="text-3xl font-bold text-green-600" data-oid="8y5y_qh">{overallMastery}%</div>
                  <div className="text-sm text-gray-500" data-oid="1.h_kim">Mastery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Math Progress Overview Card */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10" data-oid="2jcx0lv">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:w-2/3" data-oid="laiikh4">
              <h2 className="text-xl font-semibold mb-4" data-oid="4vv:_lc">Your Progress</h2>
              <div className="flex flex-wrap items-center justify-between" data-oid="7o0uum2">
                <div className="flex items-center mb-4 sm:mb-0" data-oid="4g1_azq">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4 pulse-icon" data-oid="g.i70nh">
                    <span className="text-xl font-bold" data-oid="_gggrlt">{overallMastery}%</span>
                  </div>
                  <div data-oid="2dn9rr-">
                    <div className="text-sm text-gray-500 mb-1" data-oid="5bpu-9s">Overall Mastery</div>
                    <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden" data-oid="4y7g09v">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 progress-bar-animate"
                        style={{ width: `${overallMastery}%` }} data-oid="r9tem4r">
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" data-oid="co962s0">
                  <div className="text-center" data-oid="e:lpw3k">
                    <div className="text-2xl font-bold text-gray-800" data-oid="-2tfg4-">{totalQuestions}</div>
                    <div className="text-sm text-gray-500" data-oid="x2oxtx9">Total Questions</div>
                  </div>
                  <div className="text-center" data-oid="33q7rl3">
                    <div className="text-2xl font-bold text-gray-800" data-oid="tqd4yc5">
                      {mathTopics.filter((topic) => topic.masteryLevel >= 80).length}
                    </div>
                    <div className="text-sm text-gray-500" data-oid="e1g0qz:">Mastered Topics</div>
                  </div>
                  <div className="text-center" data-oid="y7dxfn6">
                    <div className="text-2xl font-bold text-gray-800" data-oid="dufj5bo">
                      {mathTopics.filter((topic) => topic.masteryLevel < 60).length}
                    </div>
                    <div className="text-sm text-gray-500" data-oid="ll83cmj">Topics to Improve</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent activity sidebar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:w-1/3" data-oid="qwd2wgx">
              <h2 className="text-xl font-semibold mb-4" data-oid="1k2dnyg">Recently Practiced</h2>
              <div className="space-y-3" data-oid="ip8tjb:">
                {recentTopics.map((topic, index) =>
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100" data-oid=".vye7_o">
                    <div data-oid="dhl8pom">
                      <div className="font-medium text-gray-800" data-oid="wcz70.0">{topic.name}</div>
                      <div className="text-xs text-gray-500" data-oid="p--9.kq">{topic.time}</div>
                    </div>
                    <div className={`text-sm font-medium ${topic.score >= 80 ? 'text-green-600' : 'text-amber-600'}`} data-oid="1xmrspj">
                      {topic.score}%
                    </div>
                  </div>
                )}
                <div className="pt-2" data-oid="wj:5c_v">
                  <Link href="/question-bank/history" className="text-sm text-blue-600 hover:text-blue-800 flex items-center" data-oid="aurz4zc">
                    View all activity
                    <ChevronRight className="h-4 w-4 ml-1" data-oid="jzdw8zo" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-oid="qbeys4m">
            {mathTopics.map((topic, index) =>
            <TopicCard key={index} {...topic} index={index} data-oid="cbbxmiu" />
            )}
          </div>
          
          <div className="mt-12 flex justify-center" data-oid="arz_ham">
            <Link
              href="/question-bank/subjects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 button-pulse" data-oid="dc0:kj6">

              <ArrowLeft className="h-4 w-4 mr-2" data-oid="svox.1o" />
              Back to Subjects
            </Link>
          </div>
        </div>
      </div>
    </Suspense>);

}