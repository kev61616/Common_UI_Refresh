"use client";

import Link from "next/link";
import { ChevronRight, Plus, Divide, ArrowLeft, FunctionSquare, Circle, Triangle } from "lucide-react";
import { Suspense, useState } from "react";
import { 
  useInteractiveGlow, 
  usePageLoadAnimation, 
  useStaggeredAnimation,
  useCountAnimation 
} from "@/hooks/useAnimatedEffects";

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
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={href} className="block h-full">
        <div className={`${imageColor} h-2`}></div>
        <div className="p-6">
          <div className="flex items-start">
            <div className={`rounded-lg p-3 ${imageColor} bg-opacity-10 text-gray-700 mr-4 icon-parallax`}>
              {icon}
            </div>
            <div className="flex-1 content-parallax">
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-gray-600 text-sm mb-4">{description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">
                    {isHovering ? animatedCount : questionCount} questions
                  </span>
                  <div className="mx-2 w-1 h-1 rounded-full bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          masteryLevel >= 80 ? 'bg-green-500' : 
                          masteryLevel >= 60 ? 'bg-emerald-500' :
                          masteryLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        } progress-bar-animate`} 
                        style={{ width: `${masteryLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{masteryLevel}%</span>
                  </div>
                </div>
                <div className={`text-blue-600 flex items-center font-medium transition-transform duration-300 
                              ${isHovering ? 'translate-x-1' : ''}`}>
                  <span className="text-sm">Explore</span> 
                  <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-300 
                                        ${isHovering ? 'translate-x-1' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function MathTopicsPage() {
  // Mock data for math topic cards
  const mathTopics = [
    {
      title: "Algebra",
      description: "Equations, inequalities, functions, and polynomials",
      href: "/test/question-bank/subjects/math/algebra",
      icon: <FunctionSquare className="h-6 w-6" />,
      imageColor: "bg-blue-500",
      questionCount: 180,
      masteryLevel: 75,
    },
    {
      title: "Geometry",
      description: "Angles, triangles, circles, and coordinate geometry",
      href: "/test/question-bank/subjects/math/geometry",
      icon: <Triangle className="h-6 w-6" />,
      imageColor: "bg-emerald-500", 
      questionCount: 120,
      masteryLevel: 82,
    },
    {
      title: "Trigonometry",
      description: "Trig functions, identities, and applications",
      href: "/test/question-bank/subjects/math/trigonometry",
      icon: <Triangle className="h-6 w-6" />,
      imageColor: "bg-purple-500",
      questionCount: 85,
      masteryLevel: 68,
    },
    {
      title: "Statistics & Probability",
      description: "Data analysis, distributions, and probability models",
      href: "/test/question-bank/subjects/math/statistics",
      icon: <Circle className="h-6 w-6" />,
      imageColor: "bg-indigo-500",
      questionCount: 95,
      masteryLevel: 79,
    },
    {
      title: "Arithmetic & Number Theory",
      description: "Number properties, fractions, ratios, and percentages",
      href: "/test/question-bank/subjects/math/arithmetic",
      icon: <Plus className="h-6 w-6" />,
      imageColor: "bg-amber-500",
      questionCount: 60,
      masteryLevel: 88,
    },
  ];

  // Calculate total questions
  const totalQuestions = mathTopics.reduce((sum, topic) => sum + topic.questionCount, 0);
  
  // Calculate overall mastery level
  const overallMastery = Math.round(
    mathTopics.reduce((sum, topic) => sum + (topic.masteryLevel * topic.questionCount), 0) / totalQuestions
  );

  return (
    <Suspense fallback={<div className="h-screen bg-white">Loading...</div>}>
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href="/test" className="hover:text-gray-700">Test Center</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href="/test/question-bank/subjects" className="hover:text-gray-700">Question Bank</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700 font-medium">Mathematics</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Mathematics Topics</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Select a topic to explore specific math concepts and practice questions.
            </p>
          </div>

          {/* Math Progress Overview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Mathematics Progress</h2>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <span className="text-xl font-bold">{overallMastery}%</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Overall Mastery</div>
                  <div className="w-40 h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        overallMastery >= 80 ? 'bg-green-500' : 
                        overallMastery >= 60 ? 'bg-emerald-500' :
                        overallMastery >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${overallMastery}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{totalQuestions}</div>
                  <div className="text-sm text-gray-500">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {mathTopics.filter(topic => topic.masteryLevel >= 80).length}
                  </div>
                  <div className="text-sm text-gray-500">Mastered Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {mathTopics.filter(topic => topic.masteryLevel < 60).length}
                  </div>
                  <div className="text-sm text-gray-500">Topics to Improve</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mathTopics.map((topic, index) => (
              <TopicCard key={index} {...topic} index={index} />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link 
              href="/test/question-bank/subjects" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
