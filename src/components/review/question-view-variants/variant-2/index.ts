'use client'

import { CardDeckView } from '../CardDeckView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 2,
  name: 'Card Deck View',
  description: 'Interactive card-based visualization that displays questions as a stack of cards you can flip through',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default CardDeckView
