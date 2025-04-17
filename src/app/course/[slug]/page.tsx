"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { mockCourses, mockUserProgress, webDevFundamentalsCourse } from '@/lib/mockData/courses';
import { Resource } from '@/types/course';

// Import all the modular components
import {
  CourseHeroSection,
  CourseStatsBar,
  CourseProgressSection,
  CourseLearningObjectivesSection,
  CourseRoadmapSection,
  CourseContentSection,
  CourseEnrollCTA,
  CourseInstructorCard,
  CourseResourcesCard,
  CourseRequirementsCard,
  CourseIncludesCard,
  SectionContainer,
  CourseViewTabs,
  CourseViewType
} from '@/components/course/sections';

// Placeholder components for future implementation
const KnowledgeGraphView = () => (
  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 min-h-[400px] flex flex-col items-center justify-center">
    <svg className="h-16 w-16 text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    <h3 className="text-xl font-bold text-gray-800 mb-2">Knowledge Graph View</h3>
    <p className="text-gray-500 text-center max-w-lg">
      This interactive knowledge graph will show you how concepts are connected, helping you understand relationships between different topics in the course.
    </p>
    <div className="mt-6 text-sm text-blue-600 border border-blue-200 rounded-full px-4 py-2 bg-blue-50">
      Coming soon
    </div>
  </div>
);

const RoadmapView = () => (
  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 min-h-[400px] flex flex-col items-center justify-center">
    <svg className="h-16 w-16 text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
    <h3 className="text-xl font-bold text-gray-800 mb-2">Learning Path View</h3>
    <p className="text-gray-500 text-center max-w-lg">
      Your personalized learning journey through the course, showing recommended paths based on your progress and learning style.
    </p>
    <div className="mt-6 text-sm text-indigo-600 border border-indigo-200 rounded-full px-4 py-2 bg-indigo-50">
      Coming soon
    </div>
  </div>
);

