'use client'

import { ReactNode, useState, useEffect } from 'react' // Removed useRef
import { DashboardCardId, CardPriority, useDashboardLayout } from '@/contexts/DashboardLayoutContext'
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Button } from '@/components/catalyst/button' // Use Catalyst Button
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownLabel, DropdownDivider } from '@/components/catalyst/dropdown' // Use Catalyst Dropdown
import { ArrowUp, ArrowDown, MoreVertical, CircleDot, MinusCircle } from 'lucide-react' // Use Lucide icons

interface DashboardCardProps {
  id: DashboardCardId
  title: string
  children: ReactNode
  className?: string // Add back className
  icon?: ReactNode // Add back icon
}

export function DashboardCard({ id, title, children, className = '', icon }: DashboardCardProps) {
  const { moveCard, setPriority, getCardStyle } = useDashboardLayout()
  const [controlsVisible, setControlsVisible] = useState(false)
  // Removed menuOpen state and menuRef

  const styles = getCardStyle(id)

  // Removed click outside effect

  // To prevent hydration errors, only apply styles on the client side
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, []) // Remove extra closing brace here

  return (
    <div
      // Add bg-card and text-card-foreground for standard card styling
      className={`rounded-lg shadow-sm border border-border bg-card text-card-foreground overflow-hidden transition-all duration-300 ${className}`}
      style={isClient ? {
        order: styles.order,
        display: styles.display,
        opacity: styles.opacity,
        transform: styles.scale
      } : undefined}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
      suppressHydrationWarning
    >
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border flex justify-between items-center relative">
        {/* Use Catalyst Heading */}
        <Heading level={5} className="text-sm font-medium flex items-center truncate dark:text-white">
          {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
          <span className="truncate">{title}</span>
        </Heading>

        {/* Card Controls - Use Catalyst Buttons and Dropdown */}
        <div
          className={`flex items-center sm:space-x-1 sm:transition-opacity sm:duration-200 ${
            controlsVisible ? 'sm:opacity-100' : 'sm:opacity-0 opacity-100'
          }`}
        >
          {/* Move Up/Down buttons (Desktop only) */}
          <div className="sm:flex hidden">
            <Button plain onClick={() => moveCard(id, 'up')} aria-label="Move up">
              <ArrowUp className="size-4" />
            </Button>
            <Button plain onClick={() => moveCard(id, 'down')} aria-label="Move down">
              <ArrowDown className="size-4" />
            </Button>
          </div>

          {/* Priority Menu Dropdown */}
          <Dropdown>
            <DropdownButton plain aria-label="Priority options">
              <MoreVertical className="size-4" />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
              {/* Mobile-only move buttons */}
              <div className="sm:hidden px-3 py-1 flex justify-between border-b border-border">
                 <DropdownItem onClick={() => moveCard(id, 'up')} className="text-xs !p-0">
                   <ArrowUp className="size-3.5 mr-1" /> Move up
                 </DropdownItem>
                 <DropdownItem onClick={() => moveCard(id, 'down')} className="text-xs !p-0">
                   <ArrowDown className="size-3.5 mr-1" /> Move down
                 </DropdownItem>
              </div>
              <DropdownLabel className="sm:border-b border-border">Priority</DropdownLabel>
              <DropdownItem onClick={() => setPriority(id, 'high')}>
                <CircleDot className="size-2.5 mr-2 fill-green-500" /> High
              </DropdownItem>
              <DropdownItem onClick={() => setPriority(id, 'normal')}>
                <CircleDot className="size-2.5 mr-2 fill-blue-500" /> Normal
              </DropdownItem>
              <DropdownItem onClick={() => setPriority(id, 'low')}>
                <CircleDot className="size-2.5 mr-2 fill-slate-400" /> Low
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => setPriority(id, 'hidden')}>
                <MinusCircle className="size-4 mr-2" /> Hide
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> {/* Add missing closing Dropdown tag */}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4"> {/* Add padding for content area */}
        {children}
      </div>
    </div>
  )
}
