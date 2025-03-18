'use client'

import { DiagnosticDashboardView } from '../DiagnosticDashboardView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 12,
  name: 'Diagnostic Dashboard',
  description: 'Diagnostic Dashboard visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default DiagnosticDashboardView
