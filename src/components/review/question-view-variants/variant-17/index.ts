'use client'

import { HistogramView } from '../HistogramView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 17,
  name: 'Histogram',
  description: 'Histogram visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default HistogramView
