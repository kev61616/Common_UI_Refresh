'use client'

import React from 'react'
import { JazzCompositionView } from '../JazzCompositionView'
import { SetViewProps } from '../types'

const Component: React.FC<SetViewProps> = (props) => {
  return <JazzCompositionView {...props} />
}

export default Component