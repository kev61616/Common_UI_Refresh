'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 40,
  name: 'Zodiac Constellation View',
  description: 'A celestial visualization representing practice sets as star constellations grouped by zodiac signs.',
  category: 'set',
  isExperimental: false
})

export default Component
