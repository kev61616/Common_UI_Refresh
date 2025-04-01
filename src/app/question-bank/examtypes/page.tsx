"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { BookOpen, ChevronRight, Sparkles, GraduationCap, Globe, Brain, Calculator } from "lucide-react";
import { 
  usePageLoadAnimation, 
  useStaggeredAnimation,
  useInteractiveGlow,
  useCountAnimation 
} from "@/hooks/useAnimatedEffects";

interface ExamTypeCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  imageColor: string;
  questionCount: number;
  index: number;
  featured?: boolean;
}

function ExamTypeCard({ 
  title, 
  description, 
  href, 
  icon, 
  imageColor, 
  questionCount,
  index,
  featured = false
}: ExamTypeCardProps) {
  const { elementRef } = useInteractiveGlow();
  const { getDelayClass } = useStaggeredAnimation(6);
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
              <span>Popular</span>
            </div>
          )}
          <div className="flex items-start">
            <div className={`rounded-lg p-4 ${imageColor} bg-opacity-10 text-gray-700 mr-4 icon-parallax`}>
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

export default function ExamTypesPage() {
  // Setup page load animations
  const { containerRef } = usePageLoadAnimation();
  const [randomBgPosition, setRandomBgPosition] = useState({ x: 20, y: 20 });
  
  // Change background pattern position slightly on load for visual interest
  useEffect(() => {
    setRandomBgPosition({
      x: Math.floor(Math.random() * 40), 
      y: Math.floor(Math.random() * 40)
    });
  }, []);
  
  // Mock data for exam type cards
  const examTypes = [
    {
      title: "SAT",
      description: "College Board's standardized test for college admissions in the United States",
      href: "/question-bank/examtypes/sat",
      icon: <GraduationCap className="h-8 w-8" />,
      imageColor: "bg-blue-500",
      questionCount: 1250,
      featured: true,
    },
    {
      title: "GEPT",
      description: "General English Proficiency Test administered in Taiwan",
      href: "/question-bank/examtypes/gept",
      icon: <Globe className="h-8 w-8" />,
      imageColor: "bg-green-500",
      questionCount: 980,
    },
    {
      title: "ACT",
      description: "American College Testing for college admissions and placement",
      href: "/question-bank/examtypes/act",
      icon: <Brain className="h-8 w-8" />,
      imageColor: "bg-purple-500",
      questionCount: 1120,
    },
    {
      title: "TOEFL",
      description: "Test of English as a Foreign Language for non-native speakers",
      href: "/question-bank/examtypes/toefl",
      icon: <BookOpen className="h-8 w-8" />,
      imageColor: "bg-indigo-500",
      questionCount: 890,
      featured: true,
    },
    {
      title: "GMAT",
      description: "Graduate Management Admission Test for business school applicants",
      href: "/question-bank/examtypes/gmat",
      icon: <Calculator className="h-8 w-8" />,
      imageColor: "bg-amber-500",
      questionCount: 760,
    },
    {
      title: "GRE",
      description: "Graduate Record Examinations for graduate school admissions",
      href: "/question-bank/examtypes/gre",
      icon: <Brain className="h-8 w-8" />,
      imageColor: "bg-red-500",
      questionCount: 850,
    },
  ];

  // Calculate total questions and animate the count
  const totalQuestions = examTypes.reduce((sum, type) => sum + type.questionCount, 0);
  const animatedTotalQuestions = useCountAnimation(totalQuestions, 1500);

  return (
    <Suspense fallback={<div className="h-screen bg-white">Loading...</div>}>
      <div ref={containerRef} className="min-h-screen bg-white py-12"
           style={{
             backgroundImage: `radial-gradient(circle at ${randomBgPosition.x}% ${randomBgPosition.y}%, #f0f7ff 0%, transparent 20%)`,
             backgroundSize: '30px 30px',
           }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 page-header-animate">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700 font-medium">Question Bank</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-gradient">Question Bank</h1>
                <p className="text-lg text-gray-600 max-w-3xl">
                  Select an exam type to explore practice questions organized by subject and topic.
                </p>
              </div>
              <div className="flex space-x-6 mt-6 md:mt-0">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{animatedTotalQuestions}</div>
                  <div className="text-sm text-gray-500">Total Questions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured exam type - full width highlight */}
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 shadow-sm animated-border stagger-fade-in stagger-delay-1">
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-white p-4 rounded-full shadow-md mb-4 md:mb-0 md:mr-6 pulse-icon">
                <Sparkles className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Start Your Test Preparation</h2>
                <p className="text-gray-600 mb-2">
                  Our question bank contains <span className="font-semibold">{animatedTotalQuestions}+</span> questions across various exams to help you practice and improve your skills.
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 progress-bar-animate" 
                    style={{ width: `75%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <Link 
                  href="/question-bank/recommended" 
                  className="inline-flex items-center px-4 py-2 bg-white border border-blue-200 rounded-md text-blue-600 shadow-sm hover:bg-blue-50"
                >
                  <span>Start Quick Practice</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examTypes.map((examType, index) => (
              <ExamTypeCard 
                key={index} 
                {...examType} 
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-16 flex justify-center stagger-fade-in stagger-delay-5">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 button-pulse"
            >
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
