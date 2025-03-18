'use client'

import { VennDiagramView } from '../VennDiagramView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 9,
  name: 'Venn Diagram View',
  description: 'Interactive Venn diagram showing overlapping concepts and question types with focus on relationships between topics',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default VennDiagramView
