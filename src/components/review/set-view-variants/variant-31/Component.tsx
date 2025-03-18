'use client'

import React from 'react'
import { ParticleFlowView } from '../ParticleFlowView'
import { SetViewProps } from '../types'

const Component: React.FC<SetViewProps> = (props) => {
  return <ParticleFlowView {...props} />
}

export default Component