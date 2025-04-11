'use client';

import React from 'react';
import { SetViewProps } from '../types';
import { CircuitSimulationView } from '../CircuitSimulationView';

const Component: React.FC<SetViewProps> = (props) => {
  return <CircuitSimulationView {...props} data-oid="uug1xug" />;
};

export default Component;