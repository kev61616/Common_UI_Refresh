"use client";

import Link from "next/link";
import { useState } from "react";
import { Book, Calculator, ChevronRight, BookOpen, Brain, ArrowUpRight } from "lucide-react";
import { 
  usePageLoadAnimation, 
  useStaggeredAnimation,
  useInteractiveGlow 
} from "@/hooks/useAnimatedEffects";

interface TestTypeCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  imageColor: string;
  index: number;
}

function TestTypeCard({ title, description, href, icon, imageColor, index }: TestTypeCardProps) {
  const { elementRef } = useInteractiveGlow();
  const { getDelayClass } = useStaggeredAnimation(4);
  const [isHovering, setIsHovering] = useState(false);
  
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
        <div className="p-8 flex flex-col items-center">
          <div className={`rounded-full p-4 ${imageColor} bg-opacity-10 text-gray-700 mb-4 icon-parallax`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
          <p className="text-gray-600 text-center mb-6">{description}</p>
          <div className={`mt-auto text-blue-600 flex items-center font-medium transition-transform duration-300 
                         ${isHovering ? 'translate-x-1' : ''}`}>
            <span>Explore</span> 
            <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-300 
                                   ${isHovering ? 'translate-x-1' : ''}`} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function TestPage() {
  const { containerRef } = usePageLoadAnimation();
  
  const cards = [
    {
      title: "Question Bank",
      description: "Access our comprehensive collection of practice questions organized by topic and difficulty.",
      href: "/test/question-bank",
      icon: <Book className="h-8 w-8" />,
      imageColor: "bg-indigo-600",
    },
    {
      title: "Mock Test",
      description: "Take timed practice tests that simulate real exam conditions.",
      href: "/test/mock-test",
      icon: <Calculator className="h-8 w-8" />,
      imageColor: "bg-emerald-600",
    },
    {
      title: "Personalized Review",
      description: "Focus on your weak areas with AI-powered personalized question sets.",
      href: "/test/personalized",
      icon: <Brain className="h-8 w-8" />,
      imageColor: "bg-purple-600",
    },
    {
      title: "External Resources",
      description: "Additional learning materials to help you prepare for your exams.",
      href: "/resources",
      icon: <BookOpen className="h-8 w-8" />,
      imageColor: "bg-amber-600",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 page-header-animate">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-gradient">Test Center</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of practice tests and question banks to prepare for your exams.
          </p>
        </div>

        <div className="mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm animated-border stagger-fade-in stagger-delay-1">
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-700 rounded-full p-2 mr-3 pulse-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              Our test platform is designed to help you practice and improve your skills. Choose an option below to get started.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <TestTypeCard 
              key={index} 
              {...card} 
              index={index} 
            />
          ))}
        </div>
        
        <div className="mt-16 text-center stagger-fade-in stagger-delay-5">
          <div className="inline-block rounded-lg bg-white shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-2">Need more resources?</h3>
            <p className="text-gray-600 mb-4">
              Check out our premium courses and additional study materials
            </p>
            <Link 
              href="/courses" 
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
            >
              <span>Browse Courses</span>
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
