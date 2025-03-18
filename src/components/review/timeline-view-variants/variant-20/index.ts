'use client'

import { StreamGraph } from '../StreamGraph'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 20,
  name: 'Stream Graph',
  description: 'Flowing, area-based timeline showing volume and changes across time periods',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default StreamGraph
