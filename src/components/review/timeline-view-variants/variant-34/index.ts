'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 34,
  name: 'Vinyl Record Timeline',
  description: 'A musical visualization that represents practice sessions as tracks on vinyl records grouped by month. Features animated turntable mechanics, interactive album selection, stylus tracking, and detailed performance analytics styled as album liner notes.',
  category: 'timeline',
  tags: ['music', 'vinyl', 'retro', 'animated', 'interactive'],
  isExperimental: false
})

// Export the component as default
export default Component
