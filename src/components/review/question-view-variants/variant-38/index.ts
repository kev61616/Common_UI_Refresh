'use client'

import { UrbanBlueprintView } from '../UrbanBlueprintView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 38,
  name: 'Urban Blueprint',
  description: 'Urban Blueprint visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default UrbanBlueprintView
