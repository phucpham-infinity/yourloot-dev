import { SVGProps } from 'react'
const LiveGameIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.0427 0.75L8.24891 4.14567L4.55078 0.75M4.10757 15.4077H12.3933C14.2468 15.4077 15.75 13.9044 15.75 12.0501V7.50309C15.75 5.64875 14.2468 4.14551 12.3933 4.14551H4.10757C2.25324 4.14551 0.75 5.64875 0.75 7.50309V12.0501C0.75 13.9044 2.25324 15.4077 4.10757 15.4077Z"
      // stroke="#9E90CF"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default LiveGameIcon
