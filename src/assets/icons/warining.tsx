import { SVGProps } from 'react'
const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_9024_27377)">
      <path
        d="M8 16.5C3.58172 16.5 0 12.9182 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4182 0.5 16 4.08172 16 8.5C16 12.9182 12.4182 16.5 8 16.5ZM7.2 10.9V12.5H8.8V10.9H7.2ZM7.2 4.5V9.3H8.8V4.5H7.2Z"
        fill="#E3B075"
      />
    </g>
    <defs>
      <clipPath id="clip0_9024_27377">
        <rect
          width={16}
          height={16}
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
)
export default WarningIcon
