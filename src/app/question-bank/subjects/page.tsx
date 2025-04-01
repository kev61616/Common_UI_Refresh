"use client";

import Link from "next/link";
import { Book, Calculator, Sigma, Languages, Pencil, ChevronRight, Sparkles } from "lucide-react";
import { Suspense, useRef, useState, useEffect } from "react";
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
  featured?: boolean;
}

function SubjectCard({ 
  title, 
  description, 
  href, 
  icon, 
  imageColor, 
  questionCount, 
  masteryLevel,
  index,
  featured = false
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
              <span>Featured</span>
            </div>
          )}
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
  const [randomBgPosition, setRandomBgPosition] = useState({ x: 20, y: 20 });
  
  // Change background pattern position slightly on load for visual interest
  useEffect(() => {
    setRandomBgPosition({
      x: Math.floor(Math.random() * 40), 
      y: Math.floor(Math.random() * 40)
    });
  }, []);
  
  // Mock data for subject cards
  const subjects = [
    {
      title: "Mathematics",
      description: "Algebra, geometry, statistics, and more",
      href: "/question-bank/subjects/math",
      icon: <Sigma className="h-6 w-6" />,
      imageColor: "bg-blue-500",
      questionCount: 540,
      masteryLevel: 78,
      featured: true,
    },
    {
      title: "Reading",
      description: "Comprehension, analysis, and interpretation",
      href: "/question-bank/subjects/reading",
      icon: <Book className="h-6 w-6" />,
      imageColor: "bg-indigo-500",
      questionCount: 320,
      masteryLevel: 82,
    },
    {
      title: "Writing",
      description: "Grammar, structure, and expression",
      href: "/question-bank/subjects/writing",
      icon: <Pencil className="h-6 w-6" />,
      imageColor: "bg-purple-500",
      questionCount: 420,
      masteryLevel: 70,
      featured: true,
    },
    {
      title: "Science",
      description: "Biology, chemistry, physics, and earth science",
      href: "/question-bank/subjects/science",
      icon: <Calculator className="h-6 w-6" />,
      imageColor: "bg-emerald-500",
      questionCount: 380,
      masteryLevel: 65,
    },
    {
      title: "Language Arts",
      description: "Vocabulary, composition, and literature",
      href: "/question-bank/subjects/language-arts",
      icon: <Languages className="h-6 w-6" />,
      imageColor: "bg-amber-500",
      questionCount: 290,
      masteryLevel: 72,
    },
  ];

  // Calculate total questions and animate the count
  const totalQuestions = subjects.reduce((sum, subject) => sum + subject.questionCount, 0);
  const animatedTotalQuestions = useCountAnimation(totalQuestions, 1500);
  const completedQuestions = Math.round(totalQuestions * 0.43); // 43% of questions completed (mock data)
  const animatedCompletedQuestions = useCountAnimation(completedQuestions, 1500);

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
              <Link href="/question-bank" className="hover:text-gray-700">Question Bank</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href="/question-bank/examtypes/gept" className="hover:text-gray-700">GEPT</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700 font-medium">Subjects</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-gradient">Question Bank</h1>
                <p className="text-lg text-gray-600 max-w-3xl">
                  Select a subject to explore practice questions organized by topic and difficulty level.
                </p>
              </div>
              <div className="flex space-x-6 mt-6 md:mt-0">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{animatedTotalQuestions}</div>
                  <div className="text-sm text-gray-500">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{animatedCompletedQuestions}</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured subject - full width highlight */}
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 shadow-sm animated-border stagger-fade-in stagger-delay-1">
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-white p-4 rounded-full shadow-md mb-4 md:mb-0 md:mr-6 pulse-icon">
                <Sparkles className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Learning Journey</h2>
                <p className="text-gray-600 mb-2">
                  You've completed <span className="font-semibold">{Math.round((completedQuestions / totalQuestions) * 100)}%</span> of all available questions across all subjects. Keep going!
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 progress-bar-animate" 
                    style={{ width: `${(completedQuestions / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <Link 
                  href="/question-bank/recommended" 
                  className="inline-flex items-center px-4 py-2 bg-white border border-blue-200 rounded-md text-blue-600 shadow-sm hover:bg-blue-50"
                >
                  <span>Recommended for You</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
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
