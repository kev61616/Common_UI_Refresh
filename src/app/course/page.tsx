"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { CourseCard } from '@/components/course';
import { mockCourses } from '@/lib/mockData/courses';

export default function CourseCatalogPage() {
  const router = useRouter();
  
  // Get featured courses
  const featuredCourses = mockCourses.filter(course => course.featured);
  
  // Group courses by category
  const coursesByCategory = mockCourses.reduce((acc, course) => {
    if (course.categories && course.categories.length > 0) {
      course.categories.forEach(category => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(course);
      });
    }
    return acc;
  }, {} as Record<string, typeof mockCourses>);
  
  // Navigate to course detail page
  const handleCourseClick = (slug: string) => {
    router.push(`/course/${slug}`);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero section */}
      <div className="bg-blue-600 text-white py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Expand Your Knowledge with Our Courses
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Discover a wide range of courses designed to help you master new skills,
            advance your career, and explore your passions.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Featured courses section */}
        {featuredCourses.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={{
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    shortDescription: course.shortDescription,
                    image: course.image || '/images/courses/default-course.jpg',
                    instructor: {
                      name: course.instructor.name,
                      avatar: course.instructor.avatar,
                    },
                    estimatedDuration: course.estimatedDuration,
                    difficulty: course.difficulty,
                    category: course.categories?.[0],
                    enrollmentStatus: course.enrollmentStatus,
                    enrollmentCount: course.enrollmentCount,
                    updatedAt: course.updatedAt,
                    featured: course.featured,
                    tags: course.tags,
                  }}
                  variant="featured"
                  onClick={() => handleCourseClick(course.slug)}
                />
              ))}
            </div>
          </section>
        )}
        
        {/* All courses by category */}
        {Object.entries(coursesByCategory).map(([category, courses]) => (
          <section key={category} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard
                  key={course.id}
                  course={{
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    shortDescription: course.shortDescription,
                    image: course.image || '/images/courses/default-course.jpg',
                    instructor: {
                      name: course.instructor.name,
                      avatar: course.instructor.avatar,
                    },
                    estimatedDuration: course.estimatedDuration,
                    difficulty: course.difficulty,
                    category: course.categories?.[0],
                    enrollmentStatus: course.enrollmentStatus,
                    enrollmentCount: course.enrollmentCount,
                    updatedAt: course.updatedAt,
                    featured: course.featured,
                    tags: course.tags,
                  }}
                  onClick={() => handleCourseClick(course.slug)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
