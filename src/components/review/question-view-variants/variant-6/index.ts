'use client'

import { BookshelfView } from '../BookshelfView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 6,
  name: 'Bookshelf',
  description: 'Bookshelf visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default BookshelfView
