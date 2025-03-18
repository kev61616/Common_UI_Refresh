'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 22,
  name: 'Coral Reef Ecosystem View',
  description: 'An underwater-themed visualization that represents practice sets as coral formations in a vibrant reef ecosystem',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
