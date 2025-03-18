'use client'

import { ParticlePhysicsTimeline } from '../ParticlePhysicsTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 30,
  name: 'Particle Physics Timeline',
  description: 'A physics-inspired timeline visualization with particle animations, force fields, and quantum mechanics themed representation of learning sessions',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default ParticlePhysicsTimeline
