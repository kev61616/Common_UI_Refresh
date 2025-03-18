'use client'

import { ScatterPlotView } from '../ScatterPlotView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 30,
  name: 'Scatter Plot',
  description: 'Scatter Plot visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default ScatterPlotView
