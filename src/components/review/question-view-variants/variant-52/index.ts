'use client'

import { QuantumKnowledgeFieldView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 52,
  name: 'Quantum Knowledge Field',
  description: 'Particle-physics inspired visualization with topics as quantum fields and questions as particles',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default QuantumKnowledgeFieldView
