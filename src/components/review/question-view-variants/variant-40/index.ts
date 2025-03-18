'use client'

import { WaffleChartView } from '../WaffleChartView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 40,
  name: 'Waffle Chart',
  description: 'Waffle Chart visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default WaffleChartView
