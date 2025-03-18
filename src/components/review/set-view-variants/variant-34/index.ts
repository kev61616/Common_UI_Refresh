'use client'

import { registerView } from '../../registry/viewRegistry'
import { AntiqueMapView } from '../AntiqueMapView'

// Register this view with metadata
registerView({
  id: 34,
  name: 'Antique Map View',
  description: 'Historical cartography-inspired visualization representing practice sets as territories on an antique hand-drawn map',
  category: 'set',
  tags: ['cartography', 'historical', 'geographic', 'exploration', 'territories'],
  isExperimental: false
})

// Export the component as default
export default AntiqueMapView
