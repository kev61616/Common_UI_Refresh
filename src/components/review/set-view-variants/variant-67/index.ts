'use client'

import { SetView } from '../SetView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 67,
  name: 'Timeline Inspired View',
  description: 'Table-based visualization of practice sets with detailed metrics and interactive elements',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default SetView
