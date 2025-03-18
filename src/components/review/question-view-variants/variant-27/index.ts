'use client'

import { QuestionStackView } from '../QuestionStackView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 27,
  name: 'Question Stack',
  description: 'Question Stack visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default QuestionStackView
