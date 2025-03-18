'use client'

import { FlowDiagram } from '../FlowDiagram'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 17,
  name: 'Flow Diagram',
  description: 'Timeline visualization showing the flow between activities and sets',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default FlowDiagram
