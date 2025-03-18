'use client'

import { AncientCivilizationView } from '../AncientCivilizationView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 58,
  name: 'Ancient Civilization View',
  description: 'A historical visualization representing practice sets as structures and achievements from ancient civilizations, mapping performance to cultural development stages',
  category: 'set',
  tags: ['historical', 'architectural', 'cultural', 'educational', 'interactive'],
  isExperimental: false
})

// Export the component as default
export default AncientCivilizationView
