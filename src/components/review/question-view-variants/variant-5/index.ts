'use client'

import { AncientScrollView } from '../AncientScrollView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 5,
  name: 'Ancient Scroll',
  description: 'Ancient Scroll visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default AncientScrollView
