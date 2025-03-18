'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 38,
  name: 'Tree Rings Timeline',
  description: 'A dendrological visualization that represents practice sessions as annual growth rings in a tree cross-section. Features concentric circular rings with varying patterns based on performance metrics, growth nodes indicating knowledge points, and detailed dendrochronological analysis with botanical terminology.',
  category: 'timeline',
  tags: ['botanical', 'natural', 'scientific', 'circular', 'growth', 'organic'],
  isExperimental: false
})

// Export the component as default
export default Component
