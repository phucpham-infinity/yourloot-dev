import { SVGProps } from 'react'
const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={28}
    viewBox="0 0 24 28"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_d_9148_19073)">
      <path
        d="M8.57981 12C8.57981 11.7849 8.66193 11.5699 8.82582 11.4059L13.9856 6.24617C14.3138 5.91794 14.846 5.91794 15.1741 6.24617C15.5022 6.57426 15.5022 7.10632 15.1741 7.43458L10.6084 12L15.1739 16.5654C15.502 16.8936 15.502 17.4256 15.1739 17.7537C14.8458 18.0821 14.3137 18.0821 13.9855 17.7537L8.82566 12.594C8.66174 12.43 8.57981 12.215 8.57981 12Z"
        fill="#9E90CF"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_9148_19073"
        x={0.579834}
        y={0}
        width={22.8403}
        height={28}
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
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_9148_19073"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_9148_19073"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default BackIcon
