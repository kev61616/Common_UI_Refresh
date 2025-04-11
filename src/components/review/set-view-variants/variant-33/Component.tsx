'use client';

import React from 'react';
import { TapestryWeaveView } from '../TapestryWeaveView';
import { SetViewProps } from '../types';

const Component: React.FC<SetViewProps> = (props) => {
  return <TapestryWeaveView {...props} data-oid="onq4:.7" />;
};

export default Component;