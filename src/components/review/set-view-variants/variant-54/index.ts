'use client'

import Component from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 54,
  name: 'Data Dashboard View',
  description: 'A comprehensive analytics dashboard representing practice sets with interactive interface',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default Component
