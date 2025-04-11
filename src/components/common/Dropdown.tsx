'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center';
  className?: string;
  portalContainer?: HTMLElement | null;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  elevated?: boolean;
}

/**
 * Reusable dropdown component that renders content in a portal.
 * This ensures the dropdown can appear above all other content regardless of container constraints.
 * Uses Tailwind CSS classes for styling and custom-animations.css for animations.
 */
export function Dropdown({
  trigger,
  children,
  isOpen,
  onClose,
  placement = 'bottom-left',
  className = '',
  portalContainer = null,
  closeOnClickOutside = true,
  closeOnEsc = true,
  elevated = false
}: DropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  // Set mounted state to true on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate dropdown position based on trigger element position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const { top, left, width, height } = rect;

      let newTop = 0;
      let newLeft = 0;

      // Calculate position based on placement
      switch (placement) {
        case 'bottom-left':
          newTop = top + height + window.scrollY;
          newLeft = left + window.scrollX;
          break;
        case 'bottom-right':
          newTop = top + height + window.scrollY;
          newLeft = left + width - (dropdownRef.current?.offsetWidth || 0) + window.scrollX;
          break;
        case 'bottom-center':
          newTop = top + height + window.scrollY;
          newLeft = left + width / 2 - (dropdownRef.current?.offsetWidth || 0) / 2 + window.scrollX;
          break;
        case 'top-left':
          newTop = top - (dropdownRef.current?.offsetHeight || 0) + window.scrollY;
          newLeft = left + window.scrollX;
          break;
        case 'top-right':
          newTop = top - (dropdownRef.current?.offsetHeight || 0) + window.scrollY;
          newLeft = left + width - (dropdownRef.current?.offsetWidth || 0) + window.scrollX;
          break;
        case 'top-center':
          newTop = top - (dropdownRef.current?.offsetHeight || 0) + window.scrollY;
          newLeft = left + width / 2 - (dropdownRef.current?.offsetWidth || 0) / 2 + window.scrollX;
          break;
        default:
          newTop = top + height + window.scrollY;
          newLeft = left + window.scrollX;
      }

      setPosition({ top: newTop, left: newLeft });
    }
  }, [isOpen, placement]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    // Use mouseup instead of mousedown to ensure the click event 
    // on dropdown items is fully processed before potentially closing
    const handleClickOutside = (event: MouseEvent) => {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node))
      {
        onClose();
      }
    };

    // Small delay to ensure item click events are processed first
    const handleDelayedClickOutside = (event: MouseEvent) => {
      setTimeout(() => handleClickOutside(event), 10);
    };

    document.addEventListener('mouseup', handleDelayedClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleDelayedClickOutside);
    };
  }, [isOpen, onClose, closeOnClickOutside]);

  // Handle Escape key press
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Get the portal container
  const getPortalContainer = () => {
    if (portalContainer) return portalContainer;
    if (typeof document !== 'undefined') {
      // Create a portal container if it doesn't exist
      let container = document.getElementById('dropdown-portal-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'dropdown-portal-container';
        container.className = 'fixed left-0 top-0 w-full z-[10000] pointer-events-none';
        document.body.appendChild(container);
      }
      return container;
    }
    return null;
  };

  return (
    <>
      {/* Trigger element */}
      <div ref={triggerRef} className="relative" data-oid="lo796ax">
        {trigger}
      </div>
      
      {/* Dropdown portal */}
        {mounted && isOpen && createPortal(
        <div
          ref={dropdownRef}
          className={`
              absolute min-w-[10rem] py-2 my-2 
              bg-white dark:bg-slate-800/100
              border border-slate-200 dark:border-slate-700 
              rounded-lg text-left text-slate-700 dark:text-slate-200
              pointer-events-auto origin-top-left 
              ${elevated ? 'shadow-lg z-[9999]' : 'shadow-md z-[1000]'} 
              dropdown-enter 
              ${className}
            `}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`
          }} data-oid="41dd0lp">

            {children}
          </div>,
        getPortalContainer() as Element
      )}
    </>);

}