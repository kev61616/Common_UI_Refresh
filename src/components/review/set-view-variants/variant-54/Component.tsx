'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { DataDashboardView } from '../DataDashboardView'

const Component: React.FC<SetViewProps> = (props) => {
  return <DataDashboardView {...props} />
}

export default Component