'use client'

import { NeonArcadeView } from '../NeonArcadeView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 12,
  name: 'Neon Arcade View',
  description: 'Retro arcade-themed visualization of practice sets with neon aesthetics and 80s-inspired styling',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default NeonArcadeView
