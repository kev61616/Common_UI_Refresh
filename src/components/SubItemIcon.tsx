import React from 'react';

type SubItemIconProps = {
  className?: string;
};

export function SubItemIcon({ className = '' }: SubItemIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} data-oid="14axegv">

      <circle cx="7" cy="7" r="3" fill="currentColor" data-oid="mh:60u5" />
    </svg>);

}