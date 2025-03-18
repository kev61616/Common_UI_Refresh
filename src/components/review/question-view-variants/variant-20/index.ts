'use client'

import { MatrixGridView } from '../MatrixGridView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 20,
  name: 'Matrix Grid',
  description: 'Matrix Grid visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default MatrixGridView
