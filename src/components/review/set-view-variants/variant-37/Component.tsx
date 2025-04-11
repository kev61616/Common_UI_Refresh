'use client';

import React from 'react';
import { AlchemyLaboratoryView } from '../AlchemyLaboratoryView';
import { SetViewProps } from '../types';

const Component: React.FC<SetViewProps> = (props) => {
  return <AlchemyLaboratoryView {...props} data-oid="z-5qowe" />;
};

export default Component;