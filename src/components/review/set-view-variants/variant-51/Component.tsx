'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { VirtualRealityGalleryView } from '../VirtualRealityGalleryView'

const Component: React.FC<SetViewProps> = (props) => {
  return <VirtualRealityGalleryView {...props} />
}

export default Component