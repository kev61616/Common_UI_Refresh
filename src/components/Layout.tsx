'use client';

import { MainNavigationBar } from '@/components/MainNavigationBar';
import '@/styles/animations.css'; // Import animations

export function Layout({ children }: {children: React.ReactNode;}) {
  return (
    <div className="flex w-full flex-col" data-oid="5_e7w9n">
      {/* Main Navigation with integrated breadcrumbs */}
      <MainNavigationBar data-oid=":augx-u" />

      {/* Main Content - Match filter's width */}
      <div className="mx-auto w-full max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)] lg:max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-6" data-oid="q7jit-h">
        {children}
      </div>
    </div>);

}