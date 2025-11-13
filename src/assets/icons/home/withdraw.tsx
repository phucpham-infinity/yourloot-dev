import { SVGProps } from 'react'
const WithdrawIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={65}
    height={65}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="url(#b)"
        fillRule="evenodd"
        d="M32.5 48.57c-11.047 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20Zm-8.59-21.933c-2.543 0-2.543 3.869 0 3.869h17.18c2.542 0 2.542-3.87 0-3.87H23.91Z"
        clipRule="evenodd"
      />
      <path
        stroke="url(#c)"
        strokeOpacity={0.25}
        d="M32.5 9.07c10.77 0 19.5 8.73 19.5 19.5s-8.73 19.5-19.5 19.5S13 39.34 13 28.57s8.73-19.5 19.5-19.5Zm-8.873 17.08c-.642.064-1.159.346-1.523.762a2.52 2.52 0 0 0-.601 1.66c0 .587.193 1.193.6 1.659.365.415.882.696 1.524.76l.282.015h17.18c.775 0 1.39-.3 1.806-.776a2.52 2.52 0 0 0 .601-1.659 2.52 2.52 0 0 0-.6-1.659c-.417-.475-1.032-.775-1.806-.775H23.91l-.283.013Z"
      />
    </g>
    <defs>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-5.07972 46.45077 -94.34792 -10.31761 36.88 -.6)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A236EB" />
        <stop offset={1} stopColor="#8F49F1" />
      </radialGradient>
      <linearGradient
        id="c"
        x1={32.5}
        x2={32.5}
        y1={8.57}
        y2={48.57}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} />
      </linearGradient>
      <filter
        id="a"
        width={64}
        height={64}
        x={0.5}
        y={0.57}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.622639 0 0 0 0 0.129167 0 0 0 0 1 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3601_213483"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3601_213483"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
        <feBlend in2="shape" result="effect2_innerShadow_3601_213483" />
      </filter>
    </defs>
  </svg>
)
export default WithdrawIcon
