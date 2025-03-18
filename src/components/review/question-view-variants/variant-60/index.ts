'use client'

import { MicroscopicCellView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 60,
  name: 'Microscopic Cell View',
  description: 'Cellular/microscopic styling with cell density and activity indicating mastery and knowledge growth',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default MicroscopicCellView
