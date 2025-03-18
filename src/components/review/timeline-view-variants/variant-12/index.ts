'use client'

import { AchievementTimeline } from '../AchievementTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 12,
  name: 'Achievement Timeline',
  description: 'Timeline highlighting major achievements and milestones in the learning journey',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default AchievementTimeline
