"use client";

import React from "react";

interface TimerDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "minimal" | "pill" | "card" | "modern" | "compact";
  time?: string;
}

export function TimerDisplay({
  variant = "default",
  time = "00:01:13",
  ...props
}: TimerDisplayProps) {
  // Generate the class name based on the variant
  const getVariantClassName = () => {
    switch (variant) {
      case "minimal":
        return "text-lg font-mono tracking-wider text-gray-700";
      case "pill":
        return "px-4 py-1.5 bg-gray-100 rounded-full font-mono text-gray-700";
      case "card":
        return "px-4 py-2 bg-white shadow-sm rounded-lg font-mono text-gray-700 border";
      case "modern":
        return "flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-mono";
      case "compact":
        return "text-sm font-mono bg-gray-100 px-2 py-1 rounded";
      default:
        return "text-xl font-mono text-gray-600";
    }
  };

  if (variant === "modern") {
    return (
      <div
        className={getVariantClassName()}
        {...props} data-oid="1xjmv0q">

        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor" data-oid="09pvp94">

          <circle cx="12" cy="12" r="10" strokeWidth="2" data-oid="ve0i4m." />
          <path d="M12 6v6l4 2" strokeWidth="2" data-oid="ab-nf0i" />
        </svg>
        {time}
      </div>);

  }

  return (
    <div
      className={`${getVariantClassName()} transition-all duration-300`}
      {...props} data-oid="zxfrdp1">

      {time}
    </div>);

}