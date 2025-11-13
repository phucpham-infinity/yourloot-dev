import { SVGProps } from 'react'
const Clock2Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={13}
    viewBox="0 0 12 13"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_15002_1763)">
      <path
        d="M6 12.5C2.68629 12.5 0 9.81368 0 6.5C0 3.18629 2.68629 0.5 6 0.5C9.31368 0.5 12 3.18629 12 6.5C12 9.81368 9.31368 12.5 6 12.5ZM6.6 6.5V3.5H5.4V7.7H9V6.5H6.6Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_15002_1763">
        <rect
          width={12}
          height={12}
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
)
export default Clock2Icon
