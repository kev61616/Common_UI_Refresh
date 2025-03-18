'use client'

import { QuestionNetworkView } from '../QuestionNetworkView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 26,
  name: 'Question Network',
  description: 'Question Network visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default QuestionNetworkView
