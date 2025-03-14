import React from 'react'
import { Gradient, DarkMode, LightMode } from '@/components/Icon'

export function OverviewIcon({ id, color }: { id: string; color: 'blue' | 'amber' }) {
  return (
    <>
      <defs>
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 12 3)"
        />
        <Gradient
          id={`${id}-gradient-dark`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 16 7)"
        />
      </defs>
      <LightMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient)`} />
        <path
          d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6zm0 18a8 8 0 110-16 8 8 0 010 16zm0-14a1 1 0 00-1 1v5a1 1 0 102 0v-5a1 1 0 00-1-1zm0 10a1 1 0 100-2 1 1 0 000 2z"
          fill={`url(#${id}-gradient)`}
          fillOpacity={0.2}
        />
      </LightMode>
      <DarkMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient-dark)`} />
        <path
          d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6zm0 18a8 8 0 110-16 8 8 0 010 16zm0-14a1 1 0 00-1 1v5a1 1 0 102 0v-5a1 1 0 00-1-1zm0 10a1 1 0 100-2 1 1 0 000 2z"
          fill={`url(#${id}-gradient-dark)`}
          fillOpacity={0.2}
        />
      </DarkMode>
    </>
  )
}

export function SubjectsIcon({ id, color }: { id: string; color: 'blue' | 'amber' }) {
  return (
    <>
      <defs>
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 12 3)"
        />
        <Gradient
          id={`${id}-gradient-dark`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 16 7)"
        />
      </defs>
      <LightMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient)`} />
        <path
          d="M8 9h2v10H8V9zm7 0h2v10h-2V9zm7 0h2v10h-2V9z"
          fill={`url(#${id}-gradient)`}
          fillOpacity={0.2}
        />
      </LightMode>
      <DarkMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient-dark)`} />
        <path
          d="M8 9h2v10H8V9zm7 0h2v10h-2V9zm7 0h2v10h-2V9z"
          fill={`url(#${id}-gradient-dark)`}
          fillOpacity={0.2}
        />
      </DarkMode>
    </>
  )
}

export function TestIcon({ id, color }: { id: string; color: 'blue' | 'amber' }) {
  return (
    <>
      <defs>
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 12 3)"
        />
        <Gradient
          id={`${id}-gradient-dark`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 16 7)"
        />
      </defs>
      <LightMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient)`} />
        <path
          d="M9 9.5h14v2H9v-2zm0 5h14v2H9v-2zm0 5h14v2H9v-2z"
          fill={`url(#${id}-gradient)`}
          fillOpacity={0.2}
        />
      </LightMode>
      <DarkMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient-dark)`} />
        <path
          d="M9 9.5h14v2H9v-2zm0 5h14v2H9v-2zm0 5h14v2H9v-2z"
          fill={`url(#${id}-gradient-dark)`}
          fillOpacity={0.2}
        />
      </DarkMode>
    </>
  )
}

export function ReviewIcon({ id, color }: { id: string; color: 'blue' | 'amber' }) {
  return (
    <>
      <defs>
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 12 3)"
        />
        <Gradient
          id={`${id}-gradient-dark`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 16 7)"
        />
      </defs>
      <LightMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient)`} />
        <path
          d="M16.71 9.29A1.003 1.003 0 0016 9h-2a1 1 0 00-.71.29l-5 5a1.003 1.003 0 000 1.42l5 5a1 1 0 00.71.29h2a1 1 0 00.71-.29l5-5a1.003 1.003 0 000-1.42l-5-5z"
          fill={`url(#${id}-gradient)`}
          fillOpacity={0.2}
        />
      </LightMode>
      <DarkMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient-dark)`} />
        <path
          d="M16.71 9.29A1.003 1.003 0 0016 9h-2a1 1 0 00-.71.29l-5 5a1.003 1.003 0 000 1.42l5 5a1 1 0 00.71.29h2a1 1 0 00.71-.29l5-5a1.003 1.003 0 000-1.42l-5-5z"
          fill={`url(#${id}-gradient-dark)`}
          fillOpacity={0.2}
        />
      </DarkMode>
    </>
  )
}

export function CourseIcon({ id, color }: { id: string; color: 'blue' | 'amber' }) {
  return (
    <>
      <defs>
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 12 3)"
        />
        <Gradient
          id={`${id}-gradient-dark`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 16 7)"
        />
      </defs>
      <LightMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient)`} />
        <path
          d="M16 7l-8 4v2h16v-2l-8-4zm7 8H9v3a7 7 0 1014 0v-3z"
          fill={`url(#${id}-gradient)`}
          fillOpacity={0.2}
        />
      </LightMode>
      <DarkMode>
        <circle cx={16} cy={15} r={12} fill={`url(#${id}-gradient-dark)`} />
        <path
          d="M16 7l-8 4v2h16v-2l-8-4zm7 8H9v3a7 7 0 1014 0v-3z"
          fill={`url(#${id}-gradient-dark)`}
          fillOpacity={0.2}
        />
      </DarkMode>
    </>
  )
}
