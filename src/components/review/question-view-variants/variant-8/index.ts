'use client'

import { BubblePackView } from '../BubblePackView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 8,
  name: 'Bubble Pack',
  description: 'Bubble Pack visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default BubblePackView
