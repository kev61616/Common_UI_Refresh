'use client'

import { ListView3 } from '../../ListView3'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 3,
  name: 'Timeline Inspired View',
  description: 'Horizontal timeline-like view showing sets in order of completion with progress indicators',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default ListView3
