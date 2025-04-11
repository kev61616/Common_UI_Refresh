'use client';

import React from 'react';
import { SetViewProps } from '../types';
import { VoronoiTreemapView } from '../VoronoiTreemapView';

const Component: React.FC<SetViewProps> = (props) => {
  return <VoronoiTreemapView {...props} data-oid="kyir::t" />;
};

export default Component;