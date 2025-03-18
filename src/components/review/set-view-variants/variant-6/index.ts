'use client'

import { KanbanView } from '../KanbanView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 6,
  name: 'Kanban Board View',
  description: 'Organizes practice sets in a Kanban-style board with customizable columns for different stages of learning progress',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default KanbanView
