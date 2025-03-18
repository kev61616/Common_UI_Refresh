'use client'

import { registerView } from '../../registry/viewRegistry'
import { AlchemyLaboratoryView } from '../AlchemyLaboratoryView'

// Register this view with metadata
registerView({
  id: 37,
  name: 'Alchemy Laboratory View',
  description: "Medieval alchemist's workshop with practice sets represented as potions, scrolls and experimental apparatus",
  category: 'set',
  tags: ['medieval', 'alchemy', 'potions', 'scrolls', 'mystical'],
  isExperimental: false
})

// Export the component as default
export default AlchemyLaboratoryView
