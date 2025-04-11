import { DarkMode, Gradient, LightMode } from '@/components/Icon';

export function PluginsIcon({
  id,
  color



}: {id: string;color?: React.ComponentProps<typeof Gradient>['color'];}) {
  return (
    <>
      <defs data-oid="vbaxeeq">
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 20 11)" data-oid="et-m6v-" />

        <Gradient
          id={`${id}-gradient-dark-1`}
          color={color}
          gradientTransform="matrix(0 22.75 -22.75 0 16 6.25)" data-oid="i.o0:_o" />

        <Gradient
          id={`${id}-gradient-dark-2`}
          color={color}
          gradientTransform="matrix(0 14 -14 0 16 10)" data-oid="0zo7:b:" />

      </defs>
      <LightMode data-oid="00gddsf">
        <circle cx={20} cy={20} r={12} fill={`url(#${id}-gradient)`} data-oid="omoq7ah" />
        <g
          fillOpacity={0.5}
          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round" data-oid="x6l5fil">

          <path d="M3 9v14l12 6V15L3 9Z" data-oid="nz_71xb" />
          <path d="M27 9v14l-12 6V15l12-6Z" data-oid=".uo2hrb" />
        </g>
        <path
          d="M11 4h8v2l6 3-10 6L5 9l6-3V4Z"
          fillOpacity={0.5}
          className="fill-[var(--icon-background)]" data-oid="ru07e7-" />

        <g
          className="stroke-[color:var(--icon-foreground)]"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round" data-oid="gspt.pr">

          <path d="M20 5.5 27 9l-12 6L3 9l7-3.5" data-oid="g6gq:ef" />
          <path d="M20 5c0 1.105-2.239 2-5 2s-5-.895-5-2m10 0c0-1.105-2.239-2-5-2s-5 .895-5 2m10 0v3c0 1.105-2.239 2-5 2s-5-.895-5-2V5" data-oid="5jej7cx" />
        </g>
      </LightMode>
      <DarkMode strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-oid="32xg6qv">
        <path
          d="M17.676 3.38a3.887 3.887 0 0 0-3.352 0l-9 4.288C3.907 8.342 3 9.806 3 11.416v9.168c0 1.61.907 3.073 2.324 3.748l9 4.288a3.887 3.887 0 0 0 3.352 0l9-4.288C28.093 23.657 29 22.194 29 20.584v-9.168c0-1.61-.907-3.074-2.324-3.748l-9-4.288Z"
          stroke={`url(#${id}-gradient-dark-1)`} data-oid="sn2mye0" />

        <path
          d="M16.406 8.087a.989.989 0 0 0-.812 0l-7 3.598A1.012 1.012 0 0 0 8 12.61v6.78c0 .4.233.762.594.925l7 3.598a.989.989 0 0 0 .812 0l7-3.598c.361-.163.594-.525.594-.925v-6.78c0-.4-.233-.762-.594-.925l-7-3.598Z"
          fill={`url(#${id}-gradient-dark-2)`}
          stroke={`url(#${id}-gradient-dark-2)`} data-oid="j7.avc." />

      </DarkMode>
    </>);

}