'use client';

import React from 'react';
import { AntiqueMapView } from '../AntiqueMapView';
import { SetViewProps } from '../types';

const Component: React.FC<SetViewProps> = (props) => {
  return <AntiqueMapView {...props} data-oid="dxvs__i" />;
};

export default Component;