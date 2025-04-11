'use client';

import { NetworkGraphView } from '../NetworkGraphView';
import { SetViewProps } from '../types';

export default function Component(props: SetViewProps) {
  return <NetworkGraphView {...props} data-oid="386btma" />;
}