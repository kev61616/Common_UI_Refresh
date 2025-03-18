'use client'

import { CelestialObservatoryView } from '../CelestialObservatoryView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 56,
  name: 'Celestial Observatory View',
  description: 'An astronomical visualization representing practice sets as celestial bodies observed through different observatory instruments, complete with telescopic views and celestial charts',
  category: 'set',
  tags: ['astronomy', 'interactive', 'scientific', 'observational', 'space'],
  isExperimental: false
})

// Export the component as default
export default CelestialObservatoryView
