'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { NeuralNetworkView } from '../NeuralNetworkView'

const Component: React.FC<SetViewProps> = (props) => {
  return <NeuralNetworkView {...props} />
}

export default Component