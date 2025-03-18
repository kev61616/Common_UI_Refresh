'use client'

import { ArchitecturalFacadeGridView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 65,
  name: 'Architectural Facade Grid',
  description: 'Building facade with windows lighting up based on performance across different knowledge areas',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default ArchitecturalFacadeGridView
