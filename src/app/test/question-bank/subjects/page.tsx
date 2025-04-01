"use client";

import Link from "next/link";
import { Book, Calculator, Sigma, Languages, Pencil, ChevronRight } from "lucide-react";
import { Suspense, useRef, useState } from "react";
import { 
  useInteractiveGlow, 
  usePageLoadAnimation, 
  useStaggeredAnimation,
  useCountAnimation 
} from "@/hooks/useAnimatedEffects";

interface SubjectCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  imageColor: string;
  questionCount: number;
  masteryLevel: number;
  index: number;
}

function SubjectCard({ 
  title, 
  description, 
  href, 
  icon, 
  imageColor, 
  questionCount, 
  masteryLevel,
  index 
}: SubjectCardProps) {
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

export default function SubjectsPage() {
  // Setup page load animations
  const { containerRef } = usePageLoadAnimation();
  
  // Mock data for subject cards
  const subjects = [
    {
      title: "Mathematics",
      description: "Algebra, geometry, statistics, and more",
      href: "/test/question-bank/subjects/math",
      icon: <Sigma className="h-6 w-6" />,
      imageColor: "bg-blue-500",
      questionCount: 540,
      masteryLevel: 78,
    },
    {
      title: "Reading",
      description: "Comprehension, analysis, and interpretation",
      href: "/test/question-bank/subjects/reading",
      icon: <Book className="h-6 w-6" />,
      imageColor: "bg-indigo-500",
      questionCount: 320,
      masteryLevel: 82,
    },
    {
      title: "Writing",
      description: "Grammar, structure, and expression",
      href: "/test/question-bank/subjects/writing",
      icon: <Pencil className="h-6 w-6" />,
      imageColor: "bg-purple-500",
      questionCount: 420,
      masteryLevel: 70,
    },
    {
      title: "Science",
      description: "Biology, chemistry, physics, and earth science",
      href: "/test/question-bank/subjects/science",
      icon: <Calculator className="h-6 w-6" />,
      imageColor: "bg-emerald-500",
      questionCount: 380,
      masteryLevel: 65,
    },
    {
      title: "Language Arts",
      description: "Vocabulary, composition, and literature",
      href: "/test/question-bank/subjects/language-arts",
      icon: <Languages className="h-6 w-6" />,
      imageColor: "bg-amber-500",
      questionCount: 290,
      masteryLevel: 72,
    },
  ];

  // Calculate total questions and animate the count
  const totalQuestions = subjects.reduce((sum, subject) => sum + subject.questionCount, 0);
  const animatedTotalQuestions = useCountAnimation(totalQuestions, 1500);

  return (
    <Suspense fallback={<div className="h-screen bg-white">Loading...</div>}>
      <div ref={containerRef} className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 page-header-animate">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href="/test" className="hover:text-gray-700">Test Center</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700 font-medium">Question Bank</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-gradient">Question Bank</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Select a subject to explore practice questions organized by topic and difficulty level.
            </p>
          </div>

          <div className="flex items-center mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm animated-border stagger-fade-in stagger-delay-1">
            <div className="bg-blue-100 text-blue-700 rounded-full p-2 mr-3 pulse-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              Our question bank contains <span className="font-semibold">{animatedTotalQuestions}+</span> questions to help you prepare for your exams. Each subject is organized into topics and sub-topics for targeted practice.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject, index) => (
              <SubjectCard 
                key={index} 
                {...subject} 
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center stagger-fade-in stagger-delay-5">
            <Link 
              href="/test" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 button-pulse"
            >
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Test Center
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
