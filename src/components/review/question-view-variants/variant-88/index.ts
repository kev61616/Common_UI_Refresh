'use client'

import { AutumnLeavesTagCloudView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 88,
  name: 'Autumn Leaves Tag Cloud',
  description: 'Seasonal tag visualization with falling autumn leaves containing knowledge elements',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default AutumnLeavesTagCloudView
