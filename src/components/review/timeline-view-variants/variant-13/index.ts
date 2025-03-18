'use client'

import { SubjectColorCodedTimeline } from '../SubjectColorCodedTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 13,
  name: 'Subject Color Coded Timeline',
  description: 'Timeline with color-coding by subject area for easy visual filtering',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default SubjectColorCodedTimeline
