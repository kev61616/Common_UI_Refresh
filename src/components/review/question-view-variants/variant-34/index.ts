'use client'

import { SteampunkMachineryView } from '../SteampunkMachineryView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 34,
  name: 'Steampunk Machinery',
  description: 'Steampunk Machinery visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default SteampunkMachineryView
