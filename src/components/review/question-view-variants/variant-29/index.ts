'use client'

import { RadialBarView } from '../RadialBarView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 29,
  name: 'Radial Bar',
  description: 'Radial Bar visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default RadialBarView
