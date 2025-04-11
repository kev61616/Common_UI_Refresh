'use client';

import React from 'react';

interface BoardHeaderProps {
  title: string;
  description: string;
}

/**
 * Board header component with title and description
 */
export function BoardHeader({ title, description }: BoardHeaderProps) {
  return (
    <div className="text-center mb-8 px-0" data-oid="o0mue2-">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2" data-oid="nad-mtv">
        {title}
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto" data-oid="qhd237f">
        {description}
      </p>
    </div>);

}