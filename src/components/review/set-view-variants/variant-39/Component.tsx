'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { PuzzleBoxView } from '../PuzzleBoxView'

const Component: React.FC<SetViewProps> = (props) => {
  return <PuzzleBoxView {...props} />
}

export default Component