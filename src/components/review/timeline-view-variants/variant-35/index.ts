'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 35,
  name: 'Pinball Machine Timeline',
  description: 'An arcade-inspired visualization representing practice sessions as bumpers in a virtual pinball machine. Features animated ball physics, interactive bumpers, score tracking, and arcade-styled performance metrics with classic pinball aesthetics.',
  category: 'timeline',
  tags: ['arcade', 'interactive', 'game', 'animated', 'physics', 'retro'],
  isExperimental: false
})

// Export the component as default
export default Component
