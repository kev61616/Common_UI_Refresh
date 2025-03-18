'use client'

import React from 'react'
import { FractalDimensionView } from '../FractalDimensionView'
import { SetViewProps } from '../types'

const Component: React.FC<SetViewProps> = (props) => {
  return <FractalDimensionView {...props} />
}

export default Component