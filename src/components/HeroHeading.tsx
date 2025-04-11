'use client';

import React from 'react';
import { ClientOnly, useTheme } from '@/lib/clientUtils';

interface HeroHeadingProps {
  title: string;
  subtitle?: string;
  highlightWords?: string[];
}

/**
 * HeroHeading component with hydration mismatch prevention
 * Uses client-only rendering for theme-dependent elements
 */
export default function HeroHeading({
  title,
  subtitle,
  highlightWords = []
}: HeroHeadingProps) {
  // Use the theme hook to get client-side theme
  const { theme, isClient } = useTheme();

  // Default color class to use on the server
  const serverThemeClass = 'theme-blue';

  return (
    <div className={"text-center max-w-3xl mx-auto"} data-oid="97x-:u2">
      <h1
        className="font-[family-name:var(--font-baloo)] text-6xl md:text-7xl font-bold mb-4 theme-text"
        style={{ color: "var(--theme-color-primary)" }} data-oid="ur_:d0-">

        {title}
      </h1>
      
      {subtitle &&
      <div className="relative" data-oid="bo10:b:">
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6" data-oid=":dz-fk.">
            {subtitle}
          </p>
          
          {/* Decorative underline that could change based on theme */}
          <ClientOnly
          fallback={
          <div
            className={`w-36 h-1.5 rounded-full mx-auto ${serverThemeClass}`}
            style={{ background: "linear-gradient(to right, var(--theme-color-primary), var(--theme-color-secondary))" }} data-oid="s1gvi20">
          </div>
          } data-oid="xfnwtyf">

            <div
            className={`w-36 h-1.5 rounded-full mx-auto theme-${theme}`}
            style={{ background: "linear-gradient(to right, var(--theme-color-primary), var(--theme-color-secondary))" }} data-oid="cdmo4pf">
          </div>
          </ClientOnly>
        </div>
      }
    </div>);

}

/**
 * Alternative implementation using the ClientOnly pattern
 * This approach completely avoids rendering certain elements on the server
 */
export function HeroHeadingAlt({
  title,
  subtitle,
  highlightWords = []
}: HeroHeadingProps) {
  return (
    <div className={"text-center max-w-3xl mx-auto"} data-oid="x6dd77l">
      <h1
        className="font-[family-name:var(--font-baloo)] text-6xl md:text-7xl font-bold mb-4 theme-text"
        style={{ color: "var(--theme-color-primary)" }} data-oid="54d3-kq">

        {title}
      </h1>
      
      {subtitle &&
      <div className="relative" data-oid="3p038xf">
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6" data-oid="o3t-dtt">
            {subtitle}
          </p>
          
          {/* Only render the decoration on the client side */}
          <ClientOnly
          fallback={<div className="w-36 h-1.5 mx-auto" data-oid="mn95st3"></div>} data-oid="oovloqn">

            <div
            className="w-36 h-1.5 rounded-full mx-auto theme-green"
            style={{ background: "linear-gradient(to right, var(--theme-color-primary), var(--theme-color-secondary))" }} data-oid="j:wc4lz">
          </div>
          </ClientOnly>
        </div>
      }
    </div>);

}