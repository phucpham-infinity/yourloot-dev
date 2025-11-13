import { SVGProps } from 'react'
const DepositIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={65}
    height={65}
    viewBox="0 0 65 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_di_1083_225807)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.5664 37.1609V30.5063H23.9094C21.3672 30.5063 21.3672 26.6375 23.9094 26.6375H30.5664V19.9805C30.5664 17.4383 34.4352 17.4383 34.4352 19.9805V26.6375H41.0898C43.632 26.6375 43.632 30.5063 41.0898 30.5063H34.4352V37.1609C34.4352 39.7031 30.5664 39.7031 30.5664 37.1609ZM32.5 48.5703C43.5461 48.5703 52.5 39.6172 52.5 28.5703C52.5 17.5242 43.5461 8.57031 32.5 8.57031C21.4539 8.57031 12.5 17.5242 12.5 28.5703C12.5 39.6164 21.4539 48.5703 32.5 48.5703Z"
        fill="url(#paint0_radial_1083_225807)"
      />
      <path
        d="M32.5 9.07031C43.27 9.07031 52 17.8004 52 28.5703C52 39.341 43.27 48.0703 32.5 48.0703C21.73 48.0703 13 39.3403 13 28.5703C13 17.8004 21.73 9.07031 32.5 9.07031ZM32.501 17.5742C31.9128 17.5742 31.3074 17.7669 30.8418 18.1748C30.3664 18.5913 30.0664 19.2067 30.0664 19.9805V26.1377H23.9092C23.1357 26.1377 22.52 26.437 22.1035 26.9121C21.6955 27.3778 21.5029 27.9841 21.5029 28.5723C21.503 29.1603 21.6956 29.7659 22.1035 30.2314C22.52 30.7067 23.1356 31.0058 23.9092 31.0059H30.0664V37.1611C30.0665 37.9348 30.3665 38.5503 30.8418 38.9668C31.3074 39.3747 31.9128 39.5674 32.501 39.5674C33.0891 39.5673 33.6946 39.3747 34.1602 38.9668C34.6354 38.5503 34.9355 37.9348 34.9355 37.1611V31.0059H41.0898C41.8634 31.0059 42.479 30.7066 42.8955 30.2314C43.3034 29.7659 43.496 29.1603 43.4961 28.5723C43.4961 27.9841 43.3035 27.3778 42.8955 26.9121C42.479 26.437 41.8634 26.1377 41.0898 26.1377H34.9355V19.9805C34.9355 19.2068 34.6354 18.5913 34.1602 18.1748C33.6946 17.7669 33.0891 17.5743 32.501 17.5742Z"
        stroke="url(#paint1_linear_1083_225807)"
        strokeOpacity={0.25}
      />
    </g>
    <defs>
      <filter
        id="filter0_di_1083_225807"
        x={0.5}
        y={0.570312}
        width={64}
        height={64}
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
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.535556 0 0 0 0 1 0 0 0 0 0.129167 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1083_225807"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1083_225807"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_1083_225807"
        />
      </filter>
      <radialGradient
        id="paint0_radial_1083_225807"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(36.8795 -0.599307) rotate(96.2409) scale(46.7277 94.9104)"
      >
        <stop stopColor="#36EBB8" />
        <stop offset={1} stopColor="#49F155" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_1083_225807"
        x1={32.5}
        y1={8.57031}
        x2={32.5}
        y2={48.5703}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
)
export default DepositIcon
