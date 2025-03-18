'use client'

import { QuantumPhysicsView } from '../QuantumPhysicsView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 55,
  name: 'Quantum Physics View',
  description: 'A quantum physics-inspired visualization that represents practice sets as quantum particles with probability fields and wave-particle duality',
  category: 'set',
  tags: ['scientific', 'interactive', 'physics', 'particles'],
  isExperimental: false
})

// Export the component as default
export default QuantumPhysicsView
