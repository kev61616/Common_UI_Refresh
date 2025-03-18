'use client'

import { PeriodicTableView } from '../PeriodicTableView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 22,
  name: 'Periodic Table',
  description: 'Periodic Table visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default PeriodicTableView
