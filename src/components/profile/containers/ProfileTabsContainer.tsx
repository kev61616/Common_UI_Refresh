"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { BookOpen, PenLine, Calculator, LayoutDashboard } from 'lucide-react';
import OverviewChartsContainer from './OverviewChartsContainer';
import ReadingChartsContainer from './ReadingChartsContainer';
import WritingChartsContainer from './WritingChartsContainer';
import MathChartsContainer from './MathChartsContainer';

interface ProfileTabsContainerProps {
  studentId: string;
  initialTab?: 'overview' | 'reading' | 'writing' | 'math';
  className?: string;
}

const ProfileTabsContainer: React.FC<ProfileTabsContainerProps> = ({
  studentId,
  initialTab = 'overview',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <Tabs
      defaultValue={initialTab}
      value={activeTab}
      onValueChange={setActiveTab}
      className={`w-full ${className}`}
    >
      <div className="border-b border-border mb-6">
        <TabsList className="w-full justify-start bg-transparent p-0">
          <TabsTrigger 
            value="overview" 
            variant="underline" 
            className="py-3 px-5 font-medium"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="reading" 
            variant="underline" 
            className="py-3 px-5 font-medium"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Reading
          </TabsTrigger>
          <TabsTrigger 
            value="writing" 
            variant="underline" 
            className="py-3 px-5 font-medium"
          >
            <PenLine className="mr-2 h-4 w-4" />
            Writing
          </TabsTrigger>
          <TabsTrigger 
            value="math" 
            variant="underline" 
            className="py-3 px-5 font-medium"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Math
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="mt-0">
        <OverviewChartsContainer studentId={studentId} />
      </TabsContent>

      <TabsContent value="reading" className="mt-0">
        <ReadingChartsContainer studentId={studentId} />
      </TabsContent>

      <TabsContent value="writing" className="mt-0">
        <WritingChartsContainer studentId={studentId} />
      </TabsContent>

      <TabsContent value="math" className="mt-0">
        <MathChartsContainer studentId={studentId} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabsContainer;
