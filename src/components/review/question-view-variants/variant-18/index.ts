'use client'

import { InfographicDashboardView } from '../InfographicDashboardView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 18,
  name: 'Infographic Dashboard',
  description: 'Infographic Dashboard visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default InfographicDashboardView
