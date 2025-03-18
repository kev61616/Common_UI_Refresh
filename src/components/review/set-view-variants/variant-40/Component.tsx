'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { ZodiacConstellationView } from '../ZodiacConstellationView'

const Component: React.FC<SetViewProps> = (props) => {
  return <ZodiacConstellationView {...props} />
}

export default Component