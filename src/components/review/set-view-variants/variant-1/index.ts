'use client'

import { ListView } from '../../ListView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 1,
  name: 'Standard Cards View',
  description: 'Simple cards showing practice sets in a responsive grid layout',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default ListView
