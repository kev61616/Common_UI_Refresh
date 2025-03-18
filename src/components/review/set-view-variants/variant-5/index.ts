'use client'

import { CalendarView } from '../CalendarView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 5,
  name: 'Calendar View',
  description: 'Visualizes practice sets in a calendar layout, showing progress and activity over time with heatmap-style intensity indicators',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default CalendarView
