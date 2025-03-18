'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { CircuitSimulationView } from '../CircuitSimulationView'

const Component: React.FC<SetViewProps> = (props) => {
  return <CircuitSimulationView {...props} />
}

export default Component