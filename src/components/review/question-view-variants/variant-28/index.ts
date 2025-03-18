'use client'

import { QuestionTimelineView } from '../QuestionTimelineView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 28,
  name: 'Question Timeline',
  description: 'Question Timeline visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default QuestionTimelineView
