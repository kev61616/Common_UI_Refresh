'use client'

import { HistoricalDynastyTimeline } from '../HistoricalDynastyTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 22,
  name: 'Historical Dynasty Timeline',
  description: 'Visualizes study sessions as historical dynasties, with each subject as a major dynasty/era',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default HistoricalDynastyTimeline
