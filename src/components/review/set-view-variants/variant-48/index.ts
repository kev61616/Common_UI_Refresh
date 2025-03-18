'use client'

import { AcousticFrequencyView } from '../AcousticFrequencyView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 48,
  name: 'Acoustic Frequency View',
  description: 'Visualization that represents practice sets as sound waves and frequency spectrums',
  category: 'set',
  tags: ['audio', 'sound', 'frequency', 'waves'],
  isExperimental: false
})

// Export the component as default
export default AcousticFrequencyView
