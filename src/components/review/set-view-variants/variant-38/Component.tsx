'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { TimeCapsuleView } from '../TimeCapsuleView'

const Component: React.FC<SetViewProps> = (props) => {
  return <TimeCapsuleView {...props} />
}

export default Component