'use client'

import { registerView } from '../../registry/viewRegistry'
import { ParticleFlowView } from '../ParticleFlowView'

// Register this view with metadata
registerView({
  id: 31,
  name: 'Particle Flow View',
  description: 'Dynamic particle visualization representing practice sets as flowing particles that interact and respond to selection',
  category: 'set',
  tags: ['physics', 'dynamic', 'interactive', 'particles', 'flow'],
  isExperimental: false
})

// Export the component as default
export default ParticleFlowView
