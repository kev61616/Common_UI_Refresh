'use client'

import { MilestoneTimeline } from '../MilestoneTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 18,
  name: 'Milestone Timeline',
  description: 'Timeline highlighting key milestones and achievements along the learning journey',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default MilestoneTimeline
