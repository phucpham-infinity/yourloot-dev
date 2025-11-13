import { SVGProps } from 'react'
const ExplorerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 10C18 5.58228 14.4186 2 9.99998 2C5.5814 2 2 5.58228 2 10C2 14.4186 5.5814 18 9.99998 18C14.4186 18 18 14.4186 18 10Z"
      stroke="#9E90CF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.0008 2V3.51612M18 10H16.4833M10.0008 18V16.4848M3.51595 10H2"
      stroke="#9E90CF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.87109 13.1276L8.3625 8.36247L13.1276 6.87109L11.6362 11.6362L6.87109 13.1276Z"
      stroke="#9E90CF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ExplorerIcon
