'use client'

import { DigitalCircuitBoardView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 64,
  name: 'Digital Circuit Board',
  description: 'Electronic schematics visualization with connected components showing data flow between topics',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default DigitalCircuitBoardView
