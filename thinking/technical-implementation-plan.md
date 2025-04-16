# Technical Implementation Plan

This document provides specific implementation guidelines for the optimized user flow. It includes code examples, component structures, and technical approaches to address the identified issues.

## 1. Progressive Loading Implementation

### React.lazy and Suspense for Component Splitting

```tsx
// In ProfileTabsContainer.jsx
import React, { Suspense, lazy } from 'react';

// Lazy load tab content
const ReadingChartsContainer = lazy(() => import('./ReadingChartsContainer'));
const WritingChartsContainer = lazy(() => import('./WritingChartsContainer'));
const MathChartsContainer = lazy(() => import('./MathChartsContainer'));

export function ProfileTabsContainer({ activeTab }) {
  return (
    <div className="profile-tabs-container">
      <Suspense fallback={<div className="tab-loading-skeleton">Loading...</div>}>
        {activeTab === 'reading' && <ReadingChartsContainer />}
        {activeTab === 'writing' && <WritingChartsContainer />}
        {activeTab === 'math' && <MathChartsContainer />}
      </Suspense>
    </div>
  );
}
```

### Intersection Observer for Viewport-Based Loading

```tsx
// hooks/useIntersectionObserver.ts
import { useState, useEffect, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasLoaded) {
        setHasLoaded(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options, hasLoaded]);

  return { ref, isIntersecting, hasLoaded };
}

// Usage in a chart component
function LazyLoadedChart({ chartData }) {
  const { ref, hasLoaded } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div ref={ref} className="chart-container">
      {hasLoaded ? <ActualChart data={chartData} /> : <ChartSkeleton />}
    </div>
  );
}
```

## 2. Simplified Card Management System

### SimpleCardGrid Component

```tsx
// components/profile/cards/SimpleCardGrid.tsx
import React from 'react';
import { CardContent } from './CardContent';

interface SimpleCardGridProps {
  cards: CardConfig[];
  onCardClick?: (id: string) => void;
}

export function SimpleCardGrid({ cards, onCardClick }: SimpleCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div 
          key={card.id} 
          className="card-container"
          onClick={() => onCardClick?.(card.id)}
        >
          <CardContent 
            title={card.title}
            content={card.content}
            type={card.type}
          />
        </div>
      ))}
    </div>
  );
}
```

### EditableCardGrid Component

```tsx
// components/profile/cards/EditableCardGrid.tsx
import React, { useState } from 'react';
import { SimpleCardGrid } from './SimpleCardGrid';
import { DraggableCardGrid } from './DraggableCardGrid';
import { ClientOnly } from '../../dnd/ClientOnly';

interface EditableCardGridProps {
  cards: CardConfig[];
  onCardClick?: (id: string) => void;
  onLayoutSave?: (newLayout: CardConfig[]) => void;
}

export function EditableCardGrid({ 
  cards, 
  onCardClick,
  onLayoutSave
}: EditableCardGridProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableCards, setEditableCards] = useState(cards);

  const handleSave = () => {
    setIsEditMode(false);
    onLayoutSave?.(editableCards);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditableCards(cards);
  };

  return (
    <div className="editable-grid-container">
      <div className="grid-controls mb-4">
        {!isEditMode ? (
          <button 
            className="edit-layout-btn"
            onClick={() => setIsEditMode(true)}
          >
            Customize Layout
          </button>
        ) : (
          <div className="edit-controls">
            <button 
              className="save-btn"
              onClick={handleSave}
            >
              Save Layout
            </button>
            <button 
              className="cancel-btn ml-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {!isEditMode ? (
        <SimpleCardGrid 
          cards={cards} 
          onCardClick={onCardClick} 
        />
      ) : (
        <ClientOnly>
          <DraggableCardGrid 
            cards={editableCards} 
            onCardsChange={setEditableCards} 
          />
        </ClientOnly>
      )}
    </div>
  );
}
```

## 3. Data Fetching and State Management Strategy

### Centralized Data Hooks with SWR

```tsx
// hooks/useProfileData.ts
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useProfileData(userId, options = {}) {
  // Main profile overview data
  const { data: overviewData, error: overviewError } = useSWR(
    `/api/profile/${userId}/overview`,
    fetcher,
    options
  );

  // Subject-specific data with conditional fetching
  const { data: readingData, error: readingError } = useSWR(
    () => options.fetchReading ? `/api/profile/${userId}/reading` : null,
    fetcher
  );

  const { data: writingData, error: writingError } = useSWR(
    () => options.fetchWriting ? `/api/profile/${userId}/writing` : null,
    fetcher
  );

  const { data: mathData, error: mathError } = useSWR(
    () => options.fetchMath ? `/api/profile/${userId}/math` : null,
    fetcher
  );

  // Prefetch related data when a subject is loaded
  const prefetchRelatedData = (subject) => {
    if (subject === 'reading') {
      // Prefetch writing and math
      useSWR(`/api/profile/${userId}/writing`, fetcher, { dedupingInterval: 60000 });
      useSWR(`/api/profile/${userId}/math`, fetcher, { dedupingInterval: 60000 });
    }
    // Handle other subjects similarly
  };

  return {
    overview: {
      data: overviewData,
      isLoading: !overviewError && !overviewData,
      isError: overviewError
    },
    reading: {
      data: readingData,
      isLoading: options.fetchReading && !readingError && !readingData,
      isError: readingError
    },
    writing: {
      data: writingData,
      isLoading: options.fetchWriting && !writingError && !writingData,
      isError: writingError
    },
    math: {
      data: mathData,
      isLoading: options.fetchMath && !mathError && !mathData,
      isError: mathError
    },
    prefetchRelatedData
  };
}
```

