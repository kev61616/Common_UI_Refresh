'use client';

import React from 'react';
import { SetViewProps } from '../types';
import { PuzzleBoxView } from '../PuzzleBoxView';

const Component: React.FC<SetViewProps> = (props) => {
  return <PuzzleBoxView {...props} data-oid="dq:5bdq" />;
};

export default Component;