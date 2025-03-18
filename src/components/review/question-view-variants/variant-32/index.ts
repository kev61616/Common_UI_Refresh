'use client'

import { SpiderChartView } from '../SpiderChartView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 32,
  name: 'Spider Chart',
  description: 'Spider Chart visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default SpiderChartView
