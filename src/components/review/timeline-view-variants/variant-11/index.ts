'use client'

import { TimelineCalendar } from '../TimelineCalendar'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 11,
  name: 'Timeline Calendar',
  description: 'Calendar-based visualization of sets and activities organized by date',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default TimelineCalendar
