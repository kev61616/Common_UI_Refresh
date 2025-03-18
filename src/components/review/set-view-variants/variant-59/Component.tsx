'use client'

import React from 'react'
import { SetViewProps } from '../types'
import { SunburstChartView } from '../SunburstChartView'

const Component: React.FC<SetViewProps> = (props) => {
  return <SunburstChartView {...props} />
}

export default Component