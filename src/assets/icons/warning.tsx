import { SVGProps } from 'react'
const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_9203_4956)">
      <path
        d="M8 16C3.58172 16 0 12.4182 0 8C0 3.58172 3.58172 0 8 0C12.4182 0 16 3.58172 16 8C16 12.4182 12.4182 16 8 16ZM7.2 10.4V12H8.8V10.4H7.2ZM7.2 4V8.8H8.8V4H7.2Z"
        fill="#E3B075"
      />
    </g>
    <defs>
      <clipPath id="clip0_9203_4956">
        <rect width={16} height={16} fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export default WarningIcon
