'use client'

import { BubbleGridView } from '../BubbleGridView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 7,
  name: 'Bubble Grid',
  description: 'Bubble Grid visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default BubbleGridView
