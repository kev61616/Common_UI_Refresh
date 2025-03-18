'use client'

import { QuestionView } from '../../QuestionView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 1,
  name: 'Standard Question View',
  description: 'Classic view grouping questions by subject and topic with statistics and filtering options',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default QuestionView
