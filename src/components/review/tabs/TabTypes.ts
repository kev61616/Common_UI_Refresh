/**
 * Common types for tab components
 */

export interface TabProps {
  tabLabels: string[]
  activeTab: number
  onTabChange: (tabIndex: number) => void
  className?: string
}

export interface DemoTabProps extends TabProps {
  selectedTab: number
  onSelectTab: (tabIndex: number) => void
}
