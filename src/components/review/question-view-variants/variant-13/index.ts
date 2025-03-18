'use client'

import { FilmStripView } from '../FilmStripView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 13,
  name: 'Film Strip',
  description: 'Film Strip visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default FilmStripView