export default function CourseDetailPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // Find the course by slug
  const course = mockCourses.find(c => c.slug === slug) || webDevFundamentalsCourse;
  
  // Simulate if the user is enrolled and has progress
  const [isEnrolled, setIsEnrolled] = useState(slug === 'web-development-fundamentals');
  const progress = isEnrolled && slug === 'web-development-fundamentals' 
    ? mockUserProgress.webDevFundamentals 
    : isEnrolled && slug === 'react-js-masterclass'
    ? mockUserProgress.reactMasterclass
    : undefined;
  
  // Get common resources for the course
  const commonResources = course.modules
    .flatMap(module => 
      module.lessons.flatMap(lesson => lesson.resources || [])
    )
    .filter((resource, index, self) => 
      resource && index === self.findIndex(r => r?.id === resource.id)
    )
    .slice(0, 4) as Resource[]; // Limit to 4 resources for display
  
  // Get view from URL or default to 'modules'
  const viewParam = searchParams.get('view') as CourseViewType | null;
  const [activeView, setActiveView] = useState<CourseViewType>(viewParam || 'modules');
  
  // Update view state when URL parameter changes
  useEffect(() => {
    if (viewParam && (viewParam === 'modules' || viewParam === 'knowledge-graph' || viewParam === 'roadmap')) {
      setActiveView(viewParam);
    }
  }, [viewParam]);

  // Handle enrollment
  const handleEnroll = () => {
    console.log(`Enrolling in course: ${course.title}`);
    setIsEnrolled(true);
  };
  
  // Handle continue learning
  const handleContinue = () => {
    if (progress?.currentLesson) {
      console.log(`Continuing to lesson: ${progress.currentLesson.lessonId}`);
      // Would navigate to the lesson page in a real implementation
      router.push(`/course/${slug}/lesson/${progress.currentLesson.lessonId}`);
    }
  };
  
  // Handle lesson selection
  const handleLessonSelect = (lessonId: string) => {
    console.log(`Selected lesson: ${lessonId}`);
    // Would navigate to the lesson page in a real implementation
    router.push(`/course/${slug}/lesson/${lessonId}`);
  };
  
  // Handle module list navigation
  const handleModuleList = () => {
    console.log('Showing module list');
    // In a real implementation, this might toggle a mobile view or scroll to the modules section
    const modulesSection = document.getElementById('modules-section');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle resource click
  const handleResourceClick = (resourceId: string) => {
    console.log(`Accessing resource: ${resourceId}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <CourseHeroSection
        course={{
          title: course.title,
          description: course.description,
          image: course.image,
          coverImage: course.coverImage,
          instructor: course.instructor,
          estimatedDuration: course.estimatedDuration,
          difficulty: course.difficulty,
          enrollmentStatus: course.enrollmentStatus,
          enrollmentCount: course.enrollmentCount || 0,
          updatedAt: course.updatedAt,
          rating: course.averageRating && course.ratingCount 
            ? { average: course.averageRating, count: course.ratingCount } 
            : undefined,
          learningObjectives: course.learningObjectives,
          tags: course.tags,
        }}
        progress={progress ? {
          percentage: progress.percentage,
          completedLessons: progress.completedLessons,
          totalLessons: progress.totalLessons,
          lastAccessed: progress.lastAccessed,
        } : undefined}
        isEnrolled={isEnrolled}
        onEnroll={handleEnroll}
        onContinue={handleContinue}
      />
      
      {/* Stats Bar */}
      <CourseStatsBar
        estimatedHours={Math.floor(course.estimatedDuration / 60)}
        modulesCount={course.modules.length}
        enrollmentCount={course.enrollmentCount || 0}
        rating={course.averageRating}
        isEnrolled={isEnrolled}
        onContinue={handleContinue}
        onEnroll={handleEnroll}
        onViewSyllabus={handleModuleList}
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Course View Tabs - Add these below the StatBar */}
        <CourseViewTabs
          courseId={slug}
          currentView={activeView}
          onChange={setActiveView}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column - Learning Path and Modules */}
          <div className="lg:col-span-2" id="modules-section">
            {/* Render different views based on the active tab */}
            {activeView === 'modules' && (
              <div className="space-y-12 relative">
                {/* Progress Bar for Enrolled Users - First Section */}
                {isEnrolled && progress && (
                  <SectionContainer 
                    accent={true}
                    divider={{ 
                      show: true, 
                      label: "YOUR PROGRESS",
                      variant: "accent" 
                    }}
                  >
                    <CourseProgressSection progress={{
                      percentage: progress.percentage,
                      completedLessons: progress.completedLessons,
                      totalLessons: progress.totalLessons,
                      completedModules: progress.completedModules,
                      totalModules: progress.totalModules,
                      estimatedTimeLeft: progress.estimatedTimeLeft,
                    }} />
                  </SectionContainer>
                )}
                
                {/* Learning Objectives Section */}
                {course.learningObjectives && course.learningObjectives.length > 0 && (
                  <SectionContainer
                    title="What You'll Learn"
                    divider={{ 
                      show: true, 
                      label: "COURSE OVERVIEW",
                      variant: "default" 
                    }}
                  >
                    <CourseLearningObjectivesSection objectives={course.learningObjectives} />
                  </SectionContainer>
                )}
                
                {/* Course Roadmap Section */}
                <SectionContainer
                  title="Learning Path"
                  subtitle="Follow this learning path to master the material. Each module builds on the previous one."
                  divider={{ 
                    show: true, 
                    label: "COURSE ROADMAP",
                    variant: "default" 
                  }}
                >
                  <CourseRoadmapSection
                    modules={course.modules}
                    currentModuleId={progress?.currentLesson?.moduleId}
                    completedModules={isEnrolled && progress
                      ? course.modules
                          .filter((_, index) => index < (progress.completedModules || 0))
                          .map(m => m.id)
                      : []
                    }
                  />
                </SectionContainer>
                
                {/* Module Accordions Section */}
                <SectionContainer
                  title="Course Content"
                  divider={{ 
                    show: true, 
                    label: "MODULE DETAILS",
                    variant: "default" 
                  }}
                >
                  <CourseContentSection
                    modules={course.modules}
                    currentLessonId={progress?.currentLesson?.lessonId}
                    isEnrolled={isEnrolled}
                    completedLessons={progress?.completedLessons}
                    completedModules={progress?.completedModules}
                    onLessonSelect={handleLessonSelect}
                  />
                </SectionContainer>
                
                {/* CTA for non-enrolled users - Last Section */}
                {!isEnrolled && (
                  <SectionContainer
                    className="mt-16"
                    divider={{ 
                      show: true, 
                      label: "GET STARTED",
                      variant: "accent" 
                    }}
                    accent={true}
                  >
                    <CourseEnrollCTA
                      courseTitle={course.title}
                      onEnroll={handleEnroll}
                    />
                  </SectionContainer>
                )}
              </div>
            )}
            
            {/* Knowledge Graph View */}
            {activeView === 'knowledge-graph' && (
              <KnowledgeGraphView />
            )}
            
            {/* Roadmap/Learning Path View */}
            {activeView === 'roadmap' && (
              <RoadmapView />
            )}
          </div>
          
          {/* Sidebar - Course Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Instructor Card */}
            <SectionContainer
              title="Your Instructor"
            >
              <CourseInstructorCard 
                instructor={{
                  ...course.instructor, 
                  avatar: course.instructor.avatar || '/images/instructors/default-avatar.png'
                }} 
              />
            </SectionContainer>
            
            {/* Course Resources */}
            {commonResources.length > 0 && (
              <SectionContainer
                title="Course Resources"
              >
                <CourseResourcesCard
                  resources={commonResources}
                  onResourceClick={handleResourceClick}
                />
              </SectionContainer>
            )}
            
            {/* Requirements */}
            <SectionContainer
              title="Requirements"
            >
              <CourseRequirementsCard
                requirements={[]} // Course type doesn't seem to have requirements property
                slug={slug}
              />
            </SectionContainer>
            
            {/* Course includes section */}
            <SectionContainer
              title="This Course Includes"
            >
              <CourseIncludesCard />
            </SectionContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
