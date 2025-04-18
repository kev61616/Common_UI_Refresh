'use client';

import React, { useState, useEffect } from 'react';
import { getAllViewsForCategory, ViewMetadata } from './registry/viewRegistry';

interface ViewSelectorProps {
  category: 'set' | 'timeline' | 'question';
  currentVariant: number;
  onSelectVariant: (variant: number) => void;
  className?: string;
}

/**
 * ViewSelector - Advanced UI for selecting view variants with search and filtering
 * 
 * This component provides a user-friendly way to navigate and select from 
 * potentially 100+ view variants with search capabilities.
 */
export default function ViewSelector({
  category,
  currentVariant,
  onSelectVariant,
  className = ''
}: ViewSelectorProps) {
  // State for views and filtering
  const [views, setViews] = useState<ViewMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isExpanded, setIsExpanded] = useState(false);

  // Load views from registry
  useEffect(() => {
    const registeredViews = getAllViewsForCategory(category);
    setViews(registeredViews);
  }, [category]);

  // Apply filters to get filtered views
  const filteredViews = views.filter((view) => {
    // Search term filter (case-insensitive)
    const matchesSearch = !searchTerm ||
    view.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.description && view.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Toggle view mode between grid and list
  const toggleViewMode = () => {
    setViewMode((prevMode) => prevMode === 'grid' ? 'list' : 'grid');
  };

  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  // Select a variant
  const handleSelectVariant = (variant: number) => {
    onSelectVariant(variant);
    setIsExpanded(false); // Collapse after selection
  };

  // If no registered views yet, show minimal placeholder
  if (views.length === 0) {
    const viewTypeName = category.charAt(0).toUpperCase() + category.slice(1);
    return (
      <div className={`p-4 border border-slate-200 dark:border-slate-700 rounded-lg mb-4 ${className}`} data-oid="wtybrng">
        <div className="flex justify-between items-center" data-oid="u_wzjj9">
          <h3 className="text-lg font-medium" data-oid="mqimx7g">{viewTypeName} View #{currentVariant}</h3>
          <div className="flex space-x-2" data-oid="vv:prnk">
            <button
              onClick={() => onSelectVariant(Math.max(1, currentVariant - 1))}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Previous view" data-oid="bz3qeso">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="tpty2p:">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" data-oid="w57cymn" />
              </svg>
            </button>
            <button
              onClick={() => onSelectVariant(currentVariant + 1)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Next view" data-oid="q09smv6">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="r.1j5kc">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" data-oid="t:zlnvv" />
              </svg>
            </button>
          </div>
        </div>
      </div>);

  }

  return (
    <div className={`border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden mb-4 ${className}`} data-oid="w9yx77l">
      {/* Header with current view and expand/collapse toggle */}
      <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50" data-oid="1xeajja">
        <h3 className="text-lg font-medium flex items-center" data-oid="tw42y7m">
          <span className="mr-2" data-oid="y-z1cwl">{views.find((v) => v.id === currentVariant)?.name || `${category} View #${currentVariant}`}</span>
          {views.find((v) => v.id === currentVariant)?.isExperimental &&
          <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs px-2 py-0.5 rounded-full" data-oid="c0s2jc4">
              Experimental
            </span>
          }
        </h3>
        <div className="flex items-center space-x-2" data-oid="l2.h95.">
          <div className="flex" data-oid="wp7q8:y">
            <button
              onClick={() => onSelectVariant(Math.max(1, currentVariant - 1))}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-l hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Previous view" data-oid="q.sq-o.">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="eq.gdio">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" data-oid="pw9xj0q" />
              </svg>
            </button>
            <button
              onClick={() => onSelectVariant(currentVariant + 1)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-r hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Next view" data-oid="7lbvifu">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="nvynpqv">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" data-oid="5fu31ln" />
              </svg>
            </button>
          </div>
          <button
            onClick={toggleViewMode}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
            aria-label={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'} data-oid="vgxhsfw">

            {viewMode === 'grid' ?
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="u55y:6r">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" data-oid="77993kr" />
              </svg> :

            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="tbr3q5w">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-oid="slx5_fm" />
              </svg>
            }
          </button>
          <button
            onClick={toggleExpanded}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
            aria-label={isExpanded ? 'Collapse view selector' : 'Expand view selector'} data-oid="adkpu1v">

            {isExpanded ?
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="l87ehh:">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" data-oid="38cd1oz" />
              </svg> :

            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="kvfagli">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" data-oid="xnehmh-" />
              </svg>
            }
          </button>
        </div>
      </div>
      
      {/* Expanded content with search and view selector */}
      {isExpanded &&
      <div className="border-t border-slate-200 dark:border-slate-700" data-oid="_snmh.r">
          {/* Search controls */}
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-700" data-oid="e7r7.vn">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4" data-oid="v3.c7x-">
              <div className="relative flex-grow" data-oid="pw_msbb">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-oid="ei..7wq">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="-b:4sp6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-oid="ytdg3n7" />
                  </svg>
                </div>
                <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                placeholder="Search views..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} data-oid="h4mkakc" />

              </div>
              
              <div className="flex items-center space-x-2" data-oid="fyw6--0">
                <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap" data-oid="i9uo6vu">
                  {filteredViews.length} {filteredViews.length === 1 ? 'view' : 'views'}
                </span>
                
                <button
                onClick={() => setSearchTerm('')}
                className={`text-sm px-2 py-1 rounded ${
                searchTerm ?
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/30' :
                'text-slate-400 dark:text-slate-500 cursor-default'}`
                }
                disabled={!searchTerm} data-oid="374-n72">

                  Clear search
                </button>
              </div>
            </div>
          </div>
          
          {/* Views list/grid */}
          <div className={`p-4 max-h-96 overflow-y-auto ${
        viewMode === 'grid' ?
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3' :
        'flex flex-col space-y-2'}`
        } data-oid="_.a-nl-">
            {filteredViews.length > 0 ?
          filteredViews.map((view) =>
          <button
            key={view.id}
            onClick={() => handleSelectVariant(view.id)}
            className={`text-left transition-colors ${
            currentVariant === view.id ?
            'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50' :
            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'} border rounded-lg overflow-hidden ${

            viewMode === 'grid' ? 'flex flex-col' : 'flex items-center'}`
            } data-oid="riir4_u">

                  {view.thumbnailUrl && viewMode === 'grid' &&
            <div className="w-full h-32 bg-slate-100 dark:bg-slate-900 relative" data-oid="5oe:xjb">
                      <img
                src={view.thumbnailUrl}
                alt={view.name}
                className="w-full h-full object-cover" data-oid="bp2p69o" />

                    </div>
            }
                  
                  <div className={`p-3 ${viewMode === 'grid' ? 'w-full' : 'flex-grow'}`} data-oid="0rluuyn">
                    <div className="flex items-center" data-oid="n.ty:in">
                      <span className="font-medium mr-2" data-oid="48u9qgp">
                        {view.id}. {view.name}
                      </span>
                      {view.isExperimental &&
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs px-1.5 py-0.5 rounded" data-oid="79f__3h">
                          Experimental
                        </span>
                }
                    </div>
                    
                    {view.description &&
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2" data-oid="mf:8802">
                        {view.description}
                      </p>
              }
                  </div>
                  
                  {viewMode === 'list' &&
            <div className="p-3" data-oid="fw8fx_j">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="16mieh6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" data-oid=".7n8tf5" />
                      </svg>
                    </div>
            }
                </button>
          ) :

          <div className="col-span-full p-8 text-center" data-oid="8prvdu_">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="649oiz8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="f_7dn-o" />
                </svg>
                <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1" data-oid="d7l.vdk">No views found</h4>
                <p className="text-slate-500 dark:text-slate-400" data-oid="ri95ybi">
                  Try adjusting your search criteria
                </p>
              </div>
          }
          </div>
        </div>
      }
    </div>);

}