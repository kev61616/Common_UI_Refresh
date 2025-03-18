'use client'

import { NeonCyberpunkTimeline } from '../NeonCyberpunkTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 26,
  name: 'Neon Cyberpunk Timeline',
  description: 'A futuristic cyberpunk-themed timeline with neon colors, tech-inspired elements, and a digital aesthetic',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default NeonCyberpunkTimeline
