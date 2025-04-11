'use client';

import { CalendarHeatmapView } from '../CalendarHeatmapView';
import { SetViewProps } from '../types';

export default function Component(props: SetViewProps) {
  return <CalendarHeatmapView {...props} data-oid="h3.w-hc" />;
}