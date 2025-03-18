'use client'

import { ProgressPath } from '../ProgressPath'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 16,
  name: 'Progress Path',
  description: 'Journey-based timeline showing the learning path with progress indicators',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default ProgressPath
