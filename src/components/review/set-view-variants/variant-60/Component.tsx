'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { ParallelCoordinatesView } from '../ParallelCoordinatesView'

const Component: React.FC<SetViewProps> = (props) => {
  return <ParallelCoordinatesView {...props} />
}

export default Component