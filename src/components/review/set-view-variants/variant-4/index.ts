'use client'

import { ListView4 } from '../../ListView4'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 4,
  name: 'Masonry Grid View',
  description: 'Responsive masonry layout that arranges practice sets in a visually pleasing grid with varying heights',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default ListView4
