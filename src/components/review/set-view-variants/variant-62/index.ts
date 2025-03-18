'use client'

import { CorrelationMatrixView } from '../CorrelationMatrixView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 62,
  name: 'Correlation Matrix View',
  description: 'A grid-based visualization that highlights relationships and patterns between different practice set performance metrics',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default CorrelationMatrixView
