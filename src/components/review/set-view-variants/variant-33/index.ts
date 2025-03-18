'use client'

import { registerView } from '../../registry/viewRegistry'
import { TapestryWeaveView } from '../TapestryWeaveView'

// Register this view with metadata
registerView({
  id: 33,
  name: 'Tapestry Weave View',
  description: 'Medieval tapestry-inspired visualization representing practice sets as woven textile patterns with intricate thread details',
  category: 'set',
  tags: ['artistic', 'historical', 'textile', 'pattern', 'weaving'],
  isExperimental: false
})

// Export the component as default
export default TapestryWeaveView
