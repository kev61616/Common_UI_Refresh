'use client'

import { GradientFlowView } from '../GradientFlowView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 14,
  name: 'Gradient Flow',
  description: 'Gradient Flow visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default GradientFlowView
