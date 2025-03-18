'use client'

import { PolarGridView } from '../PolarGridView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 23,
  name: 'Polar Grid',
  description: 'Polar Grid visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default PolarGridView
