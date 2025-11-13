import { SVGProps } from 'react'
const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.9894 17.3809C10.8526 18.6431 9.07929 18.6581 7.93164 17.3809M9.99935 14.8734C14.6987 14.8734 16.8727 14.2705 17.0827 11.8507C17.0827 9.43266 15.567 9.58815 15.567 6.62125C15.567 4.30378 13.3704 1.66699 9.99935 1.66699C6.62832 1.66699 4.43172 4.30378 4.43172 6.62125C4.43172 9.58815 2.91602 9.43266 2.91602 11.8507C3.12681 14.2796 5.30083 14.8734 9.99935 14.8734Z"
      stroke="#9E90CF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default NotificationIcon
