'use client'

import { CircuitBoardView } from '../CircuitBoardView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 10,
  name: 'Circuit Board',
  description: 'Circuit Board visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default CircuitBoardView
