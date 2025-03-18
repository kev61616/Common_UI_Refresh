'use client'

import { EvolutionaryTreeTimeline } from '../EvolutionaryTreeTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 23,
  name: 'Evolutionary Tree Timeline',
  description: 'Visualizes learning sessions as branches of an evolutionary tree with branching patterns showing knowledge evolution',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default EvolutionaryTreeTimeline
