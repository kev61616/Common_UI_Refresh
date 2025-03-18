'use client'

import { AccordionCategoryView } from '../AccordionCategoryView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 4,
  name: 'Accordion Category',
  description: 'Accordion Category visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default AccordionCategoryView
