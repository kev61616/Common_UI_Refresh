'use client'

import { ChessStrategyBoardView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 68,
  name: 'Chess Strategy Board',
  description: 'Game board visualization with chess pieces representing mastery levels and strategic positions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default ChessStrategyBoardView
