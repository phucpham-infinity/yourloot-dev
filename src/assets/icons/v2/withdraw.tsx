import { SVGProps } from 'react'

const WithdrawIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    viewBox="0 0 27 27"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_di_7407_50725)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5 20C9.08125 20 5.5 16.4184 5.5 12C5.5 7.58156 9.08156 4 13.5 4C17.9184 4 21.5 7.58156 21.5 12C21.5 16.4184 17.9184 20 13.5 20ZM10.0638 11.2266C9.04688 11.2266 9.04688 12.7741 10.0638 12.7741H16.9359C17.9528 12.7741 17.9528 11.2266 16.9359 11.2266H10.0638Z"
        fill="url(#paint0_radial_7407_50725)"
      />
      <path
        d="M13.5 4.2002C17.808 4.2002 21.2998 7.69202 21.2998 12C21.2998 16.308 17.808 19.7998 13.5 19.7998C9.19171 19.7998 5.7002 16.308 5.7002 12C5.7002 7.69202 9.19202 4.2002 13.5 4.2002ZM10.0635 11.0264C9.75412 11.0264 9.50835 11.1468 9.3418 11.3369C9.17868 11.5231 9.10163 11.7648 9.10156 12C9.10156 12.2353 9.17861 12.4778 9.3418 12.6641C9.50834 12.854 9.75422 12.9736 10.0635 12.9736H16.9355C17.245 12.9736 17.4916 12.8542 17.6582 12.6641C17.8214 12.4778 17.8984 12.2353 17.8984 12C17.8984 11.7649 17.8212 11.5231 17.6582 11.3369C17.4916 11.1468 17.2451 11.0264 16.9355 11.0264H10.0635Z"
        stroke="url(#paint1_linear_7407_50725)"
        strokeOpacity={0.25}
        strokeWidth={0.4}
      />
    </g>
    <defs>
      <filter
        id="filter0_di_7407_50725"
        x={0.7}
        y={0.8}
        width={25.6}
        height={25.6}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1.6} />
        <feGaussianBlur stdDeviation={2.4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.622639 0 0 0 0 0.129167 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_7407_50725"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_7407_50725"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={0.8} />
        <feGaussianBlur stdDeviation={0.8} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_7407_50725"
        />
      </filter>
      <radialGradient
        id="paint0_radial_7407_50725"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(15.2518 0.332152) rotate(96.2409) scale(18.6911 37.9642)"
      >
        <stop stopColor="#A236EB" />
        <stop offset={1} stopColor="#8F49F1" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_7407_50725"
        x1={13.5}
        y1={4}
        x2={13.5}
        y2={20}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
)
export default WithdrawIcon
