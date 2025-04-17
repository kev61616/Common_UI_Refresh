"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockCourses } from '@/lib/mockData/courses';
import SectionContainer from '@/components/course/sections/SectionContainer';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const lessonId = params.lessonId as string;
  
  // Find the course and lesson
  const course = mockCourses.find(c => c.slug === slug);
  const [lessonData, setLessonData] = useState<{
    title: string;
    content: string;
    moduleTitle: string;
  } | null>(null);
  
  useEffect(() => {
    // Find the lesson in the course modules
    if (course) {
      for (const module of course.modules) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          setLessonData({
            title: lesson.title,
            content: lesson.description || 'No content available for this lesson.',
            moduleTitle: module.title
          });
          break;
        }
      }
    }
  }, [course, lessonId]);
  
  // Handle navigation back to course
  const handleBackToCourse = () => {
    router.push(`/course/${slug}`);
  };
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Course not found</h2>
          <p className="mt-2 text-gray-500">The course you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/course')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }
  
  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Lesson not found</h2>
          <p className="mt-2 text-gray-500">The lesson you're looking for doesn't exist in this course.</p>
          <button 
            onClick={handleBackToCourse}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Lesson header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button 
                onClick={handleBackToCourse}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to {course.title}
              </button>
              <h1 className="text-2xl font-bold text-gray-800 mt-2">{lessonData.title}</h1>
              <p className="text-gray-600">Module: {lessonData.moduleTitle}</p>
            </div>
            <div className="flex items-center">
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors mr-3">
                Previous Lesson
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Next Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lesson content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main lesson content */}
          <div className="lg:col-span-3">
            <SectionContainer title="Lesson Content">
              <div className="prose prose-blue max-w-none">
                <p>{lessonData.content}</p>
                <p className="mt-4">This is a placeholder lesson content. In a real implementation, this would contain rich content including text, images, videos, and interactive elements.</p>
              </div>
            </SectionContainer>
            
            {/* Lesson resources */}
            <SectionContainer 
              title="Lesson Resources"
              className="mt-8"
            >
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-blue-700">Lesson Notes</h3>
                    <p className="text-sm text-blue-600">Downloadable PDF with key concepts and examples</p>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-indigo-700">Video Tutorial</h3>
                    <p className="text-sm text-indigo-600">10-minute explanation with step-by-step walkthrough</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md border border-green-100 flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-green-700">Practice Problems</h3>
                    <p className="text-sm text-green-600">Interactive exercises to test your understanding</p>
                  </div>
                </div>
              </div>
            </SectionContainer>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SectionContainer title="Module Progress">
              <div className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-sm text-gray-600">3 of 7 lessons completed</p>
                
                <h4 className="font-medium text-gray-700 mt-4">Lesson Navigation</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-green-600">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Introduction to the Topic</span>
                  </li>
                  <li className="flex items-center text-green-600">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Key Concepts</span>
                  </li>
                  <li className="flex items-center text-blue-600 font-medium">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="5" />
                    </svg>
                    <span>Current Lesson</span>
                  </li>
                  <li className="flex items-center text-gray-500">
                    <svg className="h-4 w-4 mr-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Advanced Applications</span>
                  </li>
                  <li className="flex items-center text-gray-500">
                    <svg className="h-4 w-4 mr-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Practice Problems</span>
                  </li>
                </ul>
              </div>
            </SectionContainer>
            
            <SectionContainer 
              title="Knowledge Connections"
              className="mt-6"
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Related concepts from this course:</p>
                
                <div className="flex flex-col space-y-2">
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    • Linear Equations Fundamentals
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    • Problem-Solving Strategies
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    • Data Analysis Techniques
                  </a>
                </div>
              </div>
            </SectionContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
