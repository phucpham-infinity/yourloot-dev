import { SVGProps } from 'react'
const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12H20"
      stroke="url(#paint0_radial_10469_48661)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 4V20"
      stroke="url(#paint1_radial_10469_48661)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <radialGradient
        id="paint0_radial_10469_48661"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-1.5926 2.65184 -14.1768 -0.543477 13.5926 10.8126)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43F45E" />
        <stop offset={1} stopColor="#107A27" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_10469_48661"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-0.0995373 42.4294 -0.886051 -8.69564 12.5995 -14.9987)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43F45E" />
        <stop offset={1} stopColor="#107A27" />
      </radialGradient>
    </defs>
  </svg>
)

export default PlusIcon
