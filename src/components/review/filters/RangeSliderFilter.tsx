'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from '@/components/common/Dropdown';
import { useFilters } from './FilterContext';
import { FilterButton, FilterButtonIcons } from './FilterButton';
import { filterColors } from './filterData';

interface RangeSliderFilterProps {
  filterType: 'accuracyRange' | 'timeRange';
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  icon?: React.ReactNode;
  colorClasses?: {
    active: string;
    inactive: string;
    ring: string;
    dropdown: string;
  };
}

/**
 * Range Slider Filter Component
 * Allows selecting a range of values using a dual-handle slider
 * Supports filtering by accuracy (0-100%) or time (0-120 min)
 */
export function RangeSliderFilter({
  filterType,
  label,
  min,
  max,
  step = 1,
  unit = '',
  icon,
  colorClasses = filterColors.type
}: RangeSliderFilterProps) {
  const { filters, updateFilter, activeDropdown, setActiveDropdown } = useFilters();

  // Local state for the current range during drag
  const [localRange, setLocalRange] = useState<[number, number]>(filters[filterType]);

  // Update local range when filters change
  useEffect(() => {
    setLocalRange(filters[filterType]);
  }, [filters, filterType]);

  // Track when user is dragging
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  // References to track slider elements
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate percentage for positioning and styling
  const getPercent = (value: number): number => {
    return Math.round((value - min) / (max - min) * 100);
  };

  const minPercent = getPercent(localRange[0]);
  const maxPercent = getPercent(localRange[1]);

  // Handle mouse movement during drag
  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!isDragging || !trackRef.current) return;

    // Get mouse/touch position
    const clientX = 'touches' in event ?
    event.touches[0].clientX :
    event.clientX;

    // Get track dimensions
    const trackRect = trackRef.current.getBoundingClientRect();
    const trackWidth = trackRect.width;

    // Calculate percentage along track
    const percentage = Math.min(Math.max(0, (clientX - trackRect.left) / trackWidth * 100), 100);

    // Convert percentage to value
    const value = Math.round(percentage / 100 * (max - min) + min);

    // Update the appropriate handle
    const newRange: [number, number] = [...localRange];

    if (isDragging === 'min') {
      newRange[0] = Math.min(value, localRange[1] - step);
    } else {
      newRange[1] = Math.max(value, localRange[0] + step);
    }

    // Update local state
    setLocalRange(newRange);
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;

    // Update the filter with the final values
    updateFilter(filterType, localRange);

    // Clear dragging state
    setIsDragging(null);
  };

  // Add event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, localRange]);

  // Format display value (e.g. add percentage sign or convert minutes)
  const formatDisplayValue = (value: number): string => {
    if (filterType === 'accuracyRange') {
      return `${value}%`;
    }

    if (filterType === 'timeRange') {
      // Convert minutes to hours and minutes if > 60
      if (value >= 60) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${hours}h ${minutes}m`;
      }
      return `${value}m`;
    }

    return `${value}${unit}`;
  };

  // Get preset buttons based on filter type
  const getPresetButtons = () => {
    if (filterType === 'accuracyRange') {
      return [
      { label: 'Low', range: [0, 50] as [number, number] },
      { label: 'Medium', range: [50, 80] as [number, number] },
      { label: 'High', range: [80, 100] as [number, number] }];

    } else {
      // timeRange presets
      return [
      { label: 'Quick', range: [0, 30] as [number, number] },
      { label: 'Medium', range: [30, 60] as [number, number] },
      { label: 'Long', range: [60, 120] as [number, number] }];

    }
  };

  const presets = getPresetButtons();

  // Check if a preset is currently active
  const isPresetActive = (range: [number, number]) => {
    return localRange[0] === range[0] && localRange[1] === range[1];
  };

  return (
    <Dropdown
      trigger={
      <FilterButton
        filterType={filterType}
        label={label}
        icon={icon || FilterButtonIcons[filterType === 'accuracyRange' ? 'accuracy' : 'time']}
        activeColorClasses={colorClasses.active}
        inactiveColorClasses={colorClasses.inactive}
        ringColorClass={colorClasses.ring}
        count={
        localRange[0] > min || localRange[1] < max ? 1 : 0
        } data-oid="c3u5_5o" />

      }
      isOpen={activeDropdown === filterType}
      onClose={() => setActiveDropdown(null)}
      placement="bottom-left"
      elevated={true}
      className={`p-4 w-72 ${colorClasses.dropdown}`} data-oid="w5413tx">

      <div className="mb-4" data-oid="git5.5t">
        <div className="flex justify-between items-center mb-3" data-oid="3u6ec:4">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300" data-oid="7texjap">
            {label} Range
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400" data-oid="z08j_yn">
            {formatDisplayValue(localRange[0])} - {formatDisplayValue(localRange[1])}
          </div>
        </div>
        
        {/* Preset buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4" data-oid="k.feomm">
          {presets.map((preset) =>
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setLocalRange(preset.range);
              updateFilter(filterType, preset.range);
            }}
            className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors duration-150 flex items-center justify-center ${
            isPresetActive(preset.range) ?
            'bg-white text-sky-700 border border-sky-500 dark:bg-slate-800 dark:text-sky-300 dark:border-sky-600' :
            'bg-white text-slate-600 border border-slate-200 hover:text-sky-600 hover:border-sky-500 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-sky-400 dark:hover:border-sky-600'}`
            } data-oid="xpf0jfg">

              {preset.label}
            </button>
          )}
        </div>
        
        {/* Label for custom slider */}
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 mt-2" data-oid="dytn5n-">
          Custom Range
        </div>
        
        {/* Range slider track and handles */}
        <div className="relative py-4" data-oid="epu1ngg">
          {/* Base track */}
          <div
            ref={trackRef}
            className="w-full h-1 rounded-full bg-slate-200 dark:bg-slate-700" data-oid="hbwxgyx">
          </div>
          
          {/* Filled track */}
          <div
            className="absolute top-4 h-1 rounded-full bg-sky-500 dark:bg-sky-400"
            style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }} data-oid="46pd1wm">
          </div>
          
          {/* Min handle - added higher z-index and increased touch area */}
          <div
            className="absolute top-[12px] -ml-2.5 w-5 h-5 rounded-full bg-white border-2 border-sky-500 cursor-pointer shadow-sm dark:bg-slate-800 dark:border-sky-400"
            style={{ left: `${minPercent}%`, zIndex: 50 }}
            onMouseDown={() => setIsDragging('min')}
            onTouchStart={() => setIsDragging('min')} data-oid="as5wxu:">

            {/* Enlarged touch target */}
            <div className="absolute -inset-3 cursor-pointer" onMouseDown={() => setIsDragging('min')} onTouchStart={() => setIsDragging('min')} data-oid="sh07ngt"></div>
          </div>
          
          {/* Max handle - added higher z-index and increased touch area */}
          <div
            className="absolute top-[12px] -ml-2.5 w-5 h-5 rounded-full bg-white border-2 border-sky-500 cursor-pointer shadow-sm dark:bg-slate-800 dark:border-sky-400"
            style={{ left: `${maxPercent}%`, zIndex: 50 }}
            onMouseDown={() => setIsDragging('max')}
            onTouchStart={() => setIsDragging('max')} data-oid="g8sjt:w">

            {/* Enlarged touch target */}
            <div className="absolute -inset-3 cursor-pointer" onMouseDown={() => setIsDragging('max')} onTouchStart={() => setIsDragging('max')} data-oid="051j9u8"></div>
          </div>
        </div>
        
        {/* Min-max guides */}
        <div className="flex justify-between mt-2" data-oid="ocxcapf">
          <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="icxp88_">{formatDisplayValue(min)}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400" data-oid=":ppnfva">{formatDisplayValue(max)}</span>
        </div>
      </div>
      
      {/* Reset button */}
      {(localRange[0] > min || localRange[1] < max) &&
      <button
        onClick={() => {
          const defaultRange: [number, number] = [min, max];
          setLocalRange(defaultRange);
          updateFilter(filterType, defaultRange);
          setActiveDropdown(null);
        }}
        className="w-full p-2 text-xs font-medium text-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300" data-oid="xzs0xi:">

          Reset to Default
        </button>
      }
    </Dropdown>);

}