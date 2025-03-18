'use client'

import { ListView2 } from '../../ListView2'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 2,
  name: 'Compact Table View',
  description: 'Dense tabular view optimized for showing many sets at once with sortable columns',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default ListView2
