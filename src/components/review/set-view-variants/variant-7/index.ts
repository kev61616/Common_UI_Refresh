'use client'

import { registerView } from '../../registry/viewRegistry'
import React from 'react';

// Register this view with metadata
registerView({
  id: 7,
  name: 'Radial View',
  description: 'Circular arrangement of sets radiating from a central point',
  category: 'set',
  isExperimental: false
})

// Create a fallback component since RadialView is missing
const FallbackRadialView = (props: any) => {
  // Using manual React.createElement instead of JSX for .ts file
  return React.createElement(
    'div', 
    { className: "border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" },
    React.createElement('h3', { className: "text-xl font-bold mb-6 text-center" }, "7. Radial View"),
    React.createElement('div', { className: "p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md text-amber-600 dark:text-amber-400" }, "This component is not available. The RadialView implementation is missing.")
  );
};

// Export the fallback component as default
export default FallbackRadialView
