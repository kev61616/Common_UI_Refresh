'use client'

import { CardFlipView } from '../CardFlipView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 11,
  name: '3D Card Flip View',
  description: 'Interactive 3D flipping cards for practice sets',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default CardFlipView
