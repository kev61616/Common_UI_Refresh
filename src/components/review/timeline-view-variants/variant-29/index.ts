'use client'

import { DnaSequenceTimeline } from '../DnaSequenceTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 29,
  name: 'DNA Sequence Timeline',
  description: 'A timeline visualization representing learning activity as a DNA strand with base pairs for sessions and molecular biology-inspired design',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default DnaSequenceTimeline
