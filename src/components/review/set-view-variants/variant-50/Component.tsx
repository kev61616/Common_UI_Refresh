'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { DigitalBiomeView } from '../DigitalBiomeView'

const Component: React.FC<SetViewProps> = (props) => {
  return <DigitalBiomeView {...props} />
}

export default Component