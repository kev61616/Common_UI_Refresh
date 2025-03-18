'use client'

import { SolarSystemView } from '../SolarSystemView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 31,
  name: 'Solar System',
  description: 'Solar System visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default SolarSystemView
