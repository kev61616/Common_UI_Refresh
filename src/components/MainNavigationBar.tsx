import { Suspense } from 'react';
import { ThemeSelector } from '@/components/ThemeSelector';
import NavigationClient from './NavigationClient';

// Loading component for the navigation
function NavigationLoading() {
  return (
    <div className="sticky top-0 z-50" data-oid="7n5dzfw">
      <div
        className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        style={{ paddingTop: '2%', paddingBottom: '10px' }} data-oid="xgchci5">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-oid="_toi:ik">
          <div className="h-16 flex items-center justify-between" data-oid="l0bt1ja">
            <div className="bg-slate-200 dark:bg-slate-700 h-9 w-28 rounded-md animate-pulse" data-oid="q:5pccw"></div>
            <div className="flex-1 flex items-center justify-center" data-oid="p:b-cnk">
              <div className="flex space-x-8 mx-8" data-oid="fk-03_n">
                <div className="bg-slate-200 dark:bg-slate-700 h-8 w-20 rounded-md animate-pulse" data-oid="k57eewy"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-8 w-16 rounded-md animate-pulse" data-oid="5suy4gw"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-8 w-24 rounded-md animate-pulse" data-oid="vig1bzt"></div>
              </div>
            </div>
            <div className="flex items-center space-x-4" data-oid="jee92q2">
              <div className="bg-slate-200 dark:bg-slate-700 h-8 w-8 rounded-full animate-pulse" data-oid="2_p.-_5"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-8 w-8 rounded-full animate-pulse" data-oid="tm-zivl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// Main navigation bar that properly wraps the client component
export function MainNavigationBar() {
  return (
    <Suspense fallback={<NavigationLoading data-oid="wm8lwl." />} data-oid="3x6tqkc">
      <NavigationClient data-oid="e63ck4:" />
    </Suspense>);

}