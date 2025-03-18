'use client'

import { MasteryPathView } from '../MasteryPathView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 19,
  name: 'Mastery Path',
  description: 'Mastery Path visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default MasteryPathView
