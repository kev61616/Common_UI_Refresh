"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { BookOpen, ChevronRight, Sparkles, GraduationCap, Globe, Brain, Calculator } from "lucide-react";
import {
  usePageLoadAnimation,
  useStaggeredAnimation,
  useInteractiveGlow,
  useCountAnimation } from
"@/hooks/useAnimatedEffects";

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
      onMouseLeave={() => setIsHovering(false)} data-oid="ao.o0_h">

      <Link href={href} className="block h-full" data-oid="fyopt_.">
        <div className={`${imageColor} h-2`} data-oid="0y86jfg"></div>
        <div className="p-6" data-oid="s:uqrns">
          {featured &&
          <div className="absolute top-4 right-4 flex items-center text-blue-600 text-sm font-medium" data-oid="2nok110">
              <Sparkles className="w-4 h-4 mr-1" data-oid="z1d3c6x" />
              <span data-oid="o38l1iz">Popular</span>
            </div>
          }
          <div className="flex items-start" data-oid="vnyx9z:">
            <div className={`rounded-lg p-4 ${imageColor} bg-opacity-10 text-gray-700 mr-4 icon-parallax`} data-oid="79b-m4s">
              {icon}
            </div>
            <div className="flex-1 content-parallax" data-oid=".16egos">
              <h3 className="text-xl font-semibold mb-1" data-oid="z87db9:">{title}</h3>
              <p className="text-gray-600 text-sm mb-4" data-oid="z8axv4.">{description}</p>
              
              <div className="flex justify-between items-center" data-oid="6bgsr27">
                <div className="flex items-center" data-oid="il5a0:h">
                  <span className="text-sm text-gray-500" data-oid=":6.dn0e">
                    {isHovering ? animatedCount : questionCount} questions
                  </span>
                </div>
                <div className={`text-blue-600 flex items-center font-medium transition-transform duration-300 
                              ${isHovering ? 'translate-x-1' : ''}`} data-oid="i3y7nuw">
                  <span className="text-sm" data-oid="a7aepgv">Explore</span> 
                  <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-300 
                                        ${isHovering ? 'translate-x-1' : ''}`} data-oid="za2s2o0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>);

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
    icon: <GraduationCap className="h-8 w-8" data-oid="lirgjxt" />,
    imageColor: "bg-blue-500",
    questionCount: 1250,
    featured: true
  },
  {
    title: "GEPT",
    description: "General English Proficiency Test administered in Taiwan",
    href: "/question-bank/examtypes/gept",
    icon: <Globe className="h-8 w-8" data-oid="fkft4vx" />,
    imageColor: "bg-green-500",
    questionCount: 980
  },
  {
    title: "ACT",
    description: "American College Testing for college admissions and placement",
    href: "/question-bank/examtypes/act",
    icon: <Brain className="h-8 w-8" data-oid="8z0eohn" />,
    imageColor: "bg-purple-500",
    questionCount: 1120
  },
  {
    title: "TOEFL",
    description: "Test of English as a Foreign Language for non-native speakers",
    href: "/question-bank/examtypes/toefl",
    icon: <BookOpen className="h-8 w-8" data-oid="l8xte.k" />,
    imageColor: "bg-indigo-500",
    questionCount: 890,
    featured: true
  },
  {
    title: "GMAT",
    description: "Graduate Management Admission Test for business school applicants",
    href: "/question-bank/examtypes/gmat",
    icon: <Calculator className="h-8 w-8" data-oid="jmuxnq6" />,
    imageColor: "bg-amber-500",
    questionCount: 760
  },
  {
    title: "GRE",
    description: "Graduate Record Examinations for graduate school admissions",
    href: "/question-bank/examtypes/gre",
    icon: <Brain className="h-8 w-8" data-oid="7-dzc:4" />,
    imageColor: "bg-red-500",
    questionCount: 850
  }];


  // Calculate total questions and animate the count
  const totalQuestions = examTypes.reduce((sum, type) => sum + type.questionCount, 0);
  const animatedTotalQuestions = useCountAnimation(totalQuestions, 1500);

  return (
    <Suspense fallback={<div className="h-screen bg-white" data-oid="smn11q1">Loading...</div>} data-oid="qq2tym5">
      <div ref={containerRef} className="min-h-screen bg-white py-12"
      style={{
        backgroundImage: `radial-gradient(circle at ${randomBgPosition.x}% ${randomBgPosition.y}%, #f0f7ff 0%, transparent 20%)`,
        backgroundSize: '30px 30px'
      }} data-oid="kuajv8r">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="5vgj_w_">
          <div className="mb-10 page-header-animate" data-oid="2oyn.f-">
            <div className="flex items-center text-sm text-gray-500 mb-4" data-oid="709h9j2">
              <Link href="/" className="hover:text-gray-700" data-oid="q_puyi2">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" data-oid="zf.plam" />
              <span className="text-gray-700 font-medium" data-oid="0y80j04">Question Bank</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between" data-oid="xs13a-d">
              <div data-oid="m.bbfv1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-gradient" data-oid="-.ij_yi">Question Bank</h1>
                <p className="text-lg text-gray-600 max-w-3xl" data-oid="7472ha3">
                  Select an exam type to explore practice questions organized by subject and topic.
                </p>
              </div>
              <div className="flex space-x-6 mt-6 md:mt-0" data-oid="7gy8f5:">
                <div className="text-center" data-oid="r5_m9k5">
                  <div className="text-3xl font-bold text-indigo-600" data-oid="09tmwhe">{animatedTotalQuestions}</div>
                  <div className="text-sm text-gray-500" data-oid="bnuux8-">Total Questions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured exam type - full width highlight */}
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 shadow-sm animated-border stagger-fade-in stagger-delay-1" data-oid="ryom8zn">
            <div className="flex flex-col md:flex-row items-center" data-oid="m7avaoi">
              <div className="bg-white p-4 rounded-full shadow-md mb-4 md:mb-0 md:mr-6 pulse-icon" data-oid="kqly1qz">
                <Sparkles className="h-8 w-8 text-blue-500" data-oid="w3ppsq:" />
              </div>
              <div className="flex-1" data-oid="l_:v76p">
                <h2 className="text-xl font-semibold text-gray-900 mb-2" data-oid="jh611av">Start Your Test Preparation</h2>
                <p className="text-gray-600 mb-2" data-oid="vf8_.wm">
                  Our question bank contains <span className="font-semibold" data-oid="wvyzzyb">{animatedTotalQuestions}+</span> questions across various exams to help you practice and improve your skills.
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3" data-oid=".a1ou0f">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 progress-bar-animate"
                    style={{ width: `75%` }} data-oid="n6a3uqg">
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6" data-oid=":k69:p7">
                <Link
                  href="/question-bank/recommended"
                  className="inline-flex items-center px-4 py-2 bg-white border border-blue-200 rounded-md text-blue-600 shadow-sm hover:bg-blue-50" data-oid="xd.::ti">

                  <span data-oid=".t9nv7y">Start Quick Practice</span>
                  <ChevronRight className="h-4 w-4 ml-1" data-oid="pm_dm6y" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-oid="9n4f:vv">
            {examTypes.map((examType, index) =>
            <ExamTypeCard
              key={index}
              {...examType}
              index={index} data-oid="ywac.ow" />

            )}
          </div>
          
          <div className="mt-16 flex justify-center stagger-fade-in stagger-delay-5" data-oid="6-7pbfu">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 button-pulse" data-oid="pbk52_e">

              <ChevronRight className="h-4 w-4 mr-2 rotate-180" data-oid="r6ky7j9" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Suspense>);

}