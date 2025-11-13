import { SVGProps } from 'react'
const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={8}
    height={12}
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.41994 6.00002C7.41994 6.21508 7.33783 6.43012 7.17394 6.59409L2.01414 11.7538C1.68592 12.0821 1.15375 12.0821 0.82566 11.7538C0.497566 11.4257 0.497566 10.8937 0.82566 10.5654L5.39133 6.00002L0.825819 1.43459C0.497725 1.10636 0.497725 0.574357 0.825819 0.24629C1.15391 -0.0820961 1.68608 -0.0820961 2.0143 0.24629L7.1741 5.40595C7.33801 5.57 7.41994 5.78503 7.41994 6.00002Z"
      fill={props.fill || '#9E90CF'}
    />
  </svg>
)
export default ArrowRightIcon
