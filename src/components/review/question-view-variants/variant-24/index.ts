'use client'

import { QuestionGalaxyView } from '../QuestionGalaxyView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 24,
  name: 'Question Galaxy',
  description: 'Question Galaxy visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default QuestionGalaxyView