## 4. Navigation Enhancements

### Learning Path Indicator Component

```tsx
// components/navigation/LearningPathIndicator.tsx
import React from 'react';
import { useRouter } from 'next/router';

const pathSegments = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Course', path: '/course' },
  { name: 'Question Bank', path: '/question-bank' },
  { name: 'Review', path: '/review' },
  { name: 'Mock Test', path: '/mock-test' }
];

export function LearningPathIndicator() {
  const router = useRouter();
  const currentPath = router.pathname;
  
  // Find current segment index
  const currentIndex = pathSegments.findIndex(segment => 
    currentPath.startsWith(segment.path)
  );

  return (
    <div className="learning-path-container">
      <div className="path-segments flex items-center justify-between w-full">
        {pathSegments.map((segment, index) => (
          <React.Fragment key={segment.path}>
            <div 
              className={`path-node ${index <= currentIndex ? 'completed' : 'upcoming'} 
                ${index === currentIndex ? 'current' : ''}`}
            >
              <div className="node-indicator"></div>
              <span className="node-label">{segment.name}</span>
            </div>
            
            {index < pathSegments.length - 1 && (
              <div className={`path-connector ${index < currentIndex ? 'completed' : 'upcoming'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="next-step-suggestion mt-2">
        {currentIndex < pathSegments.length - 1 && (
          <button 
            className="next-step-btn"
            onClick={() => router.push(pathSegments[currentIndex + 1].path)}
          >
            Next: {pathSegments[currentIndex + 1].name}
          </button>
        )}
      </div>
    </div>
  );
}
```

### Contextual Navigation Links

```tsx
// components/navigation/ContextualNavLink.tsx
import React from 'react';
import Link from 'next/link';

interface ContextualNavLinkProps {
  href: string;
  contextType: 'next-step' | 'related-content' | 'back-to-overview';
  label: string;
  icon?: React.ReactNode;
}

export function ContextualNavLink({ 
  href, 
  contextType, 
  label, 
  icon 
}: ContextualNavLinkProps) {
  return (
    <Link 
      href={href}
      className={`contextual-nav-link ${contextType}`}
    >
      {icon && <div className="link-icon mr-2">{icon}</div>}
      <span className="link-label">{label}</span>
    </Link>
  );
}

// Usage in a course component
function CourseContent({ courseId, moduleId }) {
  return (
    <div className="course-content">
      {/* Course content here */}
      
      <div className="contextual-navigation mt-6">
        <ContextualNavLink 
          href={`/question-bank?courseId=${courseId}&moduleId=${moduleId}`}
          contextType="next-step"
          label="Practice This Concept"
          icon={<PracticeIcon />}
        />
      </div>
    </div>
  );
}
```

## 5. Performance Metrics and Monitoring

To measure the effectiveness of these optimizations, implement the following:

```tsx
// utils/performance.ts
export const measurePageLoad = (pageName) => {
  if (typeof window !== 'undefined' && window.performance) {
    // Navigation timing
    const pageNav = performance.getEntriesByType('navigation')[0];
    const loadTime = pageNav.loadEventEnd - pageNav.startTime;
    
    // Report to analytics
    logPerformanceMetric({
      page: pageName,
      metric: 'loadTime',
      value: loadTime
    });
    
    // First contentful paint
    const paintMetrics = performance.getEntriesByType('paint');
    const fcp = paintMetrics.find(entry => entry.name === 'first-contentful-paint');
    
    if (fcp) {
      logPerformanceMetric({
        page: pageName,
        metric: 'firstContentfulPaint',
        value: fcp.startTime
      });
    }
  }
};

// Implement in _app.tsx or layout components
useEffect(() => {
  measurePageLoad(router.pathname);
}, [router.pathname]);
```

## Implementation Phases

For a systematic approach to implementing these optimizations:

1. **Phase 1: Performance Foundations**
   - Implement React.lazy and Suspense for code splitting
   - Create the Intersection Observer hook for viewport loading
   - Set up performance monitoring

2. **Phase 2: UI Component Optimization**
   - Build SimpleCardGrid and EditableCardGrid components
   - Implement progressive chart loading
   - Create improved loading states and skeletons

3. **Phase 3: Data Layer Improvements**
   - Implement centralized data hooks
   - Set up prefetching for likely next views
   - Optimize API endpoints for performance

4. **Phase 4: Navigation Enhancements**
   - Build learning path indicator
   - Create contextual navigation components
   - Implement related content suggestions

5. **Phase 5: Testing and Refinement**
   - Conduct performance testing
   - Collect user feedback
   - Iterate on implementations based on metrics
