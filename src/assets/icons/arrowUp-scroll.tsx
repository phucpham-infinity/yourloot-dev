import { SVGProps } from 'react'
const ArrowUpScroll = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={29}
    height={22}
    viewBox="0 0 29 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_12752_173188)">
      <path
        d="M14.4004 4.80043C14.6872 4.80043 14.9739 4.90992 15.1925 5.12843L22.0722 12.0082C22.5098 12.4458 22.5098 13.1553 22.0722 13.5928C21.6347 14.0303 20.9253 14.0303 20.4876 13.5928L14.4004 7.50524L8.31318 13.5926C7.87554 14.0301 7.1662 14.0301 6.72878 13.5926C6.29093 13.1551 6.29093 12.4456 6.72878 12.0079L13.6083 5.12822C13.8271 4.90967 14.1138 4.80043 14.4004 4.80043Z"
        fill="#9E90CF"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_12752_173188"
        x={0.00039053}
        y={0.000781178}
        width={28.8}
        height={21.9201}
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
        <feGaussianBlur stdDeviation={3.2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_12752_173188"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_12752_173188"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default ArrowUpScroll
