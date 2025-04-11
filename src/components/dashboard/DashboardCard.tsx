'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { DashboardCardId, CardPriority, useDashboardLayout } from '@/contexts/DashboardLayoutContext';

interface DashboardCardProps {
  id: DashboardCardId;
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function DashboardCard({ id, title, children, className = '', icon }: DashboardCardProps) {
  const { moveCard, setPriority, getCardStyle } = useDashboardLayout();
  const [controlsVisible, setControlsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const styles = getCardStyle(id);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // To prevent hydration errors, only apply styles on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 ${className}`}
      style={isClient ? {
        order: styles.order,
        display: styles.display,
        opacity: styles.opacity,
        transform: styles.scale
      } : undefined}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
      suppressHydrationWarning data-oid="gdprzlo">

      <div className="px-3 py-2.5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center relative" data-oid="1b8v8nf">
        <h3 className="font-medium text-slate-900 dark:text-white flex items-center text-sm truncate" data-oid="p2hhhp-">
          {icon && <span className="mr-1.5 flex-shrink-0" data-oid="65495lx">{icon}</span>}
          <span className="truncate" data-oid="m7gfjy2">{title}</span>
        </h3>
        
        {/* Card Controls - Desktop hover / Mobile always visible */}
        <div
          className={`flex items-center sm:space-x-1 sm:transition-opacity sm:duration-200 ${
          controlsVisible ? 'sm:opacity-100' : 'sm:opacity-0 opacity-100'}`
          } data-oid="_w9i3-d">

          {/* Move Up/Down buttons */}
          <div className="sm:flex hidden" data-oid="uxa6_8u">
            <button
              onClick={() => moveCard(id, 'up')}
              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Move up" data-oid="4fz44wn">

              <svg className="h-4 w-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="0b5h03t">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" data-oid="kq5r_i2" />
              </svg>
            </button>
            
            <button
              onClick={() => moveCard(id, 'down')}
              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Move down" data-oid="2ud568d">

              <svg className="h-4 w-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="j7tlf_i">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" data-oid="eyxgjha" />
              </svg>
            </button>
          </div>
          
          {/* Priority Menu Button */}
          <div className="relative" ref={menuRef} data-oid="oozp9d9">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Priority options" data-oid="6:rhg0x">

              <svg className="h-4 w-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="i7.5qj-">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" data-oid="488q:b." />
              </svg>
            </button>
            
            {menuOpen &&
            <div className="absolute right-0 top-7 w-36 sm:w-40 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-slate-200 dark:border-slate-700 py-1 z-10" data-oid="4-asehh">
                {/* Mobile-only move buttons in menu */}
                <div className="sm:hidden px-3 py-1 flex justify-between border-b border-slate-200 dark:border-slate-700" data-oid="rl32t64">
                  <button
                  onClick={() => {
                    moveCard(id, 'up');
                    setMenuOpen(false);
                  }}
                  className="text-slate-500 dark:text-slate-400 flex items-center text-xs" data-oid="dk3k-fb">

                    <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="u4dj7.i">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" data-oid="kdhu2eh" />
                    </svg>
                    Move up
                  </button>
                  
                  <button
                  onClick={() => {
                    moveCard(id, 'down');
                    setMenuOpen(false);
                  }}
                  className="text-slate-500 dark:text-slate-400 flex items-center text-xs" data-oid="dvg9h_7">

                    <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="p:iq8hh">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" data-oid="cosnqo1" />
                    </svg>
                    Move down
                  </button>
                </div>
                
                <p className="px-3 py-1 text-xs text-slate-500 dark:text-slate-400 sm:border-b border-slate-200 dark:border-slate-700" data-oid="2m353ye">
                  Priority:
                </p>
                
                <button
                onClick={() => {
                  setPriority(id, 'high');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center" data-oid="1w6617p">

                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2" data-oid="bnizlrh"></span>
                  High
                </button>
                
                <button
                onClick={() => {
                  setPriority(id, 'normal');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center" data-oid="sljyzan">

                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2" data-oid="bfhl_6e"></span>
                  Normal
                </button>
                
                <button
                onClick={() => {
                  setPriority(id, 'low');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center" data-oid="0ex25ci">

                  <span className="w-2.5 h-2.5 bg-slate-400 rounded-full mr-2" data-oid="k5k-esy"></span>
                  Low
                </button>
                
                <button
                onClick={() => {
                  setPriority(id, 'hidden');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center" data-oid="pwu7nml">

                  <span className="w-2.5 h-2.5 bg-slate-300 rounded-full mr-2 flex items-center justify-center" data-oid="1gq6p-7">
                    <span className="block w-1.5 h-0.5 bg-slate-500 dark:bg-slate-400 transform rotate-45" data-oid="zcsh7:s"></span>
                  </span>
                  Hide
                </button>
              </div>
            }
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      {children}
    </div>);

}