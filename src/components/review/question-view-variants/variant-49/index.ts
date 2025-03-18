'use client'

import { ArchitecturalBlueprintView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 49,
  name: 'Architectural Blueprint',
  description: 'Technical drawing style with topics visualized as rooms and structures in a blueprint layout',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default ArchitecturalBlueprintView
