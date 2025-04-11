import { DarkMode, Gradient, LightMode } from '@/components/Icon';

export function InstallationIcon({
  id,
  color



}: {id: string;color?: React.ComponentProps<typeof Gradient>['color'];}) {
  return (
    <>
      <defs data-oid="d8lldix">
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 12 3)" data-oid="1.02m2t" />

        <Gradient
          id={`${id}-gradient-dark`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 16 7)" data-oid=".p94xor" />

      </defs>
      <LightMode data-oid="wf.xvmv">
        <circle cx={12} cy={12} r={12} fill={`url(#${id}-gradient)`} data-oid="6kz1vfa" />
        <path
          d="m8 8 9 21 2-10 10-2L8 8Z"
          fillOpacity={0.5}
          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round" data-oid="iwuyd2a" />

      </LightMode>
      <DarkMode data-oid="3p8:.gf">
        <path
          d="m4 4 10.286 24 2.285-11.429L28 14.286 4 4Z"
          fill={`url(#${id}-gradient-dark)`}
          stroke={`url(#${id}-gradient-dark)`}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round" data-oid="c4:3g4z" />

      </DarkMode>
    </>);

}