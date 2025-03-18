'use client'

import React from 'react'
import { MedievalManuscriptView } from '../MedievalManuscriptView'
import { SetViewProps } from '../types'

const Component: React.FC<SetViewProps> = (props) => {
  return <MedievalManuscriptView {...props} />
}

export default Component