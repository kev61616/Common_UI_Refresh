'use client'

import { TextilePatternGridView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 69,
  name: 'Textile Pattern Grid',
  description: 'Woven fabric-like visualization with different weave patterns indicating question performance',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default TextilePatternGridView
