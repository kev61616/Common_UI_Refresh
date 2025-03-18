'use client'

import React from 'react'
import { ArtStudioGalleryView } from '../ArtStudioGalleryView'
import { SetViewProps } from '../types'

const Component: React.FC<SetViewProps> = (props) => {
  return <ArtStudioGalleryView {...props} />
}

export default Component