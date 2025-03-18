'use client'

import { SunburstChartView } from '../SunburstChartView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 59,
  name: 'Sunburst Chart View',
  description: 'A hierarchical radial visualization that represents practice sets in concentric rings showing relationships between subjects, types, and performance',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default SunburstChartView
