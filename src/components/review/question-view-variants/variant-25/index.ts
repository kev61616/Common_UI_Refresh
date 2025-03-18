'use client'

import { QuestionJourneyView } from '../QuestionJourneyView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 25,
  name: 'Question Journey',
  description: 'Question Journey visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default QuestionJourneyView
