'use client'

import { RenaissanceCodexTimeline } from '../RenaissanceCodexTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 24,
  name: 'Renaissance Codex Timeline',
  description: 'A timeline visualization inspired by Renaissance-era manuscripts and codices with illuminated pages',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default RenaissanceCodexTimeline
