"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft, Asterisk, X, Divide, Plus, Minus, Sparkles, BookOpen, Trophy } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { 
  useInteractiveGlow, 
  usePageLoadAnimation, 
  useStaggeredAnimation,
  useCountAnimation 
} from "@/hooks/useAnimatedEffects";

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
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={href} className="block h-full">
        <div className={`${imageColor} h-2`}></div>
        <div className="p-6">
          {featured && (
            <div className="absolute top-4 right-4 flex items-center text-blue-600 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-1" />
              <span>Recommended</span>
            </div>
          )}
          <div className="flex items-start">
            <div className={`rounded-lg p-3 ${imageColor} bg-opacity-10 text-gray-700 mr-4 icon-parallax`}>
              {icon}
            </div>
            <div className="flex-1 content-parallax">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl font-semibold">{title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>
                  {difficulty}
                </span>
              </div>
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
                  <span className="text-sm">Practice</span>
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
      icon: <Plus className="h-6 w-6" />,
      imageColor: "bg-blue-500",
      questionCount: 28,
      masteryLevel: 85,
      difficulty: 'Beginner' as const,
    },
    {
      title: "Quadratic Equations",
      description: "Solving second-degree polynomial equations",
      href: "/question-bank/subjects/math/algebra/quadratic-equations",
      icon: <X className="h-6 w-6" />,
      imageColor: "bg-indigo-500",
      questionCount: 32,
      masteryLevel: 72,
      difficulty: 'Intermediate' as const,
      featured: true,
    },
    {
      title: "Multiply Binomials",
      description: "FOIL method and distributing terms in expressions",
      href: "/question-bank/practice/binomials",
      icon: <Asterisk className="h-6 w-6" />,
      imageColor: "bg-purple-500",
      questionCount: 24,
      masteryLevel: 68,
      difficulty: 'Intermediate' as const,
      featured: true,
    },
    {
      title: "Factoring Polynomials",
      description: "Breaking down polynomial expressions into products",
      href: "/question-bank/subjects/math/algebra/factoring",
      icon: <Divide className="h-6 w-6" />,
      imageColor: "bg-emerald-500",
      questionCount: 30,
      masteryLevel: 65,
      difficulty: 'Intermediate' as const,
    },
    {
      title: "Rational Expressions",
      description: "Working with fractions containing variables",
      href: "/question-bank/subjects/math/algebra/rational-expressions",
      icon: <Divide className="h-6 w-6" />,
      imageColor: "bg-amber-500",
      questionCount: 22,
      masteryLevel: 58,
      difficulty: 'Advanced' as const,
    },
    {
      title: "Systems of Equations",
      description: "Solving multiple equations simultaneously",
      href: "/question-bank/subjects/math/algebra/systems",
      icon: <Plus className="h-6 w-6" />,
      imageColor: "bg-teal-500",
      questionCount: 26,
      masteryLevel: 70,
      difficulty: 'Advanced' as const,
    },
    {
      title: "Inequalities",
      description: "Solving and graphing inequalities",
      href: "/question-bank/subjects/math/algebra/inequalities",
      icon: <Minus className="h-6 w-6" />,
      imageColor: "bg-red-500",
      questionCount: 18,
      masteryLevel: 75,
      difficulty: 'Intermediate' as const,
    },
  ];

  // Calculate total questions
  const totalQuestions = algebraSubtopics.reduce((sum, subtopic) => sum + subtopic.questionCount, 0);
  const animatedTotalQuestions = useCountAnimation(totalQuestions, 1500);
  
  // Calculate overall mastery level
  const overallMastery = Math.round(
    algebraSubtopics.reduce((sum, subtopic) => sum + (subtopic.masteryLevel * subtopic.questionCount), 0) / totalQuestions
  );

  // Learning resources (mock data)
  const resources = [
    { title: "Algebra Video Tutorials", type: "Videos", count: 12 },
    { title: "Formula Sheet", type: "PDF", count: 1 },
    { title: "Practice Problem Sets", type: "Worksheets", count: 8 },
  ];

  // Level distribution (for the pie chart visual)
  const levelCounts = {
    beginner: algebraSubtopics.filter(topic => topic.difficulty === 'Beginner').length,
    intermediate: algebraSubtopics.filter(topic => topic.difficulty === 'Intermediate').length,
    advanced: algebraSubtopics.filter(topic => topic.difficulty === 'Advanced').length,
  };

  return (
    <Suspense fallback={<div className="h-screen bg-white">Loading...</div>}>
      <div ref={containerRef} className="min-h-screen bg-white py-12"
           style={{
             backgroundImage: `radial-gradient(circle at ${randomBgPosition.x}% ${randomBgPosition.y}%, #e0f2fe 0%, transparent 12%)`,
             backgroundSize: '35px 35px',
           }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 page-header-animate">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href="/question-bank" className="hover:text-gray-700">Question Bank</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href="/question-bank/examtypes/gept" className="hover:text-gray-700">GEPT</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href="/question-bank/subjects" className="hover:text-gray-700">Subjects</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href="/question-bank/subjects/math" className="hover:text-gray-700">Mathematics</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700 font-medium">Algebra</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Algebra Topics</h1>
                <p className="text-lg text-gray-600 max-w-3xl">
                  Select a topic to practice specific algebra concepts and problems.
                </p>
              </div>
              <div className="flex space-x-6 mt-6 md:mt-0">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{animatedTotalQuestions}</div>
                  <div className="text-sm text-gray-500">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{overallMastery}%</div>
                  <div className="text-sm text-gray-500">Mastery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start - Recommended Topics */}
          <div className="mb-10 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6 shadow-sm animated-border stagger-fade-in stagger-delay-1">
            <div className="flex items-center mb-4">
              <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Quick Start</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Based on your performance, these topics are recommended for you to improve your algebra skills.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {algebraSubtopics
                .filter(topic => topic.featured)
                .map((topic, idx) => (
                  <Link key={idx} href={topic.href} className="flex items-center bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className={`p-3 rounded-full ${topic.imageColor} bg-opacity-10 mr-4`}>
                      {topic.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{topic.title}</h3>
                      <div className="flex items-center mt-1">
                        <div className="text-xs text-gray-500">{topic.questionCount} questions</div>
                        <div className="mx-2 w-1 h-1 rounded-full bg-gray-300"></div>
                        <div className="text-xs text-gray-500">{topic.difficulty}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                ))}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 mb-10">
            {/* Left Column - Algebra Progress Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 xl:w-2/3">
              <div className="flex items-center mb-4">
                <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                <h2 className="text-xl font-semibold">Your Algebra Progress</h2>
              </div>
              
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                      <div className="absolute inset-0">
                        {/* This is a simplified visual representation of a pie chart */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 w-1/2 h-full bg-purple-500 origin-right" 
                              style={{ transform: `rotate(${(levelCounts.advanced / algebraSubtopics.length) * 360}deg)` }}></div>
                          <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500 origin-right" 
                              style={{ transform: `rotate(${(levelCounts.intermediate / algebraSubtopics.length) * 360}deg)` }}></div>
                          <div className="absolute top-0 left-0 w-1/2 h-full bg-green-500 origin-right" 
                              style={{ transform: `rotate(${(levelCounts.beginner / algebraSubtopics.length) * 360}deg)` }}></div>
                        </div>
                        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                          <span className="text-xl font-bold text-blue-600">{overallMastery}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 text-center">Mastery</div>
                  </div>
                  <div className="ml-6">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Beginner ({levelCounts.beginner})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Intermediate ({levelCounts.intermediate})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Advanced ({levelCounts.advanced})</span>
                      </div>
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
                      {algebraSubtopics.filter(topic => topic.masteryLevel >= 80).length}
                    </div>
                    <div className="text-sm text-gray-500">Mastered Topics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {algebraSubtopics.filter(topic => topic.masteryLevel < 60).length}
                    </div>
                    <div className="text-sm text-gray-500">Topics to Improve</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Learning Resources */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 xl:w-1/3">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Learning Resources</h2>
              </div>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <Link href="#" key={index} className="flex items-center justify-between py-2 border-b border-gray-100 hover:bg-gray-50 px-2 rounded">
                    <div>
                      <div className="font-medium text-gray-800">{resource.title}</div>
                      <div className="text-xs text-gray-500">{resource.count} {resource.type}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
                <div className="pt-2">
                  <Link href="/question-bank/resources" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View all resources
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {algebraSubtopics.map((subtopic, index) => (
              <SubtopicCard key={index} {...subtopic} index={index} />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link 
              href="/question-bank/subjects/math" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 button-pulse"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Math Topics
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
