import * as React from 'react'
const KZTICon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <circle cx="8" cy="8" r="8" fill="#00B4D4" />
    <path d="M3 4H13V5.53846H3V4Z" fill="#F8FF26" />
    <path
      d="M13 6.30769H3V7.84615H7.16667V14H8.83333V7.84615H13V6.30769Z"
      fill="#F8FF26"
    />
  </svg>
)
export default KZTICon
