'use client'

import { VintageBotanicalView } from '../VintageBotanicalView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 39,
  name: 'Vintage Botanical',
  description: 'Vintage Botanical visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default VintageBotanicalView
