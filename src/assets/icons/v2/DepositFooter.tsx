import { SVGProps } from 'react'
const DepositFooterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.2653 8.84508V8.69716C16.2653 7.28811 15.0752 6.14551 13.6064 6.14551H10.9485C9.17445 6.14551 7.73633 7.52517 7.73633 9.22817C7.73731 10.9311 9.17544 12.3109 10.9485 12.3109H13.1797C14.8845 12.3109 16.2663 13.6374 16.2663 15.274C16.2663 16.9115 14.8845 18.2382 13.1797 18.2382H10.3963C8.92851 18.2371 7.7383 17.0946 7.7383 15.6846"
      stroke="url(#paint0_radial_10469_48662)"
      strokeWidth={1.79907}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.998 4V20.1197"
      stroke="url(#paint1_radial_10469_48662)"
      strokeWidth={1.79907}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <radialGradient
        id="paint0_radial_10469_48662"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-0.849049 32.0678 -7.55797 -6.57209 12.8504 -8.21355)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43F45E" />
        <stop offset={1} stopColor="#107A27" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_10469_48662"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-0.0995373 42.7468 -0.886051 -8.76069 12.5976 -15.1408)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#43F45E" />
        <stop offset={1} stopColor="#107A27" />
      </radialGradient>
    </defs>
  </svg>
)

export default DepositFooterIcon
